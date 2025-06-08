import { useState, useEffect } from 'react';
import { mockProfile, mockSaveProfile, mockLoadProfile, ProfileData } from '../../mockData/profileMock';
import { textStylesGuest } from "../../style/textStyles";

export default function Guest() {
  const [formData, setFormData] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const data = await mockLoadProfile();
        setFormData(data);
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await mockSaveProfile(formData);
      if (result.success) {
        alert("Профиль успешно сохранён!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      alert("Ошибка при сохранении профиля!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  if (isLoading && !isEditing) {
    return <div className={textStylesGuest.loadingText}>Загрузка профиля...</div>;
  }

  return (
    <div className='w-full px-4 mx-auto mt-10'>
      <h1 className={textStylesGuest.title}>
        Профиль
      </h1>
      <div className='w-full px-4 mx-auto max-w-4xl'>
        <form onSubmit={handleSubmit} className={textStylesGuest.label}>
          <div className='flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-8'>
            <div className='flex flex-col md:flex-row gap-6 md:gap-8 w-full'>
              <div className='flex-1'>
                <input
                  type="text"
                  name="first_name"
                  className={textStylesGuest.input}
                  placeholder='Имя'
                  value={formData.first_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className='flex-1'>
                <input
                  type="text"
                  name="last_name"
                  className={textStylesGuest.input}
                  placeholder='Фамилия'
                  value={formData.last_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-6 md:gap-8 w-full'>
              <div className='flex-1'>
                <input
                  type="email"
                  name="email"
                  className={textStylesGuest.input}
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className='flex-1'>
                <input
                  type="tel"
                  name="phone_number"
                  className={textStylesGuest.input}
                  placeholder='Номер телефона'
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={handleEdit}
                className={textStylesGuest.buttonEdit}
                disabled={isLoading}
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
                  onClick={handleCancel}
                  className={textStylesGuest.buttonCancel}
                  disabled={isLoading}
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