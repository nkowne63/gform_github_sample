import { githubClient, RepositoryIdentifier } from "./types/index";
import { findIssueComments, addCommentToIssue } from "./graphql";
import {
  FindIssueCommentsQuery,
  FindIssueCommentsQueryVariables,
  AddCommentToIssueMutation,
  AddCommentToIssueMutationVariables
} from "./generated/index";

export const findIssueId: (
  client: githubClient,
  repository: RepositoryIdentifier,
  issueNumber: number
) => Promise<string> = async (client, repository, issueNumber) => {
  return (await client.query<
    FindIssueCommentsQuery,
    FindIssueCommentsQueryVariables
  >({
    query: findIssueComments,
    variables: {
      ...repository,
      number: issueNumber
    }
  })).data.repository!.issue!.id;
};

export const postComment: (
  client: githubClient,
  issueId: string,
  comment: string
) => Promise<void> = async (client, issueId, comment) => {
  await client.mutate<
    AddCommentToIssueMutation,
    AddCommentToIssueMutationVariables
  >({
    mutation: addCommentToIssue,
    variables: {
      issueId: issueId,
      body: comment
    }
  });
};
