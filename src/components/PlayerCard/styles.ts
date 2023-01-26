import styled, { css } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

export const Container = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 56px;
    margin-bottom: 16px;
    border-radius: 6px;
    flex-direction: row;
    align-items: center;
    background-color: ${theme.COLORS.GRAY_500};
  `}
`;

export const Name = styled.Text`
  ${({ theme }) => css`
    flex: 1;
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_200};
  `}
`;

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 24,
  color: theme.COLORS.GRAY_200,
}))`
  margin-right: 4px;
  margin-left: 16px;
`;