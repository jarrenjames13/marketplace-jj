import { Navbar } from "@/components/Navbar";
import { CategorySidebar } from "@/components/CategorySidebar";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { searchListings } from "@/lib/actions";
import { ListingType } from "@/lib/supabase";
import { SearchForm } from "@/components/SearchForm";

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  // Get search query
  const searchQuery = (await searchParams).q || "";

  // Perform search using the query
  const listings = searchQuery ? await searchListings(searchQuery) : [];

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
              <h1 className="text-2xl font-bold mb-4 md:mb-0">
                {searchQuery ? `Results for "${searchQuery}"` : "Search Results"}
              </h1>
              
              <div className="flex flex-row items-center gap-2">
                {/* Desktop search - Only visible on medium screens and up */}
                <div className="hidden md:block">
                  <SearchForm className="w-64" />
                </div>
                
                <Link href="/create-listing">
                  <Button>Create new listing</Button>
                </Link>
              </div>
            </div>
            
            {/* Search results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {listings.length > 0 ? (
                listings.map((listing: ListingType) => (
                  <ProductCard
                    key={listing.id}
                    {...listing}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  {searchQuery ? (
                    <p className="text-lg text-gray-500">No results found for "{searchQuery}"</p>
                  ) : (
                    <p className="text-lg text-gray-500">Search for something to see results</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 