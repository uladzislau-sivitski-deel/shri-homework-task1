import * as React from 'react';

const THRESHOLD = 500;

export class Loader extends React.Component {

    constructor(props) {
        super(props);

        this.onScroll = this.onScroll.bind(this);
        this.orientation = 'portrait';
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        this.orientation = this.container.clientHeight > this.container.clientWidth 
        ? 'portrait'
        : 'landscape'
        
        document.addEventListener('scroll', this.onScroll, {passive: true});
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScroll);
    }

    onScroll() {
        if (!this.container || this.state.loading) {
            return;
        }
        if (this.orientation === 'portrait')
        {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
            containerHeight = this.container.clientHeight,
            windowHeight = window.innerHeight;

            if (scrollTop + windowHeight >= containerHeight - THRESHOLD) {
                this.nextPage();
            }
        } else { //TODO - horizontal scroll is not catched 
            let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft,
            containerWidth = this.container.clientWidth,
            windowWidth = window.innerWidth;

            if (scrollLeft + windowWidth >= containerWidth - THRESHOLD) {
                this.nextPage();
            }
        }
    }

    async nextPage() {
        this.setState({loading: true});

        try {
            await this.props.fetchNext();
        } catch(err) {
            console.error(err);
        } finally {
            this.setState({loading: false});
        }
    }

    render() {
        return (
            <div className="infinite" ref={(container) => this.container = container}>
                {this.props.children}

                {this.state.loading && (
                    <div className="infinite__spinner">
                        <div className="spinner"/>
                    </div>
                )}
            </div>
        );
    }

}