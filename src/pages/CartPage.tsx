import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
    const {
        items,
        removeFromCart,
        updateQuantity,
        totalPrice,
        clearCart,
        totalItems
    } = useCart();

    const { userData } = useUser();
    const [deliveryOption, setDeliveryOption] = useState({
        time: 'asap' as 'asap' | 'custom',
        customTime: '',
        payment: 'cash' as 'cash' | 'card',
        comment: ''
    });

    const handleSubmitOrder = () => {
        const orderData = {
            user: userData,
            items,
            total: totalPrice,
            delivery: deliveryOption,
            date: new Date().toLocaleDateString()
        };

        console.log('Order submitted:', orderData);
        alert(`Заказ на сумму ${totalPrice}₽ оформлен!`);
        clearCart();
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Оформление заказа</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Левая колонка - данные покупателя и опции доставки */}
                <div className="md:col-span-2 space-y-6">
                    {/* Блок с данными покупателя */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Данные покупателя</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Имя</label>
                                <input
                                    type="text"
                                    value={userData.first_name}
                                    readOnly
                                    className="w-full p-2 border rounded bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Фамилия</label>
                                <input
                                    type="text"
                                    value={userData.last_name}
                                    readOnly
                                    className="w-full p-2 border rounded bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={userData.email}
                                    readOnly
                                    className="w-full p-2 border rounded bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Телефон</label>
                                <input
                                    type="tel"
                                    value={userData.phone_number}
                                    readOnly
                                    className="w-full p-2 border rounded bg-gray-100"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700 mb-1">Комментарий к заказу</label>
                            <textarea
                                value={deliveryOption.comment}
                                onChange={(e) => setDeliveryOption({ ...deliveryOption, comment: e.target.value })}
                                className="w-full p-2 border rounded"
                                rows={3}
                                placeholder="Например, особые пожелания"
                            />
                        </div>
                    </div>

                    {/* Блок с выбором способа оплаты */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Способ оплаты</h2>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="payment"
                                    checked={deliveryOption.payment === 'cash'}
                                    onChange={() => setDeliveryOption({ ...deliveryOption, payment: 'cash' })}
                                    className="h-4 w-4"
                                />
                                <span>При получении</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="payment"
                                    checked={deliveryOption.payment === 'card'}
                                    onChange={() => setDeliveryOption({ ...deliveryOption, payment: 'card' })}
                                    className="h-4 w-4"
                                />
                                <span>Картой онлайн</span>
                            </label>
                        </div>
                    </div>

                    {/* Блок с выбором времени получения */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Время получения</h2>
                        <div className="space-y-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="deliveryTime"
                                    checked={deliveryOption.time === 'asap'}
                                    onChange={() => setDeliveryOption({ ...deliveryOption, time: 'asap' })}
                                    className="h-4 w-4"
                                />
                                <span>Как можно скорее</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="deliveryTime"
                                    checked={deliveryOption.time === 'custom'}
                                    onChange={() => setDeliveryOption({ ...deliveryOption, time: 'custom' })}
                                    className="h-4 w-4"
                                />
                                <span>К определенному времени</span>
                            </label>
                            {deliveryOption.time === 'custom' && (
                                <input
                                    type="time"
                                    value={deliveryOption.customTime}
                                    onChange={(e) => setDeliveryOption({ ...deliveryOption, customTime: e.target.value })}
                                    className="p-2 border rounded"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Правая колонка - корзина */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Ваш заказ ({totalItems} шт.)</h2>
                        {items.length === 0 ? (
                            <p className="py-4 text-center">Корзина пуста</p>
                        ) : (
                            <>
                                {items.map((item) => (
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
                            </>
                        )}
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
                </div>
            </div>
        </div>
    );
}