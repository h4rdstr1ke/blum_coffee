export default function DeliveryTimeSection({ deliveryOption, setDeliveryOption }: any) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Время получения</h2>
            <div className="space-y-4">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        checked={deliveryOption.time === 'asap'}
                        onChange={() => setDeliveryOption({ ...deliveryOption, time: 'asap' })}
                        className="h-4 w-4"
                    />
                    <span>Как можно скорее</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        checked={deliveryOption.time === 'later'}
                        onChange={() => setDeliveryOption({ ...deliveryOption, time: 'later' })}
                        className="h-4 w-4"
                    />
                    <span>К определенному времени</span>
                </label>
                {deliveryOption.time === 'later' && (
                    <input
                        type="time"
                        value={deliveryOption.customTime}
                        onChange={(e) => setDeliveryOption({ ...deliveryOption, customTime: e.target.value })}
                        className="p-2 border rounded"
                    />
                )}
            </div>
        </div>
    );
}