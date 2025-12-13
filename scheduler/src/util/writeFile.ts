import fs from "fs/promises";
import path from "path";
import ExcelJS from "exceljs";

export const writeReportFile = async (results: unknown, userId: number, fileName: string, fileFormat: 'json' | 'xlsx') => {
    const filePath = path.join(process.cwd(), "data", userId.toString(), fileName);
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    if (fileFormat === "json") {
        await writeReportJsonFile(results, filePath);
    } else if (fileFormat === "xlsx") {
        await writeReportExcelFile(results, filePath);
    }
}

const writeReportJsonFile = async (results: unknown, filePath: string) => {
    await fs.writeFile(filePath, JSON.stringify(results, null, 2), { encoding: "utf-8" });
}

const writeReportExcelFile = async (results: unknown, filePath: string) => {
    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
        filename: filePath,
        useStyles: true,
        useSharedStrings: true
    });

    const worksheet = workbook.addWorksheet('Report');

    let data: Record<string, any>[] = [];
    if (Array.isArray(results)) {
        data = results;
    } else if (typeof results === 'object' && results !== null) {
        data = [results as Record<string, any>];
    } else {
        data = [{ value: results }];
    }

    if (data.length > 0) {
        // Generate columns from the first keys
        const columns = Object.keys(data[0]!).map(key => ({
            header: key,
            key: key,
            width: 20 // Default width
        }));

        worksheet.columns = columns;

        // Style header row (Row 1)
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        headerRow.fill = {
            type: 'pattern',
            pattern: "solid",
            fgColor: { argb: '0f1c29' }
        };
        headerRow.commit();

        // Add Data Rows
        for (const item of data) {
            const rowValues: Record<string, any> = {};

            for (const key of Object.keys(item)) {
                let value = item[key];

                // Type Inference
                if (typeof value === 'string') {
                    const dateVal = Date.parse(value);
                    if (!isNaN(dateVal) && value.length > 9 && (value.includes('-') || value.includes('/'))) {
                        value = new Date(value);
                    }
                }

                rowValues[key] = value;
            }
            worksheet.addRow(rowValues).commit();
        }
    }

    // Finished
    await workbook.commit();
};