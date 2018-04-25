/* global API_KEY, URL */
export function fetchNext() {
	return async function (dispatch, getState) {
		dispatch({
			type: 'FEED_LOAD',
			loading: true
		});
		try {
			let page = getState().feed.page;
			let query = getState().feed.query;
			
			let response = await fetch(
				`${URL}fields=comp%2Csummary_set&page=${encodeURIComponent(page)}&page_size=100&phrase=${encodeURIComponent(query)}`,
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
	return async function (dispatch) {
		dispatch({
			type: 'FEED_QUERY',
			query: query
		});
		dispatch({
			type: 'FEED_RESET'
		});
		dispatch(fetchNext());
	};
}