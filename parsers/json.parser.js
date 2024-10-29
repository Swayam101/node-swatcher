import fs from "fs";
import {
  configPath,
  JSON_NAMED_ARGS,
  jsonToNamedArgsSpecification,
} from "../constants.js";

const readConfigFile = () => {
  if (!fs.existsSync(configPath)) throw new Error("cannot detect config file");
  const data = fs.readFileSync("./swatcher.json");
  const parsedJson = JSON.parse(data.toString());
  return parsedJson;
};

const checkConfigValidity = () => {
  const rawConfigData = readConfigFile();
  const isValidConfig = Object.keys(rawConfigData).every((arg) =>
    JSON_NAMED_ARGS.includes(arg)
  );
  if (!isValidConfig) throw new Error("invalid configuration file");
  return rawConfigData;
};

const convertConfigData = (configData) => {
  const parsedData = {};
  Object.keys(configData).forEach((element) => {
    const convertedKey = jsonToNamedArgsSpecification[element];
    parsedData[convertedKey] = configData[element];
  });
  return parsedData;
};

export default () => {
  const configData = checkConfigValidity();
  const parsedData = convertConfigData(configData);
  return parsedData;
};
