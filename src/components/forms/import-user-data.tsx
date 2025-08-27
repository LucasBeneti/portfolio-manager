import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Upload, Download, File, X } from 'lucide-react';
import { exportUserData } from '@/utils/export-data/export-user-data';
import { toast } from 'sonner';
import { useDialogContext } from '@/context/dialog';

const fileSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, 'Please select a file')
    .refine(
      (files) => files?.[0]?.size <= 5 * 1024 * 1024, // 5MB limit
      'File size must be less than 5MB'
    )
    .refine((files) => {
      const file = files?.[0];
      return (
        file?.type === 'application/json' ||
        file?.name.toLowerCase().endsWith('.json')
      );
    }, 'Only JSON files are allowed'),
});

type FileFormData = z.infer<typeof fileSchema>;

export function ImportExportUserDataForm() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const { closeExportUserDataDialog } = useDialogContext();
  function handleOpenExportDataDialog() {
    exportUserData();
    closeExportUserDataDialog();
  }

  const form = useForm<FileFormData>({
    resolver: zodResolver(fileSchema),
  });

  const fileRef = form.register('file');
  const onSubmit = async (data: FileFormData) => {
    setIsUploading(true);

    try {
      const file = data.file[0];

      const fileContent = await file.text();

      const jsonData = JSON.parse(fileContent);

      Object.entries(jsonData).forEach(([key, value]) => {
        const stringValue =
          typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, stringValue);
      });

      form.reset();
      setSelectedFile(null);
      closeExportUserDataDialog();
    } catch (error) {
      console.error('Failed to process file:', error);
      toast.error('Falha ao importar o arquivo! :(');
      if (error instanceof SyntaxError) {
        console.error('Invalid JSON format in the file');
        toast.error('JSON com formato inválido');
      } else {
        console.error('Failed to read or process the file');
        toast.error('Falha no processo de leitura do arquivo.');
      }
    } finally {
      setIsUploading(false);
      toast.success('Arquivo importado com sucesso!');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      form.trigger('file');
    } else {
      setSelectedFile(null);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById(
      'file-upload'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    form.resetField('file');
    form.clearErrors('file');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Form {...form}>
      <div onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='file'
          render={() => (
            <FormItem>
              <FormLabel className='text-sm font-medium text-gray-700'>
                Escolher arquivo
              </FormLabel>
              <FormControl>
                <div className='space-y-4'>
                  <div className='relative'>
                    <Input
                      type='file'
                      className='hidden'
                      id='file-upload'
                      {...fileRef}
                      onChange={(e) => {
                        fileRef.onChange(e);
                        handleFileChange(e);
                      }}
                      accept='.json,application/json'
                    />
                    <label
                      htmlFor='file-upload'
                      className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors'
                    >
                      <Upload className='w-8 h-8 text-gray-400 mb-2' />
                      <span className='text-sm text-gray-500'>
                        Clique para selecionar um arquivo
                      </span>
                      <span className='text-xs text-gray-400 mt-1'>
                        Máximo 5MB • apenas arquivos JSON
                      </span>
                    </label>
                  </div>

                  {selectedFile && (
                    <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg border'>
                      <div className='flex items-center space-x-3'>
                        <File className='w-5 h-5 text-blue-500' />
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium text-gray-900 truncate'>
                            {selectedFile.name}
                          </p>
                          <p className='text-xs text-gray-500'>
                            {formatFileSize(selectedFile.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={removeFile}
                        className='text-gray-400 hover:text-red-500'
                      >
                        <X className='w-4 h-4' />
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className='text-xs text-gray-600'>
                Selecione um arquivo para importar
              </FormDescription>
              <FormMessage className='text-sm text-red-600' />
            </FormItem>
          )}
        />

        <section className='flex flex-col gap-4'>
          <Button
            type='button'
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isValid || isUploading || !selectedFile}
            className='w-full'
          >
            {isUploading ? (
              <>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
                Uploading...
              </>
            ) : (
              <>
                <Upload className='w-4 h-4 mr-2' />
                Importar
              </>
            )}
          </Button>
          <p className='dark dark:text-white text-center'>Ou</p>
          <Button
            type='button'
            variant='secondary'
            className='dark'
            onClick={handleOpenExportDataDialog}
          >
            <Download className='w-4 h-4 mr-2' />
            Exportar
          </Button>
        </section>
      </div>
    </Form>
  );
}
