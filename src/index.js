"use strict";

import { commands, workspace, window } from "vscode"; /* eslint-disable-line import/no-unresolved */
import isWsl from "is-wsl";
import debug from "debug";

import * as directory from "./directory";
import unixWinPathFormat from "./unix-win-path-format";

async function showWorkspaceFolderPick() {
  const workspaceFolder = await window.showWorkspaceFolderPick({ ignoreFocusOut: true });
  return workspaceFolder;
}

async function getWorkspaceFolderName() {
  const workspaceFolder = await showWorkspaceFolderPick();
  return workspaceFolder.name.toLowerCase();
}

function getEscapedWorkspaceFolderByName(workspaceFolders, workspaceName) {
  return directory.escapeBackslash(
    directory.getWorkspaceFolderByName(workspaceFolders, workspaceName),
  );
}

function activate(context) {
  const disposable = commands.registerCommand(
    "extension.vscode-wsl-workspaceFolder",
    async (...args) => {
      const isExtensionDebug = !!process.env.VSCODE_EXTENSION_WSL_WORKSPACEFOLDER_TEST;
      const vars = {
        isLinux: process.platform === "linux",
        isWin: process.platform === "win32",
        isWsl,
        isExtensionDebug,
      };

      debug("vscode-wsl-workspacefolder:index")(`env.isLinux: ${vars.isLinux}`);
      debug("vscode-wsl-workspacefolder:index")(`env.isWin: ${vars.isWin}`);
      debug("vscode-wsl-workspacefolder:index")(`env.isWsl: ${vars.isWsl}`);
      debug("vscode-wsl-workspacefolder:index")(`env.isExtensionDebug: ${vars.isExtensionDebug}`);
      window.showInformationMessage(`env.isLinux: ${vars.isLinux}`);
      window.showInformationMessage(`env.isWin: ${vars.isWin}`);
      window.showInformationMessage(`env.isWsl: ${vars.isWsl}`);
      window.showInformationMessage(`env.isExtensionDebug: ${vars.isExtensionDebug}`);

      const { workspaceFolders } = workspace;
      let workspaceName = args[0].name.toLowerCase();

      if (
        typeof workspaceFolders.find(x => x.name.toLowerCase() === workspaceName) === "undefined"
      ) {
        try {
          workspaceName = await getWorkspaceFolderName();
        } catch (error) {
          window.showErrorMessage("Extension: WSL workspaceFolder failed!");
          window.showErrorMessage("Error: workspace folder selection required!");
        }
      }

      const workspaceFolderUriFsPath = getEscapedWorkspaceFolderByName(
        workspaceFolders,
        workspaceName,
      );

      return unixWinPathFormat(workspaceFolderUriFsPath, vars)
        .then((wslPath) => {
          debug("vscode-wsl-workspacefolder:index")(`stdout: ${wslPath}`);
          // // eslint-disable-next-line no-console
          // console.log("wslPath:", wslPath);
          return wslPath;
        })
        .catch((err) => {
          window.showErrorMessage("Extension: WSL workspaceFolder failed!");
          window.showErrorMessage(`Error: ${err.message}`);
        });
    },
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
  // noop
}
exports.deactivate = deactivate;
