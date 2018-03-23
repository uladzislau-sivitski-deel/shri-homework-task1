import React from 'react';
import {Cards} from '../';
import API from 'gettyimages-api';
export class Feed extends React.Component {

  constructor(props) {
      super(props);
      this.fetchNext = this.fetchNext.bind(this);
      this.apiCreds = {
        apiKey: "q6natzu49b9njnxwv9w7gbxs",
        apiSecret: "jrUepgGt95SKujDQXepkDAzuhpsnt3EDKYf32qNrUPF4z"
      };
      this.page = 1;
      this.state = {
        loading: true,
        cards: []
      };
  }

  componentDidMount() {
    this.fetchData()
        .catch((error) => {
            this.setState({
                loading: false,
                error
            });
        });
}

  fetchData() {
      return this.fetch();
  }

  fetchNext() {
      if (this.next) {
          return this.fetch(this.next);
      }
  }

  async fetch(query = {}) {
      let client = new API(this.apiCreds);
      let response = await client.searchimages()
                        .withPage([this.page])
                        .withPageSize([100])
                        .withPhrase('cats')
                        .withColor(true)
                        .withResponseField(['comp, summary_set, color_type'])
                        .execute();
        
      this.page++;

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
        <Cards
            cards={this.state.cards}
            fetchNext={this.fetchNext}
        />
    );
  }
}
