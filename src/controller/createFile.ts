import fs from "node:fs/promises"
import { appendFile } from "./appendFile";
import { commandFilePath } from "../utils/commandConstant";
export const createFile = async(path: string) => {
    // const newFileHandle = await fs.open(path, "w");    write over already exits file not error if already exist
    // newFileHandle.close();
    try{
        const newFileHandle = await fs.open(path, "wx");
        newFileHandle.close();
    } catch(error: any) {
        if(error.code === "EEXIST"){
            appendFile(commandFilePath, `~ File already exist \tFile path: ${path} \n`)
        } else {
            appendFile(commandFilePath, `~ File creation process exit with \tError Code: ${error.code} \n`);
        }
    }
}