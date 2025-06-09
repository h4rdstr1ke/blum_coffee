import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { textStylesHeader } from '../../style/textStyles';

type Props = {}

export default function Header({ }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Анимации для мобильного меню
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <header className={`${textStylesHeader.header} relative z-30`}>
      {/* ПК-версия */}
      <div className={`${textStylesHeader.desktopContainer}`}>
        <Link to="/">
          <img src="/image/logo.png" alt="Логотип" className={textStylesHeader.logo} />
        </Link>

        <div className={textStylesHeader.navContainer}>
          <div className={textStylesHeader.scheduleContainer}>
            <div className={textStylesHeader.scheduleTitle}>ГРАФИК РАБОТЫ</div>
            <div className={textStylesHeader.scheduleTime}>ПН-ВС 10:00-22:00</div>
          </div>

          <Link to="/shop" className={textStylesHeader.navLink}>ДОСТАВКА</Link>
          <Link to="/shop" className={textStylesHeader.navLink}>МЕНЮ</Link>
          <a className={textStylesHeader.navLink} href="#contacts">КОНТАКТЫ</a>

          <Link to="/profile">
            <motion.div
              className={textStylesHeader.userIconContainer}
              whileHover={{
                scale: 1.1,
                rotate: 5,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                scale: { type: "spring", stiffness: 300 },
                rotate: { duration: 0.2 }
              }}
            >
              <img src="/image/user.png" alt="" className="h-full w-auto" />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Мобильная версия */}
      <div className={textStylesHeader.mobileContainer}>
        <img src="/image/logo.png" alt="FLUFFY" className={textStylesHeader.mobileLogo} />

        <div className={textStylesHeader.mobileSchedule}>
          ГРАФИК РАБОТЫ<br />
          ПН-ВС 10:00-22:00
        </div>

        <motion.button
          onClick={toggleMenu}
          className={textStylesHeader.menuButton}
          animate={isMenuOpen ? "open" : "closed"}
        >
          <motion.span
            className={textStylesHeader.menuLine}
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 6 : 0
            }}
          />
          <motion.span
            className={textStylesHeader.menuLine}
            animate={{ opacity: isMenuOpen ? 0 : 1 }}
          />
          <motion.span
            className={textStylesHeader.menuLine}
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -6 : 0
            }}
          />
        </motion.button>
      </div>

      {/* Мобильное меню с анимацией */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className={textStylesHeader.mobileMenu}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={toggleMenu}
              className={textStylesHeader.closeMenuButton}
              aria-label="Закрыть меню"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <Link
              to="/shop"
              className={textStylesHeader.mobileMenuItem}
              onClick={toggleMenu}
            >
              ДОСТАВКА
            </Link>
            <Link
              to="/shop"
              className={textStylesHeader.mobileMenuItem}
              onClick={toggleMenu}
            >
              МЕНЮ
            </Link>
            <a
              href="#contacts"
              className={textStylesHeader.mobileMenuItem}
              onClick={toggleMenu}
            >
              КОНТАКТЫ
            </a>
            <Link
              to="/profile"
              className={textStylesHeader.mobileMenuItem}
              onClick={toggleMenu}
            >
              ПРОФИЛЬ
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}