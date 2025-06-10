import { useCart } from '../../context/CartContext';
import { Order } from '../../types/index';

export default function History({ orders }: { orders: Order[] }) {
  const { addToCart, clearCart } = useCart();

  const handleRepeatOrder = (items: Order['items']) => {
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

  return (
    <div className="w-full flex flex-col mt-8 md:mt-[62px] mb-6 md:mb-[50px] p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6">История заказов</h1>

      {orders.map((order) => (
        <div key={order.id} className="mb-8 md:mr-8 md:ml-8 md:mb-10 last:mb-0 mt-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4 gap-2 md:gap-0">
            <p className="text-gray-600">Заказ от: {order.date}</p>
            <p className="font-bold">
              <span>Итого: </span>{order.total}₽
            </p>
          </div>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={`${order.id}-${item.id}`}
                className="flex flex-col md:flex-row md:justify-between items-stretch md:items-center border p-4 bg-[#7EDAFFDB] bg-opacity-86 rounded-xl text-white gap-4 md:gap-0"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={item.image}
                    className="w-full sm:w-[160px] md:w-[210px] h-auto sm:h-[140px] md:h-[185px] object-cover rounded-lg"
                    alt={item.name}
                  />
                  <p className="font-medium">{item.name}</p>
                </div>
                <div className="flex justify-between sm:justify-end items-center gap-4 md:gap-8">
                  <p>{item.quantity} шт.</p>
                  <p className="font-bold">{item.price}₽</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleRepeatOrder(order.items)}
              className="bg-[#7EDAFFDB] rounded-xl w-full md:w-[370px] h-14 md:h-[70px] text-white hover:bg-[#6ec9ff] transition-colors"
            >
              Повторить заказ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}