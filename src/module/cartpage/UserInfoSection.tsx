export default function UserInfoSection({ userData }: any) {
    return (
        <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-4">Данные покупателя</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border">
                <div>
                    <label className="block text-gray-700 mb-1">Имя</label>
                    <input
                        type="text"
                        value={userData.first_name}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Фамилия</label>
                    <input
                        type="text"
                        value={userData.last_name}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={userData.email}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Телефон</label>
                    <input
                        type="tel"
                        value={userData.phone_number}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
            </div>
        </div>
    );
}