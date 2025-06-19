import { textStylesDelivery } from '../../style/textStyles';

export default function Delivery() {
  return (
    <div className={textStylesDelivery.container}>
      <div className={textStylesDelivery.innerContainer}>
        {/* Левый блок - сервисы доставки */}
        <div className={textStylesDelivery.deliveryContainer}>
          {/* Мобильная версия - горизонтальное расположение */}
          <div className="md:hidden flex flex-col items-start w-full pl-4 pr-4">
            {/* Яндекс Еда - смещен влево */}
            <div className="self-start ml-[-10px] mb-4">
              <a
                href="https://eda.yandex.ru/ekaterinburg/r/fluffy_fluffy?ysclid=m24p9it2bk601069110"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-[250px]"
              >
                <img
                  src="/image/yandex_mobile.svg"
                  alt="Yandex Eats"
                  className="w-full h-auto"
                />
              </a>
            </div>

            {/* Маркет Деливери - смещен вправо */}
            <div className="self-end mr-[-10px]">
              <a
                href="https://market-delivery.yandex.ru/moscow/r/fluffy_fluffy"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-[250px]"
              >
                <img
                  src="/image/delivery_mobile.svg"
                  alt="Market Delivery"
                  className="w-full h-auto"
                />
              </a>
            </div>
          </div>

          {/* Десктопная версия */}
          <div className="hidden md:flex md:flex-col md:items-center">
            <a
              href="https://eda.yandex.ru/ekaterinburg/r/fluffy_fluffy?ysclid=m24p9it2bk601069110"
              target="_blank"
              rel="noopener noreferrer"
              className="md:order-2 mb-4"
            >
              <img
                src="/image/yandex.svg"
                alt="Yandex Eats"
                className={textStylesDelivery.desktopServiceImage}
              />
            </a>
            <a
              href="https://market-delivery.yandex.ru/moscow/r/fluffy_fluffy"
              target="_blank"
              rel="noopener noreferrer"
              className="md:order-1"
            >
              <img
                src="/image/delivery.svg"
                alt="Market Delivery"
                className={textStylesDelivery.desktopServiceImage}
              />
            </a>
          </div>
        </div>

        {/* Правый блок - вкус и текст */}
        <div className={textStylesDelivery.textContainer}>

          <div className={textStylesDelivery.mobileText}>
            <p className={textStylesDelivery.mobileTextContent}>
              Заказывай тот самый вкус<br />
              в привычных приложениях!
            </p>
          </div>
          <div className={textStylesDelivery.mobileTasteImage}>
            <img
              src="/image/taste_mobile.svg"
              alt="Вкусные блюда"
              className="w-full"
            />
          </div>
          <img
            src="/image/taste.svg"
            alt="Вкусные блюда"
            className={textStylesDelivery.desktopTasteImage}
          />
          <div className={textStylesDelivery.desktopText}>
            <p className={textStylesDelivery.desktopTextContent}>
              Заказывай тот самый вкус<br />
              в привычных приложениях!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}