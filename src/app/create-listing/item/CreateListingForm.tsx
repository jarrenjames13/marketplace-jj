'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { uploadImage, createListing } from "@/lib/actions";
import { ListingType } from "@/lib/supabase";
import { LoadingButton } from "@/components/ui/loading-spinner";

// Categories based on our Supabase schema
const categories = [
  "Vehicles",
  "Property Rentals",
  "Apparel",
  "Classifieds",
  "Electronics",
  "Entertainment",
  "Family",
  "Free Stuff",
  "Garden & Outdoor",
  "Hobbies",
  "Home Goods",
  "Home Improvement",
  "Home Sales",
  "Musical Instruments",
  "Office Supplies",
  "Pet Supplies",
  "Sporting Goods",
  "Toys & Games",
  "Other"
];

// Update the file size limit constant at the top of the file
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB max
const MAX_FILE_SIZE_MB = MAX_FILE_SIZE / (1024 * 1024);

export default function CreateListingForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ListingType>>({
    title: "",
    price: 0,
    description: "",
    category: "Electronics",
    seller_email: "",
    location: "Palo Alto, CA"
  });
  
  // Generate preview when file is selected
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    
    try {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      
      // Free memory when component unmounts
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } catch (error) {
      console.error("Error creating preview URL:", error);
      setError("Unable to create image preview");
    }
  }, [selectedFile]);
  
  // Set up drag and drop event handlers
  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return;
    
    const preventDefault = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    const handleDragEnter = (e: DragEvent) => {
      preventDefault(e);
      setIsDragging(true);
    };
    
    const handleDragLeave = (e: DragEvent) => {
      preventDefault(e);
      setIsDragging(false);
    };
    
    const handleDrop = (e: DragEvent) => {
      preventDefault(e);
      setIsDragging(false);
      
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
      }
    };
    
    dropArea.addEventListener("dragenter", handleDragEnter);
    dropArea.addEventListener("dragover", preventDefault);
    dropArea.addEventListener("dragleave", handleDragLeave);
    dropArea.addEventListener("drop", handleDrop);
    
    return () => {
      dropArea.removeEventListener("dragenter", handleDragEnter);
      dropArea.removeEventListener("dragover", preventDefault);
      dropArea.removeEventListener("dragleave", handleDragLeave);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, []);
  
  const handleFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setError(`Image too large. Please select an image under ${MAX_FILE_SIZE_MB}MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }
    
    setSelectedFile(file);
    setError("");
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    handleFile(e.target.files[0]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.seller_email || formData.price === 0) {
        setError("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }
      
      // Validate file size again before upload
      if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
        setError(`Image too large. Please select an image under ${MAX_FILE_SIZE_MB}MB. Current size: ${(selectedFile.size / 1024 / 1024).toFixed(2)}MB`);
        setIsSubmitting(false);
        return;
      }
      
      let imageUrl = null;
      
      // Upload image if one was selected
      if (selectedFile) {
        try {
          imageUrl = await uploadImage(selectedFile);
          if (!imageUrl) {
            throw new Error("Failed to upload image");
          }
        } catch (uploadError: any) {
          if (uploadError.message?.includes("Body exceeded") || uploadError.statusCode === 413) {
            throw new Error(`Image size exceeds server limit. Please select a smaller image (under ${MAX_FILE_SIZE_MB}MB).`);
          }
          throw uploadError;
        }
      }
      
      // Create the listing
      const listingData: ListingType = {
        ...formData as ListingType,
        image_url: imageUrl || undefined
      };
      
      const listing = await createListing(listingData);
      
      if (listing) {
        // Redirect to the listing page
        router.push(`/listing/${listing.id}`);
      } else {
        throw new Error("Failed to create listing");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setIsSubmitting(false);
    }
  };
  
  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Form section */}
      <div className="w-full lg:w-2/3">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" className="mr-2" asChild>
              <Link href="/create-listing">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Create Item Listing</h1>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-6">
              <label className="block font-medium mb-2">Images <span className="text-red-500">*</span></label>
              <div 
                ref={dropAreaRef}
                className={`border-2 border-dashed rounded-lg p-6 mb-6 transition-all duration-200 ${
                  isDragging 
                    ? "border-blue-400 bg-blue-50" 
                    : previewUrl 
                      ? "border-gray-200 bg-gray-50" 
                      : "border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
                } cursor-pointer`}
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? (
                  <div className="relative">
                    <div className="absolute top-0 right-0 p-1">
                      <Button 
                        type="button"
                        variant="destructive" 
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage();
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18M6 6l12 12"/>
                        </svg>
                      </Button>
                    </div>
                    <div className="h-64 w-full flex items-center justify-center">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="max-h-full max-w-full object-contain rounded-md" 
                      />
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-2">
                      {selectedFile?.name} ({selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-3">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    <p className="text-lg font-medium text-gray-600">Drag and drop your image here</p>
                    <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
                    <p className="text-xs text-gray-400 mt-4">JPEG, PNG or GIF, max {MAX_FILE_SIZE_MB}MB</p>
                  </div>
                )}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block font-medium mb-2">Title <span className="text-red-500">*</span></label>
                  <Input 
                    id="title" 
                    name="title"
                    placeholder="Title" 
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block font-medium mb-2">Price ($) <span className="text-red-500">*</span></label>
                  <Input 
                    id="price" 
                    name="price"
                    placeholder="Price" 
                    type="number" 
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block font-medium mb-2">Category <span className="text-red-500">*</span></label>
                  <select
                    id="category"
                    name="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="seller_email" className="block font-medium mb-2">Email <span className="text-red-500">*</span></label>
                  <Input 
                    id="seller_email" 
                    name="seller_email"
                    placeholder="Email" 
                    type="email" 
                    value={formData.seller_email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block font-medium mb-2">Location</label>
                  <Input 
                    id="location" 
                    name="location"
                    placeholder="Location" 
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block font-medium mb-2">Description <span className="text-red-500">*</span></label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Description" 
                    className="min-h-32" 
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <LoadingButton 
                  loading={isSubmitting}
                  loadingText="Creating..."
                  className="w-full h-12 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Listing
                </LoadingButton>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* Preview section */}
      <div className="w-full lg:w-1/3">
        <Card className="sticky top-8 p-6 border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div className="aspect-[4/3] w-full mb-4 overflow-hidden rounded-md bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
            {previewUrl ? (
              <div className="h-full w-full relative">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="h-full w-full object-contain" 
                />
                {formData.category && (
                  <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-md text-xs backdrop-blur-sm">
                    {formData.category}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 mb-2">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <div className="text-gray-400 text-sm">No image preview</div>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-xl line-clamp-1">
              {formData.title || "Your listing title"}
            </h3>
            <div className="font-semibold text-lg text-emerald-600">
              ${formData.price ? Number(formData.price).toLocaleString() : "0"}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {formData.location || "Location"}
            </div>
            <div className="pt-3 mt-3 border-t border-gray-100">
              <p className="line-clamp-3 text-sm text-gray-700">
                {formData.description || "Your listing description will appear here"}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 