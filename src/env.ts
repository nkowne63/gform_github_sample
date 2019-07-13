const defaultOption = {
  token: "",
  owner: "",
  repoName: "",
  issueNumber: 0,
  target: ""
};

type githubOption = typeof defaultOption;

export function isGithubOption(obj: unknown): obj is githubOption {
  if (typeof obj !== "object" || obj === null) return false;
  return Object.entries(defaultOption).reduce(
    (previous: boolean, [key, value]) =>
      previous &&
      key in obj &&
      // falsy value防止
      !!(obj as any)[key] &&
      Object.getPrototypeOf(value).constructor ===
        Object.getPrototypeOf((obj as any)[key]).constructor,
    true
  );
}

export const getEnv = () => {
  const env: Partial<githubOption> = {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.OWNER,
    repoName: process.env.REPO_NAME,
    issueNumber: Number(process.env.ISSUE_NUMBER),
    target: process.env.TARGET
  };
  if (isGithubOption(env)) {
    return env;
  } else {
    throw new Error("env parameter is not configured enough");
  }
};
