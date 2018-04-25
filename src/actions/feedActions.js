export function fetchNext() {
  return async function (dispatch, getState) {
      dispatch({
        type: 'FEED_LOAD',
        loading: true
      });

      try {
        let page = getState().feed.page;
        let query = getState().feed.query;
				let API_KEY = "q6natzu49b9njnxwv9w7gbxs";
        let url = 'https://api.gettyimages.com/v3/search/images?';
        
        let response = await fetch(
					`${url}fields=comp%2Csummary_set&page=${page}&page_size=100&phrase=${query}`,
          {headers: {'Api-Key': API_KEY}});
        
        let json = await response.json();

        dispatch({
          type: 'FEED_APPEND',
          cards: json.images,
          page: ++page
        });
        
			}
			catch (error) {
        dispatch({
          type: 'FEED_ERROR',
          error
        });
			}
			finally {
				dispatch({
					type: 'FEED_LOAD',
					loading: false
				});
			}
  };
}

export function changeQuery({query}) {
  return async function (dispatch, getState) {
    dispatch({
      type: 'FEED_QUERY',
      query: query
    });
    dispatch({
      type: 'FEED_RESET'
    });
    dispatch(fetchNext());
  }
}