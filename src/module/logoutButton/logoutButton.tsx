import { useUser } from '../../context/UserContext';
import { motion } from 'framer-motion';

export default function LogoutButton({ className = '' }: { className?: string }) {
  const { logout } = useUser();

  return (
    <motion.button
      onClick={logout}
      className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Выйти из системы"
    >
      Выйти
    </motion.button>
  );
}