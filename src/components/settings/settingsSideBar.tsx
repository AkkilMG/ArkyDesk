


// export default function SettingsSideBar({ profile, setProfile, account, setAccount, dangerous, setDangerous }: any) {
//     function handleClick(index: number) {
//         if (index === 0) {
//             setProfile(true);
//             setAccount(false);
//             setDangerous(false);
//         } else if (index === 1) {
//             setProfile(false);
//             setAccount(true);
//             setDangerous(false);
//         } else {
//             setProfile(false);
//             setAccount(false);
//             setDangerous(true);
//         }
//     }
//     return (
//         <div className="w-1/4 p-4 shadow-md">
//             <h2 className="pl-4 pt-10 mb-6 text-lg font-bold">Account</h2>
//             <ul className="pl-4 space-y-4 text-gray-700 cursor-pointer">
//                 <li className={`${ profile ? 'text-green-400' : ''}`} onClick={(e) => handleClick(0)}>Profile</li>
//                 <li className={`${ account ? 'text-green-400' : ''}`} onClick={e => handleClick(1)}>Account</li>
//                 <li className="mt-6 font-bold cursor-default">Danger Zone</li>
//                 <li className={`${ dangerous ? 'text-green-400' : ''}`} onClick={e => handleClick(2)}>Dangerous</li>
//             </ul>
//         </div>
//     )
// }



// settingsSideBar
interface SettingsSideBarProps {
    profile: boolean;
    setProfile: (value: boolean) => void;
    account: boolean;
    setAccount: (value: boolean) => void;
    dangerous: boolean;
    setDangerous: (value: boolean) => void;
    isMobile: boolean;
    isAdmin?: boolean;
}

export default function SettingsSideBar({
    profile,
    setProfile,
    account,
    setAccount,
    dangerous,
    setDangerous,
    isMobile,
    isAdmin = false,
}: SettingsSideBarProps) {
    function handleClick(index: number) {
      if (index === 0) {
        setProfile(true);
        setAccount(false);
        setDangerous(false);
      } else if (index === 1) {
        setProfile(false);
        setAccount(true);
        setDangerous(false);
      } else {
        setProfile(false);
        setAccount(false);
        setDangerous(true);
      }
    }
  
    return isMobile ? (
      <div className="w-full border-b md:border-b-0 md:w-1/4 p-4 shadow-md bg-white">
        <h2 className="pl-6 pt-4 pb-4 md:pt-10 mb-2 md:mb-6 text-xl font-bold">Settings</h2>
        <ul className="flex justify-around md:flex-col sm:pl-4 space-y-0 md:space-y-4 text-gray-700 cursor-pointer">
          <li className={`${profile ? "text-blue-600 font-semibold" : "hover:text-gray-900"} w-full text-center md:text-left py-2`} onClick={(e) => handleClick(0)}> 
            Profile
          </li>
          <li className={`${account ? "text-blue-600 font-semibold" : "hover:text-gray-900"} w-full text-center md:text-left py-2`} onClick={(e) => handleClick(1)}>
            Account
          </li>
          <li className={`${dangerous ? "text-red-600 font-semibold" : "hover:text-red-600"} w-full text-center md:text-left py-2 md:mt-6 md:border-t md:pt-4`} onClick={(e) => handleClick(2)}>
            Danger Zone
          </li>
        </ul>
      </div>
    ) : (
      <div className="w-1/4 p-4 shadow-md bg-white">
        <h2 className="pl-4 pt-10 mb-6 text-lg font-bold">Settings</h2>
        <ul className="pl-4 space-y-4 text-gray-700 cursor-pointer">
          <li className={`${profile ? "text-blue-600 font-semibold border-r-2 border-blue-600 pr-4" : "hover:text-gray-900"} py-2`} onClick={(e) => handleClick(0)}>
            Profile
          </li>
          <li className={`${account ? "text-blue-600 font-semibold border-r-2 border-blue-600 pr-4" : "hover:text-gray-900"} py-2`} onClick={(e) => handleClick(1)}>
            Account
          </li>
          <li className="mt-6 font-bold cursor-default text-gray-500 border-t pt-4">Danger Zone</li>
          <li className={`${dangerous ? "text-red-600 font-semibold border-r-2 border-red-600 pr-4" : "hover:text-red-600"} py-1`} onClick={(e) => handleClick(2)}>
            Delete Account
          </li>
        </ul>
      </div>
    );
  }
  