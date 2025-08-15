"use client";

import { basicGrievances } from "@/types/grievances";
import { allProducts } from "@/types/products";
import { getFileInfo, formatFileSize, getFileIcon, truncateFilename, validateFile } from "@/lib/fileUtils";
import ImagePopup from "./imagePop";
import axios from "axios";
import { useState } from "react";

export default function TicketCreate({ create, setCreate }: any) {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [attachment, setAttachment] = useState<any>([]);
    const [uploading, setUploading] = useState(false);
    const [problem, setProblem] = useState('');
    const [product, setProduct] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [previewImages, setPreviewImages] = useState<{[key: string]: string}>({});
    const [isDragOver, setIsDragOver] = useState(false);

    const uploadAttachment = async (e: any) => {
        setUploading(true);
        setError('');
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // Validate file using utility function
            const validation = validateFile(file, 10);
            if (!validation.isValid) {
                setError(validation.error || 'Invalid file');
                setUploading(false);
                return;
            }

            try {
                const formData = new FormData();
                formData.append('file', file, file.name);
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };

                await axios
                    .post('https://aviandesk-attachment.avianintek.workers.dev/upload', formData, config)
                    .then(async (response: any) => {
                    if (response.data['success'] === true) {
                        setAttachment((prevAttachment: any) => [...prevAttachment, {
                            url: response.data['durl'],
                            formattedSize: formatFileSize(file.size),
                            isImage: file.type.startsWith('image/'),
                            name: file.name,
                            type: file.type,
                        }]);
                        setUploading(false);
                        setSuccess('File uploaded successfully');
                        setTimeout(() => setSuccess(''), 3000);
                        return;
                    } else {
                        console.log("Error: "+response.data['message']);
                        setError('File upload failed. Please try again.');
                        setUploading(false);
                        return;
                    }
                    })
                    .catch((error: any) => {
                        console.log('Error uploading file: ' + error.message);
                        setError('File upload failed. Please check your connection.');
                        setUploading(false);
                        return;
                    });
                // setError('File upload failed. Please try again.');
                // setUploading(false);
                // return
            } catch (error) {
                setError('File upload failed. Please try again.');
                console.log('Error uploading file:' + (error as any).messages);
                setUploading(false);
                return
            }
        }
    }

    const handleFileSelect = async (file: File) => {
        // Process the file upload
        const event = {
            target: {
                files: [file]
            }
        };
        await uploadAttachment(event);
    };

    // Drag and drop handlers
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        
        if (uploading) return;
        
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
            // Process only the first file for now
            await handleFileSelect(droppedFiles[0]);
        }
    };

    const createTicket = async (e: any) => {
        e.preventDefault();

        if (!subject.trim() || !description.trim() || !problem || !product) {
            setError('Please fill in all required fields');
            return;
        }

        if (uploading) {
            setError('File is still uploading, please wait.');
            return;
        }

        setError('');
        try {
            var data = {
                subject: subject.trim(),
                description: description.trim(),
                attachment: attachment,
                problem: problem,
                product: product
            };
            
            const response = await fetch('/api/dashboard/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    // Reset form
                    setSubject('');
                    setDescription('');
                    setAttachment([]);
                    setProblem('');
                    setProduct('');
                    setPreviewImages({});
                    setCreate(false);
                    setError('');
                    setSuccess('Ticket created successfully!');
                } else {
                    console.error("Error: " + result.message);
                    setError(result.message || 'Unable to create ticket. Please try again.');
                }
            } else {
                console.error("Error: " + response.statusText);
                setError('Network error. Please check your connection and try again.');
            }
        } catch (error: any) {
            console.error('Error creating ticket: ', error.message || error);
            setError('An unexpected error occurred. Please try again.');
        }
    } 
    const handleImagePreview = (attachmentItem: any) => {
        if (attachmentItem.isImage && attachmentItem.url) {
            setImage(attachmentItem.url);
        } else if (attachmentItem.name && previewImages[attachmentItem.name]) {
            setImage(previewImages[attachmentItem.name]);
        }
    };

    const removeAttachment = (index: number) => {
        const removedItem = attachment[index];
        const newAttachments = attachment.filter((_: any, i: number) => i !== index);
        setAttachment(newAttachments);
        
        const newFiles = attachment.filter((_: any, i: number) => i !== index);
        setAttachment(newFiles);
        
        // Remove from preview images if it exists
        if (removedItem?.name && previewImages[removedItem.name]) {
            setPreviewImages(prev => {
                const updated = { ...prev };
                delete updated[removedItem.name];
                return updated;
            });
        }
    };

    return (
        <>
        {image && (
            <ImagePopup 
                imageUrl={image} 
                onClose={() => setImage(null)} 
            />
        )}
        <div className={`fixed inset-0 bg-gray-800 w-full bg-opacity-80 flex items-center justify-center z-50 px-4 transition-smooth ${create ? 'block': 'hidden'}`} style={{ zIndex: 1000 }}>
            <div 
                className={`bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full fade-in relative ${
                    isDragOver ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Drag overlay */}
                {isDragOver && (
                    <div className="absolute inset-0 bg-blue-50 bg-opacity-90 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center z-10">
                        <div className="text-center">
                            <div className="text-4xl text-blue-500 mb-2">📁</div>
                            <p className="text-lg font-semibold text-blue-600">Drop your file here</p>
                            <p className="text-sm text-blue-500">Images, PDFs, and documents are supported</p>
                        </div>
                    </div>
                )}

                <form className="overflow-auto" > {/** action={createTicket}> */} 
                    <div className="flex flex-col items-end">
                        <button type="button" className="text-gray-500 hover:text-gray-900 shadow-lg rounded-lg p-1 transition-smooth btn-hover" onClick={(e) => {setAttachment([]); setPreviewImages({}); setError(''); setSuccess(''); setCreate(false)}}>
                            <img src="/icons/close.svg" className="h-4 w-4" alt="Close" />
                        </button>
                    </div>
                    <div className="flex flex-col pt-1 pb-6">
                        <h2 className="text-xl font-semibold text-gray-800 text-center w-full">CREATE TICKET</h2>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-600">{success}</p>
                        </div>
                    )}

                    <div>
                        <label htmlFor="subject" className="sr-only">subject</label>
                        <input type="text" id="subject" placeholder="Enter a subject" value={subject} onChange={e => setSubject(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-smooth overflow-x-auto"/>

                        <div className="flex space-x-4 mt-4 overflow-auto">
                            <select className="flex items-center px-2 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 w-full overflow-x-auto transition-smooth" value={problem} onChange={e => setProblem(e.target.value)}>
                                <option value="">Select Problem Type</option>
                                {basicGrievances.map((grievance: string, index: number) => (
                                    <option key={index} value={grievance}>
                                        {grievance}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="attachment" className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer transition-smooth btn-hover">
                                <img src={uploading ? "/icons/loading.gif" : "/icons/clip.svg"} className="h-5 w-5 pr-2 -ml-2" /> 
                                <span className="pr-2 whitespace-nowrap">{uploading ? 'Uploading...' : 'Attachment'}</span>
                                <input 
                                    type="file" 
                                    id="attachment" 
                                    accept="image/*,.pdf,.doc,.docx,.txt" 
                                    className="hidden" 
                                    onChange={uploadAttachment} 
                                    disabled={uploading} 
                                />
                            </label>
                        </div>

                        {/* File drop zone hint */}
                        {attachment.length === 0 && (
                            <div className="mt-4 p-4 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-500 text-sm">
                                <div className="mb-2">📎</div>
                                <p>Drag and drop files here or click the attachment button</p>
                                <p className="text-xs text-gray-400 mt-1">Max 10MB • Images, PDF, DOC, TXT</p>
                            </div>
                        )}
                        
                        <div className="flex gap-1 mt-4 overflow-auto">
                            {attachment.length > 0 && (
                                attachment.map((att: any, index: any) => (
                                    <div key={index} className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium border-2 transition-smooth btn-hover border-gray-200 bg-white text-gray-500 hover:bg-gray-100 hover:border-gray-300`}>
                                        <button 
                                            type="button" 
                                            onClick={(e) => handleImagePreview(att)} 
                                            className={`flex items-center gap-2 transition-smooth ${
                                                att.isImage || previewImages[att.name] 
                                                    ? 'hover:text-blue-600 cursor-pointer' 
                                                    : 'cursor-default'
                                            }`}
                                            disabled={!att.isImage && !previewImages[att.name]}
                                        >
                                            <span className={att.isImage || previewImages[att.name] ? 'text-blue-500' : 'text-gray-500'}>
                                                {att.icon || (att.isImage || previewImages[att.name] ? '🖼️' : '📎')}
                                            </span>
                                            <div className="flex flex-col items-start">
                                                <span className="text-sm font-medium">
                                                    {truncateFilename(att.name || 'Unknown file', 15)}
                                                </span>
                                                {att.formattedSize && (
                                                    <span className="text-xs text-gray-400">
                                                        {att.formattedSize}
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={(e) => removeAttachment(index)} 
                                            className="ml-1 text-red-500 hover:text-red-700 text-sm hover:bg-red-50 rounded-full w-6 h-6 flex items-center justify-center transition-smooth"
                                            title="Remove attachment"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        <div className="flex gap-1 mt-4 overflow-auto">
                            {allProducts.map((producto, index) => (
                                <button type="button" key={index} onClick={(e) => { setProduct(producto) }} className={`px-3 py-2 rounded-xl font-medium border-2 transition-smooth btn-hover ${
                                    product === producto
                                    ? "border-green-400 bg-green-100 text-green-700"
                                    : "border-gray-200 bg-white text-gray-500 hover:bg-gray-100 hover:border-gray-300"
                                }`}>
                                {producto}
                                </button>
                            ))}
                        </div>

                        <label htmlFor="description" className="sr-only">Description</label>
                        <div className="border border-gray-300 rounded-lg mt-4 overflow-x-auto focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-400 transition-smooth">
                            {/* <div className="flex items-center px-3 py-2 border-b border-gray-200 gap-3">
                                <button type="button" className="text-gray-500 hover:text-gray-900 hover:border-blue-400 hover:shadow-lg transition-smooth">
                                    <b> B </b>
                                </button>
                                <button type="button" className="ml-2 text-gray-500 hover:text-gray-900 hover:border-blue-400 hover:shadow-lg transition-smooth">
                                    <i> I </i>
                                </button>
                                <button type="button" className="ml-2 text-gray-500 hover:text-gray-900 hover:border-blue-400 hover:shadow-lg transition-smooth">
                                    <u> U </u>
                                </button>
                            </div> */}
                            <textarea id="description" placeholder="Describe your issue in detail..." value={description} rows={4} onChange={e => setDescription(e.target.value)}
                                className="w-full border-none px-4 py-2 focus:outline-none resize-none overflow-y-auto">
                            </textarea>
                        </div>
                    </div>
                    
                    <div className="flex justify-end mt-4 w-full">
                        <button type="button" onClick={createTicket} disabled={!subject.trim() || !description.trim() || !problem || !product || uploading}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-smooth btn-hover w-full">
                            {uploading ? 'Please wait...' : 'Create Ticket'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}