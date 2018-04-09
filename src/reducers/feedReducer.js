import { FeedActions } from '../constants';

export function feedReducer(state, action) {
  if (!state) {
    return {
        cards: [],
        page: 1,
        query: 'cats'
    };
  }

  switch (action.type) {
    case FeedActions.FEED_LOAD:
      return {
        ...state,
        loading: action.loading
      };
    case FeedActions.FEED_QUERY:
      return {
        ...state,
        query: action.query
      };
    case FeedActions.FEED_APPEND:
      return {
        ...state,
        cards: state.cards.concat(action.cards),
        next: action.next
      };
    case FeedActions.FEED_RESET:
      return {
        ...state,
        cards: [],
        next: 1
      };
  
    default:
      return state;
  }
}