import { ApolloClient } from "apollo-client";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

export type RepositoryIdentifier = {
  owner: string;
  name: string;
};

export type githubClient = ApolloClient<NormalizedCacheObject>;
