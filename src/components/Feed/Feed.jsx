import React from 'react';
import {connect} from 'react-redux';
import Cards from '../Cards/Cards.jsx';
import Header from '../Header/Header.jsx';
import {fetchNext, changeQuery} from '../../actions/feedActions';

const mapStateToProps = (state) => ({
	cards: state.feed.cards,
	error: state.feed.error,
	loading: state.feed.loading,
	page: state.feed.page
});

const Feed	= connect(mapStateToProps) (
	class Feed extends React.Component {

		constructor(props) {
			super(props);
			this.changeSearch = this.changeSearch.bind(this);
		}

		componentDidMount() {
			this.props.dispatch(fetchNext());
		}

		changeSearch(e) {
			e.preventDefault(); 
			const query = e.target.elements[0].value;
			if(query) {
				this.props.dispatch(changeQuery({query}));
			}
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
					<Header onSubmit={this.changeSearch}></Header>
					<Cards cards={this.props.cards} />
				</React.Fragment>
			);
		}
	});

export default Feed;
