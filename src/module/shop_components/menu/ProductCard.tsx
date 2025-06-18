import { useState } from 'react';
import { ProductInfoModal } from './ProductInfoModal';
import { useCart } from '../../../context/CartContext';
import { useUser } from '../../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../../types/index';
import { textStylesShop } from '../../../style/textStyles';

export default function ProductCard({ item }: { item: Product }) {
    const [showInfo, setShowInfo] = useState(false);
    const { addToCart, removeFromCart, updateQuantity, items } = useCart();
    const { isEmployee } = useUser();

    // Находим товар в корзине
    const cartItem = items.find(cartItem => cartItem.id === item.id);
    const isInCart = !!cartItem;

    const handleAddToCart = () => {
        if (!isEmployee) {
            addToCart(item);
        }
    };

    const handleIncreaseQuantity = () => {
        if (!isEmployee) {
            updateQuantity(item.id, (cartItem?.quantity || 0) + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (!isEmployee) {
            if (cartItem && cartItem.quantity > 1) {
                updateQuantity(item.id, cartItem.quantity - 1);
            } else if (cartItem && cartItem.quantity === 1) {
                removeFromCart(item.id);
            }
        }
    };

    return (
        <div className={textStylesShop.productCard.container}>
            <div className={textStylesShop.productCard.imageContainer}>
                <img
                    src={item.src}
                    alt={item.title}
                    className={textStylesShop.productCard.image}
                    loading="lazy"
                />
                {item.info && (
                    <button
                        onClick={() => setShowInfo(true)}
                        className={textStylesShop.productCard.infoButton}
                        aria-label="Показать информацию"
                    >
                        <img src="/image/info_icon.png" alt="Информация" className={textStylesShop.productCard.infoIcon} />
                    </button>
                )}
            </div>

            <h3 className={textStylesShop.productCard.title}>{item.title}</h3>

            <div className="mt-auto w-full relative flex flex-col items-center">
                <p className={textStylesShop.productCard.price}>
                    {item.price}₽
                </p>

                <AnimatePresence mode="wait">
                    {!isInCart ? (
                        <motion.button
                            key="add-button"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            onClick={handleAddToCart}
                            className={textStylesShop.productCard.addButton}
                        >
                            <motion.span
                                key={item.id}
                                initial={{ scale: 1 }}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5 }}
                            >
                                + Добавить
                            </motion.span>
                        </motion.button>
                    ) : (
                        <motion.div
                            key="counter"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-center space-x-3 bg-[#39C6FF] rounded-xl px-4 py-2 shadow-lg"
                        >
                            <motion.button
                                onClick={handleDecreaseQuantity}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white font-bold text-lg"
                                aria-label="Уменьшить количество"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                -
                            </motion.button>
                            
                            <motion.span 
                                key={cartItem?.quantity}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className="min-w-[2rem] text-center font-semibold text-white text-lg"
                            >
                                {cartItem?.quantity || 0}
                            </motion.span>
                            
                            <motion.button
                                onClick={handleIncreaseQuantity}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white font-bold text-lg"
                                aria-label="Увеличить количество"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                +
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {item.info && (
                <ProductInfoModal
                    isOpen={showInfo}
                    onClose={() => setShowInfo(false)}
                    product={{
                        title: item.title,
                        src: item.src,
                        info: item.info
                    }}
                />
            )}
        </div>
    );
}