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

        let size = imageData.max_dimensions,
            ratio = size ? size.height / size.width : '',
            src = imageData.uri;
 
        return (
            <div
                className="image"
                //  style={{
                //      height: ratio ? ratio * 328 + 'px' : ''
                //  }}
            >
                <img
                    ref={(node) => this.image = node}
                    onLoad={() => this.setState({hidden: false})}
                    src={src}
                    className={`image__image ${this.state.hidden ? 'image__image_hidden' : ''}`}
                    alt=""
                />
            </div>
        );
    }

}