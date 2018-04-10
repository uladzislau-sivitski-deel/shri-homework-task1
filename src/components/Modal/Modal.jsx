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
          this.props.prev && this.openModal(this.props.prev);
          break
        case 39:
          this.props.next && this.openModal(this.props.next);
          break
      }
    }

    openModal(card){
      this.props.dispatch(openModal(card))
    }

    closeModal(){
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
        <div>
          <div className="modal__overlay" onClick={this.closeModal}></div>
          <div className="modal">
            <div className='modal__body' onKeyDown={this.handleKeyDown}>
              {prev && <a href="#" className='modal__prev' onClick={() => this.openModal(prev)} ></a>}
              {next && <a href="#" className='modal__next' onClick={() => this.openModal(next)} ></a>}
              <a href="#" className='modal__close' onClick={this.closeModal} >&times;</a>              
              <img src={src} />
              {this.props.loading && (
                <div className="loader__spinner">
                    <div className="spinner"/>
                </div>
                )
              }
            </div>
          </div>
        </div>
      )
    }
  }
)
