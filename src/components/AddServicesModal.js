import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { useGlobalContext } from '../context/context'
import { usePlotContext } from '../context/plotContext'
import { servicesData } from '../data'

const AddServicesModal = () => {
    const [top, setTop] = useState('');
    const [left, setLeft] = useState('');
    const [error, setError] = useState({ top: null, left: null, services: null });
    const [services, setServices] = useState(null);
    const { closeServicesModal, plotDimensions } = useGlobalContext();
    const { addServices } = usePlotContext();

    useEffect(() => {
        let newServices = [];
        servicesData.forEach((ele) => {
            newServices.push({ name: ele.name, isPresent: false, color: ele.color });
        })
        setServices(newServices);
    }, [])

    const updateServices = (curr) => {
        const newServices = [...services];
        for (let i = 0; i < newServices.length; i++) {
            if (newServices[i].name === curr) {
                newServices[i].isPresent = !newServices[i].isPresent;
                break;
            }
        }
        setServices(newServices);
    }

    const validateFromAndSubmit = (e) => {
        e.preventDefault();
        let tempError = { top, left };

        //validating top value
        if (!top || top === '')
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

        //validating services
        let flag = false;
        services.forEach((ele) => {
            if (ele.isPresent) {
                flag = true;
            }
        })
        if (!flag)
            tempError.services = 'Select atleast one value';
        else tempError.services = null;

        setError(tempError);

        //close form if value is validated
        if (!tempError.top && !tempError.left && !tempError.services) {
            addServices(top, left, services);
            closeServicesModal();
        }
    }

    return (
        <div
            className='fixed top-0 left-0 h-screen w-screen z-10 bg-[#000000ac] flex justify-center items-center'
        // onClick={(e)=>{
        //     e.stopPropagation();
        //     e.nativeEvent.stopImmediatePropagation();
        //     closeServicesModal();
        // }}
        >
            <div className='relative bg-white p-10 rounded m-2 w-full max-w-xl flex flex-col items-center'>
                <div
                    className='absolute top-0 m-2 right-0 drop-shadow-xl p-2 rounded cursor-pointer text-lg'
                    onClick={closeServicesModal}
                >
                    <AiOutlineClose />
                </div>
                <h1 className='text-xl font-medium text-center mb-4'>
                    Enter Services
                </h1>
                <div className=''>
                    <form action="">
                        <div className='py-2'>
                            <label htmlFor="top">Distance from Top :</label>
                            <input
                                type="number"
                                name="top"
                                id="top"
                                min={0}
                                max={plotDimensions.height - 1}
                                value={top}
                                onChange={(e) => { setTop(e.target.value) }}
                                className='block border-[1px] border-blue-400 mt-2 rounded p-1 w-full'
                                required
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
                                min={0}
                                max={plotDimensions.width - 1}
                                value={left}
                                onChange={(e) => { setLeft(e.target.value) }}
                                className='block border-[1px] border-blue-400 mt-2 rounded p-1 w-full'
                                required
                            />
                            {
                                (error.left) &&
                                (<p className='text-red-500 text-sm mt-1'>{error.left}</p>)
                            }
                        </div>
                        <div className='py-2'>
                            <p>Select Services :</p>
                            <div className='flex w-36 gap-2 flex-wrap'>

                                {
                                    servicesData.map((service, index) => {
                                        const { id, name } = service;
                                        const nameLow = name.toLocaleLowerCase();
                                        return (
                                            <div key={id} >
                                                <input
                                                    className='mr-2 mt-2'
                                                    type="checkbox"
                                                    id={nameLow}
                                                    name={nameLow}
                                                    onClick={() => updateServices(name)}
                                                />
                                                <label htmlFor={nameLow}>{name}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {
                                (error.services) &&
                                (<p className='text-red-500 text-sm mt-1'>{error.services}</p>)
                            }
                        </div>
                        <button
                            className='px-4 mx-auto py-2 mt-4 bg-blue-500 text-white rounded flex gap-2 items-center font-medium'
                            type='submit'
                            onClick={(e) => validateFromAndSubmit(e)}
                        >
                            Add Services
                            <BsPlus className='text-2xl' />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddServicesModal