import { columns } from './columns';
import { DataTable } from './data-table';
import { useUserInformation } from '@/context/user-information';

export default function AssetsTable() {
  const { assets } = useUserInformation();

  return (
    <div className='text-foreground w-full py-4'>
      <DataTable columns={columns} data={assets || []} />
    </div>
  );
}
