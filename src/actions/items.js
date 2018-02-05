import fetch from 'isomorphic-fetch';

export const incrementSearches = () => ({
  type: 'INCREMENT_SEARCHES'
})

export const decrementSearches = () => ({
  type: 'DECREMENT_SEARCHES'
})

export const requestItems = (query) => ({
  type: 'REQUEST_ITEMS', query
})

export const receiveItems = (items) => ({
  type: 'RECEIVE_ITEMS', items
})

export const itemRequestFailed = (err) => ({
  type: 'ITEM_REQUEST_FAILED', err
})

export function fetchItems(query) {
  return function(dispatch) {
    dispatch(requestItems(query))
    dispatch(incrementSearches())
    return fetch(query)
      .then(response => response.json()
        .then(json => ({
          status: response.status,
          json
        })))
      .then(({ status, json }) => {
        if (status >= 400) dispatch(itemRequestFailed())
        else dispatch(receiveItems(json))
      }, err => { dispatch(itemRequestFailed(err))  })
  }
}