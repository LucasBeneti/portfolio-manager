import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { exportUserData } from '@/utils/export-data/export-user-data';

export function ExportUserData() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className='dark dark:bg-teal-950 dark:text-white font-bold absolute right-6 bottom-6'
          onClick={exportUserData}
        >
          Exportar dados armazenados
        </Button>
      </TooltipTrigger>
      <TooltipContent className='max-w-[500px] text-[16px] text-balance'>
        <p>
          Exporta os dados armazenados no local storage. Assim você pode
          compartilhar e importar dados anteriores.
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
