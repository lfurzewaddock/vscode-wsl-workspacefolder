import execa from "execa";

async function runWslpathUnderWslEnv(isWslEnv, workspaceFolder) {
  const { stdout } = await execa(isWslEnv ? "wslpath" : "wsl wslpath", [workspaceFolder], {
    cleanup: true,
  });

  return stdout;
}

export default async function getWslFolder(workspaceFolder, env) {
  if (env.isLinux && env.isWsl) {
    return runWslpathUnderWslEnv(true, workspaceFolder);
  }

  if (env.isWin) {
    return runWslpathUnderWslEnv(false, workspaceFolder);
  }

  return Promise.resolve(workspaceFolder);
}
