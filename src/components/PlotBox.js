import React, { useState } from 'react'
import DetailPopup from './DetailPopup';

const PlotBox = ({ item }) => {
    const [detail, setDetail] = useState(null);

    const handleHover = (currDetail, type) => {
        setDetail({data: currDetail, type});
    }
    return (
        <div
            className='relative m-[1px] h-5 w-5 text-white flex justify-center items-center'
        >
            {
                (item) ? (
                    (item.isHouse) ? (
                        (item.isRecommended) ? (
                            <div
                                className='bg-green-500 w-full h-full flex justify-center items-center'
                                onMouseEnter={() => handleHover(item.nearByServices, 'recommended')}
                                onMouseLeave={() => setDetail(null)}
                            >
                                {item.houseNum}
                            </div>
                        ) : (
                            <div className='bg-yellow-500 w-full h-full flex justify-center items-center'>
                                {item.houseNum}
                            </div>
                        )
                    ) : (
                        <div
                            className='bg-cyan-500 w-full h-full'
                            onMouseEnter={() => handleHover(item.services, 'services')}
                            onMouseLeave={() => setDetail(null)}
                        >
                        </div>
                    )
                ) : (
                    <div className='bg-slate-600 w-full h-full'></div>
                )
            }
            {detail && <DetailPopup detail={detail} />}
        </div>
    )
}

export default PlotBox