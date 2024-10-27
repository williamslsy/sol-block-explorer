import BlockTable from '@/components/layout/block-table';
import HeadLine from '@/components/layout/headline';
import SearchBar from '@/components/layout/search-bar';

export default function Home() {
  return (
    <div className="w-full max-w-[800px] mx-auto">
      <HeadLine />
      <SearchBar />
      <BlockTable />
    </div>
  );
}
