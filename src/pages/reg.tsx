import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function RegPage() {
    const {
        loginUser,
        registerUser,
        loginEmployee,
        sendCode,
        isLoading,
        error
    } = useUser();
    const navigate = useNavigate();

    const [mode, setMode] = useState<'login' | 'register' | 'employee'>('login');
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [login, setLogin] = useState('admin');
    const [password, setPassword] = useState('admin');
    const [codeSent, setCodeSent] = useState(false);

    const handleSendCode = async () => {
        try {
            await sendCode(phone);
            setCodeSent(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogin = async () => {
        try {
            await loginUser(phone, code);
            navigate('/profile');
        } catch (err) {
            console.error(err);
        }
    };

    const handleRegister = async () => {
        try {
            await registerUser(phone, code, name, surname);
            navigate('/profile');
        } catch (err) {
            console.error(err);
        }
    };

    const handleEmployeeLogin = async () => {
        try {
            await loginEmployee(login, password);
            navigate('/admin');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">
                    {mode === 'employee' ? 'Вход для сотрудников' :
                        mode === 'register' ? 'Регистрация' : 'Вход в систему'}
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {mode === 'employee' ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Логин</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                            <input
                                type="password"
                                className="w-full p-2 border rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleEmployeeLogin}
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? 'Вход...' : 'Войти как сотрудник'}
                        </button>
                    </div>
                ) : codeSent ? (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Код отправлен на номер {phone}
                        </p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Код подтверждения</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Введите код из SMS"
                            />
                        </div>

                        {mode === 'register' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Введите ваше имя"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        placeholder="Введите вашу фамилию"
                                    />
                                </div>
                            </>
                        )}

                        <button
                            onClick={mode === 'register' ? handleRegister : handleLogin}
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? 'Проверка...' : mode === 'register' ? 'Зарегистрироваться' : 'Войти'}
                        </button>

                        <button
                            onClick={() => setCodeSent(false)}
                            className="w-full text-blue-600 hover:text-blue-800 text-sm"
                        >
                            Изменить номер телефона
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Номер телефона</label>
                            <input
                                type="tel"
                                className="w-full p-2 border rounded"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+7 (999) 999-99-99"
                            />
                        </div>
                        <button
                            onClick={handleSendCode}
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? 'Отправка...' : 'Получить код'}
                        </button>
                    </div>
                )}

                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        onClick={() => {
                            setMode('login');
                            setCodeSent(false);
                        }}
                        className={`text-sm ${mode === 'login' ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600'}`}
                    >
                        Вход
                    </button>
                    <button
                        onClick={() => {
                            setMode('register');
                            setCodeSent(false);
                        }}
                        className={`text-sm ${mode === 'register' ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600'}`}
                    >
                        Регистрация
                    </button>
                    <button
                        onClick={() => {
                            setMode('employee');
                            setCodeSent(false);
                        }}
                        className={`text-sm ${mode === 'employee' ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600'}`}
                    >
                        Сотрудник
                    </button>
                </div>
            </div>
        </div>
    );
}