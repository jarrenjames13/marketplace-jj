import { Navbar } from "@/components/Navbar";
import { ListingTypeCard } from "@/components/ListingTypeCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Listing type options
const listingTypes = [
  {
    title: "Item for sale",
    description: "Lorem ipsum dolor sit",
    href: "/create-listing/item"
  },
  {
    title: "Create multiple listings",
    description: "Lorem ipsum dolor sit",
    href: "/create-listing/multiple"
  },
  {
    title: "Vehicle for sale",
    description: "Lorem ipsum dolor sit",
    href: "/create-listing/vehicle"
  },
  {
    title: "Home for sale or rent",
    description: "Lorem ipsum dolor sit",
    href: "/create-listing/home"
  },
];

export default function CreateListingPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" className="mr-2" asChild>
              <Link href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Create new listing</h1>
          </div>
          
          <div className="mb-8">
            <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              <span className="text-sm">Choose listing type</span>
            </div>
          </div>
          
          <div className="mb-8">
            <Link href="/your-listings" className="flex items-center hover:text-blue-500 transition-colors">
              <div className="bg-gray-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
              <span className="font-semibold">Your listings</span>
            </Link>
          </div>
          
          <div className="mb-8">
            <Link href="/seller-help" className="flex items-center hover:text-blue-500 transition-colors">
              <div className="bg-gray-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="font-semibold">Seller help</span>
            </Link>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Choose listing type</h2>
          
          <div className="grid grid-cols-4 gap-6">
            {listingTypes.map((type) => (
              <ListingTypeCard
                key={type.title}
                title={type.title}
                description={type.description}
                href={type.href}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 