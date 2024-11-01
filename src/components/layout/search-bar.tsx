'use client';
import { Input } from '../ui/input';
import { useCallback, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import blocks from '@/constants/blocks.json';
import Image from 'next/image';

interface SearchBarProps {
  width?: string;
}

export default function SearchBar({ width }: SearchBarProps) {
  const [searchText, setSearchText] = useState('');
  const [filteredSlots, setFilteredSlots] = useState<number[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();
  const searchBarRef = useRef<HTMLFormElement | null>(null);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    const validInput = /^[0-9]*$/.test(searchValue);
    if (!validInput) return;

    setSearchText(searchValue);

    if (searchValue) {
      const slotNumber = Number(searchValue);
      const filtered = blocks
        .filter((block) => block.slot.toString().includes(slotNumber.toString()))
        .map((block) => block.slot)
        .slice(0, 5);

      setFilteredSlots(filtered);
      setDropdownVisible(true);
    } else {
      setFilteredSlots([]);
      setDropdownVisible(false);
    }
  }, []);

  const handleOptionClick = (slot: number) => {
    setSearchText(slot.toString());
    setDropdownVisible(false);
    router.push(`/block/${slot}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText && filteredSlots.length > 0) {
      router.push(`/block/${filteredSlots[0]}`);
    }
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
      setDropdownVisible(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <form onSubmit={handleFormSubmit} className={`flex items-center h-12 mr-auto mt-10`} ref={searchBarRef} style={{ width }}>
      <div className="relative w-full">
        <Input
          className="w-full h-12 font-medium text-sm rounded-xl bg-[rgba(255,255,255,0.02)] text-white_secondary placeholder:text-white_secondary pl-12 pr-4"
          type="text"
          placeholder="Search blocks by slot"
          value={searchText}
          onChange={handleSearch}
          autoFocus
        />
        <Image src="/assets/search.svg" alt="Search Icon" width={20} height={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white_secondary" />

        {dropdownVisible && filteredSlots.length > 0 && (
          <ul className="absolute top-full left-0 right-0 z-10 bg-background text-white_secondary shadow-md max-h-48 overflow-auto rounded-xl mt-2">
            {filteredSlots.map((slot) => (
              <li key={slot} className="cursor-pointer px-4 py-2 hover:bg-white/[0.1] text-white_secondary hover:text-green_mantis" onClick={() => handleOptionClick(slot)}>
                {slot}
              </li>
            ))}
          </ul>
        )}

        {searchText && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setSearchText('');
              setDropdownVisible(false);
            }}
            className="absolute right-0 top-1 p-2 mr-2 font-bold"
          >
            x
          </button>
        )}
      </div>
    </form>
  );
}
