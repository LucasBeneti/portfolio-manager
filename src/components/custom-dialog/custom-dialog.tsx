import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AssetsForm } from "../forms/assets-form";

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

export function CustomDialog({
  isOpen,
  onClose,
  title,
  description,
}: CustomDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md dark">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Novo ativo</DialogTitle>
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
