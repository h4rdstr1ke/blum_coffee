import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProfileData } from '../types';

type UserContextType = {
    userData: ProfileData;
    loadUserData: () => Promise<void>;
    saveUserData: (data: ProfileData) => Promise<boolean>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState<ProfileData>({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: ''
    });

    const loadUserData = async () => {
        // Заменить на API-вызов
        const mockData: ProfileData = {
            first_name: 'Иван',
            last_name: 'Иванов',
            email: 'ivan@example.com',
            phone_number: '+790012345677'
        };
        setUserData(mockData);
    };

    const saveUserData = async (data: ProfileData) => {
        // Заменить на API-вызов
        setUserData(data);
        return true;
    };

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <UserContext.Provider value={{ userData, loadUserData, saveUserData }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}