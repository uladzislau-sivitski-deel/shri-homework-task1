import * as React from 'react';

import {Card, Loader} from '../';

export function Cards({cards, fetchNext}) {
    return (
        <Loader fetchNext={fetchNext}>
            <div className="cards">
                {cards.map((card) =>
                    <Card card={card} key={card.id}/>
                )}
            </div>
        </Loader>

    );
}