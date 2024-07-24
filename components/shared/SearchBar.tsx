import React, { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchPanel from "@/components/shared/SearchPanel";

interface Props {
  type: "courses" | "users";
}

const SearchBar = ({ type }: Props) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    console.log(query);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="w-full flex justify-center">
      <form className="w-[95%] absolute sm:w-1/3 sm:right-5 sm:top-32">
        <Input type="text" value={query} onChange={handleInputChange} />
        <div className="absolute inset-y-0 right-0 text-gray-500">
          <Button
            type="submit"
            variant="link"
            size="icon"
            onClick={handleSearch}
          >
            <Search size={20} />
          </Button>
        </div>
        <div className="w-full absolute">
          <SearchPanel type={type} query={query} />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
