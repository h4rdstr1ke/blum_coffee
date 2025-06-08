import Header from "../module/header/header"
import Welcome from "../module/welcome/welcome"
import Delivery from "../module/delivery/delivery"
import Location from "../module/location/location"
import Footer from "../module/footer/footer"

type Props = {}

export default function HomePage({ }: Props) {
  return (
    <div className="max-w-[] m-auto ">
      <Header />
      <Welcome />
      <Delivery />
      <Location />
      <Footer />
    </div>
  )
}