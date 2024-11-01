"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("../constants");
const readConfigFile = () => {
    if (!fs_1.default.existsSync(constants_1.configPath))
        throw new Error("cannot detect config file");
    const data = fs_1.default.readFileSync("./swatcher.json");
    const parsedJson = JSON.parse(data.toString());
    return parsedJson;
};
const checkConfigValidity = () => {
    const rawConfigData = readConfigFile();
    const rawKeys = Object.keys(rawConfigData);
    const isValidConfig = rawKeys.every((arg) => constants_1.JSON_NAMED_ARGS.includes(arg));
    const containsCommand = rawKeys.includes("command");
    const containsFile = rawKeys.includes("filePath");
    if (!isValidConfig || !containsCommand || !containsFile)
        throw new Error();
    return rawConfigData;
};
const convertConfigData = (configData) => {
    const parsedData = Object.fromEntries(Object.entries(constants_1.jsonToNamedArgsSpecification).map(([key, value]) => [
        value,
        key,
    ]));
    Object.keys(configData).forEach((element) => {
        const convertedKey = constants_1.jsonToNamedArgsSpecification[element];
        parsedData[convertedKey] =
            configData[element];
    });
    return parsedData;
};
exports.default = () => {
    try {
        const configData = checkConfigValidity();
        const parsedData = convertConfigData(configData);
        return parsedData;
    }
    catch (error) {
        throw new Error("invalid config file , recheck the syntax");
    }
};
