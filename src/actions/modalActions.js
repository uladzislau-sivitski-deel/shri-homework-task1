
export function openModal(current) {
  return function(dispatch, getState){
    let cards = getState().feed.cards; 
    const index = cards.indexOf(current);
    dispatch({
      type: 'SET_MODAL',
      current: current,
      next: cards[index + 1],
      prev: cards[index - 1],
    });
  }
}

export function closeModal() {
  return function(dispatch, getState){
    dispatch({
      type: 'SET_MODAL',
      current: null,
      next: null,
      prev: null,
    });
  }
}

