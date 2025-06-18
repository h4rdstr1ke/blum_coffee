import Header from "../module/header/header";
import Guest from "../module/profile/guest";
import History from "../module/profile/history";
import LogoutButton from '../module/logoutButton/logoutButton';
import { useUser } from '../context/UserContext';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { userData } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

  return (
    <div className="">
      <Header />
      <div className="max-w-[1440px] m-auto">
        <Guest />
        {!loading && <History />}
      </div>
      <div className="mt-8 flex justify-end">
        <LogoutButton />
      </div>
    </div>
  );
}