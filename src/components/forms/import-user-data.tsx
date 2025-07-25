import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Upload, File, X } from 'lucide-react';

const fileSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, 'Please select a file')
    .refine(
      (files) => files?.[0]?.size <= 5 * 1024 * 1024,
      'File size must be less than 5MB'
    )
    .refine((files) => {
      const allowedTypes = ['application/json'];
      return allowedTypes.includes(files?.[0]?.type);
    }, 'Apenas o formato JSON será aceito.'),
});

type FileFormData = z.infer<typeof fileSchema>;

export function ImportUserData() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const form = useForm<FileFormData>({
    resolver: zodResolver(fileSchema),
    defaultValues: {},
  });

  const fileRef = form.register('file');

  const onSubmit = async (data: FileFormData) => {
    setIsUploading(true);

    try {
      const file = data.file[0];
      console.log('Uploading file:', file.name);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically make your API call
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });

      console.log('File uploaded successfully!');

      // Reset form after successful upload
      form.reset();
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    form.setValue('file', new FileList());
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium text-gray-700'>
                Choose File
              </FormLabel>
              <FormControl>
                <div className='space-y-4'>
                  {/* File Input */}
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
                      accept='image/jpeg,image/png,image/gif,application/pdf,text/plain'
                    />
                    <label
                      htmlFor='file-upload'
                      className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors'
                    >
                      <Upload className='w-8 h-8 text-gray-400 mb-2' />
                      <span className='text-sm text-gray-500'>
                        Click to select a file
                      </span>
                      <span className='text-xs text-gray-400 mt-1'>
                        Max 5MB • JPEG, PNG, GIF, PDF, TXT
                      </span>
                    </label>
                  </div>

                  {/* Selected File Display */}
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
                Select a file to upload to your application
              </FormDescription>
              <FormMessage className='text-sm text-red-600' />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={!selectedFile || isUploading}
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
              Upload File
            </>
          )}
        </Button>
      </div>
    </Form>
  );
}
