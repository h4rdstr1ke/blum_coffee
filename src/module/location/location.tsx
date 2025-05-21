import { useState, useEffect } from 'react';

type Props = {}

export default function Location({ }: Props) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSize = (baseSize: number, mobileRatio = 0.3) => {
    if (windowWidth < 768) return Math.floor(baseSize * mobileRatio);
    if (windowWidth < 1024) return Math.floor(baseSize * 0.7);
    return baseSize;
  };

  const decorSize = getSize(450);
  const ovalWidth = getSize(800, 0.5);
  const ovalHeight = getSize(1000, 0.5);
  const ovalOffset = getSize(500, 0.4);
  const mobileDecorSize = getSize(250, 0.5);

  const isMobile = windowWidth < 768;
  const sectionSpacing = 'mb-10';

  // Функция для открытия карты
  const openYandexMaps = () => {
    window.open('https://yandex.ru/maps/org/fluffy/44775412100/?indoorLevel=1&ll=60.599189%2C56.829107&z=17.68', '_blank');
  };

  return (
    <div className="w-full mx-auto py-10 md:py-20 relative overflow-x-hidden min-h-[300px] md:min-h-[600px]">
      {/* ПК-элементы */}
      {!isMobile && (
        <>
          <svg 
            className="absolute z-0"
            style={{
              left: `-${ovalOffset}px`,
              top: `calc(50% + 150px - ${ovalHeight/2}px)`,
              width: `${ovalWidth}px`,
              height: `${ovalHeight}px`
            }}
            viewBox={`0 0 ${ovalWidth} ${ovalHeight}`}
          >
            <ellipse cx={ovalWidth/2} cy={ovalHeight/2} rx={ovalWidth/2} ry={ovalHeight/2} fill="#7EDAFF" />
          </svg>
          
          <svg 
            className="absolute z-0"
            style={{
              right: `-${ovalOffset}px`,
              top: `calc(50% + 150px - ${ovalHeight/2}px)`,
              width: `${ovalWidth}px`,
              height: `${ovalHeight}px`
            }}
            viewBox={`0 0 ${ovalWidth} ${ovalHeight}`}
          >
            <ellipse cx={ovalWidth/2} cy={ovalHeight/2} rx={ovalWidth/2} ry={ovalHeight/2} fill="#7EDAFF" />
          </svg>

          <img 
            src="/image/moti.svg" 
            alt=""
            className="absolute z-20 select-none pointer-events-none"
            style={{
              left: '0',
              top: 'calc(50% + 150px)',
              height: `${decorSize}px`,
              transform: 'translate(-50%, -50%) rotate(30deg)'
            }}
          />

          <img 
            src="/image/cat.svg"
            alt=""
            className="absolute z-20 select-none pointer-events-none"
            style={{
              right: '0',
              top: 'calc(50% + 150px)',
              height: `${decorSize}px`,
              transform: 'translate(40%, -50%) rotate(-18deg)'
            }}
          />
        </>
      )}

      {/* Основной контент */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center max-w-[1440px] mx-auto px-4">
        {/* Заголовок с фоном */}
        <div className={`w-full ${sectionSpacing} relative`}>
          {isMobile && (
            <div 
              className="absolute w-[200%] h-[120%] bg-[#7EDAFF] -z-10"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50% / 50%'
              }}
            />
          )}
          
          {isMobile ? (
            <div className="flex items-center justify-center relative">
              <img 
                src="/image/moti.svg"
                alt=""
                className="absolute left-0 z-20"
                style={{ 
                  height: `${mobileDecorSize}px`,
                  transform: 'translateX(-50%) rotate(18deg)'
                }}
              />
              
              <h2 className="text-2xl font-bold leading-snug text-white mx-[60px] text-center">
                Удобное расположение в центре Екатеринбурга в вашем любимом торговом центре Гринвич!
              </h2>
              
              <img 
                src="/image/cat.svg"
                alt=""
                className="absolute right-0 z-20"
                style={{ 
                  height: `${mobileDecorSize}px`,
                  transform: 'translateX(40%) rotate(-5deg)'
                }}
              />
            </div>
          ) : (
            <h2 className="text-[42px] lg:text-[50px] font-bold leading-tight text-[#7EDAFF] text-center">
              Удобное расположение в центре Екатеринбурга в вашем любимом торговом центре Гринвич!
            </h2>
          )}
        </div>

        {/* Адрес */}
        <div className={`w-full ${sectionSpacing}`}>
        <p className={`text-xl md:text-[32px] lg:text-[40px] text-center mb-6 md:mb-12 font-medium ${
  isMobile ? 'text-[#7EDAFF]' : 'text-[#FD744C]'
}`}>
            ул. 8 марта, 46; 3 этаж; фуд-маркет Estory
          </p>
        </div>

        {/* Карта - кликабельная */}
        <div 
  className="relative w-full max-w-[90vw] md:max-w-[50vw] mx-auto cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
  style={{ 
    borderRadius: isMobile ? '50px' : '30px',
    border: '4px solid #FD744C',
    overflow: 'hidden' 
  }}
  onClick={openYandexMaps}
>
  <img 
    src="/image/map.svg" 
    className="w-full h-full object-cover" 
    alt="Карта" 
  />
</div>
      </div>
    </div>
  );
}