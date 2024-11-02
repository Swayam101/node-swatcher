![My Package Icon](https://i.imgur.com/MaQqK84.jpeg)

# node-swatcher

_node-swatcher_ is a lightweight file-watching tool, designed to automatically restart or reload file/script when the specified file changes. This tool is ideal if you want a simple file sandbox where you want to save time by not manually re-executing your file every time you make a change.

## Features

- Watches specified file for changes.
- Automatically restarts the application on file update.
- Has a cool json based config feature.

## Installation

- _npm i node-swatcher_ **or** _npm install node-swatcher_
- _yarn add node-swatcher_
- Add required script to your package.json
  ![Alt Text](https://i.imgur.com/rJ5t1K2.gif)

## Usage

### -Using Config File

1. Create a **swatcher.json** file in the same directory as file to be run.
2. Add the configurations as specified :

```json
{
  "serverRestartMessage": "The Server has been restarted",
  "serverErrorMessage": "Try Fixing the error and then , retry",
  "fileChangeMessage": "File has been changed!",
  "filePath": "./demoFile.js",
  "command": "node"
}
```

Here _command_ refers to the program to be used for running the file specified in the _filePath_.

3. Run the command:

- **npm run swatch** or **yarn swatch**

### -Using CLI

- First argument requied is the file path.

- For running the node-swatcher using CLI we can pass the CLI equivalents of our json config as named args in the command.

For Example :

```bash
npm run swatch <filepath> --com=node
```

- Remember **--com** is a required named argument.

## Customizations

- You can customize the restart,error and file change messages as required
