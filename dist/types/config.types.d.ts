export interface IJsonConfig {
    serverRestartMessage: string;
    serverErrorMessage: string;
    fileChangeMessage: string;
    filePath: string;
    command: string;
}
export interface IJsonToNamedArgsSpecification {
    serverRestartMessage: "svm";
    serverErrorMessage: "sve";
    fileChangeMessage: "fcm";
    filePath: "filePath";
    command: "com";
}
export interface INamedArgsToJson {
    svm: string;
    sve: string;
    fcm: string;
    filePath: string;
    com: string;
}
