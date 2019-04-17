import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTooltip from 'react-tooltip';
import cards from 'mtgsdk';

import classes from './NewDeck.module.css';
import * as actions from '../../store/actions/index';

import SearchBy from '../Search/SearchBy/SearchBy';
import CardViewer from '../../components/CardViewer/CardViewer';
import MiniCardViewer from '../../components/MiniCardViewer/MiniCardViewer';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Modal from '../Modal/Modal';
import DeckSummary from '../../components/DeckSummary/DeckSummary';

class NewDeck extends Component {
  state = {
    query: '',
    results: [],
    selectedSearchBy: 'name',
    selectedFormat: 'legacy',
    currentDeck: [],
    showModal: false
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.setState({
        query: this.search.value
      }, () => {
        if (this.state.query && this.state.query.length > 1) {
          this.props.getResultsWithFormat(this.state.selectedSearchBy, this.state.query, this.state.selectedFormat);
        }
      }
    )}
  }

  changeSearchBy = (event) => {
    this.setState({
      selectedSearchBy: event.target.value
    });
  }

  changeFormat = (event) => {
    this.setState({
      selectedFormat: event.target.value
    });
  }

  cmcSorter = (a, b) => {
    if (a[2] < b[2]) return -1;
    if (a[2] > b[2]) return 1;
    return 0;
  }

  onMouseOver = (event, name, image) => {
    console.log(name, image);
  }

  onDragStart = (event, name, colors, cmc, manaCost, image) => {
    event.dataTransfer.setData('name', name);
    event.dataTransfer.setData('colors', colors);
    event.dataTransfer.setData('cmc', cmc);
    event.dataTransfer.setData('manaCost', manaCost);
    event.dataTransfer.setData('image', image);
  }

  onDragOver = (event) => {
    event.preventDefault();
  }

  onDrop = (event) => {
    let name = event.dataTransfer.getData('name');
    let colors = event.dataTransfer.getData('colors');
    let cmc = event.dataTransfer.getData('cmc');
    let manaCost = event.dataTransfer.getData('manaCost');
    let image = event.dataTransfer.getData('image');
    if (manaCost === 'undefined') {
      manaCost = 'Land';
    }
    // let manaImages = this.makeManaPictures(manaCost);
    let updatedDeck = this.state.currentDeck;
    updatedDeck.push([name, colors, cmc, manaCost, image]);
    let sortedDeck = updatedDeck.sort(this.cmcSorter);
    this.setState({
      ...this.state,
      currentDeck: sortedDeck
    });
  }

  onPreviewDeck = (event) => {
    this.setState({
      ...this.state,
      showModal: true
    });
  }

  cancelSubmitHandler = () => {
    this.setState({
      ...this.state,
      showModal: false
    });
  }

  render() {

    let pageHeader = (
      <div className={classes.PageHeader}>
        <h1 style={{display: 'inline-block'}}>Create A Deck</h1>
        {this.props.isAuthenticated ?
          <Button
            buttonType='Submit'
            clicked={this.onPreviewDeck}
            text='Preview Current Deck'/> : <h2>Log In to Save Deck!</h2> }
        <p><em>Once you have found a card you want to add to your deck, simply drag and drop the card into the dark area on the right.</em></p>
        <p><em>The search is only able to return 100 results at a time, so if you are having trouble finding a particular card, try adding more specificity to your search query.</em></p>
      </div>
    );

    let resultsArea = this.props.loading ? <Spinner /> : this.props.results.map(result => {
      return (
        <li
          key={Math.random()}
          className={classes.ResultListItem}
          onDragStart={(event) => this.onDragStart(event, result.name, result.colors, result.cmc, result.manaCost, result.image)}
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
      <div className={classes.SearchByForm}>
        <form>
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
        <form>
          <label>Format: </label>
          <label className={classes.SearchByFormLabel}>
            <input type='radio' value='legacy' checked={this.state.selectedFormat === 'legacy'} onChange={this.changeFormat}/>
            All cards (Legacy)
          </label>
          <label className={classes.SearchByFormLabel}>
            <input type='radio' value='standard' checked={this.state.selectedFormat === 'standard'} onChange={this.changeFormat}/>
            Standard
          </label>
          <label className={classes.SearchByFormLabel}>
            <input type='radio' value='modern' checked={this.state.selectedFormat === 'modern'} onChange={this.changeFormat}/>
            Modern
          </label>
        </form>
      </div>
    );

    let deckDisplay = this.state.currentDeck.map(card => {
      //if (this.state.currentDeck.indexOf(card) > -1) {
        return (
          <MiniCardViewer
            key={Math.random()}
            name={card[0]}
            color={card[1]}
            manaCost={card[3]}
            image={card[4]}
            onMouseOver={(event) => this.onMouseOver(event, card[0], card[4])}/>
        );
    });

    return (
      <div className={classes.NewDeck}>
        <Modal
          show={this.state.showModal}
          modalClosed={this.cancelSubmitHandler}
          deck={this.state.currentDeck}>
          <DeckSummary cards={this.state.currentDeck}/>
        </Modal>
        <div className={classes.SearchArea}>
          {pageHeader}
          {searchForm}
          <br />
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

const mapStateToProps = (state) => {
  return {
    deck: state.deck.deck,
    isAuthenticated: state.auth.token !== null,
    loading: state.search.loading,
    results: state.search.results
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getResultsWithFormat: (searchBy, query, format) => dispatch(actions.getResultsWithFormat(searchBy, query, format))
    // onPostDeck: (deckData) => dispatch(actions.postDeck(deckData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
