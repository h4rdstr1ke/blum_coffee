import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Header from "../module/header/header";
import UserInfoSection from "../module/cartpage/UserInfoSection";
import DeliveryTimeSection from "../module/cartpage/DeliveryTimeSection";
import PaymentMethodSection from "../module/cartpage/PaymentMethodSection";
import OrderCommentSection from "../module/cartpage/OrderCommentSection";
import CartItemsSection from "../module/cartpage/CartItemsSection";
import Footer from "../module/footer/footer";

const API_BASE_URL = "http://193.23.219.155:4747/api/v1";

export default function CartPage() {
    const { isEmployee } = useUser();

    if (isEmployee) {
        return <Navigate to="/employee/orders" replace />;
    }
    const {
        items,
        removeFromCart,
        updateQuantity,
        totalPrice,
        clearCart,
        totalItems
    } = useCart();

    const { userData, isLoading } = useUser();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderError, setOrderError] = useState<string | null>(null);
    const [deliveryOption, setDeliveryOption] = useState({
        time: 'asap',
        customTime: '',
        payment: 'cash',
        comment: ''
    });

    const handleSubmitOrder = async () => {
        if (!userData || !userData.phone_number) {
            alert('Необходимо авторизоваться для оформления заказа');
            navigate('/profile');
            return;
        }

        if (items.length === 0) {
            alert('Корзина пуста');
            return;
        }

        setIsSubmitting(true);
        setOrderError(null);

        try {
            // Форматируем дату 
            let completionDateTime;
            const now = new Date();

            if (deliveryOption.time === 'asap') {
                // Для "как можно скорее" используем текущее время
                completionDateTime = now.toISOString().replace('T', ' ').slice(0, 16);
            } else {
                // Для выбранного времени используем текущую дату + выбранное время
                const [hours, minutes] = deliveryOption.customTime.split(':');
                const completionDate = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                    parseInt(hours),
                    parseInt(minutes)
                );

                // Форматируем в нужный форм Y-m-d H:i
                const year = completionDate.getFullYear();
                const month = String(completionDate.getMonth() + 1).padStart(2, '0');
                const day = String(completionDate.getDate()).padStart(2, '0');
                const hoursFormatted = String(completionDate.getHours()).padStart(2, '0');
                const minutesFormatted = String(completionDate.getMinutes()).padStart(2, '0');

                completionDateTime = `${year}-${month}-${day} ${hoursFormatted}:${minutesFormatted}`;
            }

            const orderData = {
                completion_datetime: completionDateTime,
                products: items.map(item => ({
                    id: item.id,
                    quantity: item.quantity
                })),
                comment: deliveryOption.comment || ""
            };

            const response = await fetch(`${API_BASE_URL}/order`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка оформления заказа');
            }

            const result = await response.json();
            console.log('Order created:', result);
            alert(`Заказ #${result.data.id} успешно оформлен!`);
            clearCart();
            navigate('/profile');
        } catch (error) {
            console.error('Order error:', error);
            setOrderError(error instanceof Error ? error.message : 'Неизвестная ошибка');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="">
                <Header />
                <div className="max-w-[1440px] mx-auto p-4">Загрузка...</div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="">
            <Header />

            {/* Временная ссылка для сотрудника */}
            {userData?.is_employee && (
                <div className="max-w-[1440px] mx-auto px-4 pt-4">
                    <Link
                        to="/employee/orders"
                        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Панель заказов
                    </Link>
                </div>
            )}

            <h1 className="text-3xl text-[#39C6FF] font-bold mb-6 mt-4 md:ml-20">Оформление заказа</h1>

            {orderError && (
                <div className="max-w-[1440px] mx-auto px-4">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {orderError}
                    </div>
                </div>
            )}

            <div className="max-w-[1440px] mx-auto">
                <div className="">
                    {userData && <UserInfoSection userData={userData} />}
                    <p className='text-center text-[#39C6FF] text-[34px] mb-6'>
                        Самовывоз: ул. 8 марта, 46 (ТРК Гринвич) 3 этаж
                    </p>
                    <OrderCommentSection
                        deliveryOption={deliveryOption}
                        setDeliveryOption={setDeliveryOption}
                    />
                    <PaymentMethodSection
                        deliveryOption={deliveryOption}
                        setDeliveryOption={setDeliveryOption}
                    />
                    <DeliveryTimeSection
                        deliveryOption={deliveryOption}
                        setDeliveryOption={setDeliveryOption}
                    />
                </div>

                <div className="">
                    <CartItemsSection
                        items={items}
                        totalItems={totalItems}
                        totalPrice={totalPrice}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                        handleSubmitOrder={handleSubmitOrder}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}