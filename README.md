# VS Code extension: WSL workspaceFolder

Gets workspaceFolder path in WSL path format, using WSL `wslpath` tool.

Use command as a placeholder where WSL path for the workspaceFolder is required, e.g. the 'remoteRoot' attribute in launch config for debug, etc.

## Features

This extension returns the workspaceFolder path, converted from Windows path format to WSL path format. For example, a workspaceFolder with a windows path of `c:\\Users\\Me\\Projects\\project` would return a WSL path of `/mnt/c/Users/Me/Projects/project`.  

## Requirements

- MS Windows 10 using WSL (Windows Subsystem for Linux)
- MS Windows 10 => version 17046 for [wslpath tool](https://github.com/MicrosoftDocs/WSL/blob/master/WSL/release-notes.md#build-17046)
- Extension code contributors should either install current release of WSL workspaceFolder or replace command reference in .vscode/launch.json

## Extension Settings

This extension contributes the following command:

* `extension.vscode-wsl-workspaceFolder`: returns WSL format path string to workspaceFolder

## Usage

e.g. `.vscode/launch.json`

```
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

## Known Issues

- When invoked by VS Code in MS Windows 10 environment, which does not use WSL, this extension will still attempt to return a WSL path format, even when this is not possible/required.

## Release Notes

### 1.0.0

Initial release of VS Code extension `vscode-wsl-workspacefolder`

### 1.0.1

Minor corrections/changes to docs

### 1.0.2

Minor corrections/changes to docs

### Extension Icon

Folder icon (no text) sourced from [theSquid.ink 40](https://www.iconfinder.com/icons/416376/envelope_files_folder_interface_office_icon), under [Creative Commons (Attribution 3.0 Unported)](https://creativecommons.org/licenses/by/3.0/) licence.
