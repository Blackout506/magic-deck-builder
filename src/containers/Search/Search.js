import React, { Component } from 'react';
import cards from 'mtgsdk';
import { connect } from 'react-redux';

import classes from './Search.module.css';
import * as actions from '../../store/actions/index';

import SearchBy from './SearchBy/SearchBy';
import CardViewer from '../../components/CardViewer/CardViewer';
import Spinner from '../../components/UI/Spinner/Spinner';

class Search extends Component {
  state = {
    query: '',
    results: [],
    loading: false,
    selectedSearchBy: 'name'
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.setState({
        query: this.search.value,
        loading: true
      }, () => {
        if (this.state.query && this.state.query.length > 1) {
          this.props.getResults(this.state.selectedSearchBy, this.state.query);
        }
      }
    )}
  }

  changeSearchBy = (event) => {
    this.setState({
      selectedSearchBy: event.target.value
    });
  }

  onDragStart = (event, name) => {
    console.log('drag start: ' + name);
    event.dataTransfer.setData('name', name);
  }

  render() {

    let resultsArea = this.props.loading ? <Spinner /> : this.props.results.map(result => {
      return (
        <li
          key={Math.random()}
          className={classes.ResultListItem}
          onDragStart={(event) => this.onDragStart(event, result.name)}
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

    return (
      <div className={classes.Search}>
        {searchForm}
        {searchByForm}
        <h4>Showing results for: {this.state.query}</h4>
        <ul className={classes.ResultList}>
          {resultsArea}
        </ul>
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
    getResults: (searchBy, query) => dispatch(actions.getResults(searchBy, query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
