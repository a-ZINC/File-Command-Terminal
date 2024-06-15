import fs from "node:fs/promises";
import { commandFilePath } from "../utils/commandConstant";

export const appendFile = async(path: string, content: string) => {
    console.log(path,content);
    try {
        console.log("hello");
        const appendFileHandle = await fs.open(path, "a+");
        appendFileHandle.write(content);
        appendFileHandle.close();
    } catch(error: any) {
        if(error.code === "EBUSY") {
            return;
        } else {
            appendFile(commandFilePath, `~ File doesnot exist \n`);
        }
    }
}