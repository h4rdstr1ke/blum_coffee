import { Link } from 'react-router-dom';

type Props = {};

export default function Cart({}: Props) {
  return (
    <div className="w-full flex justify-end pr-[40px] mb-[120px]">
      <Link to="/cart" className="flex items-center gap-3 bg-[#7EDAFF] text-[#FFFFFF] p-5 rounded-[30px]">
        <img src="/image/cart.png" alt="Корзина" className="" />
        <span className="text-[55px] font-bold">Корзина</span>
      </Link>
    </div>
  );
}