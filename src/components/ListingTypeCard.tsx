import Link from "next/link";
import { Card, CardContent } from "./ui/card";

interface ListingTypeCardProps {
  title: string;
  description: string;
  href: string;
}

export function ListingTypeCard({ title, description, href }: ListingTypeCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-gray-300 rounded-full"></div>
          </div>
          <h3 className="font-bold mb-2">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
} 