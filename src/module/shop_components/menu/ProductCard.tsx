import { useState } from 'react';
import { ProductInfoModal } from './ProductInfoModal';
import { textStylesShop } from "../../../style/textStyles";

type Props = {
    item: {
        id: number;
        title: string;
        price: string;
        src: string;
        info?: {
            weight: string;
            composition: string[];
            calories: string;
            proteins: string;
            fats: string;
            carbs: string;
        };
    };
};

export default function ProductCard({ item }: Props) {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className="flex bg-[#7EDAFFD9] rounded-[20px] md:rounded-[30px] p-4 md:p-4 h-[400px] md:h-[450px] flex-col w-full max-w-[300px] mx-auto relative">
            {/* Изображение продукта */}
            <div className="w-full h-[200px] md:h-[250px] rounded-[26px] overflow-hidden mb-3 md:mb-1 bg-white relative">
                <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />

                {/* Кнопка информации (под изображением) */}
                {item.info && (
                    <button
                        onClick={() => setShowInfo(true)}
                        className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center z-10 bg-white border border-gray-300 rounded-full shadow-sm"
                        aria-label="Показать информацию"
                    >
                        <img
                            src="public/image/info_icon.png"
                            alt="Информация"
                            className="w-5 h-5"
                        />
                    </button>
                )}
            </div>

            {/* Название продукта */}
            <h3 className={`${textStylesShop.productTitle} mb-1 md:mb-2`}>{item.title}</h3>

            {/* Нижний блок: цена + кнопка */}
            <div className="mt-auto w-full relative flex flex-col items-center">
                {/* Цена */}
                <p className={`${textStylesShop.productPrice} absolute -top-5 md:-top-8 right-4 md:right-6`}>
                    {item.price}
                </p>

                {/* Кнопка добавить */}
                <button className={`${textStylesShop.addButton} bg-[#39C6FF] py-1 md:py-2 px-4 md:px-6 rounded-lg md:rounded-xl`}>
                    + Добавить
                </button>
            </div>

            {/* Модальное окно */}
            {item.info && (
                <ProductInfoModal
                    isOpen={showInfo}
                    onClose={() => setShowInfo(false)}
                    product={{
                        title: item.title,
                        src: item.src,
                        info: item.info
                    }}
                />
            )}
        </div>
    );
}