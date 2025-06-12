import { cartStyles } from '../../style/textStyles';

export default function UserInfoSection({ userData }: any) {
    return (
        <div className={cartStyles.userInfoContainer}>
            <h2 className={cartStyles.sectionTitle}>Данные покупателя</h2>
            <div className={cartStyles.userInfoGrid}>
                <div>
                    <input
                        type="text"
                        value={userData.first_name}
                        readOnly
                        className={cartStyles.inputField}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={userData.last_name}
                        readOnly
                        className={cartStyles.inputField}
                    />
                </div>
                <div>
                    <input
                        type="email"
                        value={userData.email}
                        readOnly
                        className={cartStyles.inputField}
                    />
                </div>
                <div>
                    <input
                        type="tel"
                        value={userData.phone_number}
                        readOnly
                        className={cartStyles.inputField}
                    />
                </div>
            </div>
        </div>
    );
}