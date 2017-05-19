/* eslint
  react/jsx-filename-extension: off
*/
import React, { PureComponent, PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import CopyToClipboard from 'react-copy-to-clipboard';
import Snackbar from 'material-ui/Snackbar';

import { lime500 } from 'material-ui/styles/colors';

const s = require('./ReactComponent.css');

class ReactComponentRenderer extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }

  handleCopy = () => {
    this.setState({
      copied: true,
    });
  };

  handleCloseSnackbar = () => {
    this.setState({
      copied: false,
    });
  };

  render() {
    const { name, pathLine, description,
      props, examples, sidebar, pure,
      changelog, importString, version, flow, stateless } = this.props;
    return (
      <div className={s.root} id={`${name}-container`}>
        <div className={s.anchor} id={name} />
        <header className={s.header}>
          <h2 className={s.primaryHeading}>
            {name}
            {version && <span className={s.version}>v{version}</span>}
            {pure &&
              <a
                href="https://facebook.github.io/react/docs/react-api.html#react.purecomponent"
                target="_blank"
                rel="noopener noreferrer"
                style={{ verticalAlign: 'middle' }}
              >
                <IconButton
                  tooltip="This component is PureComponent"
                  tooltipPosition="top-right"
                  style={{ padding: 0, width: 'auto', height: 'auto' }}
                  iconStyle={{ fontSize: '0.9rem' }}
                >
                  <FontIcon
                    className="material-icons"
                    color={lime500}
                  >
                    flash_on
                  </FontIcon>
                </IconButton>
              </a>
            }
            {stateless &&
              <a
                href="https://toddmotto.com/stateless-react-components/#enter-stateless-components"
                target="_blank"
                rel="noopener noreferrer"
                style={{ verticalAlign: 'middle' }}
              >
                <IconButton
                  tooltip="This component is stateless"
                  tooltipPosition="top-right"
                  style={{ padding: 0, width: 'auto', height: 'auto' }}
                  iconStyle={{ fontSize: '0.9rem' }}
                >
                  <FontIcon
                    className="material-icons"
                    color={lime500}
                  >
                    filter_center_focus
                  </FontIcon>
                </IconButton>
              </a>
            }
            {flow &&
              <a
                href="http://www.saltycrane.com/blog/2016/06/flow-type-cheat-sheet/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  verticalAlign: 'middle',
                  margin: '0 0.3em',
                }}
              >
                <IconButton
                  tooltip="This component is Flow typed"
                  tooltipPosition="top-right"
                  style={{
                    padding: 0,
                    width: 'auto',
                    height: 'auto',
                    top: stateless ? -2 : -3,
                  }}
                  iconStyle={{ fontSize: '0.75rem' }}
                >
                  <FontIcon
                    className="fa fa-foursquare"
                    color={lime500}
                  />
                </IconButton>
              </a>
            }
          </h2>
          <div className={s.pathLine}>{pathLine}</div>
          {sidebar && <a className={s.anchorLink} href={`#${name}`}>#</a>}
        </header>
        <div>
          {description}
        </div>
        <div className={s.importLine}>
          <CopyToClipboard
            text={importString}
            onCopy={this.handleCopy}
          >
            <span>
              {importString}
            </span>
          </CopyToClipboard>
        </div>
        <div className={s.props}>
          <h3 className={s.heading}>Props</h3>
          {props}
        </div>
        <Snackbar
          open={this.state.copied}
          message="Import String copied into youy buffer"
          autoHideDuration={4000}
          onRequestClose={this.handleCloseSnackbar}
        />
        {examples}
        {changelog}
      </div>
   );
  }
}

ReactComponentRenderer.propTypes = {
  name: PropTypes.string.isRequired,
  pathLine: PropTypes.string.isRequired,
  importString: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  description: PropTypes.node,
  props: PropTypes.node,
  examples: PropTypes.node,
  changelog: PropTypes.node,
  sidebar: PropTypes.bool,
  pure: PropTypes.bool,
  flow: PropTypes.bool,
  stateless: PropTypes.bool,
};

export default ReactComponentRenderer;
