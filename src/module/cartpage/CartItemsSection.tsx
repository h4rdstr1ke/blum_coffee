import { Link } from 'react-router-dom';

export default function CartItemsSection({
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    handleSubmitOrder
}: any) {
    return (
        <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-4">Ваш заказ ({totalItems} шт.)</h2>
            {items.length === 0 ? (
                <p className="py-4 text-center">Корзина пуста</p>
            ) : (
                <>
                    {items.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center border-b py-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-6 h-6 flex items-center justify-center border rounded"
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-6 h-6 flex items-center justify-center border rounded"
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
                                    className="text-red-500 text-sm"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                        <span>Итого:</span>
                        <span>{totalPrice}₽</span>
                    </div>

                    <button
                        onClick={handleSubmitOrder}
                        disabled={items.length === 0}
                        className={`w-full py-3 rounded-lg font-bold ${items.length === 0
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-[#39C6FF] text-white hover:bg-[#2fb0e6]'
                            }`}
                    >
                        Оформить заказ
                    </button>

                    {items.length > 0 && (
                        <Link
                            to="/shop"
                            className="block text-center text-[#39C6FF] hover:underline mt-2"
                        >
                            ← Вернуться к покупкам
                        </Link>
                    )}
                </>
            )}
        </div>
    );
}