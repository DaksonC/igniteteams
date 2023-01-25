import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    padding: 24px;
    background-color: ${theme.COLORS.GRAY_600};
  `}
`;

export const Form = styled.View`
  ${({ theme }) => css`
    width: 100%;
    border-radius: 6px;
    flex-direction: row;
    justify-content: center;
    background-color: ${theme.COLORS.GRAY_700};
  `}
`;