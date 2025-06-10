import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../../context/CartContext';

export default function Cart() {
  const [isAnimating, setIsAnimating] = useState(false);
  const { totalItems } = useCart();

  const handleClick = () => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/cart"
        onClick={handleClick}
        className="flex items-center gap-3 bg-[#7EDAFF] text-white p-4 rounded-[30px] shadow-lg hover:bg-[#6ec9ff] transition-colors"
      >
        <motion.div
          animate={{
            scale: isAnimating ? [1, 1.2, 1] : 1,
            rotate: isAnimating ? [0, 10, -10, 0] : 0
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <img src="/image/cart.svg" alt="Корзина" className="w-10 h-10" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </motion.div>
        <span className="text-3xl md:text-[40px] font-bold">Корзина</span>
      </Link>
    </motion.div>
  );
}