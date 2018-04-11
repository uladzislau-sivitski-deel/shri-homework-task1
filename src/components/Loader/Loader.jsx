import * as React from 'react';
import { connect } from 'react-redux';
import {fetchNext} from '../../actions/feedActions';


const THRESHOLD = 500;
const MINDESKTOP = 1000;

const mapStateToProps = (state) => ({
	loading: state.feed.loading
});

export const Loader = connect (mapStateToProps) (

    class Loader extends React.Component {

    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {  
        document.addEventListener('scroll', this.onScroll, {passive: true});
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScroll);
    }

    onScroll(e) {
      if (!this.container || this.props.loading) {
        return;
      }
      
      let orientation = screen.msOrientation ||
                        (
                          screen.orientation ||
                          screen.mozOrientation ||
                          {}
                        ).type,

        portrait =  orientation === "portrait-primary" ||
                    orientation === "portrait-secondary" ||
                    window.innerWidth >= MINDESKTOP,

        scrollDir = portrait ? 'scrollTop' : 'scrollLeft',
        containerDimension = portrait ? 'clientHeight' : 'clientWidth',
        windowDimension = portrait ? 'innerHeight' : 'innerWidth',

        scroll = document.body[scrollDir] || document.documentElement[scrollDir],
        container = this.container[containerDimension],
        total = window[windowDimension];

      if (scroll + total >= container - THRESHOLD) {
        this.props.dispatch(fetchNext());
      }

    }

    render() {
        return (
            <div className="loader" ref={(container) => this.container = container}>
                {this.props.children}
                {this.props.loading && (
                    <div className="loader__spinner">
                        <div className="spinner"/>
                    </div>
                )}
            </div>
        );
    }
}
)
