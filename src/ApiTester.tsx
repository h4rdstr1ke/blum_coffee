import { useState, useEffect } from 'react';

// Типы данных
interface Category {
    id: number;
    name: string;
}

interface Product {
    id?: number;
    name: string;
    weight: number;
    energy_value: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
    price: number;
    amount: number;
    category_id: number;
    image: string;
    ingredients: Array<{
        name: string;
        quantity: number;
        unit: string;
    }>;
}

interface User {
    id: number;
    name: string;
    surname: string;
    phone_number: string;
}

interface Employee {
    id: number;
    login: string;
    password: string;
}

interface Order {
    id: number;
    user_id: number;
    status_id: number;
    completion_datetime: string;
    price: number;
    products: Array<{
        id: number;
        quantity: number;
    }>;
}

const API_BASE_URL = 'http://193.23.219.155:4747/api/v1';

export default function ApiTester() {
    // Состояния
    const [token, setToken] = useState<string>('');
    const [activeTab, setActiveTab] = useState<'categories' | 'products' | 'users' | 'employees' | 'orders'>('categories');

    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    // Формы
    const [newCategory, setNewCategory] = useState({ name: '' });

    const [newProduct, setNewProduct] = useState<Product>({
        name: '',
        weight: 0,
        energy_value: 0,
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        price: 0,
        amount: 0,
        category_id: 1,
        image: '',
        ingredients: []
    });

    const [productImage, setProductImage] = useState<File | null>(null);
    const [newIngredient, setNewIngredient] = useState({
        name: '',
        quantity: 1,
        unit: 'г'
    });

    const [newUser, setNewUser] = useState({
        phone_number: '',
        code: ''
    });

    const [newEmployee, setNewEmployee] = useState({
        login: '',
        password: ''
    });

    const [newOrder, setNewOrder] = useState({
        completion_datetime: '',
        products: [] as Array<{ id: number; quantity: number }>
    });

    // Загрузка данных
    const fetchData = async () => {
        try {
            const headers = {
                'Accept': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            };

            if (activeTab === 'categories') {
                const res = await fetch(`${API_BASE_URL}/category`, { headers });
                setCategories(await res.json());
            }
            else if (activeTab === 'products') {
                const res = await fetch(`${API_BASE_URL}/product`, { headers });
                setProducts(await res.json());
            }
            else if (activeTab === 'users') {
                const res = await fetch(`${API_BASE_URL}/user`, { headers });
                setUsers(await res.json());
            }
            else if (activeTab === 'employees') {
                const res = await fetch(`${API_BASE_URL}/employees`, { headers });
                setEmployees(await res.json());
            }
            else if (activeTab === 'orders') {
                const res = await fetch(`${API_BASE_URL}/order`, { headers });
                setOrders(await res.json());
            }
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab, token]);

    // Категории
    const createCategory = async () => {
        await fetch(`${API_BASE_URL}/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newCategory)
        });
        fetchData();
        setNewCategory({ name: '' });
    };

    const updateCategory = async (id: number) => {
        await fetch(`${API_BASE_URL}/category/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name: `Обновлено: ${categories.find(c => c.id === id)?.name}` })
        });
        fetchData();
    };

    const deleteCategory = async (id: number) => {
        await fetch(`${API_BASE_URL}/category/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        fetchData();
    };

    // Продукты
    const saveProduct = async () => {
        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('weight', newProduct.weight.toString());
        formData.append('energy_value', newProduct.energy_value.toString());
        formData.append('proteins', newProduct.proteins.toString());
        formData.append('fats', newProduct.fats.toString());
        formData.append('carbohydrates', newProduct.carbohydrates.toString());
        formData.append('price', newProduct.price.toString());
        formData.append('amount', newProduct.amount.toString());
        formData.append('category_id', newProduct.category_id.toString());
        formData.append('ingredients', JSON.stringify(newProduct.ingredients));
        if (productImage) formData.append('image', productImage);

        const url = newProduct.id
            ? `${API_BASE_URL}/product/${newProduct.id}`
            : `${API_BASE_URL}/product`;

        const method = newProduct.id ? 'POST' : 'POST';
        if (newProduct.id) formData.append('_method', 'PATCH');

        await fetch(url, {
            method,
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        fetchData();
        resetProductForm();
    };

    const deleteProduct = async (id: number) => {
        await fetch(`${API_BASE_URL}/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        fetchData();
    };

    const resetProductForm = () => {
        setNewProduct({
            name: '',
            weight: 0,
            energy_value: 0,
            proteins: 0,
            fats: 0,
            carbohydrates: 0,
            price: 0,
            amount: 0,
            category_id: newProduct.category_id || 1,
            image: '',
            ingredients: []
        });
        setProductImage(null);
    };

    // Ингредиенты
    const addIngredient = () => {
        if (!newIngredient.name) return;

        setNewProduct({
            ...newProduct,
            ingredients: [
                ...newProduct.ingredients,
                {
                    name: newIngredient.name,
                    quantity: newIngredient.quantity,
                    unit: newIngredient.unit
                }
            ]
        });

        setNewIngredient({
            name: '',
            quantity: 1,
            unit: 'г'
        });
    };

    const removeIngredient = (index: number) => {
        const newIngredients = [...newProduct.ingredients];
        newIngredients.splice(index, 1);
        setNewProduct({
            ...newProduct,
            ingredients: newIngredients
        });
    };

    // Пользователи
    const sendCode = async () => {
        await fetch(`${API_BASE_URL}/send-code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone_number: newUser.phone_number })
        });
        alert('Код отправлен!');
    };

    const registerUser = async () => {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Имя',
                surname: 'Фамилия',
                phone_number: newUser.phone_number,
                code: newUser.code
            })
        });
        const data = await response.json();
        alert('Пользователь зарегистрирован!');
        console.log(data);
    };

    const loginUser = async () => {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_number: newUser.phone_number,
                code: newUser.code
            })
        });
        const data = await response.json();
        if (data.token) {
            setToken(data.token);
            alert('Вход выполнен!');
        }
    };

    // Сотрудники
    const registerEmployee = async () => {
        const response = await fetch(`${API_BASE_URL}/register-employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newEmployee)
        });
        const data = await response.json();
        alert('Сотрудник зарегистрирован!');
        console.log(data);
    };

    const loginEmployee = async () => {
        const response = await fetch(`${API_BASE_URL}/login-employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEmployee)
        });
        const data = await response.json();
        if (data.token) {
            setToken(data.token);
            alert('Вход выполнен!');
        }
    };

    // Заказы
    const createOrder = async () => {
        const response = await fetch(`${API_BASE_URL}/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newOrder)
        });
        const data = await response.json();
        setOrders([...orders, data]);
        setNewOrder({
            completion_datetime: '',
            products: []
        });
        alert('Заказ создан!');
    };

    const cancelOrder = async (id: number) => {
        await fetch(`${API_BASE_URL}/order-cancel/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        fetchData();
        alert('Заказ отменен!');
    };

    const completeOrder = async (id: number) => {
        await fetch(`${API_BASE_URL}/order-complete/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        fetchData();
        alert('Заказ выполнен!');
    };

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Панель управления</h1>

            {/* Токен */}
            <div className="mb-4">
                <label className="block mb-2">Токен доступа:</label>
                <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Навигация */}
            <div className="flex border-b mb-4">
                {['categories', 'products', 'users', 'employees', 'orders'].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setActiveTab(tab as any)}
                    >
                        {{
                            categories: 'Категории',
                            products: 'Продукты',
                            users: 'Пользователи',
                            employees: 'Сотрудники',
                            orders: 'Заказы'
                        }[tab]}
                    </button>
                ))}
            </div>

            {/* Категории */}
            {activeTab === 'categories' && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Управление категориями</h2>

                    <div className="mb-4 p-4 border rounded">
                        <h3 className="font-bold mb-2">Создать категорию</h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ name: e.target.value })}
                                className="p-2 border rounded flex-1"
                                placeholder="Название категории"
                            />
                            <button
                                onClick={createCategory}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                disabled={!token}
                            >
                                Создать
                            </button>
                        </div>
                    </div>

                    <div className="border rounded overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 text-left">ID</th>
                                    <th className="p-2 text-left">Название</th>
                                    <th className="p-2 text-left">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id} className="border-t">
                                        <td className="p-2">{category.id}</td>
                                        <td className="p-2">{category.name}</td>
                                        <td className="p-2 space-x-2">
                                            <button
                                                onClick={() => updateCategory(category.id)}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                                                disabled={!token}
                                            >
                                                Изменить
                                            </button>
                                            <button
                                                onClick={() => deleteCategory(category.id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                                disabled={!token}
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Продукты */}
            {activeTab === 'products' && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Управление продуктами</h2>

                    <div className="mb-4">
                        <label className="block mb-2">Категория:</label>
                        <select
                            value={newProduct.category_id}
                            onChange={(e) => setNewProduct({ ...newProduct, category_id: Number(e.target.value) })}
                            className="p-2 border rounded"
                        >
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Форма продукта */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block mb-2">Название:</label>
                            <input
                                type="text"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                className="p-2 border rounded w-full"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Вес (г):</label>
                            <input
                                type="number"
                                value={newProduct.weight}
                                onChange={(e) => setNewProduct({ ...newProduct, weight: Number(e.target.value) })}
                                className="p-2 border rounded w-full"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Калории (ккал):</label>
                            <input
                                type="number"
                                value={newProduct.energy_value}
                                onChange={(e) => setNewProduct({ ...newProduct, energy_value: Number(e.target.value) })}
                                className="p-2 border rounded w-full"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Белки (г):</label>
                            <input
                                type="number"
                                value={newProduct.proteins}
                                onChange={(e) => setNewProduct({ ...newProduct, proteins: Number(e.target.value) })}
                                className="p-2 border rounded w-full"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Жиры (г):</label>
                            <input
                                type="number"
                                value={newProduct.fats}
                                onChange={(e) => setNewProduct({ ...newProduct, fats: Number(e.target.value) })}
                                className="p-2 border rounded w-full"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Углеводы (г):</label>
                            <input
                                type="number"
                                value={newProduct.carbohydrates}
                                onChange={(e) => setNewProduct({ ...newProduct, carbohydrates: Number(e.target.value) })}
                                className="p-2 border rounded w-full"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Цена (₽):</label>
                            <input
                                type="number"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                                className="p-2 border rounded w-full"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Количество:</label>
                            <input
                                type="number"
                                value={newProduct.amount}
                                onChange={(e) => setNewProduct({ ...newProduct, amount: Number(e.target.value) })}
                                className="p-2 border rounded w-full"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block mb-2">Изображение:</label>
                            <input
                                type="file"
                                onChange={(e) => e.target.files && setProductImage(e.target.files[0])}
                                className="p-2 border rounded w-full"
                                accept="image/*"
                            />
                        </div>
                    </div>

                    {/* Ингредиенты */}
                    <div className="mb-4 p-4 border rounded">
                        <h3 className="font-bold mb-2">Состав продукта:</h3>

                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newIngredient.name}
                                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                                className="p-2 border rounded flex-1"
                                placeholder="Название ингредиента"
                            />
                            <input
                                type="number"
                                value={newIngredient.quantity}
                                onChange={(e) => setNewIngredient({ ...newIngredient, quantity: Number(e.target.value) })}
                                className="p-2 border rounded w-20"
                                min="1"
                            />
                            <select
                                value={newIngredient.unit}
                                onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                                className="p-2 border rounded"
                            >
                                <option value="г">г</option>
                                <option value="мл">мл</option>
                                <option value="шт">шт</option>
                            </select>
                            <button
                                onClick={addIngredient}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Добавить
                            </button>
                        </div>

                        <div className="space-y-2">
                            {newProduct.ingredients.map((ing, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                    <span className="flex-1">{ing.name}</span>
                                    <span className="w-20 text-right">{ing.quantity}{ing.unit}</span>
                                    <button
                                        onClick={() => removeIngredient(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={saveProduct}
                            className="bg-green-500 text-white px-4 py-2 rounded flex-1"
                            disabled={!token}
                        >
                            {newProduct.id ? 'Обновить' : 'Создать'} продукт
                        </button>

                        {newProduct.id && (
                            <button
                                onClick={resetProductForm}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Новый продукт
                            </button>
                        )}
                    </div>

                    {/* Список продуктов */}
                    <div className="mt-8 border rounded overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 text-left">ID</th>
                                    <th className="p-2 text-left">Название</th>
                                    <th className="p-2 text-left">Категория</th>
                                    <th className="p-2 text-left">Цена</th>
                                    <th className="p-2 text-left">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products
                                    .filter(p => newProduct.category_id === 0 || p.category_id === newProduct.category_id)
                                    .map((product) => (
                                        <tr key={product.id} className="border-t">
                                            <td className="p-2">{product.id}</td>
                                            <td className="p-2">{product.name}</td>
                                            <td className="p-2">
                                                {categories.find(c => c.id === product.category_id)?.name || product.category_id}
                                            </td>
                                            <td className="p-2">{product.price}₽</td>
                                            <td className="p-2 space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setNewProduct({
                                                            ...product,
                                                            ingredients: product.ingredients || []
                                                        });
                                                        window.scrollTo(0, 0);
                                                    }}
                                                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                                                    disabled={!token}
                                                >
                                                    Изменить
                                                </button>
                                                <button
                                                    onClick={() => deleteProduct(product.id!)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                                    disabled={!token}
                                                >
                                                    Удалить
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Пользователи */}
            {activeTab === 'users' && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Управление пользователями</h2>

                    <div className="mb-4 p-4 border rounded">
                        <h3 className="font-bold mb-2">Регистрация/Вход</h3>
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={newUser.phone_number}
                                onChange={(e) => setNewUser({ ...newUser, phone_number: e.target.value })}
                                className="p-2 border rounded w-full"
                                placeholder="Номер телефона"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={sendCode}
                                    className="bg-blue-500 text-white px-4 py-2 rounded flex-1"
                                >
                                    Отправить код
                                </button>
                            </div>
                            <input
                                type="text"
                                value={newUser.code}
                                onChange={(e) => setNewUser({ ...newUser, code: e.target.value })}
                                className="p-2 border rounded w-full"
                                placeholder="Код подтверждения"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={registerUser}
                                    className="bg-green-500 text-white px-4 py-2 rounded flex-1"
                                >
                                    Зарегистрироваться
                                </button>
                                <button
                                    onClick={loginUser}
                                    className="bg-purple-500 text-white px-4 py-2 rounded flex-1"
                                >
                                    Войти
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 text-left">ID</th>
                                    <th className="p-2 text-left">Имя</th>
                                    <th className="p-2 text-left">Фамилия</th>
                                    <th className="p-2 text-left">Телефон</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-t">
                                        <td className="p-2">{user.id}</td>
                                        <td className="p-2">{user.name}</td>
                                        <td className="p-2">{user.surname}</td>
                                        <td className="p-2">{user.phone_number}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Сотрудники */}
            {activeTab === 'employees' && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Управление сотрудниками</h2>

                    <div className="mb-4 p-4 border rounded">
                        <h3 className="font-bold mb-2">Регистрация/Вход</h3>
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={newEmployee.login}
                                onChange={(e) => setNewEmployee({ ...newEmployee, login: e.target.value })}
                                className="p-2 border rounded w-full"
                                placeholder="Логин"
                            />
                            <input
                                type="password"
                                value={newEmployee.password}
                                onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                                className="p-2 border rounded w-full"
                                placeholder="Пароль"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={registerEmployee}
                                    className="bg-green-500 text-white px-4 py-2 rounded flex-1"
                                    disabled={!token}
                                >
                                    Зарегистрировать
                                </button>
                                <button
                                    onClick={loginEmployee}
                                    className="bg-purple-500 text-white px-4 py-2 rounded flex-1"
                                >
                                    Войти
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 text-left">ID</th>
                                    <th className="p-2 text-left">Логин</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.id} className="border-t">
                                        <td className="p-2">{employee.id}</td>
                                        <td className="p-2">{employee.login}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Заказы */}
            {activeTab === 'orders' && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Управление заказами</h2>

                    <div className="mb-4 p-4 border rounded">
                        <h3 className="font-bold mb-2">Создать заказ</h3>
                        <div className="space-y-2">
                            <input
                                type="datetime-local"
                                value={newOrder.completion_datetime}
                                onChange={(e) => setNewOrder({ ...newOrder, completion_datetime: e.target.value })}
                                className="p-2 border rounded w-full"
                            />
                            <div>
                                <h4 className="font-bold mb-2">Продукты:</h4>
                                {products.map(product => (
                                    <div key={product.id} className="flex items-center gap-2 mb-1">
                                        <input
                                            type="checkbox"
                                            checked={newOrder.products.some(p => p.id === product.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setNewOrder({
                                                        ...newOrder,
                                                        products: [...newOrder.products, { id: product.id, quantity: 1 }]
                                                    });
                                                } else {
                                                    setNewOrder({
                                                        ...newOrder,
                                                        products: newOrder.products.filter(p => p.id !== product.id)
                                                    });
                                                }
                                            }}
                                        />
                                        <span className="flex-1">{product.name}</span>
                                        {newOrder.products.some(p => p.id === product.id) && (
                                            <input
                                                type="number"
                                                min="1"
                                                value={newOrder.products.find(p => p.id === product.id)?.quantity || 1}
                                                onChange={(e) => {
                                                    const newProducts = [...newOrder.products];
                                                    const index = newProducts.findIndex(p => p.id === product.id);
                                                    if (index !== -1) {
                                                        newProducts[index].quantity = Number(e.target.value);
                                                        setNewOrder({ ...newOrder, products: newProducts });
                                                    }
                                                }}
                                                className="p-1 border rounded w-16"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={createOrder}
                                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                                disabled={!token || newOrder.products.length === 0}
                            >
                                Создать заказ
                            </button>
                        </div>
                    </div>

                    <div className="border rounded overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 text-left">ID</th>
                                    <th className="p-2 text-left">Пользователь</th>
                                    <th className="p-2 text-left">Статус</th>
                                    <th className="p-2 text-left">Время выполнения</th>
                                    <th className="p-2 text-left">Цена</th>
                                    <th className="p-2 text-left">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-t">
                                        <td className="p-2">{order.id}</td>
                                        <td className="p-2">
                                            {users.find(u => u.id === order.user_id)?.name || order.user_id}
                                        </td>
                                        <td className="p-2">
                                            {order.status_id === 1 && 'Ожидает'}
                                            {order.status_id === 2 && 'Выполнен'}
                                            {order.status_id === 3 && 'Отменен'}
                                        </td>
                                        <td className="p-2">{order.completion_datetime}</td>
                                        <td className="p-2">{order.price}₽</td>
                                        <td className="p-2 space-x-2">
                                            {order.status_id === 1 && (
                                                <>
                                                    <button
                                                        onClick={() => completeOrder(order.id)}
                                                        className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                                                        disabled={!token}
                                                    >
                                                        Завершить
                                                    </button>
                                                    <button
                                                        onClick={() => cancelOrder(order.id)}
                                                        className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                                        disabled={!token}
                                                    >
                                                        Отменить
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => {
                                                    alert(`Продукты: ${JSON.stringify(order.products)}`);
                                                }}
                                                className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                            >
                                                Подробности
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}