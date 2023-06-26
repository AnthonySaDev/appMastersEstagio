import React from 'react'

export default function CardSkeleton() {
    return (
        <div className='grid gap-10 justify-center items-center mt-10 w-9/12 mx-auto  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <div className="border mx-auto border-zinc-800 bg-zinc-600 h-[450px] w-[220px] lg:w-[300px] brightness-80 flex items-center justify-start p-5 animate-pulse">
                <div className="relative shadow-md">
                    <div className="w-full h-full bg-gray-400"></div>
                    <div className="bg-transparent w-full h-full">
                        <div className="flex flex-col justify-between h-full">
                            <div className="w-full h-[50%] lg:h-auto mb-1">
                                <div className="w-full h-full bg-gray-400"></div>
                            </div>
                            <div className="flex flex-col w-full items-center justify-center h-full">
                                <h1 className="md:text-xl text-sm font-extrabold text-center bg-gray-400"></h1>
                                <div className="w-full flex flex-col  gap-3 text-gray-400">

                                    <div className="ml-4 text-white bg-zinc-700 w-[150px] h-[20px]" />



                                    <div className="ml-4 text-white bg-zinc-700 w-[150px] h-[20px]" />



                                    <div className="ml-4 text-white bg-zinc-700 w-[150px] h-[20px]" />



                                    <div className="ml-4 text-white bg-zinc-700 w-[150px] h-[20px]" />


                                    <a href="#" className="ml-4 w-[150px] h-[20px] flex font-bold mt-2 gap-4 items-center justify-center  mx-auto py-3 px-6 bg-gradient-to-r from-pink-600 to-purple-800 text-white rounded-lg shadow hover:bg-purple-400 hover:brightness-125 transition-all duration-700 bg-gray-400"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
