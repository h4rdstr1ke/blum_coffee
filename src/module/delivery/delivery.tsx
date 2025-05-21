import { useState } from 'react';

type Props = {}

export default function Delivery({ }: Props) {
  return (
    <div className="w-full mt-10 px-4 border">
      {/* Общий контейнер */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 max-w-screen-xl mx-auto">
        
        {/* Левый блок - сервисы доставки */}
        <div className="flex flex-col items-stretch w-full md:w-auto">
          {/* Yandex (мобильная версия) */}
          <div className="md:hidden flex justify-start pl-2">
            <img 
              src="/image/yandex_mobile.svg" 
              alt="Yandex Eats" 
              className="w-[70%] max-w-[500px] border" 
            />
          </div>
          
          {/* Delivery (мобильная версия) */}
          <div className="md:hidden flex justify-end pr-2">
            <img 
              src="/image/delivery_mobile.svg" 
              alt="Delivery Club" 
              className="w-[70%] max-w-[500px] border" 
            />
          </div>

          {/* Десктопные версии */}
          <img 
            src="/image/yandex.svg" 
            alt="Yandex Eats" 
            className="hidden md:block w-full max-w-[468px] border md:order-2" 
          />
          <img 
            src="/image/delivery.svg" 
            alt="Delivery Club" 
            className="hidden md:block w-full max-w-[468px] border md:order-1" 
          />
        </div>

        {/* Правый блок - вкус и текст */}
        <div className="flex flex-col items-center w-full md:w-auto">
          {/* Текст (мобильная версия) */}
          <div className="md:hidden text-center my-4 w-full">
            <p className="text-[#7EDAFF] font-bold text-3xl leading-tight">
              Заказывай тот самый вкус<br />
              в привычных приложениях!
            </p>
          </div>

          {/* Taste (мобильная версия) */}
          <div className="md:hidden w-[100%] mx-auto">
            <img 
              src="/image/taste_mobile.svg" 
              alt="Вкусные блюда" 
              className="w-full border" 
            />
          </div>
          
          {/* Десктопные версии */}
          <img 
            src="/image/taste.svg" 
            alt="Вкусные блюда" 
            className="hidden md:block w-full max-w-[960px] border" 
          />
          <div className="hidden md:block text-center mt-4">
            <p className="text-[#FD744C] font-bold text-[60px] leading-tight">
              Заказывай тот самый вкус<br />
              в привычных приложениях!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}