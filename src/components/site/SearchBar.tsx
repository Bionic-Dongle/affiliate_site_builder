import { Search } from "lucide-react";

interface SearchBarProps {
  heading: string;
}

const SearchBar = ({ heading }: SearchBarProps) => {
  return (
    <section className="py-8 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <label className="block text-sm font-medium mb-2">{heading}</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input 
              type="search"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
