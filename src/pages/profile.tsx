import Header from "../module/header/header"
import Guest from "../module/profile/guest"
import History from "../module/profile/history"


type Props = {}

export default function Profile({ }: Props) {
  return (
    <div className="">
      <Header />
      <div className="max-w-[1440px] m-auto">
        <Guest />
        <History />
      </div>
    </div>
  )
}