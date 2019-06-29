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

export const getResults = (searchBy, query) => {
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
            dispatch(searchSuccess(newResults));
          })
          .catch(err => {
            console.log(err);
            dispatch(searchFail(err));
          });
        break;
    }
  }
}

export const searchWithFormatStart = () => {
  return {
    type: actionTypes.SEARCH_WITH_FORMAT_START
  };
};

export const searchWithFormatSuccess = (results) => {
  return {
    type: actionTypes.SEARCH_WITH_FORMAT_SUCCESS,
    results: results
  };
};

export const searchWithFormatFail = (error) => {
  return {
    type: actionTypes.SEARCH_WITH_FORMAT_FAIL,
    error: error
  };
};

export const getResultsWithFormat = (searchBy, query, format) => {
  return dispatch => {
    dispatch(searchWithFormatStart());
    let newResults = [];
    switch (searchBy) {
      case 'name':
        if (format === 'legacy') {
          cards.card.where({ name: query })
            .then(cards => {
              console.log(cards);
              cards.map(result => {
                if (result.imageUrl) {
                  newResults.push({
                    id: Math.random(),
                    name: result.name,
                    image: result.imageUrl,
                    colors: result.colorIdentity,
                    cmc: result.cmc,
                    manaCost: result.manaCost
                  })
                }
                return newResults;
              })
              dispatch(searchWithFormatSuccess(newResults));
            })
            .catch(err => {
              console.log(err);
              dispatch(searchWithFormatFail(err));
            });
        }
        else if (format === 'standard') {
          const standardSets = ['GRN', 'M19', 'DOM', 'RIX', 'XLN'];
          cards.card.where({ name: query})
            .then(cards => {
              console.log(cards);
              cards.map(result => {
                if (result.imageUrl && standardSets.indexOf(result.set) > -1) {
                  newResults.push({
                    id: Math.random(),
                    name: result.name,
                    image: result.imageUrl,
                    colors: result.colorIdentity,
                    cmc: result.cmc,
                    manaCost: result.manaCost
                  })
                }
                return newResults;
              })
              dispatch(searchWithFormatSuccess(newResults));
            })
            .catch(err => {
              console.log(err);
              dispatch(searchWithFormatFail(err));
            });
        }
        else if (format === 'modern') {
          const modernSets = ['GRN', 'M19', 'DOM', 'RIX', 'XLN', 'HOU', 'MPS_AKH', 'AKH', 'AER', 'MPS', 'EMN', 'SOI', 'OGW', 'BFZ', 'ORI', 'DTK', 'FRF', 'KTK', 'MIS', 'JOU', 'BNG', 'THS', 'M14', 'DGM', 'GTC', 'RTR', 'M13', 'AUR', 'DKA', 'ISD', 'MIZ', 'NPH', 'MBS', 'SOM', 'M11', 'ROE', 'WWK', 'ZEN', 'MIO', 'ARB', 'CON', 'EVE', 'SHM', 'MOR', 'LRW', '10E', 'FUT', 'PLC', 'TSP', 'CST', 'DIS', 'GPT', 'RAV', '9ED', 'SOK', '8ED', 'BOK', 'CHK', '5DN', 'DST', 'MRD'];
          cards.card.where({ name: query})
            .then(cards => {
              console.log(cards);
              cards.map(result => {
                if (result.imageUrl && modernSets.indexOf(result.set) > -1) {
                  newResults.push({
                    id: Math.random(),
                    name: result.name,
                    image: result.imageUrl,
                    colors: result.colorIdentity,
                    cmc: result.cmc,
                    manaCost: result.manaCost
                  })
                }
                return newResults;
              })
              dispatch(searchWithFormatSuccess(newResults));
            })
            .catch(err => {
              console.log(err);
              dispatch(searchWithFormatFail(err));
            });
        }
        break;
      case 'set':
        if (format === 'legacy') {
          cards.card.where({ setName: query })
            .then(cards => {
              console.log(cards);
              cards.map(result => {
                if (result.imageUrl) {
                  newResults.push({
                    id: Math.random(),
                    name: result.name,
                    image: result.imageUrl,
                    colors: result.colorIdentity,
                    cmc: result.cmc,
                    manaCost: result.manaCost
                  })
                }
                return newResults;
              })
              dispatch(searchWithFormatSuccess(newResults));
            })
            .catch(err => {
              console.log(err);
              dispatch(searchWithFormatFail(err));
            });
        }
        else if (format === 'standard') {
          const standardSets = ['GRN', 'M19', 'DOM', 'RIX', 'XLN'];
          cards.card.where({ setName: query })
            .then(cards => {
              console.log(cards);
              cards.map(result => {
                if (result.imageUrl && standardSets.indexOf(result.set) > -1) {
                  newResults.push({
                    id: Math.random(),
                    name: result.name,
                    image: result.imageUrl,
                    colors: result.colorIdentity,
                    cmc: result.cmc,
                    manaCost: result.manaCost
                  })
                }
                return newResults;
              })
              dispatch(searchWithFormatSuccess(newResults));
            })
            .catch(err => {
              console.log(err);
              dispatch(searchWithFormatFail(err));
            });
        }
        else if (format === 'modern') {
          const modernSets = ['GRN', 'M19', 'DOM', 'RIX', 'XLN', 'HOU', 'MPS_AKH', 'AKH', 'AER', 'MPS', 'EMN', 'SOI', 'OGW', 'BFZ', 'ORI', 'DTK', 'FRF', 'KTK', 'MIS', 'JOU', 'BNG', 'THS', 'M14', 'DGM', 'GTC', 'RTR', 'M13', 'AUR', 'DKA', 'ISD', 'MIZ', 'NPH', 'MBS', 'SOM', 'M11', 'ROE', 'WWK', 'ZEN', 'MIO', 'ARB', 'CON', 'EVE', 'SHM', 'MOR', 'LRW', '10E', 'FUT', 'PLC', 'TSP', 'CST', 'DIS', 'GPT', 'RAV', '9ED', 'SOK', '8ED', 'BOK', 'CHK', '5DN', 'DST', 'MRD'];
          cards.card.where({ setName: query })
            .then(cards => {
              console.log(cards);
              cards.map(result => {
                if (result.imageUrl && modernSets.indexOf(result.set) > -1) {
                  newResults.push({
                    id: Math.random(),
                    name: result.name,
                    image: result.imageUrl,
                    colors: result.colorIdentity,
                    cmc: result.cmc,
                    manaCost: result.manaCost
                  })
                }
                return newResults;
              })
              dispatch(searchWithFormatSuccess(newResults));
            })
            .catch(err => {
              console.log(err);
              dispatch(searchWithFormatFail(err));
            });
        }
        break;
      case 'land':
        if (format === 'legacy') {
          cards.card.where({ name: query, type: 'Land' || 'Basic Land'})
            .then(cards => {
              cards.map(result => {
                if (result.imageUrl) {
                  newResults.push({
                    id: Math.random(),
                    name: result.name,
                    image: result.imageUrl,
                    colors: result.colorIdentity,
                    cmc: result.cmc,
                    manaCost: result.manaCost
                  })
                }
                return newResults;
              })
              dispatch(searchWithFormatSuccess(newResults));
            })
            .catch(err => {
              console.log(err);
              dispatch(searchWithFormatFail(err));
            });
        }
        else if (format === 'standard') {
          const standardSets = ['GRN', 'M19', 'DOM', 'RIX', 'XLN'];
          cards.card.where({ name: query, type: 'Land' || 'Basic Land'})
            .then(cards => {
              cards.map(result => {
                if (result.imageUrl && standardSets.indexOf(result.set) > -1) {
                  newResults.push({
                    id: Math.random(),
                    name: result.name,
                    image: result.imageUrl,
                    colors: result.colorIdentity,
                    cmc: result.cmc,
                    manaCost: result.manaCost
                  })
                }
                return newResults;
              })
              dispatch(searchWithFormatSuccess(newResults));
            })
            .catch(err => {
              console.log(err);
              dispatch(searchWithFormatFail(err));
            });
        }
        else if (format === 'modern') {
          const modernSets = ['GRN', 'M19', 'DOM', 'RIX', 'XLN', 'HOU', 'MPS_AKH', 'AKH', 'AER', 'MPS', 'EMN', 'SOI', 'OGW', 'BFZ', 'ORI', 'DTK', 'FRF', 'KTK', 'MIS', 'JOU', 'BNG', 'THS', 'M14', 'DGM', 'GTC', 'RTR', 'M13', 'AUR', 'DKA', 'ISD', 'MIZ', 'NPH', 'MBS', 'SOM', 'M11', 'ROE', 'WWK', 'ZEN', 'MIO', 'ARB', 'CON', 'EVE', 'SHM', 'MOR', 'LRW', '10E', 'FUT', 'PLC', 'TSP', 'CST', 'DIS', 'GPT', 'RAV', '9ED', 'SOK', '8ED', 'BOK', 'CHK', '5DN', 'DST', 'MRD'];
          cards.card.where({ name: query, type: 'Land' || 'Basic Land'})
            .then(cards => {
              cards.map(result => {
                if (result.imageUrl && modernSets.indexOf(result.set) > -1) {
                  newResults.push({
                    id: Math.random(),
                    name: result.name,
                    image: result.imageUrl,
                    colors: result.colorIdentity,
                    cmc: result.cmc,
                    manaCost: result.manaCost
                  })
                }
                return newResults;
              })
              dispatch(searchWithFormatSuccess(newResults));
            })
            .catch(err => {
              console.log(err);
              dispatch(searchWithFormatFail(err));
            });
        }
        break;
    }
  }
}

export const resetResults = () => {
  return {
    type: actionTypes.RESET_RESULTS,
    results: []
  };
};
