import Item from "./components/item"

type Props = {}

export default function Drink({ }: Props) {
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
    }
  ]
  
  

  return (
    <div className="w-full">
      <div className='fon4 ' />
        <div className='text-2xl font-bold text-center text-[#FFFFFF] text-[55px]'>
            <p>Напитки с сырной пенкой — неожиданно, </p>
            <p>волшебно, восхитительно. Это как десерт и </p>
            <p>напиток в одном глотке. </p>
        </div>

        <div className='mt-[29px] text-2xl font-bold text-center mb-2 text-[#7EDAFF] text-[43px]'>
            <p>Напитки</p>
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