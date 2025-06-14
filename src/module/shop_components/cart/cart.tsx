import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../../context/CartContext';
import { textStylesShop } from '../../../style/textStyles';

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
      className={textStylesShop.cartContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/cart"
        onClick={handleClick}
        className={textStylesShop.cartLink}
      >
        <motion.div
          animate={{
            scale: isAnimating ? [1, 1.2, 1] : 1,
            rotate: isAnimating ? [0, 10, -10, 0] : 0
          }}
          transition={{ duration: 0.8 }}
        >
          <div className={textStylesShop.cartIconContainer}>
            <img src="/image/cart.svg" alt="Корзина" className={textStylesShop.cartIcon} />
            {totalItems > 0 && (
              <span className={textStylesShop.cartBadge}>
                {totalItems}
              </span>
            )}
          </div>
        </motion.div>
        <span className={textStylesShop.cartText}>Корзина</span>
      </Link>
    </motion.div>
  );
}