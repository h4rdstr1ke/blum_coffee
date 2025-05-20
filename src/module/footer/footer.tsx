import { useState } from 'react';

type Props = {}

export default function Footer({ }: Props) {
  

  return (
    <div className='w-full flex flex-raw mt-[266px] mb-[50px]'>
        <div className='w-full flex flex-col'>
          <img src="/image/logo2.png" alt="" className='w-[266px] pb-[55px]'/>
          <div className='flex flex-row gap-12'>
            <img src="/image/tg.png" alt="" />
            <img src="/image/tt.png" alt="" />
            <img src="/image/inst.png" alt="" />
          </div>
        </div>

        <div className='w-full flex flex-col font-bold mt-[45px]'>
          <p className='text-[#B8B8B8] text-[35px]'>Ждём вас у нас</p>
          <p className='text-[#B8B8B8] text-[35px]'>с 10 до 22</p>
        </div>

        <div className='w-full flex flex-col justify-between gap-2 font-bold'>
          <p className='text-[#B8B8B8] text-[35px]'>Главная</p>
          <p className='text-[#B8B8B8] text-[35px]'>Меню</p>
          <p className='text-[#B8B8B8] text-[35px]'>Доставка</p>
        </div>

        <div className='w-full flex flex-col justify-between gap-2 font-bold'>
          <p className='text-[#B8B8B8] text-[35px]'>Сайт франшизы</p>
          <p className='text-[#B8B8B8] text-[35px]'>8 (905)231 38 55</p>
          <p className='text-[#B8B8B8] text-[35px]'>Разработчики блум</p>
        </div>
    </div>
  );
}