import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { textStylesPanel } from '../../../style/textStyles';
import { useUser } from '../../../context/UserContext';

interface Category {
    id: number;
    name: string;
    description: string;
}

interface Ingredient {
    id: number;
    name: string;
}

interface ProductIngredient {
    id: number;
    ingredient_id: number;
    name: string;
    quantity: number;
    unit: string;
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
    ingredients: ProductIngredient[];
    image?: string;
}

const API_BASE_URL = 'http://193.23.219.155:4747/api/v1';

export default function AdminPanel() {
    const { isEmployee } = useUser();
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: ''
    });
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
    const [productIngredient, setProductIngredient] = useState<{
        ingredient_id: number;
        quantity: number;
        unit: string;
    }>({
        ingredient_id: 0,
        quantity: 1,
        unit: ''
    });
    const [ingredientForm, setIngredientForm] = useState({
        name: ''
    });
    const [productImage, setProductImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editedDescription, setEditedDescription] = useState('');

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

            setAllIngredients(ingredientsData);
            setCategories(categoriesData);
            setProducts(productsData);

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

    // Управление ингредиентами
    const createIngredient = async () => {
        if (!ingredientForm.name.trim()) {
            setError('Введите название ингредиента');
            return;
        }

        try {
            const token = localStorage.getItem('employee_token');
            if (!token) return;

            const response = await fetch(`${API_BASE_URL}/ingredient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: ingredientForm.name })
            });

            if (!response.ok) {
                throw new Error('Ошибка создания ингредиента');
            }

            const data = await response.json();
            setAllIngredients([...allIngredients, data]);
            setIngredientForm({ name: '' });
            setSuccess(`Ингредиент "${data.name}" создан!`);
            setTimeout(() => setSuccess(null), 3000);
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error instanceof Error ? error.message : 'Ошибка создания ингредиента');
        }
    };

    const deleteIngredient = async (id: number) => {
        if (!confirm('Удалить этот ингредиент?')) return;

        try {
            const token = localStorage.getItem('employee_token');
            if (!token) return;

            const response = await fetch(`${API_BASE_URL}/ingredient/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка удаления ингредиента');
            }

            setAllIngredients(allIngredients.filter(i => i.id !== id));
            setSuccess('Ингредиент удалён!');
            setTimeout(() => setSuccess(null), 3000);
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error instanceof Error ? error.message : 'Ошибка удаления ингредиента');
        }
    };

    const toggleCategoryExpand = (categoryId: number) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
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
            setNewCategory({ name: '', description: '' });
            setSuccess(`Категория "${data.name}" создана!`);
            setTimeout(() => setSuccess(null), 3000);
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error instanceof Error ? error.message : 'Ошибка создания категории');
        }
    };

    const saveDescription = async () => {
        if (!editingCategory) return;

        try {
            const token = localStorage.getItem('employee_token');
            if (!token) return;

            const response = await fetch(`${API_BASE_URL}/category/${editingCategory.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: editingCategory.name,
                    description: editedDescription
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка обновления описания');
            }

            setCategories(categories.map(c =>
                c.id === editingCategory.id ? { ...c, description: editedDescription } : c
            ));
            setEditingCategory(null);
            setSuccess('Описание успешно обновлено!');
            setTimeout(() => setSuccess(null), 3000);
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error instanceof Error ? error.message : 'Ошибка обновления описания');
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

    const addIngredientToProduct = () => {
        if (!productIngredient.ingredient_id) {
            setError('Выберите ингредиент');
            return;
        }

        const selectedIngredient = allIngredients.find(i => i.id === productIngredient.ingredient_id);
        if (!selectedIngredient) {
            setError('Ингредиент не найден');
            return;
        }

        setNewProduct(prev => ({
            ...prev,
            ingredients: [
                ...prev.ingredients,
                {
                    id: Date.now(),
                    ingredient_id: productIngredient.ingredient_id,
                    name: selectedIngredient.name,
                    quantity: productIngredient.quantity,
                    unit: productIngredient.unit
                }
            ]
        }));

        setProductIngredient({
            ingredient_id: 0,
            quantity: 1,
            unit: ''
        });
    };

    const removeIngredientFromProduct = (index: number) => {
        setNewProduct(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    };

    const saveProduct = async () => {
        if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
            setError('Заполните обязательные поля: название, категория и цена');
            return;
        }

        try {
            const token = localStorage.getItem('employee_token');
            if (!token) return;

            const formData = new FormData();

            formData.append('name', newProduct.name);
            formData.append('price', newProduct.price.toString());
            formData.append('weight', newProduct.weight.toString());
            formData.append('energy_value', newProduct.energy_value.toString());
            formData.append('proteins', newProduct.proteins.toString());
            formData.append('fats', newProduct.fats.toString());
            formData.append('carbohydrates', newProduct.carbohydrates.toString());
            formData.append('amount', newProduct.amount.toString());
            formData.append('category_id', newProduct.category.id.toString());

            const ingredientsToSend = newProduct.ingredients.map(ing => ({
                id: ing.ingredient_id,
                quantity: ing.quantity,
                unit: ing.unit
            }));
            formData.append('ingredients', JSON.stringify(ingredientsToSend));

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
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка сохранения продукта');
            }

            await fetchData();

            resetProductForm();
            setSuccess(`Продукт "${newProduct.name}" успешно сохранён!`);
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

            {error && <div className={textStylesPanel.errorText}>{error}</div>}
            {success && <div className={textStylesPanel.successText}>{success}</div>}

            {/* Блок для управления ингредиентами */}
            <section className={textStylesPanel.section}>
                <h2 className={textStylesPanel.sectionTitle}>Управление ингредиентами</h2>
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={ingredientForm.name}
                            onChange={(e) => setIngredientForm({ name: e.target.value })}
                            className={textStylesPanel.input}
                            placeholder="Название ингредиента"
                        />
                        <button
                            onClick={createIngredient}
                            className={textStylesPanel.successButton}
                        >
                            Добавить ингредиент
                        </button>
                    </div>
                </div>

                <div className={textStylesPanel.gridCols3}>
                    {allIngredients.map(ingredient => (
                        <div key={ingredient.id} className={textStylesPanel.categoryCard}>
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{ingredient.name}</span>
                                <button
                                    onClick={() => deleteIngredient(ingredient.id)}
                                    className="text-red-600 hover:text-red-800 p-1"
                                    title="Удалить ингредиент"
                                >
                                    ❌
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={textStylesPanel.section}>
                <h2 className={textStylesPanel.sectionTitle}>Управление категориями</h2>
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            className={textStylesPanel.input}
                            placeholder="Название категории"
                        />
                        <button
                            onClick={createCategory}
                            className={textStylesPanel.successButton}
                        >
                            Добавить категорию
                        </button>
                    </div>
                    <textarea
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        className={textStylesPanel.textarea}
                        placeholder="Описание категории"
                        rows={3}
                    />
                </div>

                <div className={textStylesPanel.gridCols3}>
                    {categories.map(category => (
                        <div key={category.id} className={textStylesPanel.categoryCard}>
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{category.name}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingCategory(category);
                                            setEditedDescription(category.description);
                                        }}
                                        className="text-blue-600 hover:text-blue-800 p-1"
                                        title="Редактировать описание"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => toggleCategoryExpand(category.id)}
                                        className="text-gray-600 hover:text-gray-800 p-1"
                                        title={expandedCategories[category.id] ? "Свернуть описание" : "Развернуть описание"}
                                    >
                                        {expandedCategories[category.id] ? "▼" : "▶"}
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(category.id)}
                                        className="text-red-600 hover:text-red-800 p-1"
                                        title="Удалить категорию"
                                    >
                                        ❌
                                    </button>
                                </div>
                            </div>

                            {editingCategory?.id === category.id ? (
                                <div className="mt-2">
                                    <textarea
                                        value={editedDescription}
                                        onChange={(e) => setEditedDescription(e.target.value)}
                                        className="w-full p-2 border rounded"
                                        rows={3}
                                    />
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button
                                            onClick={() => setEditingCategory(null)}
                                            className="px-2 py-1 bg-gray-200 rounded"
                                        >
                                            Отмена
                                        </button>
                                        <button
                                            onClick={saveDescription}
                                            className="px-2 py-1 bg-blue-500 text-white rounded"
                                        >
                                            Сохранить
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                expandedCategories[category.id] && category.description && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="mt-2 p-3 bg-gray-50 rounded overflow-hidden whitespace-pre-wrap break-words"
                                    >
                                        {category.description}
                                    </motion.div>
                                )
                            )}
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
                            value={productIngredient.ingredient_id || ''}
                            onChange={(e) => setProductIngredient({
                                ...productIngredient,
                                ingredient_id: Number(e.target.value)
                            })}
                            className={textStylesPanel.select}
                        >
                            <option value="">Выберите ингредиент</option>
                            {allIngredients.map(ing => (
                                <option key={ing.id} value={ing.id}>{ing.name}</option>
                            ))}
                        </select>

                        <input
                            type="text"
                            value={productIngredient.unit}
                            onChange={(e) => setProductIngredient({
                                ...productIngredient,
                                unit: e.target.value
                            })}
                            className={textStylesPanel.input}
                            placeholder="Укажите название ингридиента"
                        />

                        {/* <input
                            type="number"
                            value={productIngredient.quantity}
                            onChange={(e) => setProductIngredient({
                                ...productIngredient,
                                quantity: Number(e.target.value)
                            })}
                            className={textStylesPanel.input}
                            placeholder="Количество"
                            min="0.1"
                            step="0.1"
                        />*/}

                        <button
                            onClick={addIngredientToProduct}
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
                                            {ing.name}
                                        </span>
                                        <span className={textStylesPanel.ingredientQuantity}>
                                            {ing.quantity} {ing.unit}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => removeIngredientFromProduct(index)}
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
                                    <div>
                                        <h3 className="text-lg font-semibold">{category.name}</h3>
                                        {category.description && (
                                            <p className="text-sm text-gray-600 rounded p-2 max-w-[200px] break-words whitespace-pre-wrap overflow-hidden">
                                                {category.description}
                                            </p>
                                        )}
                                    </div>
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
                                                                    <span>{ing.name}</span>
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