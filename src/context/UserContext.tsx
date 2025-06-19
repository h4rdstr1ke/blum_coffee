import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProfileData {
    name: string;
    surname: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    email?: string;
    is_employee?: boolean;
}

interface UserContextType {
    userData: ProfileData | null;
    isLoading: boolean;
    error: string | null;
    clearError: () => void;
    loadUserData: () => Promise<void>;
    isEmployee: boolean;
    logout: () => void;
    loginEmployee: (login: string, password: string) => Promise<void>;
    sendCode: (phone: string) => Promise<void>;
    loginUser: (phone: string, code: string) => Promise<void>;
    registerUser: (phone: string, code: string, name: string, surname: string) => Promise<void>;
}

const API_BASE_URL = "http://193.23.219.155:4747/api/v1";
const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEmployee, setIsEmployee] = useState(false);
    const clearError = () => {
        setError(null);
    };

    const loadUserData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('user_token');
            const employeeToken = localStorage.getItem('employee_token');

            if (employeeToken) {
                const response = await fetch(`${API_BASE_URL}/user`, {
                    headers: {
                        'Authorization': `Bearer ${employeeToken}`,
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) throw new Error('Ошибка загрузки данных сотрудника');

                const data = await response.json();
                setUserData({
                    name: data.login,
                    surname: '',
                    phone_number: '',
                    first_name: data.login,
                    last_name: '',
                    is_employee: true
                });
                setIsEmployee(true);
                return;
            }

            if (!token) throw new Error('Вы не авторизованы');

            const response = await fetch(`${API_BASE_URL}/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Ошибка загрузки данных');

            const data = await response.json();
            setUserData({
                ...data,
                first_name: data.name,
                last_name: data.surname,
                is_employee: false
            });
            setIsEmployee(false);
        } catch (err) {
            if (err instanceof Error && err.message !== 'Вы не авторизованы') {
                logout();
            }
            setError(err instanceof Error ? err.message : 'Ошибка загрузки');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('user_token');
        localStorage.removeItem('employee_token');
        setUserData(null);
        setIsEmployee(false);
        window.location.href = '/login';
    };

    const sendCode = async (phone: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/send-code`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phone_number: phone })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка отправки кода');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка отправки кода');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const loginUser = async (phone: string, code: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone_number: phone,
                    code: parseInt(code)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка входа');
            }

            localStorage.setItem('user_token', data.token);
            await loadUserData();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка входа');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const registerUser = async (phone: string, code: string, name: string, surname: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone_number: phone,
                    code: parseInt(code),
                    name,
                    surname
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка регистрации');
            }

            localStorage.setItem('user_token', data.token);
            await loadUserData();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка регистрации');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const loginEmployee = async (login: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/login-employee`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка входа сотрудника');
            }

            localStorage.setItem('employee_token', data.token);
            await loadUserData();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка входа сотрудника');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <UserContext.Provider value={{
            userData,
            isLoading,
            error,
            clearError,
            loadUserData,
            isEmployee,
            logout,
            loginEmployee,
            sendCode,
            loginUser,
            registerUser
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
}
