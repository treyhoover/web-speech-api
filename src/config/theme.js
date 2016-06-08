import {
  red500, red700,
  grey100, grey300, grey400, grey500,
  redA200,
  white, darkBlack, fullBlack
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

const theme = {
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56
  },
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: red500,
    primary2Color: red700,
    primary3Color: grey400,
    accent1Color: redA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: red500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  }
};

export default theme;
