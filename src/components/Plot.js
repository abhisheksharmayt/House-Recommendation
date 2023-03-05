import React from 'react'
import { usePlotContext } from '../context/plotContext'
import PlotBox from './PlotBox';

const Plot = () => {
    const { plot } = usePlotContext();
    // const [scale, setScale] = useState(1);

    if (!plot) {
        return (
            <div className='text-center text-gray-500'>
                <p>create a plot...</p>
            </div>
        )
    }

    return (
        <div className='max-w-full h-full overflow-scroll'>
            {/* <div className='m-2 p-2 text-sm'>
                <button
                    className='mx-2 py-1 px-2 bg-red-400 rounded text-white'
                    onClick={() => setScale(scale + 0.2)}
                >
                    Zoom in +
                </button>
                <button
                    className='mx-2 py-1 px-2 bg-red-400 rounded text-white'
                    onClick={() => setScale(scale - 0.2)}
                >
                    Zoom out -
                </button>
            </div>
            <div className='p-4 m-4 max-h-full w-full flex flex-col items-center overflow-scroll'> */}
            <div className='w-fit h-fit p-4 m-4'>
                {
                    plot.map((plotRow, rowIndex) => {
                        return (
                            <div
                                key={rowIndex}
                                className='flex'
                            >
                                {
                                    plotRow.map((item, colIndex) => {
                                        return (
                                            <PlotBox
                                                key={`${rowIndex}${colIndex}`}
                                                item={item}
                                            />
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            {/* </div> */}
        </div >
    )
}

export default Plot