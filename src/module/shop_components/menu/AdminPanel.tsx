import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { textStylesPanel } from '../../../style/textStyles';
import { useUser } from '../../../context/UserContext';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id?: number;
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

interface Ingredient {
    id: number;
    name: string;
}

const API_BASE_URL = 'http://193.23.219.155:4747/api/v1';

export default function AdminPanel() {
    const { isEmployee } = useUser();
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id'> & { id?: number }>({
        name: '',
        price: 0,
        weight: 0,
        energy_value: 0,
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        amount: 1,
        category: null,
        ingredients: [],
    });
    const [newIngredient, setNewIngredient] = useState<{
        ingredient_id?: number;
        name?: string;
        quantity: number;
        unit: string;
    }>({
        ingredient_id: undefined,
        name: '',
        quantity: 1,
        unit: ''
    });
    const [productImage, setProductImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (isEmployee) {
            fetchData();
        }
    }, [isEmployee]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('employee_token');
            if (!token) return;

            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            const [categoriesRes, productsRes, ingredientsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/category`, { headers }),
                fetch(`${API_BASE_URL}/product`, { headers }),
                fetch(`${API_BASE_URL}/ingredient`, { headers })
            ]);

            const categoriesData = await categoriesRes.json();
            const productsData = await productsRes.json();
            const ingredientsData = await ingredientsRes.json();

            const enrichedProducts = productsData.map((product: any) => ({
                ...product,
                ingredients: product.ingredients?.map((ing: any) => ({
                    ...ing,
                    name: ingredientsData.find((i: Ingredient) => i.id === ing.ingredient_id)?.name || 'Неизвестный ингредиент'
                })) || []
            }));

            setCategories(categoriesData);
            setProducts(enrichedProducts);
            setAllIngredients(ingredientsData);

            if (categoriesData.length > 0) {
                setNewProduct(prev => ({
                    ...prev,
                    category: {
                        id: categoriesData[0].id,
                        name: categoriesData[0].name
                    }
                }));
            }
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            setError('Ошибка при загрузке данных');
        }
    };

    const createCategory = async () => {
        if (!newCategory.name.trim()) {
            setError('Введите название категории');
            return;
        }

        try {
            const token = localStorage.getItem('employee_token');
            if (!token) return;

            const response = await fetch(`${API_BASE_URL}/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newCategory)
            });

            if (!response.ok) {
                throw new Error('Ошибка создания категории');
            }

            const data = await response.json();
            setCategories([...categories, data]);
            setNewCategory({ name: '' });
            setSuccess(`Категория "${data.name}" создана!`);
            setTimeout(() => setSuccess(null), 3000);
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error instanceof Error ? error.message : 'Ошибка создания категории');
        }
    };

    const deleteCategory = async (id: number) => {
        if (!confirm('Удалить категорию и все её продукты?')) return;

        try {
            const token = localStorage.getItem('employee_token');
            if (!token) return;

            const response = await fetch(`${API_BASE_URL}/category/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка удаления категории');
            }

            setCategories(categories.filter(c => c.id !== id));
            setProducts(products.filter(p => p.category?.id !== id));
            setSuccess('Категория удалена!');
            setTimeout(() => setSuccess(null), 3000);
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error instanceof Error ? error.message : 'Ошибка удаления категории');
        }
    };

    const addIngredient = async () => {
        if (!newIngredient.ingredient_id && !newIngredient.name?.trim()) {
            setError('Выберите ингредиент или введите название нового');
            return;
        }

        try {
            let ingredientId = newIngredient.ingredient_id;
            let ingredientName = newIngredient.name;

            if (!ingredientId && newIngredient.name) {
                const token = localStorage.getItem('employee_token');
                if (!token) return;

                const response = await fetch(`${API_BASE_URL}/ingredient`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ name: newIngredient.name })
                });

                if (!response.ok) {
                    throw new Error('Ошибка создания ингредиента');
                }

                const data = await response.json();
                ingredientId = data.id;
                ingredientName = data.name;
                setAllIngredients([...allIngredients, data]);
            }

            if (!ingredientId) {
                throw new Error('Не удалось определить ID ингредиента');
            }

            setNewProduct(prev => ({
                ...prev,
                ingredients: [
                    ...prev.ingredients,
                    {
                        ingredient_id: ingredientId!,
                        quantity: newIngredient.quantity,
                        unit: newIngredient.unit,
                        name: ingredientName || allIngredients.find(i => i.id === ingredientId)?.name
                    }
                ]
            }));

            setNewIngredient({
                ingredient_id: undefined,
                name: '',
                quantity: 1,
                unit: ''
            });
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error instanceof Error ? error.message : 'Ошибка добавления ингредиента');
        }
    };

    const removeIngredient = (index: number) => {
        const newIngredients = [...newProduct.ingredients];
        newIngredients.splice(index, 1);
        setNewProduct({
            ...newProduct,
            ingredients: newIngredients
        });
    };

    const saveProduct = async () => {
        if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
            setError('Заполните обязательные поля: название, категория и цена');
            return;
        }

        try {
            const formData = new FormData();
            const token = localStorage.getItem('employee_token');
            if (!token) return;

            formData.append('name', newProduct.name);
            formData.append('price', newProduct.price.toString());
            formData.append('weight', newProduct.weight.toString());
            formData.append('energy_value', newProduct.energy_value.toString());
            formData.append('proteins', newProduct.proteins.toString());
            formData.append('fats', newProduct.fats.toString());
            formData.append('carbohydrates', newProduct.carbohydrates.toString());
            formData.append('amount', newProduct.amount.toString());

            if (newProduct.category) {
                formData.append('category_id', newProduct.category.id.toString());
            }

            const ingredientsData = newProduct.ingredients.map(ing => ({
                id: ing.ingredient_id,
                quantity: ing.quantity,
                unit: ing.unit
            }));
            formData.append('ingredients', JSON.stringify(ingredientsData));

            if (productImage) {
                formData.append('image', productImage);
            }

            const url = newProduct.id
                ? `${API_BASE_URL}/product/${newProduct.id}?_method=PATCH`
                : `${API_BASE_URL}/product`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Ошибка сервера:', error);
                throw new Error(error.message || 'Ошибка сохранения продукта');
            }

            const savedProduct = await response.json();
            setProducts(prev =>
                newProduct.id
                    ? prev.map(p => p.id === newProduct.id ? savedProduct : p)
                    : [...prev, savedProduct]
            );

            resetProductForm();
            setSuccess(`Продукт "${savedProduct.name}" успешно сохранён!`);
            setTimeout(() => setSuccess(null), 3000);
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error instanceof Error ? error.message : 'Ошибка сохранения продукта');
        }
    };

    const deleteProduct = async (id: number) => {
        if (!confirm('Удалить этот продукт?')) return;

        try {
            const token = localStorage.getItem('employee_token');
            if (!token) return;

            const response = await fetch(`${API_BASE_URL}/product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка удаления продукта');
            }

            setProducts(products.filter(p => p.id !== id));
            setSuccess('Продукт удалён!');
            setTimeout(() => setSuccess(null), 3000);
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error instanceof Error ? error.message : 'Ошибка удаления продукта');
        }
    };

    const resetProductForm = () => {
        setNewProduct({
            name: '',
            price: 0,
            weight: 0,
            energy_value: 0,
            proteins: 0,
            fats: 0,
            carbohydrates: 0,
            amount: 1,
            category: categories[0] ? {
                id: categories[0].id,
                name: categories[0].name
            } : null,
            ingredients: []
        });
        setProductImage(null);
        setError(null);
    };

    const editProduct = (product: Product) => {
        setNewProduct({
            ...product,
            category: product.category || null
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={textStylesPanel.container}>
            <h1 className={textStylesPanel.title}>Админ-панель меню</h1>

            {/* Сообщения об ошибках и успехе */}
            {error && <div className={textStylesPanel.errorText}>{error}</div>}
            {success && <div className={textStylesPanel.successText}>{success}</div>}

            <section className={textStylesPanel.section}>
                <h2 className={textStylesPanel.sectionTitle}>Управление категориями</h2>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ name: e.target.value })}
                        className={textStylesPanel.input}
                        placeholder="Название новой категории"
                    />
                    <button
                        onClick={createCategory}
                        className={textStylesPanel.successButton}
                    >
                        Добавить категорию
                    </button>
                </div>

                <div className={textStylesPanel.gridCols3}>
                    {categories.map(category => (
                        <div key={category.id} className={textStylesPanel.categoryCard}>
                            <span className="font-medium">{category.name}</span>
                            <button
                                onClick={() => deleteCategory(category.id)}
                                className="text-red-600 hover:text-red-800 p-1"
                                title="Удалить категорию"
                            >
                                ❌
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className={textStylesPanel.section}>
                <h2 className={textStylesPanel.sectionTitle}>
                    {newProduct.id ? 'Редактирование продукта' : 'Добавление нового продукта'}
                </h2>

                <div className={textStylesPanel.gridCols2}>
                    <div>
                        <label className={textStylesPanel.inputLabel}>Название продукта:</label>
                        <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className={textStylesPanel.input}
                            required
                        />
                    </div>

                    <div>
                        <label className={textStylesPanel.inputLabel}>Категория:</label>
                        <select
                            value={newProduct.category?.id || ''}
                            onChange={(e) => {
                                const selectedCategory = categories.find(c => c.id === Number(e.target.value));
                                setNewProduct({
                                    ...newProduct,
                                    category: selectedCategory ? {
                                        id: selectedCategory.id,
                                        name: selectedCategory.name
                                    } : null
                                });
                            }}
                            className={textStylesPanel.select}
                            required
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className={textStylesPanel.inputLabel}>Цена (₽):</label>
                        <input
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                            className={textStylesPanel.input}
                            min="1"
                            required
                        />
                    </div>

                    <div>
                        <label className={textStylesPanel.inputLabel}>Вес (г):</label>
                        <input
                            type="number"
                            value={newProduct.weight}
                            onChange={(e) => setNewProduct({ ...newProduct, weight: Number(e.target.value) })}
                            className={textStylesPanel.input}
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label className={textStylesPanel.inputLabel}>Энергетическая ценность (ккал):</label>
                        <input
                            type="number"
                            value={newProduct.energy_value}
                            onChange={(e) => setNewProduct({ ...newProduct, energy_value: Number(e.target.value) })}
                            className={textStylesPanel.input}
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label className={textStylesPanel.inputLabel}>Белки (г):</label>
                        <input
                            type="number"
                            value={newProduct.proteins}
                            onChange={(e) => setNewProduct({ ...newProduct, proteins: Number(e.target.value) })}
                            className={textStylesPanel.input}
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label className={textStylesPanel.inputLabel}>Жиры (г):</label>
                        <input
                            type="number"
                            value={newProduct.fats}
                            onChange={(e) => setNewProduct({ ...newProduct, fats: Number(e.target.value) })}
                            className={textStylesPanel.input}
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label className={textStylesPanel.inputLabel}>Углеводы (г):</label>
                        <input
                            type="number"
                            value={newProduct.carbohydrates}
                            onChange={(e) => setNewProduct({ ...newProduct, carbohydrates: Number(e.target.value) })}
                            className={textStylesPanel.input}
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label className={textStylesPanel.inputLabel}>Количество (шт):</label>
                        <input
                            type="number"
                            value={newProduct.amount}
                            onChange={(e) => setNewProduct({ ...newProduct, amount: Number(e.target.value) })}
                            className={textStylesPanel.input}
                            min="1"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className={textStylesPanel.inputLabel}>Изображение:</label>
                        <input
                            type="file"
                            onChange={(e) => setProductImage(e.target.files?.[0] || null)}
                            className={textStylesPanel.input}
                            accept="image/*"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="font-medium mb-2">Состав продукта:</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <select
                            value={newIngredient.ingredient_id || ''}
                            onChange={(e) => {
                                const selected = allIngredients.find(i => i.id === Number(e.target.value));
                                if (selected) {
                                    setNewIngredient({
                                        ingredient_id: selected.id,
                                        name: selected.name,
                                        quantity: newIngredient.quantity,
                                        unit: newIngredient.unit
                                    });
                                } else {
                                    setNewIngredient({
                                        ingredient_id: undefined,
                                        name: '',
                                        quantity: 1,
                                        unit: ''
                                    });
                                }
                            }}
                            className={textStylesPanel.select}
                        >
                            <option value="">Выберите ингредиент</option>
                            {allIngredients.map(ing => (
                                <option key={ing.id} value={ing.id}>{ing.name}</option>
                            ))}
                        </select>

                        {!newIngredient.ingredient_id && (
                            <input
                                type="text"
                                value={newIngredient.name || ''}
                                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                                className={textStylesPanel.input}
                                placeholder="Название нового ингредиента"
                            />
                        )}

                        <input
                            type="text"
                            value={newIngredient.unit}
                            onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                            className={textStylesPanel.input}
                            placeholder="Единица измерения"
                        />

                        <button
                            onClick={addIngredient}
                            className={textStylesPanel.successButton}
                        >
                            Добавить
                        </button>
                    </div>

                    {newProduct.ingredients.length > 0 && (
                        <div className="space-y-2">
                            {newProduct.ingredients.map((ing, index) => (
                                <div key={index} className={textStylesPanel.ingredientItem}>
                                    <div>
                                        <span className={textStylesPanel.ingredientName}>
                                            {ing.name || 'Неизвестный ингредиент'}
                                        </span>
                                        <span className={textStylesPanel.ingredientQuantity}>
                                            {ing.quantity} {ing.unit}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => removeIngredient(index)}
                                        className="text-red-600 hover:text-red-800 p-1"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                    <button
                        onClick={saveProduct}
                        className={textStylesPanel.primaryButton}
                        disabled={!newProduct.name || !newProduct.category || newProduct.price <= 0}
                    >
                        {newProduct.id ? 'Сохранить изменения' : 'Добавить продукт'}
                    </button>

                    {newProduct.id && (
                        <>
                            <button
                                onClick={resetProductForm}
                                className={textStylesPanel.secondaryButton}
                            >
                                Отменить
                            </button>
                            <button
                                onClick={() => newProduct.id && deleteProduct(newProduct.id)}
                                className={textStylesPanel.dangerButton}
                            >
                                Удалить продукт
                            </button>
                        </>
                    )}
                </div>
            </section>

            <section className={textStylesPanel.section}>
                <h2 className={textStylesPanel.sectionTitle}>Текущее меню</h2>

                {categories.length === 0 ? (
                    <p className="text-gray-500">Нет категорий</p>
                ) : (
                    categories.map(category => {
                        const categoryProducts = products.filter(p =>
                            p.category && p.category.id === category.id
                        );

                        return (
                            <div key={category.id} className="mb-8">
                                <div className="flex justify-between items-center mb-3 p-3 bg-gray-100 rounded-lg">
                                    <h3 className="text-lg font-semibold">{category.name}</h3>
                                    <button
                                        onClick={() => {
                                            setNewProduct({
                                                name: '',
                                                price: 0,
                                                weight: 0,
                                                energy_value: 0,
                                                proteins: 0,
                                                fats: 0,
                                                carbohydrates: 0,
                                                amount: 1,
                                                category: {
                                                    id: category.id,
                                                    name: category.name
                                                },
                                                ingredients: []
                                            });
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className={textStylesPanel.successButton}
                                    >
                                        + Добавить продукт
                                    </button>
                                </div>

                                {categoryProducts.length === 0 ? (
                                    <p className="text-gray-500 pl-3">Нет продуктов в этой категории</p>
                                ) : (
                                    <div className={textStylesPanel.gridCols3}>
                                        {categoryProducts.map(product => (
                                            <div key={product.id} className={textStylesPanel.productCard}>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className={textStylesPanel.productTitle}>{product.name}</h4>
                                                        <p className={textStylesPanel.productPrice}>{product.price}₽</p>
                                                        {product.weight && <p className={textStylesPanel.productMeta}>Вес: {product.weight}г</p>}
                                                        <p className={textStylesPanel.productMeta}>Ккал: {product.energy_value}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => editProduct(product)}
                                                        className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                                                        title="Редактировать"
                                                    >
                                                        ✏️
                                                    </button>
                                                </div>

                                                {product.image && (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-32 object-cover mb-2 rounded"
                                                    />
                                                )}

                                                {product.ingredients?.length > 0 && (
                                                    <div className="mt-3">
                                                        <h5 className="font-medium text-sm mb-1">Состав:</h5>
                                                        <ul className="text-sm text-gray-600 space-y-1">
                                                            {product.ingredients.map((ing, i) => (
                                                                <li key={i} className="flex justify-between">
                                                                    <span>{ing.name || 'Неизвестный ингредиент'}</span>
                                                                    <span>{ing.quantity} {ing.unit}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </section>
        </div>
    );
}