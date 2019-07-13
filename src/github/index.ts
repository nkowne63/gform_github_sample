import { RepositoryIdentifier } from "./types/index";
import { clientBuilder } from "./client";
import { findIssueId, postComment } from "./request";

export const getCommentClient: (
  token: string,
  issueNumber: number,
  repository: RepositoryIdentifier
) => (comment: string) => Promise<void> = (token, issueNumber, repository) => {
  const client = clientBuilder(token);
  const postCommentAlias = async (comment: string) => {
    const issueId = await findIssueId(client, repository, issueNumber);
    await postComment(client, issueId, comment);
  };
  return postCommentAlias;
};
