import ProductCard from "./ProductCard";
import { textStylesShop } from "../../../style/textStyles";
import { motion } from "framer-motion";

type Props = {
    title: string;
    description?: string;
    items: Array<{
        id: number;
        title: string;
        price: number;
        src: string;
    }>;
};

export default function CategorySection({ title, description, items }: Props) {
    return (
        <section className="fon4 py-10 w-full max-w-[1440px] mx-auto px-4">
            {/* Заголовок и описание */}
            {description && (
                <motion.div
                    initial={{ opacity: 1, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`${textStylesShop.sectionDescription}`}
                >
                    {description}
                </motion.div>
            )}

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className={`${textStylesShop.sectionTitle} mb-10`}
            >
                {title}
            </motion.h2>

            {/* Контейнер для карточек с центрированием */}
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full max-w-[1200px]">
                    {items.map((item, index) => (
                        <motion.div
                            key={`${title}-${item.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1
                            }}
                            viewport={{ once: true, margin: "20px" }}
                            whileHover={{
                                y: -5,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                        >
                            <ProductCard item={item} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}