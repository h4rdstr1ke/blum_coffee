import { cartStyles } from '../../style/textStyles';

export default function PaymentMethodSection({ deliveryOption }: any) {
    return (
        <div className={cartStyles.userInfoContainer}>
            <h2 className={cartStyles.sectionTitle}>Способ оплаты</h2>
            <div className="flex flex-col gap-2 max-w-[300px]">
                {/* Вариант "При получении" - полностью неактивный */}
                <div
                    className={`${cartStyles.paymentOptionBase} ${deliveryOption.payment === 'cash'
                        ? cartStyles.paymentOptionActive
                        : cartStyles.paymentOptionInactive
                        } opacity-80 cursor-default`}
                >
                    <span className="block w-full text-center text-white">
                        При получении
                    </span>
                </div>

                {/* Вариант "Картой онлайн" - полностью неактивный */}
                <div
                    className={`${cartStyles.paymentOptionBase} ${deliveryOption.payment === 'card'
                        ? cartStyles.paymentOptionActive
                        : cartStyles.paymentOptionInactive
                        } opacity-80 cursor-default`}
                >
                    <span className="block w-full text-center text-white">
                        Картой онлайн
                    </span>
                </div>

                {/* Подпись о недоступности */}
                <p className="text-[#39C6FF] text-center mt-2 text-sm">
                    Выбор способа оплаты временно недоступен
                </p>
            </div>
        </div>
    );
}
