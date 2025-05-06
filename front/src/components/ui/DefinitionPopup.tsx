import { useState, useEffect } from 'react';

interface DefinitionPopupProps {
	text: string;
  selectedText: string;
  position: { top: number; left: number };
  onClose: () => void;
}

export default function DefinitionPopup({ text, selectedText, position, onClose }: DefinitionPopupProps) {
  const [definition, setDefinition] = useState<string>('Loading...');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const TIMEOUT_DURATION = 300000;

    const fetchData = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timed out after 300 seconds')), TIMEOUT_DURATION)
        );

        const response = await Promise.race([
          fetch('/api/define', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text, term: selectedText }),
            signal: abortController.signal,
          }),
          timeoutPromise
        ]) as Response;

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
				console.log(data)
				if (!data?.definition || typeof data.definition !== 'string') {
					throw new Error('Invalid response format from server');
				}

        setDefinition(data.definition);
        setIsError(false);

      } catch (error) {
        if (!abortController.signal.aborted) {
          setIsError(true);
          setDefinition(error instanceof Error ? error.message : 'Failed to load definition');
        }
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [selectedText]);

  return (
    <div className="fixed bg-white p-1 rounded-lg shadow-lg border border-gray-200 z-50 max-w-xs max-h-4/12"
      style={{ top: position.top, left: position.left }}>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg truncate">{selectedText}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1">×</button>
      </div>
      
      <div className={`text-sm ${isError ? 'text-red-500' : 'text-gray-600'}`}>
        {isError ? (
          <div className="flex items-center gap-2">
            ⚠️ {/* or your SVG/icon */}
            {definition}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {definition === 'Loading...' && (
              <span className="animate-spin">🌀</span>
            )}
            <span>{definition}</span>
          </div>
        )}
      </div>
    </div>
	);
}