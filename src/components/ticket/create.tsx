"use client";

import { basicGrievances } from "@/types/grievances";
import { allProducts } from "@/types/products";
import { formatFileSize, truncateFilename, validateFile } from "@/lib/fileUtils";
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
            } catch (error) {
                setError('File upload failed. Please try again.');
                console.log('Error uploading file:' + (error as any).messages);
                setUploading(false);
                return
            }
        }
    }

    const handleFileSelect = async (file: File) => {
        const event = {
            target: {
                files: [file]
            }
        };
        await uploadAttachment(event);
    };

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
        <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 transition-all duration-300 ${create ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
            style={{ zIndex: 1000 }}
            role="dialog"
            aria-modal="true"
            aria-label="Create ticket"
            onClick={() => { if (!uploading) { setAttachment([]); setPreviewImages({}); setError(''); setSuccess(''); setCreate(false) }}}
        >
            <div
                className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transition-all duration-300 ${
                    create ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
                } ${isDragOver ? 'ring-4 ring-blue-400 ring-opacity-50' : ''}`}
                onClick={(e) => e.stopPropagation()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Drag overlay */}
                {isDragOver && (
                    <div className="absolute inset-0 bg-blue-50/95 border-2 border-dashed border-blue-400 rounded-2xl flex items-center justify-center z-20">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <p className="text-lg font-semibold text-blue-600">Drop your file here</p>
                            <p className="text-sm text-blue-500 mt-1">Supports images, PDFs, and documents up to 10MB</p>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Create Ticket</h2>
                            <p className="text-xs text-gray-500">Submit a new support request</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-smooth flex-shrink-0"
                        onClick={() => {setAttachment([]); setPreviewImages({}); setError(''); setSuccess(''); setCreate(false)}}
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable form body */}
                <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
                    {/* Error Message */}
                    {error && (
                        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                            <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-emerald-700">{success}</p>
                        </div>
                    )}

                    {/* Subject */}
                    <div className="space-y-1.5">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                            Subject <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                                placeholder="Brief summary of the issue"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-smooth"
                            />
                        </div>
                    </div>

                    {/* Problem Type & Product Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Problem Type */}
                        <div className="space-y-1.5">
                            <label htmlFor="problem" className="block text-sm font-medium text-gray-700">
                                Problem Type <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <select
                                    id="problem"
                                    value={problem}
                                    onChange={e => setProblem(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-900 bg-white appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-smooth"
                                >
                                    <option value="">Select type...</option>
                                    {basicGrievances.map((grievance: string, index: number) => (
                                        <option key={index} value={grievance}>{grievance}</option>
                                    ))}
                                </select>
                                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Product */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Product <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {allProducts.map((producto, index) => (
                                    <button
                                        type="button"
                                        key={index}
                                        onClick={() => setProduct(producto)}
                                        className={`px-3 py-2 sm:py-1.5 rounded-lg text-sm font-medium border transition-smooth ${
                                            product === producto
                                            ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                        }`}
                                    >
                                        {producto}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Attachments */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Attachments
                            <span className="text-gray-400 font-normal ml-1">(optional)</span>
                        </label>

                        {/* Drop zone hint when no files */}
                        {attachment.length === 0 && !uploading && (
                            <label
                                htmlFor="attachment"
                                className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-smooth ${
                                    isDragOver
                                    ? 'border-blue-400 bg-blue-50'
                                    : 'border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-gray-600">Drop files here or click to browse</p>
                                <p className="text-xs text-gray-400 mt-1">Max 10MB &middot; Images, PDF, DOC, TXT</p>
                            </label>
                        )}

                        {/* Uploading state */}
                        {uploading && attachment.length === 0 && (
                            <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    <span className="text-sm text-gray-500">Uploading file...</span>
                                </div>
                            </div>
                        )}

                        <input
                            type="file"
                            id="attachment"
                            accept="image/*,.pdf,.doc,.docx,.txt"
                            className="hidden"
                            onChange={uploadAttachment}
                            disabled={uploading}
                        />

                        {/* Attachment chips */}
                        {attachment.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {attachment.map((att: any, index: any) => (
                                    <div
                                        key={index}
                                        className="group flex items-center gap-2.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300 transition-smooth"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleImagePreview(att)}
                                            className={`flex items-center gap-2.5 ${att.isImage || previewImages[att.name] ? 'cursor-pointer' : 'cursor-default'}`}
                                            disabled={!att.isImage && !previewImages[att.name]}
                                        >
                                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium ${
                                                att.isImage || previewImages[att.name]
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-gray-200 text-gray-500'
                                            }`}>
                                                {att.isImage || previewImages[att.name] ? (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                    </svg>
                                                )}
                                            </span>
                                            <div className="flex flex-col items-start leading-tight">
                                                <span className="text-xs font-medium text-gray-700 max-w-[120px] truncate">
                                                    {truncateFilename(att.name || 'Unknown file', 18)}
                                                </span>
                                                {att.formattedSize && (
                                                    <span className="text-[10px] text-gray-400">{att.formattedSize}</span>
                                                )}
                                            </div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeAttachment(index)}
                                            className="w-8 h-8 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-smooth flex-shrink-0"
                                            title="Remove attachment"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                <label
                                    htmlFor="attachment"
                                    className="flex items-center gap-1.5 px-3 py-2.5 sm:py-2 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 cursor-pointer transition-smooth text-xs font-medium"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add more
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <span className="text-xs text-gray-400">{description.length}/2000</span>
                        </div>
                        <div className="relative">
                            <textarea
                                id="description"
                                value={description}
                                onChange={e => {
                                    if (e.target.value.length <= 2000) setDescription(e.target.value);
                                }}
                                placeholder="Describe the issue in detail. Include steps to reproduce if applicable..."
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-smooth resize-none"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="button"
                        onClick={createTicket}
                        disabled={!subject.trim() || !description.trim() || !problem || !product || uploading}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-xl font-medium text-sm transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 disabled:shadow-none btn-hover"
                    >
                        {uploading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                <span>Uploading...</span>
                            </span>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Create Ticket</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}
