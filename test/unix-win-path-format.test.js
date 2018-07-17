
import tape from "tape";
import _test from "tape-promise";
import fs from "fs";

import unixWinPathFormat from "../src/unix-win-path-format";

const test = _test(tape); // decorate tape


test("execa", (t) => {
  t.test("getWslFolder", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof unixWinPathFormat;

    assert.equal(actual, expected, message);
    assert.end();
  });

  t.test("getWslFolder", async function getWslFolderOnLinuxWsl(assert) {
    // vscode.workspace.workspaceFolders
    var workspaceFolderSingle = fs.readFileSync("test/fixtures/workspaceFolder-single.json");
    var workspaceFolder = JSON.parse(workspaceFolderSingle);

    const path = workspaceFolder[0].uri.fsPath;

    const env = {
      isLinux: true,
      isWin: false,
      isWsl: true,
    };

    const message = "should return WSL path in Linux & WSL ENV";
    const expected = "/mnt/c/Users/Me/Projects/project";
    const wslPath = await unixWinPathFormat(path, env);

    const actual = wslPath;

    assert.equal(actual, expected, message);
    assert.end();
  });

  // t.test("getWslFolder", async function getWslFolder(assert) {
  //   // vscode.workspace.workspaceFolders
  //   var workspaceFolderSingle = fs.readFileSync("test/fixtures/workspaceFolder-single.json");
  //   var workspaceFolder = JSON.parse(workspaceFolderSingle);

  //   const path = workspaceFolder[0].uri.fsPath;

  //   const env = {
  //     isLinux: false,
  //     isWin: true,
  //     isWsl: false,
  //   };

  //   const message = "should return WSL path in Windows ENV";
  //   const expected = "/mnt/c/Users/Me/Projects/project";
  //   const wslPath = await unixWinPathFormat(path, env);

  //   const actual = wslPath;

  //   assert.equal(actual, expected, message);
  //   assert.end();
  // });

  t.test("getWslFolder", async function getWslFolderOnLinux(assert) {
    // vscode.workspace.workspaceFolders
    var workspaceFolderSingle = fs.readFileSync("test/fixtures/workspaceFolder-single.json");
    var workspaceFolder = JSON.parse(workspaceFolderSingle);

    const path = workspaceFolder[0].uri.fsPath;

    const env = {
      isLinux: true,
      isWin: false,
      isWsl: false,
    };

    const message = "should return original unaltered path in Linux ENV";
    const expected = "c:\\Users\\Me\\Projects\\project";
    const wslPath = await unixWinPathFormat(path, env);

    const actual = wslPath;

    assert.equal(actual, expected, message);
    assert.end();
  });
});
