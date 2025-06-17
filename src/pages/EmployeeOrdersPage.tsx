import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../module/header/header";
import Footer from "../module/footer/footer";
import { cartStyles } from '../style/textStyles';

interface OrderItem {
    product_id: number;
    product_quantity: number;
    product_name: string;
    product_price: number;
}

interface Order {
    id: number;
    user_id: number;
    status_id: number;
    status_name: string;
    completion_datetime: string;
    price: string;
    user_name: string;
    user_phone: string;
    items: OrderItem[];
}

const EMPLOYEE_TOKEN = "9|Ro2IuxHgf38lrKz1qvPwjbOok1AdmLDH65E5OFtaa9a15bce";
const API_BASE_URL = "http://193.23.219.155:4747/api/v1";

export default function EmployeeOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/order`, {
                headers: {
                    'Authorization': `Bearer ${EMPLOYEE_TOKEN}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Ошибка загрузки заказов');
            const data = await response.json();
            setOrders(data.data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка сервера');
        } finally {
            setIsLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: number, action: 'complete' | 'cancel') => {
        try {
            const endpoint = action === 'complete' ? 'order-complete' : 'order-cancel';
            const response = await fetch(`${API_BASE_URL}/${endpoint}/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${EMPLOYEE_TOKEN}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error(`Не удалось ${action === 'complete' ? 'завершить' : 'отменить'} заказ`);
            await fetchOrders();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка обновления');
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    return (
        <div className="">
            <Header />
            <div className="max-w-[1440px] mx-auto p-4">
                <h1 className="text-3xl text-[#39C6FF] font-bold mb-6">Панель управления заказами</h1>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

                {isLoading ? (
                    <p>Загрузка заказов...</p>
                ) : orders.length === 0 ? (
                    <p>Нет активных заказов</p>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="border rounded-lg p-4 shadow-sm">
                                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-bold">Заказ #{order.id}</h2>
                                        <p>Статус: <span className={
                                            order.status_id === 1 ? 'text-blue-600' :
                                                order.status_id === 2 ? 'text-green-600' :
                                                    'text-red-600'
                                        }>{order.status_name}</span></p>
                                        <p>Клиент: {order.user_name}</p>
                                        <p>Телефон: {order.user_phone}</p>
                                        <p>Время: {new Date(order.completion_datetime).toLocaleString()}</p>
                                        <p>Сумма: {order.price}₽</p>
                                    </div>

                                    {order.status_id === 1 && (
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => updateOrderStatus(order.id, 'complete')}
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                            >
                                                Завершить
                                            </button>
                                            <button
                                                onClick={() => updateOrderStatus(order.id, 'cancel')}
                                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Отменить
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 border-t pt-4">
                                    <h3 className="font-bold mb-2">Состав:</h3>
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex justify-between py-1">
                                            <span>{item.product_name} × {item.product_quantity}</span>
                                            <span>{item.product_price * item.product_quantity}₽</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}