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

  return (
    <div className="w-full mx-auto py-10 md:py-20 relative overflow-x-hidden min-h-[300px] md:min-h-[600px]">
      {/* ПК-версия */}
      {!isMobile && (
        <>
          {/* Левый овал */}
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
          
          {/* Правый овал */}
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

          {/* Moti для ПК */}
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

          {/* Cat для ПК */}
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
        {/* Текстовый блок */}
        <div className="mb-4 md:mb-8 w-full flex items-center justify-center relative">
          {/* Голубой фон (только для мобильных) */}
          {isMobile && (
            <div className="absolute w-[120%] h-[140%] bg-[#7EDAFF] -z-10 rounded-[40px]" 
                 style={{ 
                   left: '50%',
                   top: '50%',
                   transform: 'translate(-50%, -50%)'
                 }} />
          )}
          
          {/* Мобильный moti (только для мобильных) */}
          {isMobile && (
            <div className="relative" style={{ 
              width: `${mobileDecorSize}px`,
              marginRight: '8px'
            }}>
              <img 
                src="/image/moti.svg"
                alt=""
                className="select-none pointer-events-none"
                style={{ 
                  height: `${mobileDecorSize}px`,
                  transform: 'translateX(-30%)'
                }}
              />
            </div>
          )}
          
          <div className="text-center px-2 z-10 flex-1">
            <h2 className="text-2xl md:text-[42px] lg:text-[50px] font-bold leading-snug md:leading-tight text-white md:text-[#7EDAFF]">
              Удобное расположение в центре Екатеринбурга в вашем любимом торговом центре Гринвич!
            </h2>
          </div>
          
          {/* Мобильный cat (только для мобильных) */}
          {isMobile && (
            <div className="relative" style={{ 
              width: `${mobileDecorSize}px`,
              marginLeft: '8px'
            }}>
              <img 
                src="/image/cat.svg"
                alt=""
                className="select-none pointer-events-none"
                style={{ 
                  height: `${mobileDecorSize}px`,
                  transform: 'translateX(30%)'
                }}
              />
            </div>
          )}
        </div>

        {/* Адрес */}
        <p className="text-xl md:text-[32px] lg:text-[40px] text-center mb-6 md:mb-12 text-[#FD744C] font-medium">
          ул. 8 марта, 46; 3 этаж; фуд-маркет Estory
        </p>

        {/* Карта */}
        <div className="relative w-full max-w-[90vw] md:max-w-[50vw] mx-auto select-none pointer-events-none"
             style={{ borderRadius: '30px', border: '4px solid #FD744C' }}>
          <img 
            src="/image/map.svg" 
            alt="Карта расположения" 
            className="relative z-10 w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}