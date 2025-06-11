export default function OrderCommentSection({ deliveryOption, setDeliveryOption }: any) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Комментарий к заказу</h2>
            <textarea
                value={deliveryOption.comment}
                onChange={(e) => setDeliveryOption({ ...deliveryOption, comment: e.target.value })}
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Например, особые пожелания"
            />
        </div>
    );
}