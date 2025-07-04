import { Navbar } from "@/components/Navbar";
import { CategorySidebar } from "@/components/CategorySidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchForm } from "@/components/SearchForm";

export default function SearchLoading() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6 flex-col md:flex-row">
          {/* Sidebar - Hidden on mobile, visible on larger screens */}
          <div className="md:w-1/5 hidden md:block">
            <CategorySidebar />
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-4/5">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="h-8 bg-gray-200 rounded w-56 mb-4 md:mb-0 animate-pulse"></div>
              
              <div className="flex flex-row items-center gap-2">
                {/* Desktop search - Only visible on medium screens and up */}
                <div className="hidden md:block">
                  <div className="h-10 bg-gray-200 rounded w-64 animate-pulse"></div>
                </div>
                
                <Link href="/create-listing">
                  <Button>Create new listing</Button>
                </Link>
              </div>
            </div>
            
            {/* Shimmer loading grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="aspect-[4/3] bg-gray-200 w-full"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 