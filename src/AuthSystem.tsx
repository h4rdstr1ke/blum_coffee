import { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    surname: string;
    phone_number: string;
}

interface Employee {
    id: number;
    login: string;
}

const API_BASE_URL = 'http://193.23.219.155:4747/api/v1';

export default function AuthSystem() {
    // Состояния для форм пользователя
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [codeSent, setCodeSent] = useState(false);

    // Состояния для формы сотрудника
    const [employeeLogin, setEmployeeLogin] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [isEmployeeLogin, setIsEmployeeLogin] = useState(false);

    // Состояния пользователя/сотрудника
    const [user, setUser] = useState<User | null>(null);
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Проверка авторизации при загрузке
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const isEmployee = localStorage.getItem('isEmployee') === 'true';
            if (isEmployee) {
                fetchEmployee();
            } else {
                fetchUser();
            }
        }
    }, []);

    // Отправка кода на телефон (для пользователя)
    const sendCode = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/send-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    phone_number: phone
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке кода');
            }

            setCodeSent(true);
            return await response.json();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Регистрация пользователя
    const register = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    surname,
                    phone_number: phone,
                    code
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка при регистрации');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('isEmployee', 'false');
            setUser({
                id: data.user.id,
                name: data.user.name,
                surname: data.user.surname,
                phone_number: data.user.phone_number
            });

            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Вход пользователя
    const login = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    phone_number: phone,
                    code
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка при входе');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('isEmployee', 'false');
            setUser({
                id: data.user.id,
                name: data.user.name,
                surname: data.user.surname,
                phone_number: data.user.phone_number
            });

            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Получение данных пользователя
    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/user`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении данных пользователя');
            }

            const data = await response.json();
            setUser(data);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            localStorage.removeItem('token');
            localStorage.removeItem('isEmployee');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Вход для сотрудника
    const loginEmployee = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/login-employee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    login: employeeLogin,
                    password: employeePassword
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка входа для сотрудника');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('isEmployee', 'true');
            setEmployee({
                id: data.employee.id,
                login: data.employee.login
                // Добавьте другие поля сотрудника по необходимости
            });

            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Получение данных сотрудника
    const fetchEmployee = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/employee-data`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении данных сотрудника');
            }

            const data = await response.json();
            setEmployee(data);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            localStorage.removeItem('token');
            localStorage.removeItem('isEmployee');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Выход
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isEmployee');
        setUser(null);
        setEmployee(null);
        setPhone('');
        setCode('');
        setName('');
        setSurname('');
        setEmployeeLogin('');
        setEmployeePassword('');
        setCodeSent(false);
        setIsEmployeeLogin(false);
        setIsRegistering(false);
    };

    // Если сотрудник авторизован
    if (employee) {
        return (
            <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
                <h2 className="text-xl font-bold mb-4">Панель сотрудника</h2>
                <div className="space-y-2">
                    <p><span className="font-semibold">Логин:</span> {employee.login}</p>
                    <p><span className="font-semibold">ID:</span> {employee.id}</p>
                    {/* Добавьте другие поля сотрудника по необходимости */}
                </div>
                <button
                    onClick={logout}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                    Выйти
                </button>
            </div>
        );
    }

    // Если пользователь авторизован
    if (user) {
        return (
            <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
                <h2 className="text-xl font-bold mb-4">Профиль пользователя</h2>
                <div className="space-y-2">
                    <p><span className="font-semibold">Имя:</span> {user.name}</p>
                    <p><span className="font-semibold">Фамилия:</span> {user.surname}</p>
                    <p><span className="font-semibold">Телефон:</span> {user.phone_number}</p>
                </div>
                <button
                    onClick={logout}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                    Выйти
                </button>
            </div>
        );
    }

    // Форма входа для сотрудника
    if (isEmployeeLogin) {
        return (
            <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
                <h2 className="text-xl font-bold mb-4">Вход для сотрудника</h2>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={(e) => { e.preventDefault(); loginEmployee(); }} className="space-y-4">
                    <div>
                        <label className="block mb-1">Логин</label>
                        <input
                            type="text"
                            value={employeeLogin}
                            onChange={(e) => setEmployeeLogin(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="employee"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Пароль</label>
                        <input
                            type="password"
                            value={employeePassword}
                            onChange={(e) => setEmployeePassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
                    >
                        {loading ? 'Вход...' : 'Войти'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => setIsEmployeeLogin(false)}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Вход для пользователей
                    </button>
                </div>
            </div>
        );
    }

    // Форма авторизации/регистрации для пользователей
    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">
                {isRegistering ? 'Регистрация' : 'Вход'}
            </h2>

            {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); codeSent ? (isRegistering ? register() : login()) : sendCode(); }} className="space-y-4">
                <div>
                    <label className="block mb-1">Номер телефона</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="79999999999"
                        required
                    />
                </div>

                {codeSent && (
                    <>
                        <div>
                            <label className="block mb-1">Код из SMS</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="123456"
                                required
                            />
                        </div>

                        {isRegistering && (
                            <>
                                <div>
                                    <label className="block mb-1">Имя</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-2 border rounded"
                                        placeholder="Иван"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Фамилия</label>
                                    <input
                                        type="text"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        className="w-full p-2 border rounded"
                                        placeholder="Иванов"
                                        required
                                    />
                                </div>
                            </>
                        )}
                    </>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading
                        ? 'Обработка...'
                        : codeSent
                            ? (isRegistering ? 'Зарегистрироваться' : 'Войти')
                            : 'Получить код'}
                </button>
            </form>

            <div className="mt-4 flex justify-between">
                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    {isRegistering
                        ? 'Уже есть аккаунт? Войти'
                        : 'Нет аккаунта? Зарегистрироваться'}
                </button>

                <button
                    onClick={() => setIsEmployeeLogin(true)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    Вход для сотрудников
                </button>
            </div>
        </div>
    );
}