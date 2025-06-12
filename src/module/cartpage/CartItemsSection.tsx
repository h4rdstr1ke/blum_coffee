import { Link } from 'react-router-dom';
import { cartStyles } from '../../style/textStyles';

export default function CartItemsSection({
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    handleSubmitOrder
}: any) {
    return (
        <div className={cartStyles.cartContainer}>
            <h2 className={cartStyles.sectionTitle}>Ваш заказ ({totalItems} шт.)</h2>
            {items.length === 0 ? (
                <p className={cartStyles.emptyCartText}>Корзина пуста</p>
            ) : (
                <>
                    {items.map((item: any) => (
                        <div key={item.id} className={cartStyles.cartItem}>
                            <div className={cartStyles.itemContainer}>
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className={cartStyles.itemImage}
                                />
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <div className={cartStyles.quantityControls}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className={cartStyles.quantityButton}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className={cartStyles.quantityButton}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold">{item.price * item.quantity}₽</p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className={cartStyles.removeButton}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className={cartStyles.totalContainer}>
                        <span>Итого:</span>
                        <span>{totalPrice}₽</span>
                    </div>

                    <button
                        onClick={handleSubmitOrder}
                        disabled={items.length === 0}
                        className={`${cartStyles.submitButton} ${items.length === 0
                            ? cartStyles.disabledButton
                            : cartStyles.activeButton
                            }`}
                    >
                        Оформить заказ
                    </button>

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