import { useState } from 'react';
import { ProductInfoModal } from './ProductInfoModal';
import { useCart } from '../../../context/CartContext';
import { motion } from 'framer-motion';
import { Product } from '../../../types/index';

export default function ProductCard({ item }: { item: Product }) {
    const [showInfo, setShowInfo] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(item);
    };

    return (
        <div className="flex bg-[#7EDAFFD9] rounded-[20px] md:rounded-[30px] p-4 md:p-4 h-[400px] md:h-[450px] flex-col w-full max-w-[300px] mx-auto relative">
            <div className="w-full h-[200px] md:h-[250px] rounded-[26px] overflow-hidden mb-3 md:mb-1 bg-white relative">
                <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                {item.info && (
                    <button
                        onClick={() => setShowInfo(true)}
                        className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center z-10 bg-white border border-gray-300 rounded-full shadow-sm"
                        aria-label="Показать информацию"
                    >
                        <img src="/image/info_icon.png" alt="Информация" className="w-5 h-5" />
                    </button>
                )}
            </div>

            <h3 className="text-xl font-bold mb-1 md:mb-2">{item.title}</h3>

            <div className="mt-auto w-full relative flex flex-col items-center">
                <p className="absolute -top-5 md:-top-8 right-4 md:right-6 text-lg font-bold">
                    {item.price}₽
                </p>

                <button
                    onClick={handleAddToCart}
                    className="bg-[#39C6FF] py-1 md:py-1 px-4 md:px-6 rounded-lg md:rounded-xl flex"
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