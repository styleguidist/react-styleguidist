import React, { PropTypes, PureComponent } from 'react';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Palette from 'material-ui/svg-icons/image/palette';
import SignalOneBar from 'material-ui/svg-icons/device/signal-cellular-1-bar';
import SignalTwoBar from 'material-ui/svg-icons/device/signal-cellular-connected-no-internet-1-bar';
import SignalThreeBar from 'material-ui/svg-icons/device/signal-cellular-connected-no-internet-2-bar';
import SignalFourBar from 'material-ui/svg-icons/device/signal-cellular-connected-no-internet-4-bar';
import Snackbar from 'material-ui/Snackbar';
import PhoneSetup from 'material-ui/svg-icons/communication/phonelink-setup';
import Tv from 'material-ui/svg-icons/hardware/tv';
import Laptop from 'material-ui/svg-icons/hardware/laptop';
import Tablet from 'material-ui/svg-icons/hardware/tablet-android';
import Phone from 'material-ui/svg-icons/hardware/phone-android';
import CopyToClipboard from 'react-copy-to-clipboard';

import { cyan500, red500, red600, red700 } from 'material-ui/styles/colors';
import Responsive from 'react-responsive-decorator';
import cn from 'classnames';

import { createSettingsLink } from '../utils/settingsLink';
import s from './Toolbar.css';

