import { Navbar } from "@/components/Navbar";

export default function ListingLoading() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
          <div className="flex flex-col lg:flex-row">
            {/* Left column - Image placeholder */}
            <div className="w-full lg:w-3/5 relative">
              <div className="bg-gray-200 w-full h-[350px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 0 486.1 0 456.1L0 456.1z" />
                </svg>
              </div>
            </div>
            
            {/* Right column - Details placeholders */}
            <div className="w-full lg:w-2/5 p-6 lg:p-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              
              <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              </div>
              
              <div className="mb-6">
                <div className="h-5 bg-gray-200 rounded w-1/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              
              <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              
              {/* Message form placeholder */}
              <div>
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-24 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 