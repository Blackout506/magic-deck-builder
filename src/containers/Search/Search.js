import React, { Component } from 'react';
import cards from 'mtgsdk';

class Search extends Component {
  state = {
    query: '',
    results: []
  }

  getResults = () => {
    cards.card.all({ name: this.state.query })
      .on('data', card => {
        console.log(card.name);
      })
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.setState({
        query: this.search.value
      }, () => {
        if (this.state.query && this.state.query.length > 1) {
          this.getResults();
        }
      })
    }
  }

  render() {
    return (
      <form>
        <input
          placeholder="Search for cards..."
          ref={input => this.search = input}
          onKeyPress={this.handleKeyPress} />
        <p>Searching for: {this.state.query}</p>
      </form>
    )
  }
}

export default Search;
