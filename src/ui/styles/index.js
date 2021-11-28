import { StyleSheet } from 'react-native';
import { extendTheme } from 'native-base';

const colors = {
  background: '#12263A',
  primary: '#FCFFFD',
  secondary: '#06BCC1'
};

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e5ffee',
      100: '#b8fecf',
      200: '#8afeae',
      300: '#5dfe8e',
      400: '#3efd6e',
      500: '#31e556',
      600: '#25b243',
      700: '#197f31',
      800: '#0b4c1d',
      900: '#001a09'
    },
    secondary: {
      50: '#d9ffff',
      100: '#aefcfe',
      200: '#80f8fb',
      300: '#52f5fa',
      400: '#2bf2f8',
      500: '#1ad9df',
      600: '#05a9ad',
      700: '#00787c',
      800: '#00494b',
      900: '#001a1c'
    }
  },
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

const formStyles = StyleSheet.create({
  formControl: {
    marginTop: 5,
    marginBottom: 5
  },
  formControlLabel: {
    color: colors.primary,
    fontWeight: 'bold'
  }
});

const activityFormStyles = StyleSheet.create({
  heading: {
    marginTop: 10,
    marginBottom: 5,
    color: colors.primary
  }
});

const overviewScreenStyles = StyleSheet.create({
  heading: {
    marginBottom: 5,
    marginTop: 10,
    color: colors.primary,
    textAlign: 'center'
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
  formStyles,
  activityFormStyles,
  overviewScreenStyles,
  navigationStyles
};
