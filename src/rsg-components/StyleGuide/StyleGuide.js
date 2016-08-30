import React, { Component } from 'react';
import Layout from 'rsg-components/Layout';
import Renderer from 'rsg-components/Layout/Renderer';

const ROUTES = {
    DEFAULT: 'Default',
    DOWNLOADS: 'Downloads'
};

export default class StyleGuide extends Component {
    constructor(props) {
        super(props);
        this.handleHashChange = this.handleHashChange.bind(this);

        this.state = {
            routeName: ROUTES.DEFAULT
        };

        window.addEventListener('hashchange', this.handleHashChange);
    }

    componentDidMount() {
        this.handleHashChange();
    }

    handleHashChange() {
        let hash = window.location.hash;

        if (hash.length === 0) {
            return this.setState({
                routeName: ROUTES.DEFAULT
            });
        }

        switch(hash.substr(2)) {
            case ROUTES.DOWNLOADS:
                return this.setState({
                    routeName: ROUTES.DOWNLOADS
                });
        };
    }

    render() {
        const LayoutRenderer = Layout(Renderer);

        return (
          <LayoutRenderer {...this.props} routeName={this.state.routeName} />
        );
    }
}
