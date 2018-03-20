import * as React from 'react';
import * as moment from 'moment';

import {Image} from '../';

export function Card({card}) {
    if (!card) {
        return null;
    }

    let {description, owner, board, service, source_meta, content} = card,
        imageData = content && content[0] && content[0].content;

    return (
        <div className="card">
            {imageData && (
                <div className="card__image">
                    <Image
                        imageData={imageData}
                    />
                </div>
            )}

            {owner && (
                <div className="card__profile">
                    <div className="card__close">
                        <button className="close">
                            <span className="close__icon"/>
                        </button>
                    </div>

                    <div className="person person_card">
                        <a href={`/collections/user/${encodeURIComponent(owner.login)}/`}
                           aria-label="text"
                           className="person__avatar"
                           title={owner.display_name}
                        >
                            <img
                                className="avatar"
                                src={`https://avatars.mds.yandex.net/get-yapic/${owner.default_avatar_id}/islands-retina-small`}
                                alt={owner.display_name}
                            />
                        </a>

                        <div className="person__info">
                            {board && (
                                <div className="board">
                                    <a href={`/collections/user/${encodeURIComponent(owner.login)}/${encodeURIComponent(board.slug)}/`}
                                       className="board__link"
                                    >
                                        {board.title}
                                    </a>
                                </div>
                            )}

                            <div className="user">
                                <a className="user__link"
                                   href={`/collections/user/${encodeURIComponent(owner.login)}/`}
                                >
                                    {owner.display_name}
                                </a>
                            </div>

                            {service && service.created_at && (
                                <div className="date">
                                    <span className="date__desc">
                                        {(card.service.created_at)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card__article">
                        <div className="article">
                            <div className="article__desc">
                                {description}
                            </div>

                            {source_meta && (
                                <a className="article__link"
                                   href={source_meta.page_url}
                                >
                                    {source_meta.page_domain_decoded}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}