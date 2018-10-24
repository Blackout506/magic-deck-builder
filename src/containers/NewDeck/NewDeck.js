import React, { Component } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import cards from 'mtgsdk';

import classes from './NewDeck.module.css';

import SearchBy from '../Search/SearchBy/SearchBy';
import CardViewer from '../../components/CardViewer/CardViewer';
import MiniCardViewer from '../../components/MiniCardViewer/MiniCardViewer';
import Spinner from '../../components/UI/Spinner/Spinner';

class NewDeck extends Component {
  state = {
    query: '',
    results: [],
    loading: false,
    selectedSearchBy: 'name',
    currentDeck: []
  };

  getResults = () => { //need to make the conditional work
    let newResults = [];
    switch (this.state.selectedSearchBy) {
      case 'name':
        cards.card.where({ name: this.state.query})
          .then(cards => {
            console.log(cards);
            cards.map(result => {
              if (result.imageUrl) {
                newResults.push({
                  id: Math.random(),
                  name: result.name,
                  image: result.imageUrl,
                  colors: result.colorIdentity
                })
              }
              return newResults;
            })
            this.setState({results: newResults, loading: false});
          })
        break;
      case 'set':
        cards.card.where({ setName: this.state.query })
          .then(cards => {
            console.log(cards);
            cards.map(result => {
              if (result.imageUrl) {
                newResults.push({
                  id: Math.random(),
                  name: result.name,
                  image: result.imageUrl,
                  colors: result.colorIdentity
                })
              }
              return newResults;
            })
            this.setState({results: newResults, loading: false});
          })
        break;
      case 'land':
        cards.card.where({ name: this.state.query, type: 'Land' || 'Basic Land'})
          .then(cards => {
            cards.map(result => {
              if (result.imageUrl) {
                newResults.push({
                  id: Math.random(),
                  name: result.name,
                  image: result.imageUrl,
                  colors: result.colorIdentity
                })
              }
              return newResults;
            })
            this.setState({results: newResults, loading: false});
          })
        break;
    }
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

  changeSearchBy = (event) => {
    this.setState({
      selectedSearchBy: event.target.value
    });
  }

  onDragStart = (event, name, colors) => {
    console.log('drag start: ' + name);
    event.dataTransfer.setData('name', name);
    event.dataTransfer.setData('colors', colors);
  }

  onDragOver = (event) => {
    event.preventDefault();
    console.log('dragover');
  }

  onDrop = (event) => {
    let name = event.dataTransfer.getData('name');
    let colors = event.dataTransfer.getData('colors');
    let updatedDeck = this.state.currentDeck;
    updatedDeck.push([name, colors]);
    this.setState({
      ...this.state,
      currentDeck: updatedDeck
    });
    console.log(this.state.currentDeck);
  }

  render() {

    let resultsArea = this.state.loading ? <Spinner /> : this.state.results.map(result => {
      return (
        <li
          key={Math.random()}
          className={classes.ResultListItem}
          onDragStart={(event) => this.onDragStart(event, result.name, result.colors)}
          draggable>
          <CardViewer
            name={result.name}
            image={result.image}/>
        </li>
      )
    });

    let deck = {
      currentDeck: []
    };

    const searchForm = (
      <form className={classes.SearchForm}>
        <input
          placeholder='Search for cards...'
          ref={input => this.search = input}
          onKeyPress={this.handleKeyPress} />
      </form>
    );

    const searchByForm = (
      <form className={classes.SearchByForm}>
        <label>Search By: </label>
        <label className={classes.SearchByFormLabel}>
          <input type='radio' value='name' checked={this.state.selectedSearchBy === 'name'} onChange={this.changeSearchBy}/>
          Name
        </label>
        <label className={classes.SearchByFormLabel}>
          <input type='radio' value='set' checked={this.state.selectedSearchBy === 'set'} onChange={this.changeSearchBy}/>
          Set
        </label>
        <label className={classes.SearchByFormLabel}>
          <input type='radio' value='land' checked={this.state.selectedSearchBy === 'land'} onChange={this.changeSearchBy}/>
          Lands Only
        </label>
      </form>
    );

    let deckDisplay = this.state.currentDeck.map(card => {
      return (
        <MiniCardViewer key={Math.random()} name={card[0]} color={card[1]} />
      );
    });

    return (
      <div className={classes.NewDeck}>
        <div className={classes.SearchArea}>
          <h1>Create A Deck</h1>
          <p>Once you have found a card you want to add to your deck, simply drag and drop the card into the dark area on the right.</p>
          {searchForm}
          {searchByForm}
          <h4>Showing results for: {this.state.query}</h4>
          <ul className={classes.ResultList}>
            {resultsArea}
          </ul>
        </div>
        <div
          className={classes.DropArea}
          onDragOver={(event) => this.onDragOver(event)}
          onDrop={(event) => this.onDrop(event)}>
            <ul className={classes.DeckDisplayList}>
              {deckDisplay}
            </ul>
        </div>
      </div>
    );
  }
}

export default NewDeck;
