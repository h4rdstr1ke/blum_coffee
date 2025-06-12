import { motion } from 'framer-motion';
import { cartStyles } from '../../style/textStyles';

export default function PaymentMethodSection({ deliveryOption, setDeliveryOption }: any) {
    return (
        <div className={cartStyles.userInfoContainer}>
            <h2 className={cartStyles.sectionTitle}>Способ оплаты</h2>
            <div className="flex flex-col gap-2 max-w-[300px]">
                {/* Вариант "При получении" */}
                <motion.label
                    className={`${cartStyles.paymentOptionBase} ${deliveryOption.payment === 'cash'
                        ? cartStyles.paymentOptionActive
                        : cartStyles.paymentOptionInactive
                        }`}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={deliveryOption.payment === 'cash'}
                        onChange={() => setDeliveryOption({ ...deliveryOption, payment: 'cash' })}
                        className="hidden"
                    />
                    <motion.span
                        className="block w-full text-center"
                        initial={false}
                        animate={{
                            color: deliveryOption.payment === 'cash' ? '#FFFFFF' : '#FFFFFF'
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        При получении
                    </motion.span>
                </motion.label>

                {/* Вариант "Картой онлайн" */}
                <motion.label
                    className={`${cartStyles.paymentOptionBase} ${deliveryOption.payment === 'card'
                        ? cartStyles.paymentOptionActive
                        : cartStyles.paymentOptionInactive
                        }`}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={deliveryOption.payment === 'card'}
                        onChange={() => setDeliveryOption({ ...deliveryOption, payment: 'card' })}
                        className="hidden"
                    />
                    <motion.span
                        className="block w-full text-center"
                        initial={false}
                        animate={{
                            color: deliveryOption.payment === 'card' ? '#FFFFFF' : '#FFFFFF'
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        Картой онлайн
                    </motion.span>
                </motion.label>
            </div>
        </div>
    );
}