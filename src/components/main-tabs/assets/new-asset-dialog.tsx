import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AssetsForm } from '@/components/forms/test-form';

export function NewAssetDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='dark:text-white'>
          Adicionar ativo
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md dark'>
        <DialogHeader>
          <DialogTitle className='dark:text-white'>Novo ativo</DialogTitle>
          <DialogDescription>
            Adicione aqui um novo ativo para a sua carteira. Dependendo da nota,
            ele poderá ser considerado em um novo aporte.
          </DialogDescription>
        </DialogHeader>
        <AssetsForm />
      </DialogContent>
    </Dialog>
  );
}
