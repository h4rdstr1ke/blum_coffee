import { Link } from 'react-router-dom';
import { cartStyles } from '../../style/textStyles';

export default function CartItemsSection({
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    handleSubmitOrder,
    isSubmitting
}: any) {
    return (
        <div className={cartStyles.cartContainer}>
            <h2 className={cartStyles.sectionTitle}>Ваш заказ ({totalItems} шт.)</h2>
            {items.length === 0 ? (
                <p className={cartStyles.emptyCartText}>Корзина пуста</p>
            ) : (
                <>
                    {items.map((item: any) => (
                        <div key={item.id} className={`${cartStyles.cartItem} flex flex-col md:flex-row md:justify-between md:items-center gap-4`}>
                            {/* Левая часть - изображение и название */}
                            <div className="flex items-center gap-4 w-full md:flex-1">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className={`${cartStyles.itemImage} flex-shrink-0`}
                                />
                                <div className="flex flex-col">
                                    <p className={cartStyles.itemTitle}>{item.title}</p>
                                    {/* Мобильная версия цены */}
                                    <p className={`${cartStyles.itemPrice} md:hidden`}>
                                        {item.price * item.quantity}₽
                                    </p>
                                </div>
                            </div>

                            {/* Центральная часть - управление количеством */}
                            <div className="flex justify-between items-center md:flex-1 md:justify-center">
                                <div className={cartStyles.quantityControls}>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className={cartStyles.quantityButton}
                                    >
                                        -
                                    </button>
                                    <span className={cartStyles.quantityValue}>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className={cartStyles.quantityButton}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Правая часть - цена и кнопка удаления (скрыта на мобильных) */}
                            <div className="hidden md:flex md:flex-1 md:justify-end md:items-center md:gap-4">
                                <p className={cartStyles.itemPrice}>{item.price * item.quantity}₽</p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className={cartStyles.removeButton}
                                >
                                    Удалить
                                </button>
                            </div>

                            {/* Кнопка удаления для мобильной версии */}
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="md:hidden text-red-500 text-sm self-end"
                            >
                                Удалить
                            </button>
                        </div>
                    ))}

                    <div className={cartStyles.totalContainer}>
                        <span>Итого:</span>&nbsp;<span>{totalPrice}₽</span>
                    </div>
                    <div className='border flex justify-end'>
                        <button
                            onClick={handleSubmitOrder}
                            disabled={items.length === 0 || isSubmitting}
                            className={`${cartStyles.submitButton} ${items.length === 0 || isSubmitting
                                    ? cartStyles.disabledButton
                                    : cartStyles.activeButton
                                }`}
                        >
                            {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
                        </button>
                    </div>
                    {items.length > 0 && (
                        <Link
                            to="/shop"
                            className={cartStyles.backLink}
                        >
                            ← Вернуться к покупкам
                        </Link>
                    )}
                </>
            )}
        </div>
    );
}