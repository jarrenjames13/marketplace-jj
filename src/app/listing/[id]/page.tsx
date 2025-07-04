import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { getListing } from "@/lib/actions";
import MessageSeller from "./MessageSeller";

// Configure remote patterns for Next.js Image
export const images = {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
};

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  // Fix: Ensure params is awaited
  const id = await params.id;
  
  // Fetch listing data from Supabase
  const listing = await getListing(id);

  if (!listing) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
            <p className="text-gray-500">The listing you are looking for might have been removed or is temporarily unavailable.</p>
          </div>
        </div>
      </div>
    );
  }

  // Format the date
  const postedDate = listing.created_at ? 
    new Date(listing.created_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) : 'Recently';

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left column - Image Gallery */}
            <div className="w-full lg:w-3/5 relative">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full h-[350px] md:h-[500px] lg:h-[600px] flex items-center justify-center relative overflow-hidden">
                {listing.image_url ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={listing.image_url} 
                      alt={listing.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                      className="object-contain"
                      priority
                      quality={95}
                    />
                    {/* Gradient overlay at the bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/10 to-transparent"></div>
                    
                    {/* Category tag */}
                    {listing.category && (
                      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-md text-sm backdrop-blur-sm">
                        {listing.category}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center p-8 max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-300 mb-4">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-400 mb-2">No image available</h3>
                    <p className="text-gray-400">The seller hasn't uploaded any photos for this listing yet.</p>
                  </div>
                )}
              </div>
              
              {/* Image thumbnails (for future multi-image support) */}
              <div className="flex items-center justify-center bg-gray-50 p-2 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  {listing.image_url ? "1 image available" : "No images available"}
                </div>
              </div>
            </div>
            
            {/* Right column - Details */}
            <div className="w-full lg:w-2/5 p-6 lg:p-8 lg:border-l border-gray-100">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{listing.title}</h1>
              <div className="text-2xl font-semibold mb-4 text-emerald-600">${Number(listing.price).toLocaleString()}</div>
              
              <div className="mb-5 pb-5 border-b border-gray-100">
                <div className="flex items-center text-sm text-gray-500 gap-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    {postedDate}
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {listing.location}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="whitespace-pre-line text-gray-700">{listing.description}</p>
              </div>
              
              <div className="mb-6 pb-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold mb-2">Seller Information</h2>
                <p className="flex items-center text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-500">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {listing.seller_email}
                </p>
              </div>
              
              {/* Message seller form */}
              <MessageSeller listingId={listing.id as string} sellerEmail={listing.seller_email} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 