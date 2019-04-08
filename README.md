# VS Code extension: WSL workspaceFolder

Translates `workspaceFolder` path into WSL path format, using WSL `wslpath` tool.

Use command as a placeholder where WSL path for the `workspaceFolder` is required, e.g. the `remoteRoot` attribute in launch config for debug, etc.

## Features

This extension returns some VS Code workspace file variables, converted from Windows path format to WSL path format. For example, a `workspaceFolder` with a windows path of `c:\\Users\\Me\\Projects\\project` would return a WSL path of `/mnt/c/Users/Me/Projects/project`.

## Requirements

- MS Windows 10 using WSL (Windows Subsystem for Linux)
- MS Windows 10 => version 17046 for [wslpath tool](https://github.com/MicrosoftDocs/WSL/blob/master/WSL/release-notes.md#build-17046)
- Extension code contributors should either install current release of WSL workspaceFolder or replace command reference in .vscode/launch.json
- VS Code version 1.18.1+ (support multi-root features)

## Extension Settings

This extension contributes the following commands:

- `extension.vscode-wsl-workspaceFolder`: returns WSL format path string to workspaceFolder (replacement for the VS Code `${workspaceFolder}` variable)
- `extension.vscode-wsl-workspaceCurrentFile`: returns WSL format path string to the currently open file in your workspace (replacement for the VS Code `${file}` variable)

## Usage

### standard single-root project

e.g. `.vscode/launch.json`

```json
// A launch configuration that launches the extension inside a new window
// Use IntelliSense to learn about possible attributes.
// Hover to view descriptions of existing attributes.
// For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
{
  "version": "0.2.0",
    "configurations": [
      {
        "type": "node",
        "request": "attach",
        "name": "Attach to Remote",
        "address": "localhost",
        "port": 5858,
        "sourceMaps": false,
        "localRoot": "${workspaceFolder}",
        "remoteRoot": "${command:extension.vscode-wsl-workspaceFolder}"
      }
    ]
}
```

### multi-root project

Optional: add windows.name property to config (used to link/associate an 'Attach to remote' debug config with a workspace folder)

e.g. `.vscode/launch.json`

```json
// A launch configuration that launches the extension inside a new window
// Use IntelliSense to learn about possible attributes.
// Hover to view descriptions of existing attributes.
// For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
{
  "version": "0.2.0",
    "configurations": [
      {
        "type": "node",
        "request": "attach",
        "name": "Attach to Remote",
        "address": "localhost",
        "port": 5858,
        "sourceMaps": false,
        "localRoot": "${workspaceFolder}",
        "remoteRoot": "${command:extension.vscode-wsl-workspaceFolder}",
        "windows": {
          "name": "workspaceName"
        }
      }
    ]
}
```

### Run the open file

Sometimes you have multiple runnable scripts in a single project and you want to run the file currently open in your workspace. Examples are a collection of Python scripts or Mocha tests. Here is an example for running the currently open Mocha test.

```json
{
  "type": "node",
  "request": "launch",
  "name": "Mocha Current File (WSL)",
  "useWSL": true,
  "localRoot": "${workspaceFolder}",
  "remoteRoot": "${command:extension.vscode-wsl-workspaceFolder}",
  "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
  "args": [
    "${command:extension.vscode-wsl-workspaceCurrentFile}"
  ],
  "skipFiles": [
    "${command:extension.vscode-wsl-workspaceFolder}/node_modules/**/*.js",
    "${command:extension.vscode-wsl-workspaceFolder}/lib/**/*.js",
    "<node_internals>/**"
  ]
}
```

## Known Issues

### single/multi-root projects

- When invoked by VS Code in MS Windows 10 environment, which does not use WSL, this extension will still attempt to return a WSL path format, even when this is not possible/required.

### multi-root projects

- This extension translates the file system path from a workspace folder URI into a WSL path. However, presently there is no elegant way in multi-root projects to link/associate an 'Attach to remote' debug config with a workspace folder. Therefore, I suggest using the optional `windows.name` .vscode/launch.json property to avoid being required to select a workspace folder from the picker UI for every debug session.
- If the optional `windows.name` .vscode/launch.json property is not present, a 'Select workspace folder' picker will open centre, top of screen. If you fail to make a selection before changing focus the picker will close automatically and the extension will fail.

## Release Notes

### 1.1.2

Add support for multi-root projects

### 1.0.2

Initial release of VS Code extension `vscode-wsl-workspacefolder`

### Extension Icon

Folder icon (no text) sourced from [theSquid.ink 40](https://www.iconfinder.com/icons/416376/envelope_files_folder_interface_office_icon), under [Creative Commons (Attribution 3.0 Unported)](https://creativecommons.org/licenses/by/3.0/) licence.
