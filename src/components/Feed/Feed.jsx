import React from 'react';
import {Cards, Header} from '../';
export class Feed extends React.Component {

  constructor(props) {
      super(props);
      this.fetchNext = this.fetchNext.bind(this);
      this.changeSearch = this.changeSearch.bind(this);
      
      this.apiKey = "q6natzu49b9njnxwv9w7gbxs";

      this.page = 1;
      this.search = 'cats';

      this.state = {
        loading: true,
        cards: []
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
      if (this.page) {
          return this.fetch(this.page);
      }
  }

  changeSearch(e) {
    e.preventDefault();

    const value = e.target.elements[0].value;

    if(value) {
      this.search = value;
    }
    this.setState({cards: []});
    this.page = 1;
    this.fetchData();
  }

  async fetch() {
    let response = await fetch(
        `https://api.gettyimages.com/v3/search/images?fields=comp%2Csummary_set&page=${this.page}&page_size=100&phrase=${this.search}`, {
        headers: {
            'Api-Key': this.apiKey           
        }
    })
    let json = await response.json();
        
    this.next++;

      this.setState({
        cards: this.state.cards.concat(json.images),
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
