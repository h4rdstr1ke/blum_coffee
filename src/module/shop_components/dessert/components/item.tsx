type Props = {
    item: {
        id: number,
        title: string,
        src: string,
        price: string,
    }
}

export default function Item({ item }: Props) {

    return (
        <div className={`w-full flex flex-col items-start p-[25px] mb-[75px] flex max-w-[444px] h-[660px] rounded-[30px] bg-[#7EDAFFD9] relative `}>
            <img src={item.src} alt="" className="w-full max-w-[391px] h-[347px] object-cover rounded-[20px] mb-4" />
            <div className="absolute top-[317px] right-[33px] w-[50px] h-[50px] flex items-center justify-center z-10">
                <a href="">
                    <img src="/image/info.png" className=""></img>
                </a>
            </div>
            <div className="w-full flex flex-col flex-grow px-3 pb-4 justify-end">
                <div className="w-full flex flex-col items-start">
                    <p className="text-[#FFFFFF] font-bold text-2xl text-[42px]">{item.title}</p>
                </div>
                <div className="w-full flex justify-end mb-4">
                    <p className="text-[#FFFFFF] font-bold text-2xl text-[46px]">{item.price}</p>
                </div>
                <div className="w-full flex justify-center">
                    <button className="bg-[#39C6FF] text-white font-bold rounded-[20px] w-[275px] h-[58px] text-[40px] text-center">
                        + Добавить
                    </button>
                </div>
            </div>
        </div>
    )
}