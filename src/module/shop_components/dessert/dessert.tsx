import Item from "./components/item"

type Props = {}

export default function Dessert({ }: Props) {
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
    }
  ]
  
  

  return (
    <div className="w-full">
      <div className='fon3 ' />
        <div className='text-2xl font-bold text-center text-[#FFFFFF] text-[55px]'>
            <p>Мы экспериментируем, чтобы дарить вам новые</p>
            <p>вкусовые эмоции.</p>
        </div>

        <div className='mt-[29px] text-2xl font-bold text-center mb-2 text-[#7EDAFF] text-[43px]'>
            <p>Дессерты</p>
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