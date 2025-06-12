import { cartStyles } from '../../style/textStyles';

export default function OrderCommentSection({ deliveryOption, setDeliveryOption }: any) {
    return (
        <div className={cartStyles.userInfoContainer}>
            <h2 className={cartStyles.sectionTitle}>Комментарий к заказу</h2>
            <textarea
                value={deliveryOption.comment}
                onChange={(e) => setDeliveryOption({ ...deliveryOption, comment: e.target.value })}
                className={cartStyles.textarea}
                rows={3}
                placeholder="Например, особые пожелания"
            />
        </div>
    );
}