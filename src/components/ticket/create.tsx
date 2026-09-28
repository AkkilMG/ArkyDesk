"use client";

import { basicGrievances } from "@/types/grievances";
import { allProducts } from "@/types/products";
import { formatFileSize, truncateFilename, validateFile } from "@/lib/fileUtils";
import ImagePopup from "./imagePop";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
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

    // Single source of truth for dismissing the dialog: clears the draft state
    // so reopening never shows the previous submission's errors or attachments.
    // Guarded on `uploading` so an in-flight upload cannot be orphaned.
    const closeDialog = () => {
        if (uploading) return;
        setAttachment([]);
        setPreviewImages({});
        setError('');
        setSuccess('');
        setCreate(false);
    };

    return (
        <>
        {image && (
            <ImagePopup 
                imageUrl={image} 
                onClose={() => setImage(null)} 
            />
        )}
        <Dialog
            open={create}
            onClose={closeDialog}
            title="Create ticket"
            description="Submit a new support request"
            size="lg"
            bodyClassName="p-0"
        >
            {/* Drag-and-drop lives on this wrapper rather than the dialog panel so
                dropping anywhere over the form still registers. */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="relative"
            >
                {/* Drag overlay */}
                {isDragOver && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-background/95 backdrop-blur-sm">
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
                                <svg className="size-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <p className="text-lg font-semibold text-foreground">Drop your file here</p>
                            <p className="mt-1 text-sm text-muted-foreground">Supports images, PDFs, and documents up to 10MB</p>
                        </div>
                    </div>
                )}

                <div className="space-y-5 p-4 sm:p-6">
                    {/* Error Message */}
                    {error && (
                        <div className="p-3.5 bg-destructive/10 border border-destructive/25 rounded-xl flex items-start gap-3">
                            <svg className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-destructive">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="p-3.5 bg-success/10 border border-success/30 rounded-xl flex items-start gap-3">
                            <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-success">{success}</p>
                        </div>
                    )}

                    {/* Subject */}
                    <div className="space-y-1.5">
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                            Subject <span className="text-destructive">*</span>
                        </label>
                        <div className="relative">
                            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                                placeholder="Brief summary of the issue"
                                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground bg-background focus:ring-2 focus:ring-ring/30 focus:border-foreground/25 transition-smooth"
                            />
                        </div>
                    </div>

                    {/* Problem Type & Product Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Problem Type */}
                        <div className="space-y-1.5">
                            <label htmlFor="problem" className="block text-sm font-medium text-foreground">
                                Problem Type <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <select
                                    id="problem"
                                    value={problem}
                                    onChange={e => setProblem(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 border border-border rounded-xl text-sm text-foreground bg-background appearance-none cursor-pointer focus:ring-2 focus:ring-ring/30 focus:border-foreground/25 transition-smooth"
                                >
                                    <option value="">Select type...</option>
                                    {basicGrievances.map((grievance: string, index: number) => (
                                        <option key={index} value={grievance}>{grievance}</option>
                                    ))}
                                </select>
                                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Product */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-foreground">
                                Product <span className="text-destructive">*</span>
                            </label>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {allProducts.map((producto, index) => (
                                    <button
                                        type="button"
                                        key={index}
                                        onClick={() => setProduct(producto)}
                                        className={`px-3 py-2 sm:py-1.5 rounded-lg text-sm font-medium border transition-smooth ${
                                            product === producto
                                            ? "border-transparent bg-primary text-primary-foreground shadow-card"
                                            : "border-border bg-card text-muted-foreground hover:border-foreground/25 hover:bg-muted hover:text-foreground"
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
                        <label className="block text-sm font-medium text-foreground">
                            Attachments
                            <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                        </label>

                        {/* Drop zone hint when no files */}
                        {attachment.length === 0 && !uploading && (
                            <label
                                htmlFor="attachment"
                                className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-smooth ${
                                    isDragOver
                                    ? 'border-brand bg-brand/15'
                                    : 'border-border bg-muted/40 hover:border-foreground/25 hover:bg-muted'
                                }`}
                            >
                                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-muted-foreground">Drop files here or click to browse</p>
                                <p className="text-xs text-muted-foreground mt-1">Max 10MB &middot; Images, PDF, DOC, TXT</p>
                            </label>
                        )}

                        {/* Uploading state */}
                        {uploading && attachment.length === 0 && (
                            <div className="flex items-center justify-center p-6 border-2 border-dashed border-border rounded-xl bg-muted/40">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-brand animate-spin-cw" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    <span className="text-sm text-muted-foreground">Uploading file...</span>
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
                                        className="group flex items-center gap-2.5 px-3 py-2 bg-muted/50 border border-border rounded-xl hover:border-foreground/25 transition-smooth"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleImagePreview(att)}
                                            className={`flex items-center gap-2.5 ${att.isImage || previewImages[att.name] ? 'cursor-pointer' : 'cursor-default'}`}
                                            disabled={!att.isImage && !previewImages[att.name]}
                                        >
                                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium ${
                                                att.isImage || previewImages[att.name]
                                                ? 'bg-primary/10 text-primary'
                                                : 'bg-muted text-muted-foreground'
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
                                                <span className="text-xs font-medium text-foreground max-w-[120px] truncate">
                                                    {truncateFilename(att.name || 'Unknown file', 18)}
                                                </span>
                                                {att.formattedSize && (
                                                    <span className="text-[10px] text-muted-foreground">{att.formattedSize}</span>
                                                )}
                                            </div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeAttachment(index)}
                                            className="w-8 h-8 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth flex-shrink-0"
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
                                    className="flex items-center gap-1.5 px-3 py-2.5 sm:py-2 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:text-foreground hover:border-foreground/25 cursor-pointer transition-smooth text-xs font-medium"
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
                            <label htmlFor="description" className="block text-sm font-medium text-foreground">
                                Description <span className="text-destructive">*</span>
                            </label>
                            <span className="text-xs text-muted-foreground">{description.length}/2000</span>
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
                                className="w-full px-4 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground bg-background focus:ring-2 focus:ring-ring/30 focus:border-foreground/25 transition-smooth resize-none"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <Button
                        type="button"
                        onClick={createTicket}
                        disabled={!subject.trim() || !description.trim() || !problem || !product || uploading}
                        variant="primary"
                        size="lg"
                        fullWidth
                    >
                        {uploading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4 animate-spin-cw" fill="none" viewBox="0 0 24 24">
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
                    </Button>
                </div>
            </div>
        </Dialog>
        </>
    );
}
