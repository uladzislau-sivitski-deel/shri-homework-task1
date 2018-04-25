import * as React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modalActions';
import Card from  '../Card/Card.jsx';
import Modal from  '../Modal/Modal.jsx';
import Loader from  '../Loader/Loader.jsx';

const Cards = connect()(
	function Cards(props) {
		return (
			<Loader>
				<div className="cards">
					{
						props.cards.map((card) =>
							<Card
								card={card}
								key={card.id}
								onClick={() => props.dispatch(openModal(card))}
							/>
						)
					}
				</div>
				<Modal />
			</Loader>
		);
	}
);

export default Cards;
