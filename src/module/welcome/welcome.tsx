import { textStylesWelcome } from "../../style/textStyles";
export default function Welcome() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'calc(100dvh - 5rem)' }}>
      {/* Круги на фоне */}
      <div className="welcome-bg-circle left z-0"></div>
      <div className="welcome-bg-circle right z-0"></div>

      {/* Мобильная версия */}
      <div className="md:hidden flex flex-col items-center justify-center h-full relative z-10">
        <h1 className={`${textStylesWelcome.mobileTitle}`}>
          Добро пожаловать в <span className={`${textStylesWelcome.mobileTitleAccent}`}>Fluffy!</span>
        </h1>

        <img
          src="/image/pancake.png"
          alt="Панкейк Fluffy"
          className={`${textStylesWelcome.pancakeImage}`}
        />

        <p className={`${textStylesWelcome.mobileSubtitle}`}>
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
            className={`${textStylesWelcome.pancakeImage} md:w-[50vw] md:max-w-[600px]`}
          />
        </div>

        {/* Текст */}
        <div className="text-block">
          <p className={`${textStylesWelcome.desktopTitle}`}>
            Добро пожаловать в <span className={`${textStylesWelcome.desktopTitleAccent}`}>Fluffy!</span>
          </p>
          <p className={`${textStylesWelcome.desktopSubtitle}`}>
            Вы когда-нибудь пробовали
          </p>
          <p className={`${textStylesWelcome.desktopSubtitle}`}>
            десерт, который тает, как облако?
          </p>
        </div>
      </div>
    </div>
  );
}