import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateListingLoading() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form section */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-8 animate-pulse">
              <div className="flex items-center mb-8">
                <Button variant="ghost" size="icon" className="mr-2" asChild>
                  <Link href="/create-listing">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </Link>
                </Button>
                <div className="h-8 bg-gray-200 rounded w-48"></div>
              </div>
              
              <div className="mb-8">
                <div className="mb-6">
                  <div className="h-5 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="border-2 border-dashed rounded-lg h-64 bg-gray-100 mb-6"></div>
                  
                  <div className="space-y-6">
                    {/* Form fields placeholder */}
                    {[...Array(6)].map((_, i) => (
                      <div key={i}>
                        <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                      </div>
                    ))}
                    
                    <div className="h-12 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Preview section */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-8 p-6 border border-gray-200 rounded-lg shadow-sm animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="aspect-[4/3] w-full mb-4 bg-gray-200 rounded-md"></div>
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="pt-3 mt-3 border-t border-gray-100">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 