import { useState } from 'react';

type Props = {}

export default function Delivery({ }: Props) {
  
  

  return (
    <div className="w-full mt-10 px-4 border">
        {/*<div className='devkrug'/>
        <div className='devkrug2'/>*/}
        <div className='flex justify-between items-center relative'>
            <div className='mt-0 items-center relative' >
                <img src="/image/delivery.svg" alt="delivery.svg" className='w-[468px] border'/>
                <img src="/image/market.svg" alt="market.svg" className='w-[468px] border'/>
            </div>
            <div className="border">
            <img src="/image/taste.svg" alt="" className='w-[960px] relative'/>
                <div className='flex flex-col items-center justify-center text-center mt-0'>
                    <p className="text-[#FD744C] font-bold text-[60px] leading-tight">
                        Заказывай тот самый вкус<br/>
                        в привычных приложениях!
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}
