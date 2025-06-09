import { useState } from 'react';
import { ProductInfoModal } from './ProductInfoModal';

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
        <div className="flex bg-[#7EDAFFD9] rounded-[30px] p-6 h-[500px] flex-col w-[300px] relative">
            {item.info && (
                <button
                    onClick={() => setShowInfo(true)}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center z-10"
                    aria-label="Показать информацию"
                >
                    <img src="/image/info.png" alt="" className="w-8 h-8" />
                </button>
            )}

            <img
                src={item.src}
                alt={item.title}
                className="w-full h-[300px] object-cover rounded-xl mb-4"
            />

            <div className="flex-grow flex flex-col justify-between">
                <h3 className="text-white text-4xl font-bold">{item.title}</h3>

                <div className="flex justify-between items-end mt-4">
                    <p className="text-white text-4xl font-bold">{item.price}</p>
                    <button className="bg-[#39C6FF] text-white text-3xl py-2 px-6 rounded-xl">
                        + Добавить
                    </button>
                </div>
            </div>

            {item.info && (
                <ProductInfoModal
                    isOpen={showInfo}
                    onClose={() => setShowInfo(false)}
                    product={{
                        title: item.title,
                        info: item.info
                    }}
                />
            )}
        </div>
    );
}