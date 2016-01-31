import { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';

/**
 * Modal dialog (actually just a [react-modal](https://github.com/rackt/react-modal) wrapper).
 */
class Modal extends Component {
	render() {
		let { isOpen, children } = this.props;
		let style = {
			overlay: {
				zIndex: 999
			}
		};
		return (
			<ReactModal isOpen={isOpen} style={style}>{children}</ReactModal>
		);
	}
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default Modal;
