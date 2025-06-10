import { useState, useEffect } from 'react';
import { mockProfile, mockSaveProfile, mockLoadProfile, ProfileData } from '../../mockData/profileMock';
import { textStylesGuest } from "../../style/textStyles";
import { useUser } from '../../context/UserContext';

export default function Guest() {
  const { userData, loadUserData } = useUser();
  const [formData, setFormData] = useState<ProfileData>({ ...userData });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({ ...userData });
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await mockSaveProfile(formData);
      if (result.success) {
        await loadUserData();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading && !isEditing) {
    return <div className={textStylesGuest.loadingText}>Загрузка профиля...</div>;
  }

  return (
    <div className='w-full px-4 mx-auto mt-10'>
      <h1 className={textStylesGuest.title}>Профиль</h1>
      <div className='w-full px-4 mx-auto max-w-4xl'>
        <form onSubmit={handleSubmit} className={textStylesGuest.label}>
          <div className='flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-8'>
            <div className='flex flex-col md:flex-row gap-6 md:gap-8 w-full'>
              <div className='flex-1'>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={textStylesGuest.input}
                  placeholder='Имя'
                />
              </div>
              <div className='flex-1'>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={textStylesGuest.input}
                  placeholder='Фамилия'
                />
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-6 md:gap-8 w-full'>
              <div className='flex-1'>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={textStylesGuest.input}
                  placeholder='Email'
                />
              </div>
              <div className='flex-1'>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={textStylesGuest.input}
                  placeholder='Номер телефона'
                />
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className={textStylesGuest.buttonEdit}
              >
                Редактировать
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className={textStylesGuest.buttonSave}
                  disabled={isLoading}
                >
                  {isLoading ? 'Сохранение...' : 'Сохранить'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={textStylesGuest.buttonCancel}
                >
                  Отмена
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}