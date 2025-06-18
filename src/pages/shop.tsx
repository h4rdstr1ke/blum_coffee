import Header from "../module/header/header";
import About from "../module/shop_components/about/about";
import MenuSection from "../module/shop_components/menu/MenuSection";
import Cart from "../module/shop_components/cart/cart";
import Footer from "../module/footer/footer";
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ShopPage() {
  const { isEmployee } = useUser();

  return (
    <div className="w-full flex flex-col items-center">
      <Header />

      {/* Админ-панель только для сотрудников */}
      {isEmployee && (
        <div className="w-full flex justify-end px-4 py-2">
          <Link
            to="/admin"
            className="bg-[#7EDAFF] text-xl text-white text-center w-[20%] px-4 py-2 rounded-lg hover:bg-[#2fb0e6] transition-colors forma-textBold"
          >
            Админ-панель
          </Link>
        </div>
      )}

      <About />
      <div className="w-full px-4">
        <MenuSection />
      </div>
      <Cart />
      <Footer />
    </div>
  );
}