import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { JSX, lazy, Suspense } from 'react';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import ScrollToTop from './module/scrolltotop/ScrollToTop';
import './style/index.css';
import '../public/fonts/FormaDJRCyrillic_Web/fonts.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/shop'));
const Profile = lazy(() => import('./pages/profile'));
const CartPage = lazy(() => import('./pages/CartPage'));
const AdminPanel = lazy(() => import('./module/shop_components/menu/AdminPanel'));
const EmployeeOrdersPage = lazy(() => import('./pages/EmployeeOrdersPage'));
const RegPage = lazy(() => import('./pages/reg'));

const PrivateRoute = ({ children, role }: { children: JSX.Element, role: 'user' | 'employee' }) => {
  const userToken = localStorage.getItem('user_token');
  const employeeToken = localStorage.getItem('employee_token');

  if (role === 'user' && !userToken) return <Navigate to="/login" replace />;
  if (role === 'employee' && !employeeToken) return <Navigate to="/login" replace />;

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <UserProvider>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Загрузка...</div>}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/login" element={<RegPage />} />

              {/* Пользовательские маршруты */}
              <Route path="/profile" element={
                <PrivateRoute role="user">
                  <Profile />
                </PrivateRoute>
              } />

              <Route path="/cart" element={
                <PrivateRoute role="user">
                  <CartPage />
                </PrivateRoute>
              } />

              {/* Маршруты сотрудника */}
              <Route path="/admin" element={
                <PrivateRoute role="employee">
                  <AdminPanel />
                </PrivateRoute>
              } />

              <Route path="/employee/orders" element={
                <PrivateRoute role="employee">
                  <EmployeeOrdersPage />
                </PrivateRoute>
              } />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </UserProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;