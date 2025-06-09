import Header from "../module/header/header"
import About from "../module/shop_components/about/about"
import MenuSection from "../module/shop_components/menu/MenuSection"
import Cart from "../module/shop_components/cart/cart"
import Footer from "../module/footer/footer"

export default function ShopPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <About />
      <div className="w-full px-4">
        <MenuSection />
      </div>
      <Cart />
      <Footer />
    </div>
  )
}