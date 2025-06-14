import { FC } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { textStylesShop } from "../../../style/textStyles";

type ProductInfo = {
    weight: string;
    composition: string[];
    calories: string;
    proteins: string;
    fats: string;
    carbs: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    product: {
        title: string;
        src: string;
        info: ProductInfo;
    };
};


export const ProductInfoModal: FC<Props> = ({ isOpen, onClose, product }) => {
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Полупрозрачный фон с размытием */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={textStylesShop.productInfoModal.overlay}
                        onClick={onClose}
                    />

                    {/* Контент модалки */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className={textStylesShop.productInfoModal.modalContainer}
                    >
                        {/* Кнопка закрытия */}
                        <button
                            onClick={onClose}
                            className={textStylesShop.productInfoModal.closeButton}
                            aria-label="Закрыть"
                        >
                            ×
                        </button>

                        <div className={textStylesShop.productInfoModal.contentContainer}>
                            {/* Верхняя часть: изображение + описание */}
                            <div className={textStylesShop.productInfoModal.topSection}>
                                {/* Изображение */}
                                <div className={textStylesShop.productInfoModal.imageContainer}>
                                    <img
                                        src={product.src}
                                        alt={product.title}
                                        className={textStylesShop.productInfoModal.image}
                                    />
                                </div>

                                {/* Описание */}
                                <div className={textStylesShop.productInfoModal.descriptionContainer}>
                                    <h3 className={textStylesShop.modalTitle}>{product.title}</h3>

                                    <p className={textStylesShop.modalText}>
                                        <span className={textStylesShop.productInfoModal.modalLabel}>Вес:</span> {product.info.weight}
                                    </p>

                                    <div>
                                        <h4 className={textStylesShop.productInfoModal.modalLabel}>Состав:</h4>
                                        <ul className={textStylesShop.productInfoModal.compositionList}>
                                            {product.info.composition.map((ingredient, index) => (
                                                <li key={index} className=" ">{ingredient}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Нижняя часть: пищевая ценность */}
                            <div className={textStylesShop.productInfoModal.nutritionSection}>
                                <h4 className={textStylesShop.productInfoModal.modalLabel}>Пищевая ценность на 100 г:</h4>
                                <div className={textStylesShop.productInfoModal.nutritionGrid}>
                                    <div className={textStylesShop.productInfoModal.nutritionItem}>
                                        <p className={textStylesShop.modalValue}>{product.info.calories}</p>
                                        <p className={textStylesShop.modalSmallText}>ккал</p>
                                    </div>
                                    <div className={textStylesShop.productInfoModal.nutritionItem}>
                                        <p className={textStylesShop.modalValue}>{product.info.proteins}</p>
                                        <p className={textStylesShop.modalSmallText}>белки</p>
                                    </div>
                                    <div className={textStylesShop.productInfoModal.nutritionItem}>
                                        <p className={textStylesShop.modalValue}>{product.info.fats}</p>
                                        <p className={textStylesShop.modalSmallText}>жиры</p>
                                    </div>
                                    <div className={textStylesShop.productInfoModal.nutritionItem}>
                                        <p className={textStylesShop.modalValue}>{product.info.carbs}</p>
                                        <p className={textStylesShop.modalSmallText}>углеводы</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.getElementById('modal-root')! // Рендерим в отдельный контейнер
    );
};