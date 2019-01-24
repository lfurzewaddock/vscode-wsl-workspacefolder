"use strict";

import debug from "debug";

export function escapeBackslash(path) {
  debug("vscode-wsl-workspacefolder:directory")(`escapeBackslash path: ${path}`);
  return path.replace(/\\/g, "\\\\");
}

export function getWorkspaceFolderByName(workspaceFolders, workspaceFolderName) {
  debug("vscode-wsl-workspacefolder:directory")(
    "getWorkspaceFolderByName workspaceFolders: %o",
    workspaceFolders,
  );
  debug("vscode-wsl-workspacefolder:directory")(
    `getWorkspaceFolderByName workspaceFolderName: ${workspaceFolderName}`,
  );
  return workspaceFolders.find(f => f.name.toLowerCase() === workspaceFolderName).uri.fsPath;
}
