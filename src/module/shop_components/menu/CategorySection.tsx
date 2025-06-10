import ProductCard from "./ProductCard"
import { textStylesShop } from "../../../style/textStyles";

type Props = {
    title: string
    description?: string
    items: Array<{
        id: number
        title: string
        price: number
        src: string
    }>
}

export default function CategorySection({ title, description, items }: Props) {
    return (
        <section className="fon4 py-10 w-full max-w-[1440px] mx-auto px-4">
            {/* Заголовок и описание */}
            {description && (
                <div className={`${textStylesShop.sectionDescription} mb-6 bg-[#7EDAFFDB] rounded-[50px] mx-auto max-w-[1200px] px-4 pb-4 pt-4`}>
                    {description}
                </div>
            )}

            <h2 className={`${textStylesShop.sectionTitle} mb-10`}>
                {title}
            </h2>

            {/* Контейнер для карточек с центрированием */}
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full max-w-[1200px]">
                    {items.map(item => (
                        <ProductCard key={`${title}-${item.id}`} item={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}