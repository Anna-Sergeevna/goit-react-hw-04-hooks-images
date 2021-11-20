import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    const { onClose } = this.props;

    if (e.code === 'Escape') {
      onClose();
    }
  };

  handleBackdropClick = e => {
    const { onClose } = this.props;

    e.currentTarget === e.target && onClose();
  };

  render() {
    const { largeImageURL, alt } = this.props;

    return createPortal(
      <div className="overlay" onClick={this.handleBackdropClick}>
        <div className="modal">
          <img src={largeImageURL} alt={alt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
