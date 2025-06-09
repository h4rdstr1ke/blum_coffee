import { FC } from 'react';

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
        info: ProductInfo;
    };
};

export const ProductInfoModal: FC<Props> = ({ isOpen, onClose, product }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{product.title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 text-2xl hover:text-gray-700"
                        aria-label="Закрыть"
                    >
                        ×
                    </button>
                </div>

                <p className="text-gray-600 mb-2">{product.info.weight}</p>

                <div className="mb-4">
                    <h4 className="font-semibold mb-1">Состав:</h4>
                    <ul className="list-disc pl-5">
                        {product.info.composition.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-1">Пищевая ценность на 100 г:</h4>
                    <div className="grid grid-cols-4 gap-2 text-center">
                        <div>
                            <p className="font-bold">{product.info.calories}</p>
                            <p className="text-sm">ккал</p>
                        </div>
                        <div>
                            <p className="font-bold">{product.info.proteins}</p>
                            <p className="text-sm">белки</p>
                        </div>
                        <div>
                            <p className="font-bold">{product.info.fats}</p>
                            <p className="text-sm">жиры</p>
                        </div>
                        <div>
                            <p className="font-bold">{product.info.carbs}</p>
                            <p className="text-sm">углеводы</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};