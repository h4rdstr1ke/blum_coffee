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

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Order {
    id: number;
    date: string;
    total: number;
    items: OrderItem[];
}

export interface ProfileData {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}