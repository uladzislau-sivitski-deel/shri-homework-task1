import * as React from 'react';
import {connect} from 'react-redux';
import { openModal, closeModal } from '../../actions/modalActions';
import { fetchNext } from '../../actions/feedActions';


const mapStateToProps = (state) => ({
	current: state.modal.current,
	next: state.modal.next,
  prev: state.modal.prev,
	loading: state.feed.loading,    
});

export const Modal = connect(mapStateToProps) (
  class Modal extends React.Component {

    constructor(props) {
      super(props);
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
      document.body.addEventListener('keydown', this.handleKeyDown);
    }  
    componentWillUnMount() {
      document.body.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(e) {
      switch (e.keyCode) {
        case 27:``
          this.closeModal();
          break
        case 37:
          this.props.prev && this.move(e, 'prev');
          break
        case 39:
          this.props.next && this.move(e, 'next');
          break
      }
    }

    openModal(card){
      this.props.dispatch(openModal(card))
    }

    move(e, dir){
      e && e.preventDefault();
      this.props[dir] && this.openModal(this.props[dir]);
    }

    closeModal(e){
      e && e.preventDefault();
      this.props.dispatch(closeModal());
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.current && !nextProps.next && !nextProps.loading) {
        this.props.dispatch(fetchNext()).then(res => {
          this.openModal(this.props.current);          
        });
      }
    }

    render () {
      const {current, next, prev} = this.props;
      if (!current) {
        return null;
      }
      const src = current.display_sizes[0] && current.display_sizes[0].uri;
      return (
        <React.Fragment>
          <div className="modal__overlay"></div>
          <div className="modal">
            <div className='modal__body' onKeyDown={this.handleKeyDown}>
              {
                prev &&
                <a
                  href="#"
                  className='modal__prev'
                  onClick={(e) => this.move(e, 'prev')}
                />
              }
              {
                next &&
                <a
                  href="#"
                  className='modal__next'
                  onClick={(e) => this.move(e, 'next')}
                />
                }
              <a
                href="#"
                className='modal__close'
                onClick={e => this.closeModal(e)}
              >
                &times;
              </a>              
              <img src={src} />
              {
                this.props.loading &&
                (
                  <div className="loader__spinner">
                    <div className="spinner"/>
                  </div>
                )
              }
            </div>
          </div>
          </React.Fragment>        
      )
    }
  }
)
