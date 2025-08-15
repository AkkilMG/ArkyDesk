'use client';

import { useEffect, useState, useCallback } from "react";
import AccountSettings from "@/components/settings/settings";
import TicketDetails from "@/components/ticket/details";
import TicketsLists from "@/components/ticket/list";
import TicketCreate from "@/components/ticket/create";
import SideNav from "@/components/dashboard/sideNav";
import { useRealtime } from "@/lib/RealtimeContext";
// import TicketInfo from "@/components/ticket/info";


export default function TicketsPage() {
    const [create, setCreate] = useState(false);
    const [settings, setSettings] = useState(false);
    const [ticketId, setTicketId] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Get real-time connection
    const { isConnected, connectionError, lastUpdate, reconnect } = useRealtime();
    
    // Filter and search states - moved from child component to maintain state
    // Initialize from sessionStorage to persist state across navigations
    const [filter, setFilter] = useState(() => {
        if (typeof window !== "undefined") {
            return sessionStorage.getItem('ticketFilter') || "all";
        }
        return "all";
    });
    const [search, setSearch] = useState(() => {
        if (typeof window !== "undefined") {
            return sessionStorage.getItem('ticketSearch') || "";
        }
        return "";
    });

    // Persist filter and search to sessionStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem('ticketFilter', filter);
        }
    }, [filter]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem('ticketSearch', search);
        }
    }, [search]);

    const [admin, setAdmin] = useState<boolean | null>(null);
    const handleAdmin = useCallback(async () => {
        try {
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
        }
    }, []);
  

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    const fetchTickets = useCallback(async (silent = false) => {
        try {
            if (!silent) {
                setLoading(true);
                setError('');
            } else {
                setIsRefreshing(true);
            }
            const response = await fetch(admin ? '/api/admin-dashboard/tickets' : '/api/dashboard/tickets', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            if (result.success) {
                setData(result.tickets || []);
            } else {
                setError(result.message || 'Failed to fetch tickets');
            }
        } catch (error: any) {
            console.error('Error fetching tickets:', error);
            if (!silent) {
                setError('Unable to load tickets. Please check your connection.');
            }
        } finally {
            if (!silent) {
                setLoading(false);
            } else {
                setIsRefreshing(false);
            }
        }
    }, [admin]);

    const [details, setDetails] = useState<any>(null);
    const [detailsLoading, setDetailsLoading] = useState(true);

    const getDetails = useCallback(async () => {
        try {
            setDetailsLoading(true);
            const res = await fetch("/api/auth/details", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json();
            if (data.success) {
                setDetails(data.details);
            } else {
                console.error("Details failed:", data.message);
            }
        } catch (error) {
            console.error("Error during details fetch:", error);
        } finally {
            setDetailsLoading(false);
        }
    }, []);    
    
    const [fetchComment, setFetchComment] = useState<any[]>([]);

    const fetchComments = useCallback(async () => {
        if (!ticketId) return; // Early return if no ticket selected
        
        try {
            const res = await fetch("/api/dashboard/comment?ticketId=" + encodeURIComponent(ticketId), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const datax = await res.json();
            if (datax.success) {
                setFetchComment(datax.comments || []);
            } else {
                setFetchComment([]);
                console.error("Comments fetch failed:", datax.message);
            }
        } catch (error) {
            console.error("Error during comments fetch:", error);
            setFetchComment([]);
        }
    }, [ticketId]);

    // Add handlers for ticket updates and navigation
    const handleTicketUpdate = useCallback(async () => {
        // Refresh tickets and comments without page reload
        await fetchTickets(true); // Silent refresh
        if (ticketId) {
            await fetchComments();
        }
    }, [fetchTickets, fetchComments, ticketId]);

    const handleBackToList = useCallback(() => {
        setTicketId('');
        setFetchComment([]);
    }, []);

    useEffect(() => {
        handleAdmin();
    }, []);

    useEffect(() => {
        if (admin !== null) { // Only fetch when admin state is determined
            fetchTickets();
            getDetails();
        }
    }, [admin, fetchTickets, getDetails]);
    
    useEffect(() => {
        if (ticketId) {
            setFetchComment([]);
            fetchComments();
        }
    }, [ticketId, fetchComments]);

    // Handle real-time updates
    useEffect(() => {
        if (!lastUpdate) return;

        const handleRealtimeUpdate = async () => {
            if (lastUpdate.type === 'ticket_update') {
                // Update tickets list
                if (lastUpdate.updateType === 'created') {
                    setData(prevData => {
                        if (!prevData) return [lastUpdate.ticket];
                        // Check if ticket already exists to prevent duplicates
                        const exists = prevData.some(ticket => ticket._id === lastUpdate.ticket._id);
                        if (exists) return prevData;
                        return [lastUpdate.ticket, ...prevData];
                    });
                } else if (lastUpdate.updateType === 'status_changed' || lastUpdate.updateType === 'updated') {
                    setData(prevData => {
                        if (!prevData) return [lastUpdate.ticket];
                        return prevData.map(ticket => 
                            ticket._id === lastUpdate.ticket._id ? lastUpdate.ticket : ticket
                        );
                    });
                    
                    // If this is the currently selected ticket, refresh comments
                    if (ticketId === lastUpdate.ticketId) {
                        fetchComments();
                    }
                } else if (lastUpdate.updateType === 'deleted') {
                    setData(prevData => {
                        if (!prevData) return [];
                        return prevData.filter(ticket => ticket._id !== lastUpdate.ticketId);
                    });
                    
                    // If the deleted ticket was selected, go back to list
                    if (ticketId === lastUpdate.ticketId) {
                        handleBackToList();
                    }
                }
            } else if (lastUpdate.type === 'comment_update' && lastUpdate.ticketId === ticketId) {
                // Update comments for the currently selected ticket
                if (lastUpdate.updateType === 'created') {
                    setFetchComment(prevComments => {
                        // Check if comment already exists to prevent duplicates
                        const exists = prevComments.some(comment => comment._id === lastUpdate.comment._id);
                        if (exists) return prevComments;
                        return [...prevComments, lastUpdate.comment];
                    });
                } else if (lastUpdate.updateType === 'updated') {
                    setFetchComment(prevComments => 
                        prevComments.map(comment => 
                            comment._id === lastUpdate.comment._id ? lastUpdate.comment : comment
                        )
                    );
                } else if (lastUpdate.updateType === 'deleted') {
                    setFetchComment(prevComments => 
                        prevComments.filter(comment => comment._id !== lastUpdate.comment._id)
                    );
                }
            }
        };

        handleRealtimeUpdate();
    }, [lastUpdate, ticketId, fetchComments, handleBackToList]);

    if (loading || detailsLoading || !details) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading tickets...</p>
                    <p className="text-gray-400 text-sm mt-2">Please wait while we fetch your data</p>
                    {!isConnected && (
                        <p className="text-yellow-600 text-sm mt-1">Establishing real-time connection...</p>
                    )}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-red-400 mb-4">
                        <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Unable to Load Tickets</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={(e) => {
                            handleAdmin();
                            fetchTickets();
                            getDetails();
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-smooth"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
        {create && (
            <TicketCreate create={create} setCreate={setCreate} />  
        )}
        { <AccountSettings details={details} settings={settings} setSettings={setSettings} /> }
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <div className="hidden sm:block w-full sm:w-1/4 md:w-1/4 lg:w-1/5 xl:w-1/5 2xl:w-1/5 shadow-xl bg-white">
                <SideNav 
                    create={create} 
                    setCreate={setCreate} 
                    settings={settings} 
                    setSettings={setSettings} 
                    isMobileMenuOpen={isMobileMenuOpen} 
                    setIsMobileMenuOpen={setIsMobileMenuOpen} 
                />
            </div>
            
            {/* Mobile Sidebar Overlay */}
            <div className="sm:hidden">
                <SideNav 
                    create={create} 
                    setCreate={setCreate} 
                    settings={settings} 
                    setSettings={setSettings} 
                    isMobileMenuOpen={isMobileMenuOpen} 
                    setIsMobileMenuOpen={setIsMobileMenuOpen} 
                />
            </div>

            {/* Main content */}
            <div className="w-full sm:w-3/4 md:w-3/4 lg:w-4/5 xl:w-4/5 2xl:w-4/5 flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50 h-screen overflow-hidden">
                {/* Tickets List */}
                <div className={`${ticketId ? 'hidden md:block' : 'block'} w-full md:w-1/2 lg:w-5/12 xl:w-1/3 bg-white rounded-xl shadow-md overflow-hidden`}>
                    <div className="p-3 sm:p-4 h-full overflow-y-auto relative">
                        {isRefreshing && (
                            <div className="absolute top-2 right-2 z-10">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            </div>
                        )}
                        <TicketsLists 
                            data={data} 
                            setFetchComment={setFetchComment} 
                            setTicketId={setTicketId} 
                            isMobileMenuOpen={isMobileMenuOpen} 
                            setIsMobileMenuOpen={setIsMobileMenuOpen}
                            selectedTicketId={ticketId}
                            filter={filter}
                            setFilter={setFilter}
                            search={search}
                            setSearch={setSearch}
                        />
                    </div>
                </div>
                
                {/* Ticket Details */}
                <div className={`${!ticketId ? 'hidden md:block' : 'block'} w-full md:w-1/2 lg:w-7/12 xl:w-2/3 bg-white rounded-xl shadow-md overflow-hidden`}>
                    <div className="h-full overflow-y-auto">
                        {ticketId ? (
                            <TicketDetails 
                                fetchComment={fetchComment} 
                                data={data} 
                                ticketId={ticketId} 
                                userInfo={details}  
                                onTicketUpdate={handleTicketUpdate}
                                onBack={handleBackToList}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full p-6 sm:p-8">
                                <div className="text-center text-gray-500">
                                    <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2">Select a Ticket</h3>
                                    <p className="text-gray-500 text-sm">Choose a ticket from the list to view its details and manage comments.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}