@Responsive
class Toolbar extends PureComponent {
  static propTypes = {
    containerSizeKey: PropTypes.string.isRequired,
    containerBg: PropTypes.string.isRequired,
    showCode: PropTypes.bool.isRequired,
    showPropsEditor: PropTypes.bool.isRequired,
    onColorChange: PropTypes.func.isRequired,
    onCountChange: PropTypes.func.isRequired,
    onSizeChange: PropTypes.func.isRequired,
    onCodeClick: PropTypes.func.isRequired,
    componentsCount: PropTypes.string.isRequired,
    containerSize: PropTypes.shape(
      {
        width: PropTypes.number,
        height: PropTypes.number,
      }
    ).isRequired,
    // NOTE: Remove comment when maintainer fix it
    // https://github.com/yannickcr/eslint-plugin-react/issues/811
    // eslint-disable-next-line react/no-unused-prop-types
    urlProps: PropTypes.arrayOf(PropTypes.string),
    onPropsEditorClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      snackbarOpen: false,
      settingsLink: location.href,
    };
  }

  componentWillMount() {
    const { media } = this.props;
    media({ maxWidth: 400 }, () => {
      this.setState({
        isMobileSmall: true,
      });
    });

    media({ minWidth: 400 }, () => {
      this.setState({
        isMobileSmall: false,
      });
    });

    media({ minWidth: 600 }, () => {
      this.setState({
        isMobile: false,
      });
    });

    media({ maxWidth: 600 }, () => {
      this.setState({
        isMobile: true,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { containerSizeKey, containerBg, containerSize, componentsCount } = nextProps;
    const settings = { containerSizeKey, containerBg, componentsCount };
    if (containerSizeKey === 'Custom') settings.containerSize = containerSize;
    this.setState({
      settingsLink: createSettingsLink(nextProps.urlProps, settings),
    });
  }

  handleOnCopy = () => {
    this.setState({
      snackbarOpen: true,
    });
  }

  handleClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  }

  renderDimentionSet = () => {
    const { containerSizeKey, onSizeChange } = this.props;
    return (
      <span>

        <IconButton
          iconClassName="material-icons"
          onClick={onSizeChange('Lg')}
          iconStyle={{ color: containerSizeKey === 'Lg' ? cyan500 : 'currentColor' }}
        >
          tv
        </IconButton>
        <IconButton
          iconClassName="material-icons"
          onClick={onSizeChange('Md')}
          iconStyle={{ color: containerSizeKey === 'Md' ? cyan500 : 'currentColor' }}
        >
          laptop
        </IconButton>
        <IconButton
          iconClassName="material-icons"
          onClick={onSizeChange('Sm')}
          iconStyle={{ color: containerSizeKey === 'Sm' ? cyan500 : 'currentColor' }}
        >
          tablet_android
        </IconButton>
        <IconButton
          iconClassName="material-icons"
          onClick={onSizeChange('Xs')}
          iconStyle={{ color: containerSizeKey === 'Xs' ? cyan500 : 'currentColor' }}
        >
          phone_android
        </IconButton>
      </span>
    );
  };

  renderDimentionSelect = () => {
    const { containerSizeKey, onSizeChange } = this.props;
    const handle = (event, value) => onSizeChange(value)();
    return (
      <IconMenu
        onChange={handle}
        value={containerSizeKey}
        selectedMenuItemStyle={{ color: cyan500 }}
        iconButtonElement={
          <IconButton
            touch
            iconStyle={{ color: cyan500 }}
          >
            {containerSizeKey === 'Lg' && <Tv />}
            {containerSizeKey === 'Md' && <Laptop />}
            {containerSizeKey === 'Sm' && <Tablet />}
            {containerSizeKey === 'Xs' && <Phone />}
            {containerSizeKey === 'Custom' && <PhoneSetup />}
          </IconButton>
        }
      >
        <MenuItem value="Lg" primaryText="Desctop" />
        <MenuItem value="Md" primaryText="Laptop" />
        <MenuItem value="Sm" primaryText="Tablet" />
        <MenuItem value="Xs" primaryText="Phone" />
      </IconMenu>
    );
  };

  render() {
    const { containerBg, showCode, showPropsEditor,
    onColorChange, onCodeClick, onPropsEditorClick, onCountChange, componentsCount } = this.props;
    const { isMobile, isMobileSmall, settingsLink } = this.state;

    return (
      <div className={s.toolbar}>
        <div className={s.toolbarGroup}>
          {isMobile ? this.renderDimentionSelect() : this.renderDimentionSet()}
          <div className={s.toolbarSeparator} />
          <IconMenu
            onChange={onColorChange}
            value={containerBg}
            selectedMenuItemStyle={{ color: cyan500 }}
            iconButtonElement={
              <IconButton touch>
                <Palette />
              </IconButton>
            }
          >
            <MenuItem value="Light" primaryText="Light" />
            <MenuItem value="Dark" primaryText="Dark" />
            <MenuItem value="Transparent" primaryText="Transparent" />
          </IconMenu>
          <IconMenu
            onChange={onCountChange}
            value={componentsCount}
            selectedMenuItemStyle={{ color: cyan500 }}
            iconButtonElement={
              <IconButton touch>
                {parseInt(componentsCount, 10) === 1 && <SignalOneBar color={cyan500} />}
                {parseInt(componentsCount, 10) === 10 && <SignalTwoBar color={red500} />}
                {parseInt(componentsCount, 10) === 100 && <SignalThreeBar color={red600} />}
                {parseInt(componentsCount, 10) === 1000 && <SignalFourBar color={red700} />}
              </IconButton>
            }
          >
            <MenuItem value="1" primaryText="One" />
            <MenuItem value="10" primaryText="Ten" />
            <MenuItem value="100" primaryText="Hundred" />
            <MenuItem value="1000" primaryText="Thousand" />
          </IconMenu>
        </div>
        <div className={cn(s.toolbarGroup, s.toolbarGroup_left)}>
          <div className={s.toolbarSeparator} />
          <IconButton
            iconClassName="material-icons"
            onClick={onPropsEditorClick}
            iconStyle={{ color: showPropsEditor ? cyan500 : 'currentColor' }}
          >
            tune
          </IconButton>
          {!isMobileSmall && <IconButton
            iconClassName="material-icons"
            onClick={onCodeClick}
            iconStyle={{ color: showCode ? cyan500 : 'currentColor' }}
          >
            code
          </IconButton>}
          <CopyToClipboard
            text={settingsLink}
            onCopy={this.handleOnCopy}
          >
            <IconButton
              iconClassName="material-icons"
              onClick={this.handleOpen}
            >
              link
            </IconButton>
          </CopyToClipboard>
        </div>
        <Snackbar
          open={this.state.snackbarOpen}
          message="Component settings copy at you buffer"
          autoHideDuration={4000}
          onRequestClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Toolbar;
