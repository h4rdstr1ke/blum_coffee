type Props = {}

export default function Welcome({ }: Props) {
    return (
        <div className="w-full px-4 py-8 relative overflow-hidden">
            {/* Основные круги на фоне */}
            <div className="absolute left-[calc(0%-450px)] top-[calc(10%-300px)] w-[1200px] h-[1200px] bg-[#7EDAFF] rounded-full"></div>
            <div className="absolute right-[calc(0%-200px)] bottom-[calc(70%-70px)] w-[1200px] h-[1200px] bg-[#7EDAFF] rounded-full"></div>

            {/* Мобильная версия (показывается только на маленьких экранах) */}
            <div className="md:hidden flex flex-col items-center relative z-10">
                {/* Заголовок сверху */}
                <h1 className="text-[#7EDAFF] font-bold text-3xl text-center mb-8 ">
                    Добро пожаловать в <span className="text-5xl">Fluffy!</span>
                </h1>
                
                {/* Картинка посередине */}
                <img 
                    src="/image/pancake.png" 
                    alt="Панкейк Fluffy" 
                    className="max-w-[200px] my-4"
                />
                
                {/* Текст под картинкой */}
                <p className="text-[#7EDAFF] font-bold text-2xl text-center">
                    Вы когда-нибудь пробовали<br />
                    десерт, который тает, как облако?
                </p>
            </div>

            {/* Десктопная версия (показывается на средних и больших экранах) */}
            <div className="hidden md:flex w-full p-4 items-center justify-between relative z-10">
                {/* Картинка слева */}
                <img 
                    src="/image/pancake.png" 
                    alt="Панкейк Fluffy" 
                    className="mt-[150px]" 
                />
                
                {/* Текст справа */}
                <div className="flex flex-col items-center justify-center mt-[343px] text-center ml-[50px]">
                    <p className="text-[#7EDAFF] font-bold text-[45px] leading-tight">
                        Добро пожаловать в <span className="text-[64px]">Fluffy!</span>
                    </p>
                    <p className="text-[#7EDAFF] font-bold text-[45px] leading-tight">
                        Вы когда-нибудь пробовали
                    </p>
                    <p className="text-[#7EDAFF] font-bold text-[45px] leading-tight">
                        десерт, который тает, как облако?
                    </p> 
                </div>
            </div>
        </div>
    )
}