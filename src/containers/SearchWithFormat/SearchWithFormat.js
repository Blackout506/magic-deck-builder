import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './SearchWithFormat.module.css';
import * as actions from '../../store/actions/index';

import CardViewer from '../../components/CardViewer/CardViewer';
import MiniCardViewer from '../../components/MiniCardViewer/MiniCardViewer';
import Spinner from '../../components/UI/Spinner/Spinner';

class SearchWithFormat extends Component {
    state = {
        query: '',
        results: [],
        loading: false,
        selectedSearchBy: 'name',
        selectedFormat: 'legacy'
    };

    componentDidMount() {
        this.props.resetResults();
    }

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

        let updatedDeck = this.props.currentDeck;
        updatedDeck.push([name, colors, cmc, manaCost, image]);
        let sortedDeck = updatedDeck.sort(this.cmcSorter);
        this.setState({
            ...this.state,
            currentDeck: sortedDeck
        });
        this.props.callbackFromParent(sortedDeck);
    }

    onClick = (event, name, colors, cmc, manaCost, image) => {
      if (manaCost === 'undefined') {
          manaCost = 'Land';
      }

      let updatedDeck = this.props.currentDeck;
      updatedDeck.push([name, colors.toString(), cmc, manaCost, image]);
      let sortedDeck = updatedDeck.sort(this.cmcSorter);
      console.log(sortedDeck);
      this.setState({
          ...this.state,
          currentDeck: sortedDeck
      });
      this.props.callbackFromParent(sortedDeck);
    }

    render() {

        let resultsArea = this.props.loading ? <Spinner /> : this.props.results.map(result => {
            return (
                <li
                    key={Math.random()}
                    className={classes.ResultListItem}
                    onDragStart={(event) => this.onDragStart(event, result.name, result.colors, result.cmc, result.manaCost, result.image)}
                    onClick={(event) => this.onClick(event, result.name, result.colors, result.cmc, result.manaCost, result.image)}
                    draggable>
                    <CardViewer
                        name={result.name}
                        image={result.image}/>
                </li>
            );
        });

        const searchForm = (
            <form className={classes.SearchArea}>
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

        let deckDisplay = this.props.currentDeck.map(card => {
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
            <div className={classes.SearchWithFormat}>
                <div>
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
    loading: state.search.loading,
    results: state.search.results
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getResultsWithFormat: (searchBy, query, format) => dispatch(actions.getResultsWithFormat(searchBy, query, format)),
    resetResults: () => dispatch(actions.resetResults())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchWithFormat);
