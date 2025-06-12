import { motion, AnimatePresence } from 'framer-motion';
import { cartStyles } from '../../style/textStyles';

export default function DeliveryTimeSection({ deliveryOption, setDeliveryOption }: any) {
    return (
        <div className={cartStyles.userInfoContainer}>
            <h2 className={cartStyles.sectionTitle}>Время получения</h2>
            <div className="flex flex-col gap-2">
                {/* Вариант "Как можно скорее" */}
                <motion.label
                    className={`${cartStyles.timeOptionBase} w-full max-w-[400px] ${deliveryOption.time === 'asap'
                        ? cartStyles.timeOptionActive
                        : cartStyles.timeOptionInactive
                        }`}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <input
                        type="radio"
                        name="deliveryTime"
                        checked={deliveryOption.time === 'asap'}
                        onChange={() => setDeliveryOption({ ...deliveryOption, time: 'asap' })}
                        className="hidden"
                    />
                    <span className="block w-full text-center ">
                        Как можно скорее
                    </span>
                </motion.label>

                {/* Вариант "К определенному времени" */}
                <div className="flex flex-col md:flex-row gap-3">
                    <motion.label
                        className={`${cartStyles.timeOptionBase} w-full max-w-[400px]  ${deliveryOption.time === 'later'
                            ? cartStyles.timeOptionActive
                            : cartStyles.timeOptionInactive
                            }`}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <input
                            type="radio"
                            name="deliveryTime"
                            checked={deliveryOption.time === 'later'}
                            onChange={() => setDeliveryOption({ ...deliveryOption, time: 'later' })}
                            className="hidden"
                        />
                        <span className="block w-full text-center">
                            К определенному времени
                        </span>
                    </motion.label>

                    <AnimatePresence>
                        {deliveryOption.time === 'later' && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-[300px] md:w-auto"
                            >
                                <input
                                    type="time"
                                    value={deliveryOption.customTime}
                                    onChange={(e) => setDeliveryOption({ ...deliveryOption, customTime: e.target.value })}
                                    className={`
                                        ${cartStyles.timeInput} 

                                    `}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}