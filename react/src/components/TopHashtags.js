import React, { Component } from 'react';
import { Item, Grid, Label, List } from 'semantic-ui-react';

class TopHashtags extends Component {
  render() {
    return (
      <div>
        <h2>Top Hashtags</h2>
        <List bulleted items={['JugendmitMerkel', 'TagderJugend', 'news', 'sports', 'politics', 'Merkel', 'ColumbianChemicals', 'WorldElephantDay', 'crime','UnitedStatesIn3Words', 'blacklivesmatter']} />
      </div>
    )
  }
}

export default TopHashtags;