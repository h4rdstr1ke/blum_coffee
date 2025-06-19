import { Link } from 'react-router-dom';
import { cartStyles } from '../../style/textStyles';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function CartItemsSection({
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    handleSubmitOrder,
    isSubmitting
}: any) {
    const { clearCart } = useCart();
    const originalError = console.error;
    console.error = (...args) => {
        if (!args.some(arg => arg?.toString()?.includes('result.data is undefined'))) {
            originalError(...args);
        }
    };
    const handleSubmit = async () => {
        try {

            await handleSubmitOrder();
            // После успешного оформления очищаем корзину
            clearCart();
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);

        }
    };
    return (
        <div className={cartStyles.cartContainer}>
            <h2 className={`${cartStyles.sectionTitle} !text-[40px] mb-6`}>Ваш заказ ({totalItems} шт.)</h2>

            <AnimatePresence>
                {items.length === 0 ? (
                    <p className={`${cartStyles.emptyCartText} text-[30px] py-8`}>
                        Корзина пуста
                    </p>
                ) : (
                    <div className="space-y-6">
                        {items.map((item: any) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`${cartStyles.cartItem} !p-6 !rounded-[30px] flex flex-col md:flex-row items-stretch gap-6`}
                            >
                                {/* Блок изображения и названия */}
                                <div className="flex items-center gap-6 flex-1 min-w-0">
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-[50%] h-[50%] md:w-[180px] h-auto md:h-[160px] object-cover rounded-[20px]"
                                    />
                                    <div className="w-full text-center md:text-left">
                                        <p className={`${cartStyles.itemTitle} !text-[30px] leading-tight`}>
                                            {item.title}
                                        </p>
                                    </div>
                                </div>

                                {/* Центральный переключатель (только на ПК) */}
                                <div className="hidden md:flex items-center justify-end flex-1">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={item.id}
                                            className="flex items-center justify-center space-x-4 bg-[#39C6FF] rounded-[20px] px-6 py-3 mr-4"
                                        >
                                            <motion.button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white font-bold text-[28px]"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                -
                                            </motion.button>

                                            <motion.span
                                                key={item.quantity}
                                                className="min-w-[40px] text-center font-bold text-white text-[28px]"
                                            >
                                                {item.quantity}
                                            </motion.span>

                                            <motion.button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white font-bold text-[28px]"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                +
                                            </motion.button>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Мобильный блок: переключатель, цена и удаление */}
                                <div className="md:hidden flex flex-col gap-4 w-full">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-4 bg-[#39C6FF] rounded-[20px] px-4 py-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white font-bold text-[24px]"
                                            >
                                                -
                                            </button>
                                            <span className="min-w-[30px] text-center font-bold text-white text-[24px]">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white font-bold text-[24px]"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className={`${cartStyles.itemPrice} !text-[28px]`}>
                                            {item.price * item.quantity}₽
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 text-[20px] transition-colors self-end"
                                    >
                                        Удалить
                                    </button>
                                </div>

                                {/* ПК блок: цена и удаление */}
                                <div className="hidden md:flex flex-col items-end justify-between flex-1">
                                    <p className={`${cartStyles.itemPrice} !text-[30px]`}>
                                        {item.price * item.quantity}₽
                                    </p>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 text-[20px] transition-colors"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        {/* Итого и кнопки */}
                        <div className="border-t border-[#39C6FF] pt-6 mt-6">
                            <div className={`${cartStyles.totalContainer} !text-[36px] mb-8`}>
                                <span>Итого:</span>&nbsp;
                                <span>{totalPrice}₽</span>
                            </div>

                            <div className="flex flex-col items-end space-y-6">
                                <motion.button
                                    onClick={handleSubmit}
                                    disabled={items.length === 0 || isSubmitting}
                                    className={`${cartStyles.submitButton} ${items.length === 0 || isSubmitting
                                        ? cartStyles.disabledButton
                                        : cartStyles.activeButton
                                        } !text-[24px] px-1 py-1 min-w-[250px] text-center`}
                                    whileHover={{ scale: items.length === 0 || isSubmitting ? 1 : 1.04 }}
                                    whileTap={{ scale: items.length === 0 || isSubmitting ? 1 : 0.97 }}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <motion.span
                                                className="inline-block w-5 h-5 border-3 border-white border-t-transparent rounded-full mr-2"
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                            />
                                            Оформление...
                                        </span>
                                    ) : (
                                        'Оформить заказ'
                                    )}
                                </motion.button>
                            </div>
                            <Link
                                to="/shop"
                                className="
                                            text-[#39C6FF] 
                                            text-[28px] 
                                            transition-colors 
                                            flex 
                                            items-center 
                                            w-[300px]
                                            relative
                                            pb-1
                                            group
                                            mt-10
                                        "
                            >
                                ← Вернуться в магазин
                                <span className="
                                        absolute 
                                        bottom-0 
                                        left-0 
                                        h-[2px] 
                                        bg-[#39C6FF] 
                                        w-0 
                                        transition-all 
                                        duration-300
                                        group-hover:w-full
                                    "></span>
                            </Link>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}