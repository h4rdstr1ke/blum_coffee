import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {}

export default function Header({ }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-[#7EDAFF] text-white h-20 relative z-30">
      {/* ПК-версия с адаптивным текстом */}
      <div className="hidden md:flex w-full p-4 items-center justify-between relative">
        <Link to="/" className='' >
          <img src="/image/logo.png" alt="Логотип" className="h-12" />
        </Link>

        <div className="w-full flex items-center justify-between ml-[61px]">
          <div className='text-right'>
            <div className="font-bold text-[clamp(14px,2vw,20px)]">ГРАФИК РАБОТЫ</div>
            <div className="text-[clamp(12px,1.8vw,18px)]">ПН-ВС 10:00-22:00</div>
          </div>

          <Link to="/shop" className='font-bold text-[clamp(14px,2vw,20px)]'>ДОСТАВКА</Link>
          <Link to="/shop" className='font-bold text-[clamp(14px,2vw,20px)]'>МЕНЮ</Link>
          <a className='font-bold text-[clamp(14px,2vw,20px)]' href="#contacts">КОНТАКТЫ</a>

          <Link to="/profile"><img src="/image/user.png" alt="Личный кабинет" className="h-8" /></Link>
        </div>
      </div>

      {/* Мобильная версия с адаптивным текстом */}
      <div className="flex md:hidden w-full p-4 items-center justify-between">
        <img src="/image/logo.png" alt="FLUFFY" className="h-10" />

        {/* График работы с плавным изменением размера */}
        <div className="text-[clamp(11px,3vw,14px)] uppercase tracking-wider text-center mx-4">
          ГРАФИК РАБОТЫ<br />
          ПН-ВС 10:00-22:00
        </div>

        <button onClick={toggleMenu} className="p-2">
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col p-4 bg-[#7EDAFF]">
          <a className="font-bold py-2 text-[clamp(14px,4vw,18px)]" href="#delivery">ДОСТАВКА</a>
          <a className="font-bold py-2 text-[clamp(14px,4vw,18px)]" href="#menu">МЕНЮ</a>
          <a className="font-bold py-2 text-[clamp(14px,4vw,18px)]" href="#contacts">КОНТАКТЫ</a>
        </nav>
      )}
    </header>
  );
}