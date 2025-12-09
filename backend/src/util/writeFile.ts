import fs from "fs/promises";
import path from "path";

export const writeReportFile = async (results: unknown, userId: number, fileName: string) => {
    const filePath = path.join(process.cwd(), "data", userId.toString(), fileName);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(results, null, 2), { encoding: "utf-8" });
}