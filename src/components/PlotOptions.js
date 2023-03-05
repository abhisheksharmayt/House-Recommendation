import React from 'react'
import { BiGridAlt, BiSearchAlt } from 'react-icons/bi'
import { BsHouse, BsPlus } from 'react-icons/bs'
import { useGlobalContext } from '../context/context'
import { usePlotContext } from '../context/plotContext'

const PlotOptions = () => {

    const {
        openHouseModal,
        openPlotModal,
        openServicesModal,
        plotDimensions
    } = useGlobalContext();

    const { calculateScore } = usePlotContext();

    return (
        <>
            <div className='p-4 mb-10 w-fit border-[1px] border-slate-600 rounded mx-auto flex gap-5'>
                <div>
                    <button
                        className='px-4 py-2 mb-2 bg-orange-500  hover:bg-orange-600 text-white rounded flex gap-2 items-center justify-center transition-all'
                        onClick={openPlotModal}
                    >
                        Create New Plot
                        <BiGridAlt />
                    </button>
                    <button
                        className='px-4 py-2 mb-2 w-full bg-yellow-500  hover:bg-yellow-600 text-white rounded flex gap-2 items-center justify-center disabled:opacity-40 transition-all'
                        disabled={(plotDimensions === null) ? true : false}
                        onClick={calculateScore}
                    >
                        Recommend
                        <BiSearchAlt />
                    </button>
                </div>
                {/* <div className='flex gap-2'> */}
                <div className='flex flex-col items-end'>

                    <button
                        className='px-4 py-2 mb-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded flex gap-2 items-center justify-center disabled:opacity-40 transition-all'
                        onClick={openHouseModal}
                        disabled={(plotDimensions === null) ? true : false}
                    >
                        Add House
                        <BsHouse />
                    </button>
                    <button
                        className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex gap-2 items-center disabled:opacity-40 transition-all'
                        onClick={openServicesModal}
                        disabled={(plotDimensions === null) ? true : false}
                    >
                        Add Services
                        <BsPlus className='text-2xl' />
                    </button>
                </div>
                {/* </div> */}
            </div>

        </>
    )
}

export default PlotOptions