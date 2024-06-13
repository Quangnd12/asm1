export function exportToCSV(headers: string[], rows: any[], fileName: string): void {
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    
    const csvWithBOM = '\uFEFF' + csvContent;
  
    const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  