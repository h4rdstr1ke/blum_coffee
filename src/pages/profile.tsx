import Header from "../module/header/header";
import Guest from "../module/profile/guest";
import History from "../module/profile/history";
import { historyOrdersData } from '../mockData/historyOrdersData';

export default function Profile() {
  return (
    <div className="">
      <Header />
      <div className="max-w-[1440px] m-auto">
        <Guest />
        <History orders={historyOrdersData} />
      </div>
    </div>
  );
}