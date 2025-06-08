import { historyOrdersData } from "../../mockData/historyOrdersData";
import { textStylesHistory } from "../../style/textStyles";

export default function History() {
  return (
    <div className="w-full flex flex-col mt-8 md:mt-[62px] mb-6 md:mb-[50px] p-4 md:p-6">
      {/* Заголовок */}
      <h1 className={textStylesHistory.h1}>
        История заказов
      </h1>

      {/* Список заказов */}
      {historyOrdersData.map((historyorder) => (
        <div key={historyorder.id} className="mb-8 md:mr-8 md:ml-8 md:mb-10 last:mb-0 mt-8">
          {/* Шапка заказа */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4 gap-2 md:gap-0">
            <p className={textStylesHistory.orderDate}>
              Заказ от: {historyorder.date}
            </p>
            <p className={textStylesHistory.orderTotal}>
              <strong>Итого: </strong>{historyorder.total}₽
            </p>
          </div>

          {/* Товары в заказе */}
          <div className="space-y-4">
            {historyorder.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:justify-between items-stretch md:items-center border p-4 bg-[#7EDAFFDB] bg-opacity-86 rounded-xl text-white gap-4 md:gap-0"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={item.image}
                    className="w-full sm:w-[160px] md:w-[210px] h-auto sm:h-[140px] md:h-[185px] object-cover rounded-lg"
                    alt={item.name}
                  />
                  <p className={textStylesHistory.itemName}>
                    {item.name}
                  </p>
                </div>
                <div className="flex justify-between sm:justify-end items-center gap-4 md:gap-8">
                  <p className={textStylesHistory.itemQuantity}>{item.quantity} шт.</p>
                  <p className={textStylesHistory.itemPrice}>{item.price}₽</p>
                </div>
              </div>
            ))}
          </div>

          {/* Кнопка повтора */}
          <div className="flex justify-end mt-4">
            <button className={`${textStylesHistory.buttonPrimary} bg-[#7EDAFFDB] rounded-xl w-full md:w-[370px] h-14 md:h-[70px] text-white hover:bg-[#6ec9ff] transition-colors`}>
              Повторить заказ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}