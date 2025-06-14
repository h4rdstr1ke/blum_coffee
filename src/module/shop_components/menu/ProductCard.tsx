import { useState } from 'react';
import { ProductInfoModal } from './ProductInfoModal';
import { useCart } from '../../../context/CartContext';
import { motion } from 'framer-motion';
import { Product } from '../../../types/index';
import { textStylesShop } from '../../../style/textStyles';

export default function ProductCard({ item }: { item: Product }) {
    const [showInfo, setShowInfo] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(item);
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

                <button
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
                </button>
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