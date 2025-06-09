import ProductCard from "./ProductCard"

type Props = {
    title: string
    description?: string
    items: Array<{
        id: number
        title: string
        price: string
        src: string
    }>
}

export default function CategorySection({ title, description, items }: Props) {
    return (
        <section className="fon4 py-10">
            {description && (
                <div className="text-center text-white text-[55px] font-bold mb-6 bg-[#7EDAFFDB]">
                    {description}
                </div>
            )}

            <h2 className="text-center text-[#7EDAFF] text-[43px] font-bold mb-10">
                {title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {items.map(item => (
                    <ProductCard key={`${title}-${item.id}`} item={item} />
                ))}
            </div>
        </section>
    )
}