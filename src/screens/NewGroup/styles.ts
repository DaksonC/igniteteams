import { UsersThree } from 'phosphor-react-native';
import styled, { css } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
    padding: 24px;
    background-color: ${theme.COLORS.GRAY_600};
  `}
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  color: theme.COLORS.GREEN_700,
  size: 56,
}))`
  align-self: center;
`;