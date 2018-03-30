import * as React from 'react';

import {Card, Modal, Loader} from '../';

export class Cards extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
					currentIndex: null
				};
      
        this.closeModal = this.closeModal.bind(this);
        this.changeIndex = this.changeIndex.bind(this);
    }

    openModal(e, id) {
				let current = this.props.cards.find(card => card.id === id);
        this.setState ({ currentIndex: this.props.cards.indexOf(current) });
    }

    closeModal(e) {
      e && e.preventDefault();
      this.setState ({ currentIndex: null });
		}
		
    changeIndex(e, inc) {
      e && e.preventDefault();
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + inc
      }));
      document.querySelectorAll('.card')[this.state.currentIndex].scrollIntoView({block: 'end', behavior: 'smooth'});
      }

    render() {
      let {cards, fetchNext} = this.props;
        return (
					<Loader fetchNext={fetchNext}>
						<div className="cards">
							{
                cards.map((card) =>
                  <Card
                    card={card}
                    key={card.id}
                    onClick={e => this.openModal(e, card.id)}
                  />
                )
              }
						</div>
            <Modal 
              fetchNext={fetchNext}
							closeModal={this.closeModal} 
							goToPrev={(e) => this.changeIndex(e, -1)} 
							goToNext={(e) => this.changeIndex(e, 1)} 
							hasPrev={this.state.currentIndex > 0} 
							hasNext={this.state.currentIndex + 1 < cards.length} 
							src={cards[this.state.currentIndex] && cards[this.state.currentIndex].display_sizes[0].uri} 
						/>
					</Loader>
				)
    };
}
