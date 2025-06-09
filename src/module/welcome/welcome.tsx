export default function Welcome() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'calc(100dvh - 5rem)' }}>
      {/* Круги на фоне */}
      <div className="welcome-bg-circle left z-0"></div>
      <div className="welcome-bg-circle right z-0"></div>

      {/* Мобильная версия */}
      <div className="md:hidden flex flex-col items-center justify-center h-full relative z-10">
        <h1 className="text-white font-bold text-3xl text-center mb-8 border-1">
          Добро пожаловать в <span className="text-5xl">Fluffy!</span>
        </h1>

        <img
          src="/image/pancake.png"
          alt="Панкейк Fluffy"
          className="w-[80vw] max-w-[300px] min-w-[180px] my-4 object-contain"
        />

        <p className="text-white font-bold text-2xl text-center pt-30 border-1">
          Вы когда-нибудь пробовали<br />
          десерт, который тает, как облако?
        </p>
      </div>

      {/* Десктопная версия */}
      <div className="welcome-desktop">
        {/* Панкейк */}
        <div className="pancake-container">
          <img
            src="/image/pancake.png"
            alt="Панкейк Fluffy"
            className="pancake-image"
          />
        </div>

        {/* Текст */}
        <div className="text-block ">
          <p className="text-white md:text-[#7EDAFF] font-bold text-[min(4.5vw,45px)] leading-tight">
            Добро пожаловать в <span className="text-[min(6.5vw,65px)]">Fluffy!</span>
          </p>
          <p className="text-white md:text-[#7EDAFF] font-bold text-[min(4.5vw,45px)] leading-tight">
            Вы когда-нибудь пробовали
          </p>
          <p className="text-white md:text-[#7EDAFF] font-bold text-[min(4.5vw,45px)] leading-tight">
            десерт, который тает, как облако?
          </p>
        </div>
      </div>
    </div>
  );
}