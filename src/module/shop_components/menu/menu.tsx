import Item from "./components/item"

type Props = {}

export default function Menu({}: Props) {
  const items = [
      {
          id: 1,
          title: 'Панкейк клубника',
          price: '640₽',
          src: '/image/pank1.png'
      },
      {
          id: 2,
          title: 'Панкейк крем-брюле',
          price: '640₽',
          src: '/image/pank2.png'
      },
      {
          id: 3,
          title: 'Панкейк клубника-матча',
          price: '680₽',
          src: '/image/pank3.png'
      },

      {
        id: 4,
        title: 'Панкейк клубника',
        price: '640₽',
        src: '/image/pank1.png'
      },
      {
          id: 5,
          title: 'Панкейк крем-брюле',
          price: '640₽',
          src: '/image/pank2.png'
      },
      {
          id: 6,
          title: 'Панкейк клубника-матча',
          price: '680₽',
          src: '/image/pank3.png'
      },

      {
        id: 7,
        title: 'Панкейк клубника',
        price: '640₽',
        src: '/image/pank1.png'
      },
      {
          id: 8,
          title: 'Панкейк крем-брюле',
          price: '640₽',
          src: '/image/pank2.png'
      },
      {
          id: 9,
          title: 'Панкейк клубника-матча',
          price: '680₽',
          src: '/image/pank3.png'
      },

      {
        id: 10,
        title: 'Панкейк клубника-матча',
        price: '680₽',
        src: '/image/pank3.png'
    }


  ]

  
  

  return (
    <div className="w-full">
        <p className='text-2xl font-bold text-center mb-[34px] text-[#FD744C] text-[43px]'>Меню</p>
        <div className='fon3 ' />
        <div className='text-2xl font-bold text-center mb-2 text-[#FFFFFF] text-[55px] mt-[43px]'>
            <p>Панкейки, тающие во рту — легкие, как утренний</p>
            <p> ветерок, с хрустящей корочкой и воздушные внутри.</p>
        </div>

        <div className='mt-[68px] text-2xl font-bold text-center mb-2 text-[#7EDAFF] text-[43px]'>
            <p>Японские панкейки</p>
        </div>

        <div>
        <div className="mt-10 grid grid-cols-3 gap-3 justify-items-center">
                {items.map((item) => {
                    return (
                        <Item key={item.id} item={item} />
                    )
                })}
            </div>
        </div>
    </div>
  );
}