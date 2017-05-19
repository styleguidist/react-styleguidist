/* eslint
  import/no-extraneous-dependencies: off,
  import/no-unresolved: off,
  import/extensions: off,
  react/forbid-prop-types: off,
  react/jsx-filename-extension: off
*/
import React, { PropTypes, Component } from 'react';
import Markdown from 'rsg-components/Markdown';
import Props from 'rsg-components/Props';
import Examples from 'rsg-components/Examples';
import Responsive from 'react-responsive-decorator';
import Paper from 'material-ui/Paper';
import ReactComponentRenderer from './ReactComponentRenderer';
import Changelog from '../Changelog';

@Responsive
export default class ReactComponent extends Component {
  static propTypes = {
    component: PropTypes.object.isRequired,
    sidebar: PropTypes.bool,
  };

  static contextTypes = {
    singleExample: PropTypes.bool,
  };

  componentWillMount() {
    const { media } = this.props;
    media({ minWidth: 568 }, () => {
      this.setState({
        isMobile: false,
      });
    });

    media({ maxWidth: 568 }, () => {
      this.setState({
        isMobile: true,
      });
    });
  }

  getLastVersion = () => {
    const { component } = this.props;
    const { changelog } = component;

    if (!changelog) {
      return component.props.version;
    }
    try {
      // Тут нужно \ ибо нужна именно точка, а не любой символ
      // eslint-disable-next-line no-useless-escape
      const regexp = /v(\d(\.\d+){1,2}((-(?=\w+)[\w\.]*)|))/;
      const match = regexp.exec(changelog[0].content);
      return match ? match[1] : component.props.version;
    }
    catch (e) {
      return component.props.version;
    }
  };

  render() {
    const { sidebar, component } = this.props;
    const { name, pathLine, examples, changelog } = component;
    const { description, props, pure, importString, flow, stateless } = component.props;
    const { isMobile } = this.state;
    const { singleExample } = this.context;

    return (
      <span>
        {singleExample &&
          <Examples
            singleExample={singleExample}
            examples={examples}
            name={name}
            props={props}
            isFlow={flow}
          />
        }
        {!singleExample &&
          <Paper
            zDepth={1}
            style={{ padding: '0.2rem 2rem', margin: isMobile ? '1rem -1rem' : '2rem 0', overflow: 'hidden' }}
          >
            <ReactComponentRenderer
              name={name}
              pathLine={pathLine}
              description={description && <Markdown text={description} />}
              props={props && <Props props={props} flow={flow} />}
              flow={flow}
              stateless={stateless}
              pure={pure}
              importString={importString}
              version={this.getLastVersion()}
              examples={examples && <Examples examples={examples} name={name} props={props} />}
              sidebar={sidebar}
              singleExample={singleExample}
              changelog={changelog && <Changelog text={changelog[0].content} />}
            />
          </Paper>
        }
      </span>
   );
  }
}
