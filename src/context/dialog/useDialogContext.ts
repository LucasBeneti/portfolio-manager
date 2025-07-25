import { useContext } from 'react';
import { DialogContext } from './DialogContext';

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error(
      'To use this hook, the component should be children of the DialogProvider.'
    );

  return context;
}
