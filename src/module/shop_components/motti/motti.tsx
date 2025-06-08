import Item from "./components/item"

type Props = {}

export default function Motti({ }: Props) {
  const items =[
    {
      id: 1,
      title: 'Панкейк клубника',
      price: '640₽',
      src: '/image/pank1.png'
    },
    {
      id: 2,
      title: 'Панкейк клубника',
      price: '640₽',
      src: '/image/pank1.png'
    },
    {
      id: 3,
      title: 'Панкейк клубника',
      price: '640₽',
      src: '/image/pank1.png'
    },
    {
      id: 4,
      title: 'Панкейк клубника',
      price: '640₽',
      src: '/image/pank1.png'
    },
    {
        id: 5,
        title: 'Панкейк клубника',
        price: '640₽',
        src: '/image/pank1.png'
      },
      {
        id: 6,
        title: 'Панкейк клубника',
        price: '640₽',
        src: '/image/pank1.png'
      },
      {
        id: 7,
        title: 'Панкейк клубника',
        price: '640₽',
        src: '/image/pank1.png'
      },
  ]
  
  

  return (
    <div className="w-full">
      <div className='fon3 ' />
        <div className='text-2xl font-bold text-center text-[#FFFFFF] text-[55px]'>
            <p>Моти — как маленькие облачка, которые тают во</p>
            <p>рту. Успейте попробовать все вкусы! </p>
        </div>

        <div className='mt-[29px] text-2xl font-bold text-center mb-2 text-[#7EDAFF] text-[43px]'>
            <p>Мотти</p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 justify-items-center">
                {items.map((item) => {
                    return (
                        <Item key={item.id} item={item} />
                    )
                })}
            </div>
    </div>
  );
}