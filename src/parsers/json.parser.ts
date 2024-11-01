import fs from "fs";
import {
  configPath,
  JSON_NAMED_ARGS,
  jsonToNamedArgsSpecification,
} from "../constants";
import { IJsonConfig, INamedArgsToJson } from "../types/config.types";

const readConfigFile = () => {
  if (!fs.existsSync(configPath)) throw new Error("cannot detect config file");
  const data = fs.readFileSync("./swatcher.json");
  const parsedJson = JSON.parse(data.toString());
  return parsedJson;
};

const checkConfigValidity = () => {
  const rawConfigData = readConfigFile();
  const rawKeys = Object.keys(rawConfigData);
  const isValidConfig = rawKeys.every((arg) => JSON_NAMED_ARGS.includes(arg));
  const containsCommand = rawKeys.includes("command");
  const containsFile = rawKeys.includes("filePath");
  if (!isValidConfig || !containsCommand || !containsFile) throw new Error();

  return rawConfigData;
};

const convertConfigData = (configData: IJsonConfig) => {
  const parsedData: INamedArgsToJson = Object.fromEntries(
    Object.entries(jsonToNamedArgsSpecification).map(([key, value]) => [
      value,
      key,
    ])
  );

  Object.keys(configData).forEach((element) => {
    const convertedKey =
      jsonToNamedArgsSpecification[element as keyof IJsonConfig];
    parsedData[convertedKey as keyof typeof parsedData] =
      configData[element as keyof IJsonConfig];
  });
  return parsedData;
};

export default () => {
  try {
    const configData = checkConfigValidity();
    const parsedData = convertConfigData(configData);
    return parsedData;
  } catch (error) {
    throw new Error("invalid config file , recheck the syntax");
  }
};
