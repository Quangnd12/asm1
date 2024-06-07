import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportFilteredTableToExcel(tableId: string, sheetName: string, fileName: string, columnsToInclude: string[]): void {
    const table = document.getElementById(tableId);
    if (!table) {
      console.error('Table not found');
      return;
    }

    // Convert table to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

    // Filter worksheet columns
    const filteredWorksheet = this.filterWorksheetColumns(worksheet, columnsToInclude);

    const workbook: XLSX.WorkBook = {
      Sheets: { [sheetName]: filteredWorksheet },
      SheetNames: [sheetName]
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private filterWorksheetColumns(worksheet: XLSX.WorkSheet, columnsToInclude: string[]): XLSX.WorkSheet {
    const filteredData: any[] = XLSX.utils.sheet_to_json(worksheet).map((row: any) => {
      return columnsToInclude.reduce((acc, key) => {
        if (row[key] !== undefined) {
          acc[key] = row[key];
        }
        return acc;
      }, {} as any);
    });

    return XLSX.utils.json_to_sheet(filteredData);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}.xlsx`);
  }
}
