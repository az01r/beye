import fs from "fs/promises";
import path from "path";

export const writeReportFile = async (results: unknown, fileName: string) => {
    const filePath = path.join(process.cwd(), "data", fileName);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(results, null, 2), { encoding: "utf-8" });
}