// Welcome to Launchpad
// Log in to edit and save pads, run queries in GraphiQL on the right.
// Click "Download" above to get a zip with a standalone Node.js server.
// See docs and examples at https://github.com/apollographql/awesome-launchpad

// graphql-tools combines a schema string with resolvers.
import { makeExecutableSchema } from 'graphql-tools';
import {v1 as neo4j} from 'neo4j-driver';
import {neo4jgraphql} from 'neo4j-graphql-js';

const typeDefs = `
type Tweet {
    tweet_id: ID!
    text: String
    permalink: String
    author: User @relation(name: "POSTED", direction: "IN")
    hashtags: [Hashtag] @relation(name: "HAS_TAG", direction: "OUT")
    links: [Link] @relation(name: "HAS_LINK", direction: "OUT")
}

type User {
    user_id: ID!
    screen_name: String
    tweets: [Tweet] @relation(name: "POSTED", direction: "OUT")
}

type Hashtag {
    tag: ID!
    archived_url: String
    tweets(first: Int): [Tweet] @relation(name: "HAS_TAG", direction: "IN")
}

type Link {
    url: ID!
    archived_url: String
    

}


type Query {
	Hashtag(tag: ID, first: Int, offset: Int): [Hashtag]
  TweetsByText(text: String): [Tweet]

}
`;


const resolvers = {
  // root entry point to GraphQL service
  Query: {
    // fetch movies by title substring
    Hashtag(object, params, ctx, resolveInfo) {
      // neo4jgraphql inspects the GraphQL query and schema to generate a single Cypher query 
      // to resolve the GraphQL query. Assuming a Neo4j driver instance exists in the context
      // the query is executed against Neo4j
      return neo4jgraphql(object, params, ctx, resolveInfo);
    },
    TweetsByText(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo);
    }
  }
};


// Required: Export the GraphQL.js schema object as "schema"
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Optional: Export a function to get context from the request. It accepts two
// parameters - headers (lowercased http headers) and secrets (secrets defined
// in secrets section). It must return an object (or a promise resolving to it).
let driver;

export function context(headers, secrets) {
  if (!driver){
  	driver = neo4j.driver(secrets.NEO4J_URI || "bolt://localhost:7687", neo4j.auth.basic(secrets.NEO4J_USER || "neo4j", secrets.NEO4J_PASSWORD || "letmein"))
  }
  return {driver};
}


// Optional: Export a root value to be passed during execution
// export const rootValue = {};

// Optional: Export a root function, that returns root to be passed
// during execution, accepting headers and secrets. It can return a
// promise. rootFunction takes precedence over rootValue.
// export function rootFunction(headers, secrets) {
//   return {
//     headers,
//     secrets,
//   };
// };
