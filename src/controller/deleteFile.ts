import fs from "node:fs/promises"
import { appendFile } from "./appendFile";
import { commandFilePath } from "../utils/commandConstant";
export const deleteFile = async(path: string) => {
    try{
        await fs.unlink(path);
    } catch(error: any) {
        if(error.code === "ENOENT"){
            appendFile(commandFilePath, `~ File doesnot exist \tFile path: ${path} \n`)
        } else {
            appendFile(commandFilePath, `~ File deletion process exit with \tError Code: ${error.code} \n`);
        }
    }
}