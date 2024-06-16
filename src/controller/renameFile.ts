import fs from "node:fs/promises"
import { appendFile } from "./appendFile";
import { commandFilePath } from "../utils/commandConstant";
export const renameFile = async(lpath: string, npath: string) => {
    try{
        await fs.rename(lpath, npath);
    } catch(error: any) {
        if(error.code === "ENOENT"){
            appendFile(commandFilePath, `~ File doesnot exist \tFile path: ${lpath} \n`)
        } else {
            appendFile(commandFilePath, `~ File rename process exit with \tError Code: ${error.code} \n`);
        }
    }
}