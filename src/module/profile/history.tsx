import { useCart } from '../../context/CartContext';
import { Order } from '../../types/index';
import { menuData } from '../../mockData/menuMock';
import { textStylesHistory } from '../../style/textStyles';

interface HistoryProps {
  orders: Order[];
}

export default function History({ orders }: HistoryProps) {
  const { addToCart, clearCart } = useCart();

  const findCurrentProduct = (id: number) => {
    for (const category of menuData) {
      const product = category.items.find(item => item.id === id);
      if (product) return product;
    }
    return null;
  };

  const handleRepeatOrder = (items: Order['items']) => {
    if (items.length === 0) return;

    if (confirm(`Добавить ${items.length} товаров в корзину?`)) {
      clearCart();
      items.forEach(item => {
        const currentProduct = findCurrentProduct(item.id);
        if (currentProduct) {
          addToCart({
            id: currentProduct.id,
            title: currentProduct.title,
            price: currentProduct.price,
            src: currentProduct.src
          });
        }
      });
      alert('Товары добавлены в корзину!');
    }
  };

  const calculateOrderTotal = (items: Order['items']) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

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
            <p className={`${textStylesHistory.orderDate}`}>Заказ от: {order.date}</p>
            <p className={`${textStylesHistory.orderTotal} font-bold`}>
              <span>Итого: </span>{calculateOrderTotal(order.items)}₽
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
                  <p className={`${textStylesHistory.itemName}`}>{item.name}</p>
                </div>
                <div className="flex justify-between sm:justify-end items-center gap-4 md:gap-8">
                  <p className={`${textStylesHistory.itemQuantity}`}>{item.quantity} шт.</p>
                  <p className={`${textStylesHistory.itemPrice}`}>{item.price}₽</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleRepeatOrder(order.items)}
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