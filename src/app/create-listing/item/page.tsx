import { Navbar } from "@/components/Navbar";
import CreateListingForm from "./CreateListingForm";

export default function CreateItemListingPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CreateListingForm />
      </div>
    </div>
  );
} 