import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from "../module/header/header";
import Footer from "../module/footer/footer";
import LogoutButton from '../module/logoutButton/logoutButton';
import { textStylesEmployeeOrders } from '../style/textStyles';

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
        <div className="bg-gray-50 min-h-screen pb-12">
            <Header />
            <div className={textStylesEmployeeOrders.pageContainer}>
                <h1 className={textStylesEmployeeOrders.pageTitle}>
                    Панель управления заказами
                </h1>

                {error && (
                    <div className={textStylesEmployeeOrders.errorContainer}>
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <p className={textStylesEmployeeOrders.loadingText}>
                        Загрузка заказов...
                    </p>
                ) : orders.length === 0 ? (
                    <p className={textStylesEmployeeOrders.emptyText}>
                        Нет активных заказов
                    </p>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className={textStylesEmployeeOrders.orderCard}>
                                <div className={textStylesEmployeeOrders.orderHeader}>
                                    <div>
                                        <h2 className={textStylesEmployeeOrders.orderTitle}>
                                            Заказ #{order.id}
                                        </h2>
                                        <div className={textStylesEmployeeOrders.orderMeta}>
                                            <span className={textStylesEmployeeOrders.orderMetaLabel}>Статус:</span>
                                            <span className={textStylesEmployeeOrders.orderStatus(order.status)}>
                                                {order.status}
                                            </span>

                                            <span className={textStylesEmployeeOrders.orderMetaLabel}>Дата создания:</span>
                                            <span className={textStylesEmployeeOrders.orderMetaValue}>
                                                {new Date(order.created_at).toLocaleString()}
                                            </span>

                                            <span className={textStylesEmployeeOrders.orderMetaLabel}>Заказ заказан на:</span>
                                            <span className={textStylesEmployeeOrders.orderMetaValue}>
                                                {new Date(order.completion_datetime).toLocaleString()}
                                            </span>
                                        </div>
                                        {order.comment && (
                                            <p className={textStylesEmployeeOrders.orderComment}>
                                                Комментарий: {order.comment}
                                            </p>
                                        )}
                                    </div>

                                    {order.status === "Готовится" && (
                                        <div className={textStylesEmployeeOrders.actionButtons}>
                                            <button
                                                onClick={() => updateOrderStatus(order.id, 'complete')}
                                                className={textStylesEmployeeOrders.completeButton}
                                            >
                                                <CheckIcon className="w-5 h-5" />
                                                Завершить
                                            </button>
                                            <button
                                                onClick={() => updateOrderStatus(order.id, 'cancel')}
                                                className={textStylesEmployeeOrders.cancelButton}
                                            >
                                                <XIcon className="w-5 h-5" />
                                                Отменить
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className={textStylesEmployeeOrders.orderItems}>
                                    <h3 className={textStylesEmployeeOrders.itemsTitle}>
                                        Состав заказа
                                    </h3>

                                    <div className={textStylesEmployeeOrders.itemsHeader}>
                                        <div className="col-span-7 md:col-span-6">Товар</div>
                                        <div className="col-span-2 text-center">Кол-во</div>
                                        <div className="col-span-3 text-right">Цена</div>
                                    </div>

                                    {order.products.map((product, i) => (
                                        <div key={i} className={textStylesEmployeeOrders.itemContainer}>
                                            <div className="col-span-1">
                                                {product.image && (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className={textStylesEmployeeOrders.itemImage}
                                                    />
                                                )}
                                            </div>
                                            <div className={textStylesEmployeeOrders.itemName}>
                                                {product.name}
                                            </div>
                                            <div className={textStylesEmployeeOrders.itemQuantity}>
                                                × {product.quantity}
                                            </div>
                                            <div className={textStylesEmployeeOrders.itemPrice}>
                                                {product.price}₽
                                            </div>
                                        </div>
                                    ))}

                                    <div className={textStylesEmployeeOrders.orderTotal}>
                                        <span className={textStylesEmployeeOrders.totalLabel}>
                                            Итого:
                                        </span>
                                        <span className={textStylesEmployeeOrders.totalPrice}>
                                            {order.price}₽
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className={textStylesEmployeeOrders.logoutButton}>
                    <LogoutButton className="px-6 py-3 forma-textBold" />
                </div>
            </div>
            <Footer />
        </div>
    );
    // Иконки для кнопок 
    function CheckIcon({ className }: { className?: string }) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
        )
    }

    function XIcon({ className }: { className?: string }) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        )
    }

}