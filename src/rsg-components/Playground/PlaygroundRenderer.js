/* eslint
  import/no-extraneous-dependencies: off,
  import/no-unresolved: off,
  import/extensions: off,
  react/forbid-prop-types: off,
  react/jsx-filename-extension: off
*/
import React, { PropTypes, PureComponent } from 'react';
import Editor from 'rsg-components/Editor';
import Preview from 'rsg-components/Preview';
import IconButton from 'material-ui/IconButton';
import Resizable from 'react-resizable-box';
import FontIcon from 'material-ui/FontIcon';
import { grey200 } from 'material-ui/styles/colors';
import cn from 'classnames';

import { getQueryVariable } from '../utils/settingsLink';
import Toolbar from '../Toolbar';
import PropsEditor from '../PropsEditor';

const s = require('./Playground.css');

const containerSizes = {
  Lg: {
    width: 1024,
    height: 600,
  },
  Md: {
    width: 800,
    height: 600,
  },
  Sm: {
    width: 568,
    height: 480,
  },
  Xs: {
    width: 320,
    height: 480,
  },
};

export default class PlaygroundRenderer extends PureComponent {
  static propTypes = {
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired,
    evalInContext: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    singleExample: PropTypes.bool,
    isFlow: PropTypes.bool,
    urlProps: PropTypes.arrayOf(PropTypes.string),
  };

  constructor(props) {
    super(props);

    const initialState = {
      showCode: false,
      showPropsEditor: false,
    };

    const settingsFromLink = getQueryVariable('settings');
    if (settingsFromLink) {
      const settings = JSON.parse(settingsFromLink);
      if (settings.containerSizeKey === 'Custom') {
        initialState.containerSize = settings.containerSize;
      }
      else {
        initialState.containerSize = containerSizes[settings.containerSizeKey];
      }
      initialState.containerSizeLine = initialState.containerSize;
      initialState.containerSizeKey = settings.containerSizeKey;
      initialState.containerBg = settings.containerBg;
      initialState.componentsCount = settings.componentsCount;
    }
    else {
      initialState.containerSize = containerSizes.Lg;
      initialState.containerSizeLine = containerSizes.Lg;
      initialState.containerSizeKey = 'Lg';
      initialState.containerBg = 'Light';
      initialState.componentsCount = '1';
    }
    this.state = initialState;
  }

  handleChangeContainerBackground = (event, value) => {
    this.setState({ containerBg: value });
  };

  handleCodeToggle = () => {
    this.setState((prevState) => ({
      showCode: !prevState.showCode,
      showPropsEditor: false,
    }));
  };

  handlePropsEditorToggle = () => {
    this.setState((prevState) => ({
      showPropsEditor: !prevState.showPropsEditor,
      showCode: false,
    }));
  };

  handleResizeStart = () => {
    this.setState({
      containerSizeKey: 'Custom',
      isResize: true,
    });
  };

  handleOnResize = (event, direction, el) => {
    const clientSize = {
      width: el.clientWidth,
      height: el.clientHeight,
    };
    this.setState({
      containerSizeLine: clientSize,
    });
  };

  handleChangeComponentsCount = (event, value) => {
    this.setState({ componentsCount: value });
  }

  handleResizeStop = () => {
    this.setState({
      isResize: false,
    });
  };

  handleChangeContainerSize = (size) => () => {
    this.setState({
      containerSize: containerSizes[size],
      containerSizeLine: containerSizes[size],
      containerSizeKey: size,
    });
  };

  render() {
    const { code, name, evalInContext,
      props, index, singleExample, urlProps, onChange, isFlow } = this.props;
    const { containerSize, containerSizeLine, containerBg, showCode, showPropsEditor,
    containerSizeKey, isResize, componentsCount } = this.state;

    const rootClass = cn(s.root, {
      [s.root_singleExample]: singleExample,
    });


    const previewClass = cn(s.preview, 'rsg--example-preview',
      s[`preview_Bg${containerBg}`],
    );

    const previewBoxClass = cn(s.previewBox, {
      [s.previewBox_withToolbar]: singleExample,
      [s.previewBox_withEditor]: singleExample && (showPropsEditor || showCode),
    });

    const resizebleClass = cn(s.resizeble, {
      [s.resizeble_isResize]: isResize,
    });

    const preview = [];
    for (let i = 1; i <= parseInt(componentsCount, 10); i += 1) {
      preview.push(<Preview code={code} evalInContext={evalInContext} key={i} />);
    }
    return (
      <div className={rootClass}>
        {!singleExample &&
          <a href={`/#!/${name}/${index}`} className={s.tools}>
            <IconButton
              tooltip="Customise example"
              tooltipPosition="bottom-left"
            >
              <FontIcon className="material-icons" color={grey200}>settings</FontIcon>
            </IconButton>
          </a>
        }
        <div className={previewBoxClass}>
          {singleExample &&
            <Resizable
              className={resizebleClass}
              width={containerSize.width}
              height={containerSize.height}
              minWidth={150}
              minHeight={150}
              onResizeStart={this.handleResizeStart}
              onResize={this.handleOnResize}
              onResizeStop={this.handleResizeStop}
            >
              <div
                ref={(c) => {
                  this._previewContainer = c;
                }}
                className={previewClass}
              >
                {preview}
              </div>
              <div className={s.previewSize}>
                {containerSizeLine.width}x{containerSizeLine.height}
              </div>
            </Resizable>
          }
          {!singleExample && preview}
        </div>
        {singleExample &&
          <div className={s.toolWrapper}>
            <div className={s.toolsWrapper}>
              {(showPropsEditor && props) && (
                <PropsEditor
                  props={props}
                  componentName={name}
                  code={code}
                  onSubmit={onChange}
                  isFlow={isFlow}
                />
              )}
              {showCode && (
                <div className={s.editorWrapper} >
                  <Editor code={code} onChange={onChange} />
                </div>
              )}
            </div>
            <Toolbar
              urlProps={urlProps}
              containerSize={containerSizeLine}
              containerSizeKey={containerSizeKey}
              containerBg={containerBg}
              componentsCount={componentsCount}
              showCode={showCode}
              showPropsEditor={showPropsEditor}
              onSizeChange={this.handleChangeContainerSize}
              onColorChange={this.handleChangeContainerBackground}
              onCountChange={this.handleChangeComponentsCount}
              onCodeClick={this.handleCodeToggle}
              onPropsEditorClick={this.handlePropsEditorToggle}
            />
          </div>
        }
      </div>
   );
  }
}
