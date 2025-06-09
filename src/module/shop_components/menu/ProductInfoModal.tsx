import { FC } from 'react';
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
    if (!isOpen) return null;

    return (
        <>
            {/* Затемнение фона */}
            <div
                className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.5)]"
                onClick={onClose}
            />

            {/* Модальное окно */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl shadow-xl w-full max-w-[800px] max-h-[90vh] overflow-hidden">
                {/* Кнопка закрытия */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-50"
                    aria-label="Закрыть"
                >
                    ×
                </button>

                <div className="flex flex-col h-full">
                    {/* Верхняя часть: изображение + описание */}
                    <div className="flex flex-1 overflow-hidden">
                        {/* Изображение */}
                        <div className="w-1/2 h-auto max-h-[400px] overflow-hidden">
                            <img
                                src={product.src}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Описание */}
                        <div className="w-1/2 p-6 overflow-y-auto">
                            <h3 className={`${textStylesShop.modalTitle} mb-4`}>{product.title}</h3>

                            <p className={`${textStylesShop.modalText} mb-4`}>
                                <span className={`${textStylesShop.modalLabel}`}>Вес:</span> {product.info.weight}
                            </p>

                            <div>
                                <h4 className={`${textStylesShop.modalLabel} mb-2`}>Состав:</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {product.info.composition.map((ingredient, index) => (
                                        <li key={index} className="text-gray-600">{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Нижняя часть: пищевая ценность */}
                    <div className="p-6 border-t bg-gray-50">
                        <h4 className="font-semibold text-gray-800 mb-3">Пищевая ценность на 100 г:</h4>
                        <div className="grid grid-cols-4 gap-2">
                            <div className="bg-white p-2 rounded text-center shadow-sm">
                                <p className={`${textStylesShop.modalValue}`}>{product.info.calories}</p>
                                <p className={`${textStylesShop.modalSmallText} mt-1`}>ккал</p>
                            </div>
                            <div className="bg-white p-2 rounded text-center shadow-sm">
                                <p className={`${textStylesShop.modalValue}`}>{product.info.proteins}</p>
                                <p className={`${textStylesShop.modalSmallText} mt-1`}>белки</p>
                            </div>
                            <div className="bg-white p-2 rounded text-center shadow-sm">
                                <p className={`${textStylesShop.modalValue}`}>{product.info.fats}</p>
                                <p className={`${textStylesShop.modalSmallText} mt-1`}>жиры</p>
                            </div>
                            <div className="bg-white p-2 rounded text-center shadow-sm">
                                <p className={`${textStylesShop.modalValue}`}>{product.info.carbs}</p>
                                <p className={`${textStylesShop.modalSmallText} mt-1`}>углеводы</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};