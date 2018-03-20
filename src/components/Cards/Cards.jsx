import * as React from 'react';

import {Card} from '../';

export function Cards({cards, fetchNext}) {
    return (
            <div className="cards">
                {cards.map((card) =>
                    <Card card={card} key={card.id}/>
                )}
            </div>
    );
}