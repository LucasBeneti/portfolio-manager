import { AssetsForm } from "@/components/forms/assets-form";
import { CustomDialog } from "@/components/custom-dialog/custom-dialog";

export type AssetData = {
  category: string;
  name: string;
  quantity: number;
  currentValue: number;
  grade: number;
};

type AssetDialogProps = {
  isEdit?: boolean;
  initialData?: AssetData;
  isOpen: boolean;
  onClose: () => void;
};

export function AssetDialog(props: AssetDialogProps) {
  const { isOpen, onClose } = props;
  return (
    <CustomDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Novo ativo"
      description="Adicione aqui um novo ativo para a sua carteira. Dependendo da nota, ele poderá ser considerado em um novo aporte."
    >
      <AssetsForm initialData={props.initialData} />
    </CustomDialog>
  );
}
