import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/shop';
import Profile from './pages/profile';
import CartPage from './pages/CartPage';
import RegPage from './pages/reg';
import { CartProvider } from './context/CartContext'; // провайдер
import { UserProvider } from './context/UserContext';
import './style/index.css';
import '../public/fonts/FormaDJRCyrillic_Web/fonts.css';
import AdminPanel from './module/shop_components/menu/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <UserProvider>
          <Routes>
            <Route path="/reg" element={<RegPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </UserProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;