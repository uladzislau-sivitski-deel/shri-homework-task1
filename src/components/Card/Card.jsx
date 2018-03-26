import * as React from 'react';

import {Image} from '../';

export function Card({card}) {
    if (!card) {
        return null;
    }


    let {display_sizes, max_dimensions} = card,
        uri = display_sizes && display_sizes[0] && display_sizes[0].uri,
        ratio = max_dimensions.height/max_dimensions.width,
        span = Math.floor(300/27 * ratio),
        defaultHeight =  span * 20 + (span - 1) * 8,
        imageData = {uri, defaultHeight};
    
    return (
        <div className="card" style = {{'gridRowEnd': 'span ' + span}}>
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