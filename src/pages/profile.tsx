import Header from "../module/header/header";
import Guest from "../module/profile/guest";
import History from "../module/profile/history";
import { historyOrdersData } from '../mockData/historyOrdersData';
/*import ApiTester from '../ApiTester';*/
/*import ApiTester from '../ApiTesterMenu';*/
import AuthSystem from '../AuthSystem';

export default function Profile() {
  return (
    <div className="">
      <Header />
      <div className="max-w-[1440px] m-auto">
        <Guest />
        <History orders={historyOrdersData} />
      </div>
      <AuthSystem />
    </div>
  );
}