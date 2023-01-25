import styled, { css } from "styled-components/native";
import { UsersThree } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export const Container = styled(TouchableOpacity)`
  ${({ theme }) => css`
    width: 100%;
    height: 90px;
    border-radius: 6px;
    padding: 24px;
    margin-bottom: 12px;
    background-color: ${theme.COLORS.GRAY_500};
    flex-direction: row;
    align-items: center;
    justify-content: center;

  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_200};
  `}
`;

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  weight: 'fill',
  color: theme.COLORS.GREEN_700,
  size: 32,
}))`
  margin-right: 20px;
`;