import React from 'react'

const SpinerLoading: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
	return (
		<div className={`fixed inset-0 flex items-center justify-center ${className}`} {...rest}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
	)
}

export default SpinerLoading