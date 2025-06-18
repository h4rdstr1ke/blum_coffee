import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { textStylesHistory } from '../../style/textStyles';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  status: string;
  completion_datetime: string;
  price: number;
  comment: string | null;
  products: OrderItem[];
  created_at: string;
}

export default function History() {
  const { addToCart, clearCart } = useCart();
  const { userData } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem('user_token');
        if (!token || !userData) return;

        const response = await fetch('http://193.23.219.155:4747/api/v1/user-orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Ошибка загрузки заказов');

        const data = await response.json();

        let ordersData: Order[] = [];

        if (Array.isArray(data)) {
          ordersData = data;
        } else if (typeof data === 'object' && data !== null) {

          ordersData = Object.values(data);
        } else {
          throw new Error('Неверный формат данных заказов');
        }

        setOrders(ordersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки заказов');
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [userData]);

  const handleRepeatOrder = (items: OrderItem[]) => {
    if (items.length === 0) return;

    if (confirm(`Добавить ${items.length} товаров в корзину?`)) {
      clearCart();
      items.forEach(item => {
        addToCart({
          id: item.id,
          title: item.name,
          price: item.price,
          src: item.image
        });
      });
      alert('Товары добавлены в корзину!');
    }
  };

  if (loading) {
    return (
      <div className={`${textStylesHistory.body} w-full flex flex-col mt-8 md:mt-[62px] mb-6 md:mb-[50px] p-4 md:p-6`}>
        <h1 className={`${textStylesHistory.h1} mb-6`}>История заказов</h1>
        <p className={`${textStylesHistory.body} text-gray-600`}>Загрузка заказов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${textStylesHistory.body} w-full flex flex-col mt-8 md:mt-[62px] mb-6 md:mb-[50px] p-4 md:p-6`}>
        <h1 className={`${textStylesHistory.h1} mb-6`}>История заказов</h1>
        <p className={`${textStylesHistory.body} text-red-600`}>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={`${textStylesHistory.body} w-full flex flex-col mt-8 md:mt-[62px] mb-6 md:mb-[50px] p-4 md:p-6`}>
        <h1 className={`${textStylesHistory.h1} mb-6`}>История заказов</h1>
        <p className={`${textStylesHistory.body} text-gray-600`}>У вас пока нет завершенных заказов</p>
      </div>
    );
  }

  return (
    <div className={`${textStylesHistory.body} w-full flex flex-col mt-8 md:mt-[62px] mb-6 md:mb-[50px] p-4 md:p-6`}>
      <h1 className={`${textStylesHistory.h1} mb-6`}>История заказов</h1>

      {orders.map((order) => (
        <div key={order.id} className="mb-8 md:mr-8 md:ml-8 md:mb-10 last:mb-0 mt-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4 gap-2 md:gap-0">
            <div>
              <p className={`${textStylesHistory.orderDate}`}>
                Заказ #{order.id} от {new Date(order.created_at).toLocaleDateString('ru-RU')} •
                Статус: <span className={
                  order.status === "Завершен" ? 'text-green-600' :
                    order.status === "Отменен" ? 'text-red-600' :
                      'text-blue-600'
                }>{order.status}</span>
              </p>
              <p className="text-sm text-gray-500">
                Время выполнения: {order.completion_datetime}
              </p>
            </div>
            <p className={`${textStylesHistory.orderTotal} font-bold`}>
              <span>Итого: </span>{order.price}₽
            </p>
          </div>

          <div className="space-y-4">
            {order.products.map((product) => (
              <div
                key={`${order.id}-${product.id}`}
                className="flex flex-col md:flex-row md:justify-between items-stretch md:items-center border p-4 bg-[#7EDAFFDB] bg-opacity-86 rounded-xl text-white gap-4 md:gap-0"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={product.image}
                    className="w-full sm:w-[160px] md:w-[210px] h-auto sm:h-[140px] md:h-[185px] object-cover rounded-lg"
                    alt={product.name}
                  />
                  <p className={`${textStylesHistory.itemName}`}>{product.name}</p>
                </div>
                <div className="flex justify-between sm:justify-end items-center gap-4 md:gap-8">
                  <p className={`${textStylesHistory.itemQuantity}`}>{product.quantity} шт.</p>
                  <p className={`${textStylesHistory.itemPrice}`}>{product.price}₽</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleRepeatOrder(order.products)}
              className={`${textStylesHistory.buttonPrimary} bg-white rounded-xl w-full md:w-[370px] h-14 md:h-[70px] hover:bg-gray-100 transition-colors`}
            >
              Повторить заказ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}