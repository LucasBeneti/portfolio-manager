import { AssetsForm } from '@/components/forms/assets-form';
import { CustomDialog } from '@/components/custom-dialog/custom-dialog';
import type { Asset } from '@/interfaces/assets';

type AssetDialogProps = {
  isEdit?: boolean;
  initialData?: Asset;
  isOpen: boolean;
  onClose: () => void;
};

export function AssetDialog(props: AssetDialogProps) {
  const { isOpen, onClose } = props;
  return (
    <CustomDialog
      isOpen={isOpen}
      onClose={onClose}
      title='Novo ativo'
      description='Adicione aqui um novo ativo para a sua carteira. Dependendo da nota, ele poderá ser considerado em um novo aporte.'
    >
      <AssetsForm initialData={props.initialData} />
    </CustomDialog>
  );
}
