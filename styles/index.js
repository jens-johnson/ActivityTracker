import { StyleSheet } from 'react-native';
import { extendTheme } from 'native-base';

const colors = {
  background: '#12263A',
  primary: '#FCFFFD',
  secondary: '#06BCC1'
};

const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {
        color: colors.primary
      }
    }
  }
});

const defaultStyles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logActivityScreen: {
    backgroundColor: colors.background,
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontFamily: 'Roboto_400Regular',
    color: colors.primary
  },
  image: {
    width: 400,
    height: 400
  }
});

const activityFormStyles = StyleSheet.create({
  formControl: {
    marginBottom: 5
  },
  formControlLabel: {
    color: colors.primary
  },
  heading: {
    marginTop: 10,
    marginBottom: 5,
    color: colors.primary
  }
});

const navigationStyles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.primary
  },
  tabBarItemStyle: {
    fontFamily: 'Roboto_400Regular',
    backgroundColor: colors.primary
  }
});

export {
  colors,
  theme,
  defaultStyles,
  activityFormStyles,
  navigationStyles
};
