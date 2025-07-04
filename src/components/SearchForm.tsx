"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchFormProps {
  defaultValue?: string;
  className?: string;
  placeholder?: string;
}

export function SearchForm({ defaultValue = "", className = "", placeholder = "Search listings..." }: SearchFormProps) {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInputRef.current?.value || "";
    
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={`flex items-center ${className}`}>
      <Input 
        ref={searchInputRef}
        type="search" 
        name="q" 
        placeholder={placeholder} 
        defaultValue={defaultValue}
        className="w-full md:w-64"
      />
      <Button type="submit" size="icon" variant="ghost" className="ml-1">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
} 