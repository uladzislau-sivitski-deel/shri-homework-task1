import * as React from 'react';

import {Card, Modal, Loader} from '../';

export class Cards extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
					currentIndex: null
				};

        this.openModal = this.openModal.bind(this);        
        this.closeModal = this.closeModal.bind(this);
        this.findNext = this.findNext.bind(this);
        this.findPrev = this.findPrev.bind(this);

    }

    openModal(e, id) {
				let current = this.props.cards.find(card => card.id === id);
        this.setState ({ currentIndex: this.props.cards.indexOf(current) });
    }

    closeModal(e) {
      if (e != undefined) {
        e.preventDefault();
      }
      this.setState ({ currentIndex: null });
		}
		
      findPrev(e) {
        if (e != undefined) {
          e.preventDefault();
        }
        this.setState(prevState => ({
          currentIndex: prevState.currentIndex - 1
        }));
      }
      findNext(e) {
        if (e != undefined) {
          e.preventDefault();
        }
        this.setState(prevState => ({
          currentIndex: prevState.currentIndex + 1
        }));
      }

    render() {
        let {cards, fetchNext} = this.props;
        return (
					<Loader fetchNext={fetchNext}>
							<div className="cards">
									{cards.map((card) =>
											<Card card={card} key={card.id} onClick={e => this.openModal(e, card.id)}/>
									)}
							</div>
							<Modal 
									closeModal={this.closeModal} 
									findPrev={this.findPrev} 
									findNext={this.findNext} 
									hasPrev={this.state.currentIndex > 0} 
									hasNext={this.state.currentIndex + 1 < cards.length} 
									src={cards[this.state.currentIndex] && cards[this.state.currentIndex].display_sizes[0].uri} 
							/>
					</Loader>
				)

    };
}