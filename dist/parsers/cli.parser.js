"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("../constants");
const checkFileExists = (args) => {
    const fileName = args[0];
    if (!fileName)
        throw Error("filename argument is required");
    if (!fs_1.default.existsSync(fileName))
        throw Error("file does not exists");
    return fileName;
};
const parseNamedArg = (args) => {
    const formattedNamedArgs = args.reduce((accumulation, currentArg) => {
        if (!currentArg.startsWith("--"))
            return accumulation;
        const [key, value] = currentArg.slice(2).split("=");
        if (!key || !value)
            throw new Error("invalid command syntax");
        const isValidNamedArg = constants_1.availableNamedArgs.includes(key);
        if (!isValidNamedArg)
            throw new Error("unknown named argument");
        if (key === "com" && !constants_1.SUPPORTED_COMMANDS.includes(value))
            throw new Error("Given Command Is Not Supported Till Now....");
        accumulation[`${key}`] = value;
        return accumulation;
    }, {});
    if (!Object.keys(formattedNamedArgs).includes("com"))
        throw new Error("command argument is required");
    return formattedNamedArgs;
};
const parseFlags = (args) => {
    const formattedFlags = args.reduce((accumulation, currentArg) => {
        const isFlag = !currentArg.startsWith("--") && currentArg.startsWith("-");
        if (!isFlag)
            return accumulation;
        const isValidFlag = constants_1.validFlags.includes(currentArg);
        if (!isValidFlag)
            throw new Error("invalid flag detected");
        accumulation.push(currentArg.replace("-", ""));
        return accumulation;
    }, []);
    return formattedFlags;
};
exports.default = (args) => {
    const file = checkFileExists(args);
    const namedArgs = parseNamedArg(args);
    const flags = parseFlags(args);
    return { namedArgs, flags, file };
};
