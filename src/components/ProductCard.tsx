import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { ListingType } from "@/lib/supabase";

export function ProductCard(props: ListingType) {
  const { id, title, price, description, location, image_url, category } = props;

  return (
    <Link href={`/listing/${id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
        <div className="aspect-[4/3] w-full relative bg-gradient-to-br from-gray-50 to-gray-100">
          {image_url ? (
            <>
              <Image
                src={image_url}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          ) : (
            <div className="w-full h-full grid place-items-center border border-gray-200 bg-gray-50">
              <div className="text-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-2">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <div className="text-gray-400">No image</div>
              </div>
            </div>
          )}
          {/* Category tag */}
          {category && (
            <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-md text-xs backdrop-blur-sm">
              {category}
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">${Number(price).toLocaleString()}</h3>
          <h4 className="font-medium text-sm line-clamp-1">{title}</h4>
          <p className="text-sm text-gray-600 line-clamp-1 mt-1">{description}</p>
          <div className="text-xs text-gray-500 mt-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 