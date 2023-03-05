import React from 'react'
import { servicesMap } from '../data'

const DetailPopup = ({ detail }) => {

    if (detail.type === 'recommended') {
        return (
            <div className='absolute w-40 -bottom-2 z-10 bg-white text-slate-900 rounded p-2 px-3 translate-y-full'>
                <p className='font-medium'>Nearest Services</p>
                {
                    detail.data.map((curr, index) => {
                        return (
                            <div key={index} className='flex gap-2 items-center text-slate-700 text-sm'>
                                <div className='h-2 w-2 rounded-full' style={{ backgroundColor: `${servicesMap.get(curr[0])}` }}></div>
                                <p>{curr[0]}</p>
                                <p>{curr[1]}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className='absolute -bottom-2 z-10 bg-white text-slate-900 rounded p-2 px-3 translate-y-full'>
            {
                detail.data.map((curr, index) => {
                    const { name, color, isPresent } = curr;
                    return (
                        <div key={index} className='flex gap-2 items-center'>
                            {
                                (isPresent) && (
                                    <div className='h-2 w-2 rounded-full' style={{ backgroundColor: `${color}` }}></div>
                                )
                            }
                            {
                                (isPresent) && (
                                    <p className='text-slate-700'>{name}</p>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DetailPopup