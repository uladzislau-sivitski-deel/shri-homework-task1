import React from 'react';
import {connect} from 'react-redux';
import Cards from '../Cards/Cards.jsx';
import Header from '../Header/Header.jsx';
import {fetchNext, changeQuery, newSearch} from '../../actions/feedActions';

const mapStateToProps = (state) => ({
	cards: state.feed.cards,
	error: state.feed.error,
	loading: state.feed.loading,
	page: state.feed.page,
	query: state.feed.query
});

const Feed	= connect(mapStateToProps) (
	class Feed extends React.Component {

		constructor(props) {
			super(props);
			this.changeQuery = this.changeQuery.bind(this);
			this.search = this.search.bind(this);
		}

		componentDidMount() {
			this.props.dispatch(fetchNext());
		}

		changeQuery(e) {
			e.preventDefault(); 
			const query = e.target.value;
			if(query) {
				this.props.dispatch(changeQuery({query}));
			}
		}

		search(e) {
			e.preventDefault(); 		
			this.props.dispatch(newSearch());
		}

		render() {
			let {loading, error, page} = this.props;
			if (loading && page === 1) {
				return (
					<div className="screen">
						<div className="spinner"/>
					</div>
				);
			}

			if (error) {
				return (
					<div className="screen">
						<h1>ERROR: {error.message}</h1>
					</div>
				);
			}

			return (
				<React.Fragment>
					<Header onChange={this.changeQuery} onSubmit={this.search} value={this.props.query}></Header>
					<Cards cards={this.props.cards} />
				</React.Fragment>
			);
		}
	});

export default Feed;
