import * as React from 'react';
export class Modal extends React.Component {

    constructor(props) {
      super(props);
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.state = {
        loading: false
      }
    }

    componentDidMount() {
      document.body.addEventListener('keydown', this.handleKeyDown);
    }  
    componentWillUnMount() {
      document.body.removeEventListener('keydown', this.handleKeyDown);
    }
    handleKeyDown(e) {
      switch (e.keyCode) {
        case 27:
          this.props.closeModal();
          break
        case 37:
          this.props.hasPrev && this.props.goToPrev();
          break
        case 39:
          this.props.hasNext && this.props.goToNext();
          break
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

    componentWillReceiveProps(nextProps) {
      if(nextProps.hasNext !== undefined && nextProps.hasNext === false) {
        this.nextPage();
      }
    }

    render () {
      const { closeModal, hasNext, hasPrev, goToNext, goToPrev, src } = this.props;
      if (!src) {
        return null;
      }
      return (
        <div>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal">
            <div className='modal-body' onKeyDown={this.handleKeyDown}>
              {hasPrev && <a href="#" className='modal-prev' onClick={goToPrev} ></a>}
              {hasNext && <a href="#" className='modal-next' onClick={goToNext} ></a>}
              <a href="#" className='modal-close' onClick={closeModal} >&times;</a>              
              <img src={src} />
              {this.state.loading && (
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
