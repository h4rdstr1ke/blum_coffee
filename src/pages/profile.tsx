import Header from "../module/header/header"
import Guest from "../module/profile/guest"
import History from "../module/profile/history"


type Props = {}

export default function Profile({ }: Props) {
  return (
    <div className="max-w-[1543px] m-auto ">
      <Header />
      <Guest />
      <History />
    </div>
  )
}