import Link from "next/link";

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
  "Buy and sell groups"
];

interface CategorySidebarProps {
  activeCategory?: string;
}

export function CategorySidebar({ activeCategory }: CategorySidebarProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <Link 
              href={`/category/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
              className={`block py-1 hover:text-blue-500 ${activeCategory === category ? 'text-blue-500 font-semibold' : ''}`}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 