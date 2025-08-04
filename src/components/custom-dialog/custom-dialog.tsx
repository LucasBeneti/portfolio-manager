import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

export function CustomDialog(
  props: React.PropsWithChildren<CustomDialogProps>
) {
  const { isOpen, onClose, title, description, children } = props;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md dark [&>button>svg]:dark:text-white'>
        <DialogHeader>
          {title && (
            <DialogTitle className='dark:text-white'>{title}</DialogTitle>
          )}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
