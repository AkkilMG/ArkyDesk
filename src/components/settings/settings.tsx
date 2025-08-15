// "use client";
// import { useState } from "react";
// import SettingsSideBar from './settingsSideBar';
// import SettingsAccount from './settingsAccount';
// import SettingsProfile from './settingsProfile';
// import SettingsDangerous from './settingsDangerous';

// export default function AccountSettings({ settings, setSettings }: any) {
//     const [profile, setProfile] = useState(true);
//     const [account, setAccount] = useState(false);
//     const [dangerous, setDangerous] = useState(false);
//     var data = [profile, account, dangerous];

//     return (
//         <div className={`fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center z-50 ${settings ? 'block': 'hidden'}`} style={{ zIndex: 1000 }}>
//             <div className="flex w-screen h-screen p-12 rounded-md">
//                 <div className="flex w-full h-full rounded-2xl bg-white">
//                     <SettingsSideBar profile={profile} setProfile={setProfile} account={account} setAccount={setAccount} dangerous={dangerous} setDangerous={setDangerous} />
//                     {profile && (<SettingsProfile settings={settings} setSettings={setSettings} />)}
//                     {account && (<SettingsAccount settings={settings} setSettings={setSettings} />)}
//                     {dangerous && (<SettingsDangerous settings={settings} setSettings={setSettings} />)}
//                 </div>
//             </div>
//         </div>
//     );
// }
  

// settings
"use client";
import { useState, useEffect } from "react";
import SettingsSideBar from "./settingsSideBar";
import SettingsAccount from "./settingsAccount";
import SettingsProfile from "./settingsProfile";
import SettingsDangerous from "./settingsDangerous";
import type { UserDetails, SettingsProps } from "@/types/settings";

export default function AccountSettings({ details, settings, setSettings }: SettingsProps) {
  const [profile, setProfile] = useState(true);
  const [account, setAccount] = useState(false);
  const [dangerous, setDangerous] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const isAdmin = details?.admin || false;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Close modal with escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && settings) {
        setSettings(false);
      }
    };

    if (settings) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [settings, setSettings]);

  // Reset to profile tab when opening settings
  useEffect(() => {
    if (settings) {
      setProfile(true);
      setAccount(false);
      setDangerous(false);
    }
  }, [settings]);

  const activeComponent = () => {
    if (profile) return <SettingsProfile details={details} settings={settings} setSettings={setSettings} isMobile={isMobile} />;
    if (account) return <SettingsAccount details={details} settings={settings} setSettings={setSettings} isMobile={isMobile} />;
    if (dangerous) return <SettingsDangerous settings={settings} setSettings={setSettings} isMobile={isMobile} />;
    return null;
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSettings(false);
    }
  };

  if (!settings) return null;

  return (
    <div 
      className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center z-50"
      style={{ zIndex: 1000 }}
      onClick={handleBackdropClick}
    >
      <div className="flex w-screen h-screen p-4 md:p-12 rounded-md">
        <div className="flex flex-col md:flex-row w-full h-full rounded-2xl bg-white shadow-2xl overflow-hidden relative">
          {/* Close button - always visible on top right */}
          <button 
            onClick={(e) => setSettings(false)} 
            className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <img src="/icons/close.svg" className="h-5 w-5" alt="Close" />
          </button>
          
          {isMobile ? (
            <>
              <SettingsSideBar 
                profile={profile} 
                setProfile={setProfile} 
                account={account} 
                setAccount={setAccount} 
                dangerous={dangerous} 
                setDangerous={setDangerous} 
                isMobile={isMobile}
                isAdmin={isAdmin}
              />
              <div className="w-full overflow-y-auto">{activeComponent()}</div>
            </>
          ) : (
            <>
              <SettingsSideBar 
                profile={profile} 
                setProfile={setProfile} 
                account={account} 
                setAccount={setAccount} 
                dangerous={dangerous} 
                setDangerous={setDangerous} 
                isMobile={isMobile}
                isAdmin={isAdmin}
              />
              <div className="flex-1 overflow-y-auto">{activeComponent()}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
