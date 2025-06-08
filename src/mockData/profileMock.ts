// Тип для данных профиля
export type ProfileData = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
};

// Моковые данные пользователя
export const mockProfile: ProfileData = {
    first_name: "Иван",
    last_name: "Иванов",
    email: "ivan@example.com",
    phone_number: "+79001234567",
};

// Моковая функция сохранения профиля
export const mockSaveProfile = (data: ProfileData): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Моковые данные отправлены:", data);
            resolve({ success: true });
        }, 800); // Имитация задержки сети
    });
};

// Моковая функция загрузки профиля
export const mockLoadProfile = (): Promise<ProfileData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProfile);
        }, 500);
    });
};