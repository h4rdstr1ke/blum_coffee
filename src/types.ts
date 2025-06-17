// Общие типы для всего приложения

export type Product = {
    id: number;
    title: string;
    price: number;
    src: string;
    info?: ProductInfo;
};

export type ProductInfo = {
    weight: string;
    composition: string[];
    calories: string;
    proteins: string;
    fats: string;
    carbs: string;
};

export type CartItem = Product & {
    quantity: number;
};

export type OrderItem = {
    id: number;
    image: string;
    name: string;
    quantity: number;
    price: number;
};

export type HistoryOrder = {
    id: number;
    date: string;
    total: number;
    items: OrderItem[];
};

export interface ProfileData {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
};