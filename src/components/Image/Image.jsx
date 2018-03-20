import * as React from 'react';

export class Image extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        };
    }
    
    componentDidMount() {
        if (this.image && this.image.naturalHeight > 0) {
            this.setState({hidden: false});
        }
    }

    render() {
        let {imageData} = this.props;

        if (!imageData) {
            return null;
        }

        let size = imageData.sizes && imageData.sizes.orig,
            ratio = size ? Math.round(size.height / size.width * 100) : '',
            color = imageData.avatars_meta && imageData.avatars_meta.color_wiz_back;

        return (
            <div
                className="image"
                style={{
                    height: ratio ? ratio + 'vw' : '',
                    backgroundColor: color
                }}
            >
                <img
                    ref={(node) => this.image = node}
                    onLoad={() => this.setState({hidden: false})}
                    src={`https://avatars.mds.yandex.net/get-pdb/${imageData.group_id}/${imageData.avatars_key}/s375`}
                    className={`image__image ${this.state.hidden ? 'image__image_hidden' : ''}`}
                    alt=""
                />
            </div>
        );
    }

}