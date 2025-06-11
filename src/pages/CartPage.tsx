import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import Header from "../module/header/header";
import UserInfoSection from "../module/cartpage/UserInfoSection";
import DeliveryTimeSection from "../module/cartpage/DeliveryTimeSection";
import PaymentMethodSection from "../module/cartpage/PaymentMethodSection";
import OrderCommentSection from "../module/cartpage/OrderCommentSection";
import CartItemsSection from "../module/cartpage/CartItemsSection";
import Footer from "../module/footer/footer";

export default function CartPage() {
    const {
        items,
        removeFromCart,
        updateQuantity,
        totalPrice,
        clearCart,
        totalItems
    } = useCart();

    const { userData } = useUser();
    const [deliveryOption, setDeliveryOption] = useState({
        time: 'asap',
        customTime: '',
        payment: 'cash',
        comment: ''
    });

    const handleSubmitOrder = () => {
        const orderData = {
            user: userData,
            items,
            total: totalPrice,
            pickup: {
                time: deliveryOption.time === 'asap' ? 'Как можно скорее' : deliveryOption.customTime,
                payment: deliveryOption.payment,
                comment: deliveryOption.comment
            },
            date: new Date().toLocaleDateString()
        };

        console.log('Order submitted:', orderData);
        alert(`Заказ на сумму ${totalPrice}₽ оформлен!`);
        clearCart();
    };

    return (
        <div className="">
            <Header />
            <h1 className="text-3xl font-bold mb-6">Оформление заказа (самовывоз)</h1>

            <div className="max-w-[1440px] mx-auto">
                <div className="">
                    <UserInfoSection userData={userData} />
                    <DeliveryTimeSection
                        deliveryOption={deliveryOption}
                        setDeliveryOption={setDeliveryOption}
                    />
                    <PaymentMethodSection
                        deliveryOption={deliveryOption}
                        setDeliveryOption={setDeliveryOption}
                    />
                    <OrderCommentSection
                        deliveryOption={deliveryOption}
                        setDeliveryOption={setDeliveryOption}
                    />
                </div>

                <div className="">
                    <CartItemsSection
                        items={items}
                        totalItems={totalItems}
                        totalPrice={totalPrice}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                        handleSubmitOrder={handleSubmitOrder}
                    />
                </div>
            </div>
            <Footer />
        </div>

    );
}