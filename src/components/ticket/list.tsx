"use client"
import { useState, useMemo } from "react";
import TicketItem from "./ticketItem";
import Shimmer from "../ui/Shimmer";


export default function TicketsLists({
    data, 
    setFetchComment, 
    setTicketId, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen, 
    selectedTicketId, 
    filter, 
    setFilter, 
    search, 
    setSearch,
    loading = false
}: any) {
    
    function handleSearch(e: any) {
        setSearch(e.target.value);
    }
    
    // Filter and search logic
    const filteredData = useMemo(() => {
        if (!data) return [];
        
        let filtered = data;
        
        // Apply status filter
        if (filter !== "all") {
            filtered = filtered.filter((ticket: any) => {
                if (filter === "open") return ticket.status === "open";
                if (filter === "closed") return ticket.status === "closed";
                return true;
            });
        }
        
        // Apply search filter
        if (search.trim()) {
            const searchTerm = search.toLowerCase();
            filtered = filtered.filter((ticket: any) => 
                ticket.subject.toLowerCase().includes(searchTerm) ||
                ticket.description.toLowerCase().includes(searchTerm) ||
                ticket.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm))
            );
        }
        
        return filtered;
    }, [data, filter, search]);
    
    return (
            <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                        <button className="sm:hidden focus:outline-none p-3 bg-gray-100 border rounded-lg hover:bg-gray-200 transition-smooth btn-hover" onClick={(e) => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <img src={isMobileMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"} alt="Menu Toggle" className="h-6 w-6" />
                        </button>
                        <div className="relative flex-1">
                            <input 
                                type="text" 
                                placeholder="Search tickets..." 
                                value={search}
                                onChange={handleSearch}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 hover:border-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-smooth" 
                            />
                            <img src="/icons/search.svg" alt="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        <button className="p-2.5 bg-gray-100 border rounded-lg hover:bg-gray-200 transition-smooth btn-hover">
                            <img src="/icons/filter.svg" alt="filter" className="w-6 h-6" />
                        </button>
                    </div>
                    
                    {/* Filter tabs */}
                    <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2">
                        <button 
                            onClick={(e) => setFilter("all")}
                            className={`font-medium py-2.5 sm:py-2 px-3 sm:px-4 rounded-full border-2 transition-smooth btn-hover whitespace-nowrap text-sm sm:text-base ${
                                filter === "all" 
                                ? "text-white bg-blue-500 border-blue-500" 
                                : "text-gray-500 border-gray-300 hover:text-blue-500 hover:border-blue-400"
                            }`}
                        >
                            All ({data?.length || 0})
                        </button>
                        <button 
                            onClick={(e) => setFilter("open")}
                            className={`font-medium py-2.5 sm:py-2 px-3 sm:px-4 rounded-full border-2 transition-smooth btn-hover whitespace-nowrap text-sm sm:text-base ${
                                filter === "open" 
                                ? "text-white bg-green-500 border-green-500" 
                                : "text-gray-500 border-gray-300 hover:text-green-500 hover:border-green-400"
                            }`}
                        >
                            Open ({data?.filter((t: any) => t.status === "open").length || 0})
                        </button>
                        <button 
                            onClick={(e) => setFilter("closed")}
                            className={`font-medium py-2.5 sm:py-2 px-3 sm:px-4 rounded-full border-2 transition-smooth btn-hover whitespace-nowrap text-sm sm:text-base ${
                                filter === "closed" 
                                ? "text-white bg-red-500 border-red-500" 
                                : "text-gray-500 border-gray-300 hover:text-red-500 hover:border-red-400"
                            }`}
                        >
                            Closed ({data?.filter((t: any) => t.status === "closed").length || 0})
                        </button>
                    </div>

                    {/* Results info */}
                    {search.trim() && !loading && (
                        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                            Found {filteredData.length} ticket{filteredData.length !== 1 ? 's' : ''} for "{search}"
                        </div>
                    )}
                    
                    {/* Tickets list */}
                    <div className="space-y-3" style={{scrollBehavior: 'smooth'}}>
                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="p-3 sm:p-4 border-l-4 rounded-lg bg-white border-gray-200 shadow-sm">
                                        <div className="flex justify-between items-start mb-2 gap-3">
                                            <Shimmer className="h-4 w-2/3 rounded" variant="list" />
                                            <Shimmer className="h-3 w-16 rounded" variant="list" />
                                        </div>
                                        <Shimmer className="h-3 w-full rounded mb-2" variant="list" />
                                        <Shimmer className="h-3 w-5/6 rounded mb-3" variant="list" />
                                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                                            <Shimmer className="h-5 w-14 rounded-full" variant="avatar" />
                                            <Shimmer className="h-5 w-18 rounded-full" variant="avatar" />
                                            <Shimmer className="h-5 w-16 rounded-full" variant="avatar" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredData.length > 0 ? (
                            filteredData.map((ticket: any, index: number) => (
                                <div key={ticket._id} 
                                    // className={`fade-in ${selectedTicketId === ticket._id ? 'ring-2 ring-blue-400 bg-blue-50' : ''}`} 
                                    style={{animationDelay: `${index * 50}ms`}}>
                                    <TicketItem
                                        id={ticket._id}
                                        subject={ticket.subject}
                                        description={ticket.description}
                                        createdAt={ticket.createdAt}
                                        tags={ticket.tags}
                                        status={ticket.status}
                                        setTicketId={setTicketId}
                                        setFetchComment={setFetchComment}
                                        isSelected={selectedTicketId === ticket._id}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <p className="text-lg font-medium text-gray-500">No tickets found</p>
                                <p className="text-sm text-gray-400 mt-1">
                                    {search.trim() 
                                        ? "Try adjusting your search terms" 
                                        : "Create your first ticket to get started"
                                    }
                                </p>
                            </div>
                        )}
                    </div>
            </div>
    );
}