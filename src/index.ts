#!/usr/bin/env node
import fs from "fs";
import { ChildProcess, spawn } from "child_process";
import parseArgs from "./parsers/cli.parser";
import { colorLog, displayIcon, displayTitle } from "./utils";
import jsonParser from "./parsers/json.parser";
import { INamedArgsToJson } from "./types/config.types";

const args = process.argv.slice(2);

let currentProcess: ChildProcess | null = null;
let debounceTimer: NodeJS.Timeout | null = null;

const startDevelopmentServer = (namedArgs: INamedArgsToJson, file: string) => {
  if (currentProcess) {
    currentProcess.kill();
  }
  const command = namedArgs.com;
  currentProcess = spawn(command, [file], { stdio: "inherit" });
  const serverErrMsg = namedArgs?.sve ?? `Server Stopped Due To Some Error`;
  currentProcess.on("close", (exitCode) => {
    if (exitCode == 0)
      return colorLog(
        "FgGreen",
        "execution successful , waiting for changes....."
      );
    colorLog("BgRed", `${serverErrMsg}`);
  });
};

const chokidarBano = (namedArgs: INamedArgsToJson, file: string) => {
  fs.watch(file, (eventType, fileName) => {
    if (fileName && eventType === "change") {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        colorLog("BgYellow", `File Changed : ${fileName}`);
        startDevelopmentServer(namedArgs, file);
      }, 1000);
    }
  });
};

const init = (namedArgs: INamedArgsToJson, file: string, flags?: string[]) => {
  startDevelopmentServer(namedArgs, file);
  chokidarBano(namedArgs, file);
};

try {
  displayIcon();
  displayTitle();
  if (args.length == 0) {
    const parsedData = jsonParser();
    init(parsedData, parsedData.filePath);
  } else {
    const { namedArgs, flags, file } = parseArgs(args);
    init(namedArgs, file, flags);
  }
} catch (error) {
  console.log(error);
  colorLog("BgRed", (error as Error).message);
}
