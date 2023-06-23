import React from 'react'

export default function HasError() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
    <div className="flex flex-col items-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-12 w-12 text-red-500 mb-4 animate-bounce"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
        <h1 className="text-xl font-bold text-white  mb-4">Error loading data.</h1>
        <p className="text-white">Please try again later.</p>
    </div>
</div>
  )
}
