import Link from "next/link";
import { Button } from "./ui/button";
import { SearchForm } from "./SearchForm";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center px-2">
              <div className="bg-red-500 text-blue rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
                SU
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Marketplace</span>
            </Link>
          </div>
          
          {/* Desktop search - HIDDEN on all screens, will be shown in page layouts instead */}
          {/* We remove this from the navbar completely */}

          <div className="flex items-center space-x-4">

            <Link href="/messages">
              <Button variant="ghost" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </Button>
            </Link>
            <Link href="/notifications">
              <Button variant="ghost" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile search bar - ONLY visible on small screens */}
        <div className="md:hidden pb-4">
          <SearchForm className="w-full" />
        </div>
      </div>
    </nav>
  );
} 