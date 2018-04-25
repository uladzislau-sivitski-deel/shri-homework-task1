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

		return (
			<div
				className="image"
				style={{
					height: imageData.defaultHeight ? imageData.defaultHeight + 'px' : ''
				}}
			>
				<img
					ref={(node) => this.image = node}
					onLoad={() => this.setState({hidden: false})}
					src={imageData.uri}
					className={`image__image ${this.state.hidden ? 'image__image_hidden' : ''}`}
					alt=""
				/>
			</div>
		);
	}
}
