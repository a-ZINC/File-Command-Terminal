import fs from "node:fs/promises";
import {readFile} from "./utils/readFile";

const app = async() => {
    // watcher
    const watcher = fs.watch("./command.txt");
    console.log("Write command in command.txt");
    for await (const event of watcher){
        if (event.eventType === "change") {
            readFile();
        }
    }
};

app();