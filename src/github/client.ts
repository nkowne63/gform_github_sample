import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import { githubClient } from "./types/index";

const uri = "https://api.github.com/graphql";

let client: githubClient | undefined;

export const clientBuilder: (token: String) => githubClient = (
  token: String
) => {
  if (client) return client;
  client = new ApolloClient({
    link: new HttpLink({
      uri,
      fetch,
      headers: {
        authorization: `bearer ${token}`
      }
    }),
    cache: new InMemoryCache()
  });
  return client;
};
