// This component is used at the beginning of the exercise as a skeleton example
// We'll replace this component with one that uses GraphQL to fetch movies

import React from "react";
import { Item } from "semantic-ui-react";
import { graphql} from "react-apollo";
import gql from "graphql-tag";
import Tweet from "./Tweet";
import {Component} from "react";

class TweetList extends Component {

  render() {
    
    const {data} = this.props;
    console.log(data);
    if (data.loading) return <div>Loading...</div>;
    if (data.error) {
      console.log(data);
      return <div>Error!</div>;
    }

    if (!data.Hashtag || data.Hashtag.length < 1) return <div>No tweets found for that hashtag!</div>


    if (data.Hashtag[0].tweets.length === 0) return <div>No tweets found for that hashtag!</div>;

    return (
      <Item.Group divided>
        {data.Hashtag[0].tweets.map(movie => (
          <Tweet
            tweet={movie}
          />
        ))}
      </Item.Group>
    );

  }

  
};

const TweetListWithData = graphql(
  gql`
    query MovieListQuery($title: ID!){
      Hashtag(tag: $title, first: 5) {
        tag 
        tweets {
          text
          author {
            screen_name
          }
          hashtags {
            tag
            archived_url
          }
          links {
            url
            archived_url
          }
        }
      }
    }
  `
  
)(TweetList);

export default TweetListWithData;