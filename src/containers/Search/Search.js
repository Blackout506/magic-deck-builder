import React, { Component } from 'react';
import cards from 'mtgsdk';

import classes from './Search.module.css';

import CardViewer from "../../components/CardViewer/CardViewer";
import Spinner from "../../components/UI/Spinner/Spinner";

class Search extends Component {
  state = {
    query: '',
    results: [],
    loading: false
  }

  getResults = () => {
    let newResults = [];
    cards.card.where({ name: this.state.query})
      .then(cards => {
        cards.map(result => {
          if (result.imageUrl) {
            newResults.push({
              id: Math.random(),
              name: result.name,
              image: result.imageUrl
            })
          }
          return newResults;
        })
        this.setState({results: newResults, loading: false});
      })
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.setState({
        query: this.search.value,
        loading: true
      }, () => {
        if (this.state.query && this.state.query.length > 1) {
          this.getResults();
        }
      }
    )}
  }

  render() {


    let resultsArea = this.state.loading ? <Spinner /> : this.state.results.map(result => {
      return (
        <li key={Math.random()} className={classes.ResultListItem}>
          <CardViewer
            name={result.name}
            image={result.image}/>
        </li>
      )
    });

    return (
      <div>
        <form>
          <input
            placeholder="Search for cards..."
            ref={input => this.search = input}
            onKeyPress={this.handleKeyPress} />
          <p>Showing results for: {this.state.query}</p>
        </form>
        <ul className={classes.ResultList}>
          {resultsArea}
        </ul>
      </div>
    )
  }
}

export default Search;
