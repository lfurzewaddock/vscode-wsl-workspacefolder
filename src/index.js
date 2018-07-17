"use strict";

import { commands, workspace, window } from "vscode"; /* eslint-disable-line import/no-unresolved */
import isWsl from "is-wsl";
import debug from "debug";

import * as directory from "./directory";
import unixWinPathFormat from "./unix-win-path-format";

function activate(context) {
  const disposable = commands.registerCommand("extension.vscode-wsl-workspaceFolder", () => {
    const env = {
      isLinux: process.platform === "linux",
      isWin: process.platform === "win32",
      isWsl,
    };

    debug("vscode-wsl-workspacefolder:index")(`env.isLinux: ${env.isLinux}`);
    debug("vscode-wsl-workspacefolder:index")(`env.isWin: ${env.isWin}`);
    debug("vscode-wsl-workspacefolder:index")(`env.isWsl: ${env.isWsl}`);

    const workspaceFolder = directory.escapeBackslash(
      directory.getWorkspaceFolderByName(workspace.workspaceFolders, workspace.name),
    );

    return unixWinPathFormat(workspaceFolder, env)
      .then((wslPath) => {
        debug("vscode-wsl-workspacefolder:index")(`stdout: ${wslPath}`);
        return wslPath;
      })
      .catch(() => {
        window.showInformationMessage("Get WSL workspaceFolder failed!");
      });
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
  // noop
}
exports.deactivate = deactivate;
