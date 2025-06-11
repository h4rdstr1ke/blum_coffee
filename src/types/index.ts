export interface Product {
    id: number;
    title: string;
    price: number;
    src: string;
    info?: {
        weight: string;
        composition: string[];
        calories: string;
        proteins: string;
        fats: string;
        carbs: string;
    };
}

export interface CartItem extends Product {
    quantity: number;
}

export interface HistoryOrderItem {
    id: number;
    name: string;
    price: number; // Цена на момент заказа
    quantity: number;
    image: string;
}

export interface Order {
    id: number;
    date: string;
    items: HistoryOrderItem[];
}

export interface ProfileData {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}

// типы для доставки
export interface DeliveryOptions {
    timeOption: 'asap' | 'later';
    deliveryTime: string;
    paymentMethod: 'cash' | 'card';
    address?: string;
    comment?: string;
}

export interface OrderDetails {
    user: ProfileData;
    items: CartItem[];
    delivery: DeliveryOptions;
    total: number;
}