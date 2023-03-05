import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsHouse } from 'react-icons/bs'
import { useGlobalContext } from '../context/context'
import { usePlotContext } from '../context/plotContext'

const AddHouseModal = () => {
    const [top, setTop] = useState('');
    const [left, setLeft] = useState('');
    const [error, setError] = useState({top: null, left: null});
    const { closeHouseModal, plotDimensions } = useGlobalContext();
    const { addHouse } = usePlotContext();

    const validateFromAndSubmit = (e) => {
        e.preventDefault();
        let tempError = {top, left};

        //validating top value
        if(!top || top === '')
            tempError.top = `This field is required`;
        else if (top < 0 || top >= plotDimensions.height)
            tempError.top = `Enter a value between [0-${plotDimensions.height - 1}]`;
        else tempError.top = null;

        //validating left value
        if (!left || left === '')
            tempError.left = `This field is required`;
        else if (left < 0 || left >= plotDimensions.width)
            tempError.left = `Enter a value between [0-${plotDimensions.width - 1}]`;
        else tempError.left = null;

        setError(tempError);

        //close form if value is validated
        if (!tempError.top && !tempError.left) {
            addHouse(top, left);
            closeHouseModal();
        }
    }

    return (
        <div className='fixed top-0 left-0 h-screen w-screen z-10 bg-[#000000ac] flex justify-center items-center'>
            <div className='relative bg-white py-8 p-10 m-2 rounded w-full max-w-xl flex flex-col items-center'>
                <div className='absolute top-0 m-2 right-0 drop-shadow-xl p-2 rounded cursor-pointer text-lg'
                    onClick={closeHouseModal}
                >
                    <AiOutlineClose />
                </div>
                <h1 className='text-xl font-medium text-center mb-4'>
                    Enter House Location
                </h1>
                <div className=''>
                    <form action="">
                        <div className='py-2'>
                            <label htmlFor="top">Distance from Top :</label>
                            <input
                                type="number"
                                name="top"
                                id="top"
                                min={1}
                                max={plotDimensions.height - 1}
                                value={top}
                                onChange={(e) => setTop(e.target.value)}
                                className='block border-[1px] border-blue-400 mt-2 rounded p-1 w-full'
                            />
                            {
                                (error.top) &&
                                (<p className='text-red-500 text-sm mt-1'>{error.top}</p>)
                            }
                        </div>
                        <div className='py-2'>
                            <label htmlFor="left">Distance from Left :</label>
                            <input
                                type="number"
                                name="left"
                                id="left"
                                min={1}
                                max={plotDimensions.width - 1}
                                value={left}
                                onChange={(e) => setLeft(e.target.value)}
                                className='block border-[1px] border-blue-400 mt-2 rounded p-1 w-full'

                            />
                            {
                                (error.left) &&
                                (<p className='text-red-500 text-sm mt-1'>{error.left}</p>)
                            }
                        </div>
                        <button
                            className='px-4 mx-auto py-2 mt-4 bg-blue-500 text-white rounded flex gap-2 items-center font-medium'
                            type='submit'
                            onClick={(e) => validateFromAndSubmit(e)}
                        >
                            Add House
                            <BsHouse />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddHouseModal