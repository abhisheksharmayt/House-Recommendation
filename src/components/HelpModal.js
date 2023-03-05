import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import createPlot from '../images/createPlot.png'
import houseAndServices from '../images/houseAndServices.png'
import houses from '../images/houses.png'
import services from '../images/services.png'
import recommend from '../images/recommend.png'
import recommendButton from '../images/recommendButton.png'

const HelpModal = ({closeHelpModal}) => {
    return (
        <div className='fixed top-0 left-0 h-screen w-screen z-10 bg-[#0000006b] flex justify-center backdrop-blur-lg overflow-auto'>
            <div className='relative max-w-2xl w-full h-fit my-10 mx-2 p-5 bg-slate-900 text-gray-400'>
                <div
                    className='absolute top-0 m-2 right-0 drop-shadow-xl p-2 rounded cursor-pointer text-lg text-white'
                    onClick={closeHelpModal}
                >
                    <AiOutlineClose />
                </div>
                <h1 className='text-center font-bold text-3xl'>How to use?</h1>
                <div className='my-3 py-[1px] bg-slate-800 w'></div>
                <ol type='1'>
                    <li className='py-4'>
                        <p>1. Use this button to create new plot.</p>
                        <img className='w-48' src={createPlot} alt="create plot button" />
                    </li>
                    <li className='py-4'>
                        <p>2. Use these buttons to add houses and services.</p>
                        <img className='w-48' src={houseAndServices} alt="houses and services buttons" srcset="" />
                    </li>
                    <li className='py-4'>
                        <p>3. After adding houses this how they'll look with their respective house number.</p>
                        <img src={houses} alt="houses on plot" />
                    </li>
                    <li className='py-4'>
                        <p>4. This is how services will look like. You can hover on plot to see what services are availabe on that plot.</p>
                        <img src={services} alt="services on plot" />
                    </li>
                    <li className='py-4'>
                        <p>5. Use this button to get recommended house</p>
                        <img className='w-48' src={recommendButton} alt="recommend button" />
                    </li>
                    <li className='py-4'>
                        <p>6. All recommend house will turn into green and when you hover on it'll show nearest distance to each available services.</p>
                        <img src={recommend} alt="recommended houses" />
                    </li>
                </ol>
                <p className='text-center'>*there might be some bugs 😅</p>
            </div>
        </div>
    )
}

export default HelpModal