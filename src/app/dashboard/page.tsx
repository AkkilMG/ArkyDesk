"use client";

import { useRouter } from "next/navigation";
import Detail from "@/components/dashboard/detail";
import MainLayout from "@/components/dashboard/main";
import SideNav from "@/components/dashboard/sideNav";
import AccountSettings from "@/components/settings/settings";
import TicketCreate from "@/components/ticket/create";
import { useEffect, useState } from "react";


export default function Dashboard() {
    const [create, setCreate] = useState(false);
    const [settings, setSettings] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const auth = true;
    const router = useRouter();
    
    useEffect(() => {
        if (!auth) {
            router.push("/signin");
        }
    }, [auth, router]);

    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    
    async function handleAdmin() {
        try {
            setAdminLoading(true);
            const res = await fetch('/api/auth/verify', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data.success) {
                setAdmin(data.admin || false);
            } else {
                console.error('Verify failed:', data.message);
                setAdmin(false);
            }
        } catch (error) {
            console.error('Error verify out:', error);
            setAdmin(false);
        } finally {
            setAdminLoading(false);
        }
    }

    useEffect(() => {
        handleAdmin();
    }, []);

    useEffect(() => {
        if (!adminLoading && !admin) {
            router.push("/tickets");
        }
    }, [admin, adminLoading, router]);

    const [details, setDetails] = useState(null);
    
      async function getDetails() {
        try {
          const res = await fetch("/api/auth/details", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          if (data.success) {
            setDetails(data.details);
          } else {
            console.error("details failed:", data.message);
          }
        } catch (error) {
          console.error("Error during details:", error);
        }
      }
      useEffect(() => {
        getDetails();
      }, []);

    return (
        <>
        {create && (
            <TicketCreate create={create} setCreate={setCreate} />  
        )}
        { 
            <AccountSettings details={details} settings={settings} setSettings={setSettings} />
        }
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <div className="hidden sm:block sm:w-64 lg:w-72 xl:w-80 shadow-xl bg-white flex-shrink-0">
                <SideNav create={create} setCreate={setCreate} settings={settings} setSettings={setSettings} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </div>
            
            {/* Mobile Sidebar Overlay */}
            <div className="sm:hidden">
                <SideNav create={create} setCreate={setCreate} settings={settings} setSettings={setSettings} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </div>

            {/* Main content */}
            <div className="flex-1 bg-gray-50 h-screen overflow-hidden min-w-0">
                <MainLayout isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </div>

            {/* <Detail /> */}
        </div>
        </>
       
    );
}