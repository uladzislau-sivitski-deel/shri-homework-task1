import * as React from 'react';
import * as moment from 'moment';

import {Image} from '../';

export function Card({card}) {
    if (!card) {
        return null;
    }
    console.log(card)


    let {display_sizes, max_dimensions} = card,
        uri = display_sizes && display_sizes[0] && display_sizes[0].uri,
        imageData = {uri, max_dimensions};

    let spanWidth = 86;

    let ratio = max_dimensions.width/max_dimensions.height;
    let span = Math.floor(230 * ratio/spanWidth);
    span % 2 > 0 ? span++ : span = span;
    return (
        <div className="card" style = {{'grid-column': 'span ' + span}}>
            {imageData && (
                <div className="card__image">
                    <Image
                        imageData={imageData}
                    />
                </div>
            )}
        </div>
    );

}