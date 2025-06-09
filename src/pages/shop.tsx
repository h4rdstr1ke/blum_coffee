import Header from "../module/header/header"
import About from "../module/shop_components/about/about"
import MenuSection from "../module/shop_components/menu/MenuSection"
import Cart from "../module/shop_components/cart/cart"

export default function ShopPage() {
  return (
    <div className="w-full m-auto">
      <Header />
      <About />
      <MenuSection />
      <Cart />
    </div>
  )
}