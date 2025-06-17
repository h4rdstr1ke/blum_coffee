import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/shop';
import Profile from './pages/profile';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import './style/index.css';
import '../public/fonts/FormaDJRCyrillic_Web/fonts.css';
import AdminPanel from './module/shop_components/menu/AdminPanel';
import EmployeeOrdersPage from './pages/EmployeeOrdersPage';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/employee/orders" element={<EmployeeOrdersPage />} />
          </Routes>
        </UserProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;