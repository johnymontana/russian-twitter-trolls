import React, { Component } from 'react';
import TweetSearch from './TweetSearch';
import TweetListWithData from './TweetList';
import TopHashtags from './TopHashtags';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'politics'
    }
  }

  setSearchTerm = (title) => {
    this.setState({ title });
    console.log("setSearchTerm called");
  };

  render() {
    const { title } = this.state;
    return (
      <div>
        <TweetSearch setSearchTerm={this.setSearchTerm} title={title} />
        <TopHashtags />
        <TweetListWithData title={title} />
      </div>
    );
  }
}

export default App;