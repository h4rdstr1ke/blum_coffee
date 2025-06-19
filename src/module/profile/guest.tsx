import { textStylesGuest } from "../../style/textStyles";
import { useUser } from '../../context/UserContext';

export default function Guest() {
  const { userData, isLoading, error } = useUser();

  if (isLoading) {
    return <div className={textStylesGuest.loadingText}>Загрузка профиля...</div>;
  }

  if (error) {
    return <div className={textStylesGuest.error}>Ошибка: {error}</div>;
  }

  if (!userData) {
    return <div className={textStylesGuest.error}>Данные профиля не найдены</div>;
  }

  return (
    <div className='w-full px-4 mx-auto mt-10 md:mt-20 '>
      <h1 className={textStylesGuest.title}>Профиль</h1>
      <div className='w-full px-4 mx-auto mt-10 md:mt-20 max-w-4xl '>
        <div className={textStylesGuest.label}>
          <div className='flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-8'>
            <div className='flex flex-col md:flex-row gap-6 md:gap-8 w-full'>
              <div className='flex-1'>
                <input
                  type="text"
                  name="first_name"
                  value={userData.name}
                  readOnly
                  className={`${textStylesGuest.input} cursor-default`}
                  placeholder='Имя'
                />
              </div>
              <div className='flex-1'>
                <input
                  type="text"
                  name="last_name"
                  value={userData.surname}
                  readOnly
                  className={`${textStylesGuest.input}cursor-default`}
                  placeholder='Фамилия'
                />
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-6 md:gap-8 w-full'>
              <div className='flex-1'>
                <input
                  type="email"
                  name="email"
                  value=""
                  readOnly
                  className={`${textStylesGuest.input}border cursor-default`}
                  placeholder='Email (недоступно)'
                />
              </div>
              <div className='flex-1'>
                <input
                  type="tel"
                  name="phone_number"
                  value={userData.phone_number}
                  readOnly
                  className={`${textStylesGuest.input}  cursor-default`}
                  placeholder='Номер телефона'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}