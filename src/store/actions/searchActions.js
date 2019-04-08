import * as actionTypes from './actionTypes';
import cards from 'mtgsdk';

export const searchStart = () => {
  return {
    type: actionTypes.SEARCH_START
  };
};

export const searchSuccess = (results) => {
  return {
    type: actionTypes.SEARCH_SUCCESS,
    results: results
  };
};

export const searchFail = (error) => {
  return {
    type: actionTypes.SEARCH_FAIL,
    error: error
  };
};

getResults = (searchBy, query) => {
  return dispatch => {
    dispatch(searchStart());
    let newResults = [];
    switch (searchBy) {
      case 'name':
        cards.card.where({ name: query})
          .then(cards => {
            console.log(cards);
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
            dispatch(searchSuccess(newResults));
          })
          .catch(err => {
            console.log(err);
            dispatch(searchFail(err));
          });
        break;
      case 'set':
        cards.card.where({ setName: query })
          .then(cards => {
            console.log(cards);
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
            dispatch(searchSuccess(newResults));
          })
          .catch(err => {
            console.log(err);
            dispatch(searchFail(err));
          });
        break;
      case 'land':
        cards.card.where({ name: query, type: 'Land' || 'Basic Land'})
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
            dispatch(successSuccess(newResults));
          })
          .catch(err => {
            console.log(err);
            dispatch(searchFail(err));
          });
        break;
    }
  }
}
