import fs from "node:fs/promises";
import { Buffer } from "node:buffer";
import { command, commandFilePath } from "./commandConstant";
import { createFile } from "../controller/createFile";
import { appendFile } from "../controller/appendFile";
import { deleteFile } from "../controller/deleteFile";
import { renameFile } from "../controller/renameFile";

export const readFile = async() => {
    const readFileHandle = await fs.open(commandFilePath, "r+");
    const { size } = await readFileHandle.stat();
    const buffer = Buffer.alloc(size);

    await readFileHandle.read(buffer, 0, size, 0);
    const bufferString = buffer.toString("hex");

    if(bufferString.endsWith("0a")){
        const lastCommandHexString = buffer.toString("hex").split("0a").at(-2)?.trim();
        const buff = Buffer.from("ffff","utf-8");
        const readData = Buffer.from(lastCommandHexString ? lastCommandHexString:"", "hex").toString("utf-8");

        // create a file
        // create /Users/user_name/__/__/file.txt
        if(readData && readData.includes(command.CREATE_FILE)) {
            const path = readData.substring(command.CREATE_FILE.length + 1);
            createFile(path);
        }

        // delete a file
        // delete /Users/user_name/__/__/file.txt
        if(readData && readData.includes(command.DELETE_FILE)) {
            const path = readData.substring(command.DELETE_FILE.length + 1);
            deleteFile(path);
        }

        // append content to file
        // append /Users/user_name/__/__/file.txt : "Content"
        if(readData && readData.includes(command.APPEND_FILE)) {
            if(readData.includes(':')){
                const index = readData.indexOf(":");
                const path = readData.substring(command.APPEND_FILE.length + 1, index-1);
                const content = readData.substring(index+1);
                appendFile(path, content);
            } else {
                appendFile(commandFilePath, `~ incorrect command \n`);
            }
        }

        // rename file
        // rename /Users/user_name/__/__/file.txt : /Users/user_name/__/__/file.txt
        if(readData && readData.includes(command.RENAME_FILE)) {
            if(readData.includes(':')){
                const index = readData.indexOf(":");
                const lpath = readData.substring(command.RENAME_FILE.length + 1, index-1);
                const npath = readData.substring(index+1);
                renameFile(lpath, npath);
            } else {
                renameFile(commandFilePath, `~ incorrect command \n`);
            }
        }

        

    }
    

    readFileHandle.close();
}
