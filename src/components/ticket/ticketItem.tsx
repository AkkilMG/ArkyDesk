"use client";

import { colorTags } from "@/types/color";
import { time } from "console";
import { useState, useEffect, useMemo } from "react";


export default function TicketItem({id, setFetchComment, subject, description, createdAt, tags, setTicketId, isSelected}: any) {
    const [timesAgo, setTimesAgo] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    
    const calculateTimeAgo = useMemo(() => {
        if (!createdAt) return '';
        
        const currentTime = new Date();
        const updatedTime = new Date(createdAt);
        const diff = currentTime.getTime() - updatedTime.getTime();
        
        if(diff < 3600000) {
            return Math.floor(diff / 60000) + ' mins ago';
        } else if(diff < 86400000) {
            return Math.floor(diff / 3600000) + ' hrs ago';
        } else {
            return Math.floor(diff / 86400000) + ' days ago';
        }
    }, [createdAt]);
    
    const processedDescription = useMemo(() => {
        return description || '';
    }, [description]);
    
    useEffect(() => {
        setTimesAgo(calculateTimeAgo);
        setShortDescription(processedDescription);
    }, [calculateTimeAgo, processedDescription]);

    return (
        <div 
            className={`p-3 sm:p-4 border-l-4 rounded-lg mb-3 sm:mb-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected 
                ? 'border-blue-500 bg-blue-100 shadow-md' 
                : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
            }`} 
            onClick={(e) => {
                setTicketId(id);
                setFetchComment([]);
            }}
        >
            <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-sm sm:text-base text-gray-800 pr-2 flex-1">{subject}</p>
                <p className="text-xs text-gray-500 whitespace-nowrap">{timesAgo}</p>
            </div>
            <p className="line-clamp-2 sm:line-clamp-1 text-xs sm:text-sm text-gray-600 mb-2">{shortDescription}</p>
            <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1">
                {tags.map((tag: string, index: number) => {
                    return colorTags(tag, index)
                })}
            </div>
        </div>
    )
}