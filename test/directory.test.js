
import test from "tape";
import fs from "fs";

import * as directory from "../src/directory";

test("directory", (t) => {
  t.test("escapeBackslash", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof directory.escapeBackslash;

    assert.equal(actual, expected, message);
    assert.end();
  });

  t.test("escapeBackslash", (assert) => {
    const path = "myDir";

    const message = "should return string unaltered if no backslash characters present";
    const expected = "myDir";
    const actual = directory.escapeBackslash(path);

    assert.equal(actual, expected, message);
    assert.end();
  });

  t.test("escapeBackslash", (assert) => {
    // vscode.workspace.workspaceFolders
    var workspaceFolderSingle = fs.readFileSync("test/fixtures/workspaceFolder-single.json");
    var workspaceFolder = JSON.parse(workspaceFolderSingle);

    const path = workspaceFolder[0].uri.fsPath;

    const message = "should escape all backslash characters in path";
    const expected = "c:\\\\Users\\\\Me\\\\Projects\\\\project";
    const actual = directory.escapeBackslash(path);

    assert.equal(actual, expected, message);
    assert.end();
  });

  t.test("getWorkspaceFolderByName", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof directory.getWorkspaceFolderByName;

    assert.equal(actual, expected, message);
    assert.end();
  });

  t.test("getWorkspaceFolderByName", (assert) => {
    // vscode.workspace.workspaceFolders
    var workspaceFolderSingle = fs.readFileSync("test/fixtures/workspaceFolder-single.json");
    var workspaceFolder = JSON.parse(workspaceFolderSingle);

    const message = "should find path";
    const expected = "c:\\Users\\Me\\Projects\\project";
    const actual = directory.getWorkspaceFolderByName(workspaceFolder, "workspace name");

    assert.equal(actual, expected, message);
    assert.end();
  });
});
