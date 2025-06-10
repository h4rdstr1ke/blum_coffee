export const submitOrder = async (orderData: any) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Order submitted:', orderData);
            resolve({ success: true, orderId: Math.floor(Math.random() * 1000000) });
        }, 1000);
    });
};