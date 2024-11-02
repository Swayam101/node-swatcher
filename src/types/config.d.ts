interface IJsonConfig {
  serverRestartMessage: string;
  serverErrorMessage: string;
  fileChangeMessage: string;
  filePath: string;
  command: string;
}

interface IJsonToNamedArgsSpecification {
  serverRestartMessage: "svm";
  serverErrorMessage: "sve";
  fileChangeMessage: "fcm";
  filePath: "filePath";
  command: "com";
}

interface INamedArgsToJson {
  svm: string;
  sve: string;
  fcm: string;
  filePath: string;
  com: string;
}
