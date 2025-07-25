import { LOCAL_STORAGE_PREFIX } from '@/contants/user-data';
import { toast } from 'sonner';

export function exportUserData() {
  const neededUserData: Array<string> = [
    `${LOCAL_STORAGE_PREFIX}userAssets`,
    `${LOCAL_STORAGE_PREFIX}userObjectives`,
    `${LOCAL_STORAGE_PREFIX}userSuggestions`,
    `${LOCAL_STORAGE_PREFIX}investmentSuggestion`,
  ];
  try {
    const data: Record<string, string> = {
      [`${LOCAL_STORAGE_PREFIX}userAssets`]: '',
      [`${LOCAL_STORAGE_PREFIX}userObjectives`]: '',
      [`${LOCAL_STORAGE_PREFIX}userSuggestions`]: '',
      [`${LOCAL_STORAGE_PREFIX}investmentSuggestion`]: '',
    };

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) || '';
      if (key && key !== null && neededUserData.includes(key)) {
        data[key as string] = localStorage.getItem(key) ?? '';
      }
    }

    if (Object.keys(data).length === 0) {
      alert('No data found inf local storage to export.');
      return;
    }

    const jsonString = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `user-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    toast.success('Arquivo exportado com sucesso!');
  } catch (error) {
    console.error('Error exporting data from localStorage:', error);
    toast.error('Failed to export data. See console for details.');
  }
}
