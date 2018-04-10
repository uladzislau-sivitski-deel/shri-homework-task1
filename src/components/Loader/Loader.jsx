import * as React from 'react';
import { connect } from 'react-redux';
import {fetchNext} from '../../actions/feedActions';


const THRESHOLD = 500;

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

    onScroll() {
      if (!this.container || this.props.loading) {
        return;
      }
      let orientation =  screen.msOrientation || (screen.orientation ||screen.mozOrientation || {}).type;
      if (orientation === "portrait-primary" || orientation === "portrait-secondary" ||  window.innerWidth >= 1000)
      {
          let scrollTop = document.body.scrollTop ||document.documentElement.scrollTop,
          containerHeight = this.container.clientHeight,
          windowHeight = window.innerHeight;
          if (scrollTop + windowHeight >= containerHeight - THRESHOLD) {
            this.props.dispatch(fetchNext());
          }
      } else {
          let scrollLeft = document.body.scrollLeft ||document.documentElement.scrollLeft,
          containerWidth = this.container.clientWidth,
          windowWidth = window.innerWidth;
          if (scrollLeft + windowWidth >= containerWidth - THRESHOLD) {
            this.props.dispatch(fetchNext());
          }
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
