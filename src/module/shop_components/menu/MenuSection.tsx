import { useEffect, useState } from 'react';
import CategorySection from "./CategorySection";
import { textStylesShop } from "../../../style/textStyles";
import { motion } from 'framer-motion';

interface Category {
    id: number;
    name: string;
    description: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    weight: number;
    energy_value: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
    amount: number;
    category: {
        id: number;
        name: string;
    } | null;
    ingredients: {
        ingredient_id: number;
        quantity: number;
        unit: string;
        name?: string;
    }[];
    image?: string;
}

const API_BASE_URL = 'http://193.23.219.155:4747/api/v1';

export default function MenuSection() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const headers = {
                    'Accept': 'application/json'
                };

                const [categoriesRes, productsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/category`, { headers }),
                    fetch(`${API_BASE_URL}/product`, { headers })
                ]);

                if (!categoriesRes.ok || !productsRes.ok) {
                    throw new Error('Ошибка загрузки данных меню');
                }

                const categoriesData = await categoriesRes.json();
                const productsData = await productsRes.json();

                setCategories(categoriesData);
                setProducts(productsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            } finally {
                setLoading(false);
            }
        };

        fetchMenuData();
    }, []);

    if (loading) {
        return (
            <div className="w-full text-center py-20">
                <p className={textStylesShop.sectionDescription}>Загрузка меню...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full text-center py-20">
                <p className={textStylesShop.sectionDescription}>{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-20 w-full mt-[20%] md:mt-[10%]">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`${textStylesShop.sectionTitle} tracking-widest w-full text-center text-[51px] md:text-[64px] text-[#FD744C]`}
            >
                МЕНЮ
            </motion.h2>

            {categories.map(category => {
                const categoryProducts = products.filter(p => p.category?.id === category.id);

                return (
                    <CategorySection
                        key={category.id}
                        title={category.name}
                        description={category.description}
                        items={categoryProducts.map(p => ({
                            id: p.id,
                            title: p.name,
                            price: p.price,
                            src: p.image || '/image/placeholder-product.jpg',
                            info: {
                                weight: `${p.weight} г`,
                                composition: p.ingredients.map(ing =>
                                    `${ing.name || 'Ингредиент'} - ${ing.quantity}${ing.unit}`
                                ),
                                calories: p.energy_value.toString(),
                                proteins: p.proteins.toString(),
                                fats: p.fats.toString(),
                                carbs: p.carbohydrates.toString()
                            }
                        }))}
                    />
                );
            })}
        </div>
    );
}
