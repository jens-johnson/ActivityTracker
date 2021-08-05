import { StyleSheet } from 'react-native';

const colorScheme = {
  background: '#12263A',
  primary: '#FCFFFD',
  secondary: '#06BCC1'
}

const globalStyles = StyleSheet.create({
  page: {
    backgroundColor: colorScheme.background,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Roboto_400Regular',
    color: colorScheme.primary
  },
  image: {
    width: 400,
    height: 400
  }
})

export {
  colorScheme,
  globalStyles
}
