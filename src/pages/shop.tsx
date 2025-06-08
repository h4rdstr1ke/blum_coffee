import Header from "../module/header/header"
import About from "../module/shop_components/about/about"
import Menu from "../module/shop_components/menu/menu"
import Chessee from "../module/shop_components/cheasecake/chessee"
import Drink from "../module/shop_components/drink/drink"
import Motti from "../module/shop_components/motti/motti"
import Dessert from "../module/shop_components/dessert/dessert"
import Cart from "../module/shop_components/cart/cart"
//import Footer from "../module/shop_components/footer/footer"

type Props = {}

export default function ShopPage({ }: Props) {
  return (
    <div className="w-full  m-auto">
      <Header />
      <About />
      <Menu />
      <Chessee />
      <Drink />
      <Motti />
      <Dessert />
      <Cart />
    </div>
  )
} 