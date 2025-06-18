import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from "../module/header/header";
import Footer from "../module/footer/footer";
import { cartStyles } from '../style/textStyles';

const API_BASE_URL = "http://193.23.219.155:4747/api/v1";

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface Order {
    id: number;
    status: string;
    completion_datetime: string;
    price: number;
    comment: string | null;
    products: Product[];
    created_at: string;
}

export default function EmployeeOrdersPage() {
    const { isEmployee } = useUser();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isEmployee) {
            navigate('/login');
        } else {
            fetchOrders();
        }
    }, [isEmployee, navigate]);

    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('employee_token');
            if (!token) throw new Error('Токен не найден');

            const response = await fetch(`${API_BASE_URL}/order`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Ошибка загрузки заказов');

            const data = await response.json();

            // Преобразуем данные в массив, если это необходимо
            const ordersData = Array.isArray(data) ? data : Object.values(data);
            setOrders(ordersData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка сервера');
        } finally {
            setIsLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: number, action: 'complete' | 'cancel') => {
        try {
            const token = localStorage.getItem('employee_token');
            if (!token) throw new Error('Токен не найден');

            const endpoint = action === 'complete' ? 'order-complete' : 'order-cancel';
            const response = await fetch(`${API_BASE_URL}/${endpoint}/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Не удалось ${action === 'complete' ? 'завершить' : 'отменить'} заказ`);
            }

            await fetchOrders();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка обновления');
        }
    };

    if (!isEmployee) {
        return null;
    }

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
                                            order.status === "Готовится" ? 'text-blue-600' :
                                                order.status === "Завершен" ? 'text-green-600' :
                                                    'text-red-600'
                                        }>{order.status}</span></p>
                                        <p>Время выполнения: {order.completion_datetime}</p>
                                        <p>Сумма: {order.price}₽</p>
                                        {order.comment && <p>Комментарий: {order.comment}</p>}
                                        <p>Дата создания: {new Date(order.created_at).toLocaleString()}</p>
                                    </div>

                                    {order.status === "Готовится" && (
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
                                    <h3 className="font-bold mb-2">Состав заказа:</h3>
                                    {order.products.map((product, i) => (
                                        <div key={i} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                            <div className="flex items-center gap-3">
                                                {product.image && (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                )}
                                                <span>{product.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="block">× {product.quantity}</span>
                                                <span className="font-bold">
                                                    {product.price * product.quantity}₽
                                                </span>
                                            </div>
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