import React from 'react';
import {Cards, Header} from '../';
import API from 'gettyimages-api';
export class Feed extends React.Component {

  constructor(props) {
      super(props);
      this.fetchNext = this.fetchNext.bind(this);
      this.changeSearch = this.changeSearch.bind(this);
      
      this.apiKey = "q6natzu49b9njnxwv9w7gbxs";

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
    let response = await fetch(
        `https://api.gettyimages.com/v3/search/images?fields=comp%2Csummary_set&page=${this.next}&page_size=100&phrase=${this.search}`, {
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
