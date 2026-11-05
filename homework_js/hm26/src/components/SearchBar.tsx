import type { RefObject } from "react";

interface SearchBarProps {
    search: string;
    onSearchChange: (value: string) => void;
    searchInputRef: RefObject<HTMLInputElement>;
}

function SearchBar({
    search,
    onSearchChange,
    searchInputRef
}: SearchBarProps) {
    return (
        <input
            className="search-input"
            type="text"
            placeholder="Поиск контакта"
            value={search}
            ref={searchInputRef}
            onChange={(e) => onSearchChange(e.target.value)}
        />
    );
}

export default SearchBar;
