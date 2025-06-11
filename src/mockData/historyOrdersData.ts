import { Order } from '../types/index';

export const historyOrdersData: Order[] = [
    {
        id: 1,
        date: "21.12.2022",
        items: [
            {
                id: 1,
                name: "Панкейк клубника",
                price: 600,
                quantity: 2,
                image: "/images/pancake-strawberry.jpg"
            },
            {
                id: 2,
                name: "Панкейк крем-брюле",
                price: 620,
                quantity: 1,
                image: "/images/pancake-creme-brulee.jpg"
            }
        ]
    },
    {
        id: 2,
        date: "15.01.2023",
        items: [
            {
                id: 3,
                name: "Панкейк клубника-матча",
                price: 650,
                quantity: 1,
                image: "/images/pancake-strawberry-matcha.jpg"
            },
            {
                id: 4,
                name: "Панкейк нутелла банан",
                price: 680,
                quantity: 2,
                image: "/images/pancake-nutella-banana.jpg"
            }
        ]
    }
];