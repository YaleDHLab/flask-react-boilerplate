const initialState = {
  searches: 0,
  isFetching: false,
  items: [],
  err: null,
}

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_SEARCHES':
      return Object.assign({}, state, {
        searches: state.searches + 1,
      })
    case 'DECREMENT_SEARCHES':
      return Object.assign({}, state, {
        searches: state.searches - 1,
      })
    case 'REQUEST_ITEMS':
      return Object.assign({}, state, {
        isFetching: true,
      })
    case 'RECEIVE_ITEMS':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
      })
    case 'ITEM_REQUEST_FAILED':
      return Object.assign({}, state, {
        err: action.err,
      })
    default:
      return state;
  }
}

export default itemReducer;