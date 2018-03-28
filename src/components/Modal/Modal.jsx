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
      if (e.keyCode === 27)
        this.props.closeModal();
      if (e.keyCode === 37 && this.props.hasPrev)
        this.props.findPrev();
      if (e.keyCode === 39 && this.props.hasNext)
        this.props.findNext();
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
      const { closeModal, hasNext, hasPrev, findNext, findPrev, src } = this.props;
      if (!src) {
        return null;
      }
      return (
        <div>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal">
            <div className='modal-body'>
              {hasPrev && <a href="#" className='modal-prev' onClick={findPrev} onKeyDown={this.handleKeyDown}></a>}
              {hasNext && <a href="#" className='modal-next' onClick={findNext} onKeyDown={this.handleKeyDown}></a>}
              <a href="#" className='modal-close' onClick={closeModal} onKeyDown={this.handleKeyDown}>&times;</a>              
              <img src={src} />
              {this.state.loading && (
                    <div className="infinite__spinner">
                        <div className="spinner"/>
                    </div>
                )}
            </div>
          </div>
        </div>
      )
    }
  }
