import { Component, PropTypes } from 'react';
import Layout from 'components/Layout';

export default class Wrapper extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    }

    render() {
        return this.props.children;
    }
}
