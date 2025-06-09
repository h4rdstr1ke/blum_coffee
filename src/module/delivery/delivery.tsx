import { textStylesDelivery } from '../../style/textStyles';

export default function Delivery() {
  return (
    <div className={textStylesDelivery.container}>
      <div className={textStylesDelivery.innerContainer}>
        {/* Левый блок - сервисы доставки */}
        <div className={textStylesDelivery.deliveryContainer}>
          {/* Yandex (мобильная версия) */}
          <div className={textStylesDelivery.mobileServiceContainer}>
            <img
              src="/image/yandex_mobile.svg"
              alt="Yandex Eats"
              className={textStylesDelivery.mobileServiceImage}
            />
          </div>

          {/* Delivery (мобильная версия) */}
          <div className={`${textStylesDelivery.mobileServiceContainer} justify-end pr-2`}>
            <img
              src="/image/delivery_mobile.svg"
              alt="Delivery Club"
              className={textStylesDelivery.mobileServiceImage}
            />
          </div>

          {/* Десктопные версии */}
          <img
            src="/image/yandex.svg"
            alt="Yandex Eats"
            className={`${textStylesDelivery.desktopServiceImage} md:order-2`}
          />
          <img
            src="/image/delivery.svg"
            alt="Delivery Club"
            className={`${textStylesDelivery.desktopServiceImage} md:order-1`}
          />
        </div>

        {/* Правый блок - вкус и текст */}
        <div className={textStylesDelivery.textContainer}>
          {/* Текст (мобильная версия) */}
          <div className={textStylesDelivery.mobileText}>
            <p className={textStylesDelivery.mobileTextContent}>
              Заказывай тот самый вкус<br />
              в привычных приложениях!
            </p>
          </div>

          {/* Taste (мобильная версия) */}
          <div className={textStylesDelivery.mobileTasteImage}>
            <img
              src="/image/taste_mobile.svg"
              alt="Вкусные блюда"
              className="w-full"
            />
          </div>

          {/* Десктопные версии */}
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