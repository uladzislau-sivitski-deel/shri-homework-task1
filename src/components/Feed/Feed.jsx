import React from 'react';
import {Cards, Header} from '../';
import API from 'gettyimages-api';
export class Feed extends React.Component {

  constructor(props) {
      super(props);
      this.fetchNext = this.fetchNext.bind(this);
      this.changeSearch = this.changeSearch.bind(this);
      
      this.apiCreds = {
        apiKey: "q6natzu49b9njnxwv9w7gbxs",
        apiSecret: "jrUepgGt95SKujDQXepkDAzuhpsnt3EDKYf32qNrUPF4z"
      };

      this.next = 1;
      this.search = 'cats';

      this.state = {
        loading: true,
        cards: [],
        mobile: false
      };
  }

  componentDidMount() {
    this.fetchData();

    
}

  fetchData() {
      return this.fetch()
        .catch((error) => {
            this.setState({
                loading: false,
                error
            });
        });
  }

  fetchNext() {
      if (this.next) {
          return this.fetch(this.next);
      }
  }

  changeSearch(e) {
    e.preventDefault();

    const value = e.target.elements[0].value;

    if(value) {
      this.search = value;
    }
    this.setState({cards: []});
    this.next = 1;
    this.fetchData();
  }

  async fetch(next = 1) {
      let client = new API(this.apiCreds);
      let response = await client.searchimages()
                        .withPage([next])
                        .withPageSize([100])
                        .withPhrase(this.search)
                        .withColor(true)
                        .withResponseField(['comp, summary_set, color_type'])
                        .execute();
        
      this.next++;

      this.setState({
        cards: this.state.cards.concat(response.images),
        loading: false
      });
  }

  render() {
    if (this.state.loading) {
        return (
            <div className="screen">
                <div className="spinner"/>
            </div>
        );
    }

    if (this.state.error) {
        return (
            <div className="screen">
                <h1>ERROR: {this.state.error.message}</h1>
            </div>
        );
    }

    return (
        <div>
            <Header onSubmit={this.changeSearch}></Header>
            <Cards
                cards={this.state.cards}
                fetchNext={this.fetchNext}
            />
        </div>
    );
  }
}
