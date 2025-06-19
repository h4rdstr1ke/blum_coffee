import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { textStylesHeader } from '../../style/textStyles';
import { textStylesHeaderModal } from '../../style/textStyles';
import { useUser } from '../../context/UserContext';

type Props = {}

export default function Header({ }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { isEmployee, userData, logout } = useUser();
  const isAuthenticated = !!userData;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    if (isMenuOpen) toggleMenu();
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };



  return (
    <header className={`${textStylesHeader.header} relative z-30`}>
      {/* Подтверждение выхода */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            className={textStylesHeaderModal.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={textStylesHeaderModal.modalContainer}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <h3 className={textStylesHeaderModal.modalTitle}>Вы точно хотите выйти?</h3>
              <div className={textStylesHeaderModal.buttonContainer}>
                <button
                  onClick={cancelLogout}
                  className={textStylesHeaderModal.cancelButton}
                >
                  Отмена
                </button>
                <button
                  onClick={confirmLogout}
                  className={textStylesHeaderModal.confirmButton}
                >
                  Выйти
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

          {isEmployee ? (
            <Link to="/employee/orders" className={textStylesHeader.navLink}>ЗАКАЗЫ</Link>
          ) : (
            <Link to="/cart" className={textStylesHeader.navLink}>ДОСТАВКА</Link>
          )}
          <Link to="/shop" className={textStylesHeader.navLink}>МЕНЮ</Link>
          <Link
            to="footer"
            className={textStylesHeader.navLink}
          >
            КОНТАКТЫ </Link>

          <div className="flex flex-col items-center gap-1">
            {isEmployee ? (
              // Для сотрудников - только кнопка выхода
              <motion.button
                onClick={handleLogoutClick}
                className={``}
                whileHover={{
                  scale: 1.05,
                }}

              >
                ВЫХОД
              </motion.button>
            ) : (
              // Для обычных пользователей - иконка профиля
              <>
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
                {isAuthenticated && (
                  <button
                    onClick={handleLogoutClick}
                    className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Выход
                  </button>
                )}
              </>
            )}
          </div>
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
        {isMenuOpen && !showLogoutConfirm && (
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

            {isEmployee ? (
              <Link to="/employee/orders" className={textStylesHeader.mobileMenuItem}
                onClick={toggleMenu}>
                ЗАКАЗЫ
              </Link>
            ) : (
              <Link to="/cart"
                className={textStylesHeader.mobileMenuItem}
                onClick={toggleMenu}>
                ДОСТАВКА
              </Link>
            )}
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
            {isAuthenticated && (
              <button
                onClick={handleLogoutClick}
                className={`${textStylesHeader.mobileMenuItem} text-red-400`}
              >
                ВЫЙТИ
              </button>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
