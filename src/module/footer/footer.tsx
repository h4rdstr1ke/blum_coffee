import { Link } from 'react-router-dom';
import { textStylesFooter } from '../../style/textStyles';
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
export default function Footer() {
  return (
    <footer id="contacts" className="w-full px-4 md:px-0 py-8 md:py-12 bg-white mt-10 md:mt-35">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Логотип и соцсети */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/image/logo2.png"
            alt="Логотип"
            className="w-40 md:w-[266px] pb-6 md:pb-[55px]"
          />
          <div className="flex gap-4 md:gap-6">
            <a href="#" aria-label="Telegram">
              <img src="/image/tg.png" alt="Telegram" className="w-8 md:w-10" />
            </a>
            <a href="#" aria-label="TikTok">
              <img src="/image/tt.png" alt="TikTok" className="w-8 md:w-10" />
            </a>
            <a href="#" aria-label="Instagram">
              <img src="/image/inst.png" alt="Instagram" className="w-8 md:w-10" />
            </a>
          </div>
        </div>

        {/* Часы работы */}
        <div className="flex flex-col items-center md:items-start">
          <p className={`${textStylesFooter.footerText}`}>Ждём вас у нас</p>
          <p className={textStylesFooter.footerText}>c 10:00 до 22:00</p>
        </div>

        {/* Основные ссылки */}
        <div className="flex flex-col items-center md:items-start gap-2 md:gap-4">
          <Link
            to="/"
            className={textStylesFooter.footerLink}
            onClick={scrollToTop}
          >
            Главная
          </Link>
          <Link
            to="/shop"
            className={textStylesFooter.footerLink}
            onClick={scrollToTop}
          >
            Меню
          </Link>

          <Link
            to="/cart"
            className={textStylesFooter.footerLink}
            onClick={scrollToTop}
          >
            Доставка
          </Link>
        </div>

        {/* Контакты */}
        <div className="flex flex-col items-center md:items-start gap-2 md:gap-4">
          <a href="https://fluffyfluffy.ru/" target='blank_' className={textStylesFooter.footerLink}>Сайт франшизы</a>
          <a href="tel:89052313855" className={textStylesFooter.footerLink}>8 (905) 231 38 55</a>
          <p className={`${textStylesFooter.footerLink} caret-transparent`}>Разработчики блум</p>
        </div>
      </div>
    </footer>
  );
}