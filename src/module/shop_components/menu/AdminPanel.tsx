import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { textStylesShop } from '../../../style/textStyles';

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
const ADMIN_TOKEN = '5|k9BeVT4QeVM4S8g4OCrtuGJTLx8LwROOugJpHRVTb5110686';

export default function AdminPanel() {
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
    const [isAdmin, setIsAdmin] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAdmin) {
            fetchData();
        }
    }, [isAdmin]);

    const fetchData = async () => {
        try {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${ADMIN_TOKEN}`
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
            alert('Ошибка при загрузке данных');
        }
    };

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/login-employee`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            });

            if (response.ok) {
                setIsAdmin(true);
            } else {
                alert('Неверные учетные данные');
            }
        } catch (error) {
            console.error('Ошибка входа:', error);
            alert('Ошибка при входе');
        }
    };

    const createCategory = async () => {
        if (!newCategory.name.trim()) return;

        try {
            const response = await fetch(`${API_BASE_URL}/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ADMIN_TOKEN}`
                },
                body: JSON.stringify(newCategory)
            });

            if (!response.ok) {
                throw new Error('Ошибка создания категории');
            }

            const data = await response.json();
            setCategories([...categories, data]);
            setNewCategory({ name: '' });
            alert(`Категория "${data.name}" создана!`);
        } catch (error) {
            console.error('Ошибка:', error);
            alert(error instanceof Error ? error.message : 'Ошибка создания категории');
        }
    };

    const deleteCategory = async (id: number) => {
        if (!confirm('Удалить категорию и все её продукты?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/category/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${ADMIN_TOKEN}`
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка удаления категории');
            }

            setCategories(categories.filter(c => c.id !== id));
            setProducts(products.filter(p => p.category?.id !== id));
            alert('Категория удалена!');
        } catch (error) {
            console.error('Ошибка:', error);
            alert(error instanceof Error ? error.message : 'Ошибка удаления категории');
        }
    };

    const addIngredient = async () => {
        if (!newIngredient.ingredient_id && !newIngredient.name?.trim()) {
            alert('Выберите ингредиент или введите название нового');
            return;
        }

        try {
            let ingredientId = newIngredient.ingredient_id;
            let ingredientName = newIngredient.name;

            if (!ingredientId && newIngredient.name) {
                const response = await fetch(`${API_BASE_URL}/ingredient`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${ADMIN_TOKEN}`
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
            alert(error instanceof Error ? error.message : 'Ошибка добавления ингредиента');
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
            alert('Заполните обязательные поля: название, категория и цена');
            return;
        }

        try {
            const formData = new FormData();

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
                    'Authorization': `Bearer ${ADMIN_TOKEN}`
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
            alert(`Продукт "${savedProduct.name}" успешно сохранён!`);
        } catch (error) {
            console.error('Ошибка:', error);
            alert(error instanceof Error ? error.message : 'Ошибка сохранения продукта');
        }
    };

    const deleteProduct = async (id: number) => {
        if (!confirm('Удалить этот продукт?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${ADMIN_TOKEN}`
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка удаления продукта');
            }

            setProducts(products.filter(p => p.id !== id));
            alert('Продукт удалён!');
        } catch (error) {
            console.error('Ошибка:', error);
            alert(error instanceof Error ? error.message : 'Ошибка удаления продукта');
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
    };

    const editProduct = (product: Product) => {
        setNewProduct({
            ...product,
            category: product.category || null
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md"
                >
                    <div>
                        <h2 className={`${textStylesShop.sectionTitle} text-center`}>Вход для администратора</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleAdminLogin}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="login" className="block text-sm font-medium text-gray-700">
                                    Логин
                                </label>
                                <input
                                    id="login"
                                    name="login"
                                    type="text"
                                    required
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Пароль
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Войти
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Админ-панель меню</h1>

            <section className="mb-8 p-4 bg-white rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Управление категориями</h2>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ name: e.target.value })}
                        className="flex-1 p-2 border rounded"
                        placeholder="Название новой категории"
                    />
                    <button
                        onClick={createCategory}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Добавить категорию
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {categories.map(category => (
                        <div key={category.id} className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                            <span className="font-medium">{category.name}</span>
                            <button
                                onClick={() => deleteCategory(category.id)}
                                className="text-red-600 hover:text-red-800 p-1"
                                title="Удалить категорию"
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-8 p-4 bg-white rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">
                    {newProduct.id ? 'Редактирование продукта' : 'Добавление нового продукта'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Название продукта:</label>
                        <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Категория:</label>
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
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Цена (₽):</label>
                        <input
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                            className="w-full p-2 border rounded"
                            min="1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Вес (г):</label>
                        <input
                            type="number"
                            value={newProduct.weight}
                            onChange={(e) => setNewProduct({ ...newProduct, weight: Number(e.target.value) })}
                            className="w-full p-2 border rounded"
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Энергетическая ценность (ккал):</label>
                        <input
                            type="number"
                            value={newProduct.energy_value}
                            onChange={(e) => setNewProduct({ ...newProduct, energy_value: Number(e.target.value) })}
                            className="w-full p-2 border rounded"
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Белки (г):</label>
                        <input
                            type="number"
                            value={newProduct.proteins}
                            onChange={(e) => setNewProduct({ ...newProduct, proteins: Number(e.target.value) })}
                            className="w-full p-2 border rounded"
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Жиры (г):</label>
                        <input
                            type="number"
                            value={newProduct.fats}
                            onChange={(e) => setNewProduct({ ...newProduct, fats: Number(e.target.value) })}
                            className="w-full p-2 border rounded"
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Углеводы (г):</label>
                        <input
                            type="number"
                            value={newProduct.carbohydrates}
                            onChange={(e) => setNewProduct({ ...newProduct, carbohydrates: Number(e.target.value) })}
                            className="w-full p-2 border rounded"
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Количество (шт):</label>
                        <input
                            type="number"
                            value={newProduct.amount}
                            onChange={(e) => setNewProduct({ ...newProduct, amount: Number(e.target.value) })}
                            className="w-full p-2 border rounded"
                            min="1"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-1 text-sm font-medium">Изображение:</label>
                        <input
                            type="file"
                            onChange={(e) => setProductImage(e.target.files?.[0] || null)}
                            className="w-full p-2 border rounded"
                            accept="image/*"
                        />
                    </div>
                </div>

                <div className="mb-4">
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
                            className="flex-1 min-w-[200px] p-2 border rounded"
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
                                className="flex-1 min-w-[200px] p-2 border rounded"
                                placeholder="Название нового ингредиента"
                            />
                        )}

                        <input
                            type="text"
                            value={newIngredient.unit}
                            onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                            className="w-40 p-2 border rounded"
                            placeholder="Единица измерения"
                        />

                        <button
                            onClick={addIngredient}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Добавить
                        </button>
                    </div>

                    {newProduct.ingredients.length > 0 && (
                        <div className="space-y-2">
                            {newProduct.ingredients.map((ing, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                                    <div>
                                        <span className="font-medium">{ing.name || 'Неизвестный ингредиент'}</span>
                                        <span className="ml-2 text-gray-600">{ing.quantity} {ing.unit}</span>
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

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={saveProduct}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={!newProduct.name || !newProduct.category || newProduct.price <= 0}
                    >
                        {newProduct.id ? 'Сохранить изменения' : 'Добавить продукт'}
                    </button>

                    {newProduct.id && (
                        <>
                            <button
                                onClick={resetProductForm}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Отменить
                            </button>
                            <button
                                onClick={() => newProduct.id && deleteProduct(newProduct.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Удалить продукт
                            </button>
                        </>
                    )}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">Текущее меню</h2>

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
                                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                    >
                                        + Добавить продукт
                                    </button>
                                </div>

                                {categoryProducts.length === 0 ? (
                                    <p className="text-gray-500 pl-3">Нет продуктов в этой категории</p>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {categoryProducts.map(product => (
                                            <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="font-semibold text-lg">{product.name}</h4>
                                                        <p className="text-blue-600 font-bold">{product.price}₽</p>
                                                        {product.weight && <p className="text-sm text-gray-500">Вес: {product.weight}г</p>}
                                                        <p className="text-sm text-gray-500">Ккал: {product.energy_value}</p>
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
