import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import React from "react";

const RefetchButton = ({
  refetch,
  error,
}: {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  error: Error;
}) => {
  return (
    <div className="c w-full h-full">
      <div>
				<p>{`${error.message}`}</p>
        <button
          className="rounded-4xl p-1 active-black hover:bg-brown"
          onClick={() => refetch()}
        >
          ReTry
        </button>
      </div>
    </div>
  );
};

export default RefetchButton;
