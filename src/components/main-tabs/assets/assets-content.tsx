import DemoPage from '@/components/assets-table/page';
import { NewAssetDialog } from './new-asset-dialog';

export function AssetsContent() {
  return (
    <>
      <div>
        <NewAssetDialog />
      </div>
      <p className='dark:text-white'>Seus ativos:</p>
      <DemoPage />
    </>
  );
}
