export default function PaymentMethodSection({ deliveryOption, setDeliveryOption }: any) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Способ оплаты</h2>
            <div className="space-y-2">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        checked={deliveryOption.payment === 'cash'}
                        onChange={() => setDeliveryOption({ ...deliveryOption, payment: 'cash' })}
                        className="h-4 w-4"
                    />
                    <span>Наличными при получении</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        checked={deliveryOption.payment === 'card'}
                        onChange={() => setDeliveryOption({ ...deliveryOption, payment: 'card' })}
                        className="h-4 w-4"
                    />
                    <span>Картой онлайн</span>
                </label>
            </div>
        </div>
    );
}