import * as React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modalActions';
import {Card, Modal, Loader} from '../';

const mapStateToProps = (state) => ({
	cards: state.feed.cards,
	error: state.feed.error,
	page: state.feed.page,
  loading: state.feed.loading,
  current: state.modal.current
});

export const Cards = connect(mapStateToProps)(
  class Cards extends React.Component {

      constructor(props) {
          super(props);
      }

      openModal(e, card) {
        this.props.dispatch(openModal(card));
      }

      render() {
        let { cards } = this.props;
          return (
            <Loader>
              <div className="cards">
                {
                  cards.map((card) =>
                    <Card
                      card={card}
                      key={card.id}
                      onClick={e => this.openModal(e, card)}
                    />
                  )
                }
              </div>
              <Modal />
            </Loader>
          )
      };
  }
);
