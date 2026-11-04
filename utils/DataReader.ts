
import fs from 'fs';
import { parse } from 'csv-parse/sync';
// import * as xlsx from 'xlsx';

export class DataProvider {
  static readJson(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }

  static readCsv(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf8');

    const records = parse(data, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    return records;
  }

  // static readExcel(filePath: string) {
  //   const workbook = xlsx.readFile(filePath);
  //   const sheetName = workbook.SheetNames[0];

  //   if (!sheetName) {
  //     throw new Error('Excel file does not contain any worksheets.');
  //   }

  //   const worksheet = workbook.Sheets[sheetName];

  //   return xlsx.utils.sheet_to_json(worksheet);
  // }
}