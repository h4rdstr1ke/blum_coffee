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
    loadUserData: () => Promise<void>;
    isEmployee: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEmployee, setIsEmployee] = useState(false);

    const loadUserData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('user_token');
            if (!token) throw new Error('Пользователь не авторизован');

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
                last_name: data.surname
            });
            setIsEmployee(!!data.is_employee);
        } catch (err) {
            localStorage.removeItem('user_token');
            setError(err instanceof Error ? err.message : 'Ошибка загрузки');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <UserContext.Provider value={{ userData, isLoading, error, loadUserData, isEmployee }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
}