import { execSync } from "child_process";

// Server-only helpers shared by the export-repo and push-repo admin API
// routes. All git/gh commands run with `cwd` pointed at the *exported*
// client repo — never at this admin/template repo.

// Walks the config and collects top-level folder names referenced under /images/
export function collectImageFolders(value: unknown, folders: Set<string>) {
  if (typeof value === "string") {
    const m = value.match(/^\/images\/([^/]+)\//);
    if (m) folders.add(m[1]);
  } else if (Array.isArray(value)) {
    value.forEach((v) => collectImageFolders(v, folders));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((v) => collectImageFolders(v, folders));
  }
}

export function ghAuthenticated(): boolean {
  try {
    execSync("gh auth status", { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

// Creates the GitHub repo (first push) or pushes subsequent commits to an
// already-linked `origin`. Returns the repo's HTML URL.
export function pushToGithub(dest: string, repoName: string, isPrivate: boolean): { url: string } {
  let hasOrigin = true;
  try {
    execSync("git remote get-url origin", { cwd: dest, stdio: "pipe" });
  } catch {
    hasOrigin = false;
  }

  if (!hasOrigin) {
    const visibility = isPrivate ? "--private" : "--public";
    execSync(`gh repo create ${repoName} ${visibility} --source=. --remote=origin --push`, { cwd: dest, stdio: "pipe" });
  } else {
    execSync("git push -u origin HEAD", { cwd: dest, stdio: "pipe" });
  }

  return { url: execSync("gh repo view --json url -q .url", { cwd: dest, stdio: "pipe" }).toString().trim() };
}
