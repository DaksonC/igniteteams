import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium
} from '@expo-google-fonts/roboto';

import theme from './src/theme';
import { Groups } from '@screens/Groups';
import { Loading } from '@components/Loading';


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium
  });

  return (
    <ThemeProvider theme={theme}>
      {fontsLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  );
}

