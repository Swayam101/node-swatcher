#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const cli_parser_js_1 = __importDefault(require("./parsers/cli.parser.js"));
const utils_js_1 = require("./utils.js");
const json_parser_js_1 = __importDefault(require("./parsers/json.parser.js"));
const args = process.argv.slice(2);
let currentProcess = null;
let debounceTimer = null;
const startDevelopmentServer = (namedArgs, file) => {
    var _a;
    if (currentProcess) {
        currentProcess.kill();
    }
    const command = namedArgs.com;
    currentProcess = (0, child_process_1.spawn)(command, [file], { stdio: "inherit" });
    const serverErrMsg = (_a = namedArgs === null || namedArgs === void 0 ? void 0 : namedArgs.sve) !== null && _a !== void 0 ? _a : `Server Stopped Due To Some Error`;
    currentProcess.on("close", (exitCode) => {
        if (exitCode == 0)
            return (0, utils_js_1.colorLog)("FgGreen", "execution successful , waiting for changes.....");
        (0, utils_js_1.colorLog)("BgRed", `${serverErrMsg}`);
    });
};
const chokidarBano = (namedArgs, file) => {
    fs_1.default.watch(file, (eventType, fileName) => {
        if (fileName && eventType === "change") {
            if (debounceTimer)
                clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                (0, utils_js_1.colorLog)("BgYellow", `File Changed : ${fileName}`);
                startDevelopmentServer(namedArgs, file);
            }, 1000);
        }
    });
};
const init = (namedArgs, file, flags) => {
    startDevelopmentServer(namedArgs, file);
    chokidarBano(namedArgs, file);
};
try {
    (0, utils_js_1.displayIcon)();
    (0, utils_js_1.displayTitle)();
    if (args.length == 0) {
        const parsedData = (0, json_parser_js_1.default)();
        init(parsedData, parsedData.filePath);
    }
    else {
        const { namedArgs, flags, file } = (0, cli_parser_js_1.default)(args);
        init(namedArgs, file, flags);
    }
}
catch (error) {
    console.log(error);
    (0, utils_js_1.colorLog)("BgRed", error.message);
}
