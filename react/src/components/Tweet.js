import React, { Component } from 'react';
import { Item, Grid, Label, List } from 'semantic-ui-react';

class Tweet extends Component {
  render() {
    return (
      <Item>
        
        <Item.Content verticalAlign="middle">
          <Item.Header>{this.props.tweet.author.screen_name}</Item.Header>
          <Item.Description>{this.props.tweet.text}</Item.Description>
          <List bulleted>
          {this.props.tweet.links.map(link => (
            <List.Item href={link.archived_url}>{link.url}</List.Item>
          ))}
          </List>
        </Item.Content>
      </Item>
    )
  }
}

export default Tweet;