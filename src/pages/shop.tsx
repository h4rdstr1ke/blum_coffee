import Header from "../module/header/header"
import About from "../module/shop_components/about/about"
import MenuSection from "../module/shop_components/menu/MenuSection"
import Cart from "../module/shop_components/cart/cart"
import Footer from "../module/footer/footer"
import { Link } from 'react-router-dom';

export default function ShopPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <Link to="/admin" className="ml-4 text-sm font-medium text-gray-700 hover:text-gray-900">
        Админ-панель
      </Link>
      <About />
      <div className="w-full px-4">
        <MenuSection />
      </div>
      <Cart />
      <Footer />
    </div>
  )
}