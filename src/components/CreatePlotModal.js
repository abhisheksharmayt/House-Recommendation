import React, { useState } from 'react'
import { BiGridAlt } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { useGlobalContext } from '../context/context'

const CreatePlotModal = () => {
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [error, setError] = useState({ height: null, width: null });
    const { closePlotModal, updatePlotDimensions } = useGlobalContext();

    const validateFromAndSubmit = (e) => {
        e.preventDefault();
        let tempError = { height, width };

        //validating height
        if (!height || height === '')
            tempError.height = `This field is required`;
        else tempError.height = null;

        //validating width
        if (!width || width === '')
            tempError.width = `This field is required`;
        else tempError.width = null;

        setError(tempError);

        if (!tempError.height && !tempError.width) {
            updatePlotDimensions(parseInt(height), parseInt(width));
            closePlotModal();
        }
    }

    return (
        <div className='fixed top-0 left-0 h-screen w-screen z-10 bg-[#000000ac] flex justify-center items-center'
        // onClick={(e) => {
        //     e.stopPropagation();
        //     closePlotModal();
        // }}
        >
            <div className='relative bg-white py-8 p-10 m-2 rounded w-full max-w-xl flex flex-col items-center'>
                <div
                    className='absolute top-0 m-2 right-0 drop-shadow-xl p-2 rounded cursor-pointer text-lg'
                    onClick={closePlotModal}
                >
                    <AiOutlineClose />
                </div>
                <h1 className='text-xl font-medium text-center mb-4'>
                    Enter Plot Size
                </h1>
                <div className=''>
                    <form action="">
                        <div className='py-2'>
                            <label htmlFor="height">Height :</label>
                            <input
                                type="number"
                                name="height"
                                id="height"
                                min={1}
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className='block border-[1px] border-blue-400 mt-2 rounded p-1'
                            />
                            {
                                (error.height) &&
                                (<p className='text-red-500 text-sm mt-1'>{error.height}</p>)
                            }
                        </div>
                        <div className='py-2'>
                            <label htmlFor="width">Width :</label>
                            <input
                                type="number"
                                name="width"
                                id="width"
                                min={1}
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                className='block border-[1px] border-blue-400 mt-2 rounded p-1'
                            />
                            {
                                (error.width) &&
                                (<p className='text-red-500 text-sm mt-1'>{error.width}</p>)
                            }
                        </div>
                        <button
                            className='px-4 mx-auto py-2 mt-4 bg-blue-500 text-white rounded flex gap-2 items-center font-medium'
                            onClick={(e) => validateFromAndSubmit(e)}
                        >
                            Create New Plot
                            <BiGridAlt />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePlotModal