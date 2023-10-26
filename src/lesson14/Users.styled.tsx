import styled from "styled-components";

interface IBlockProps {
  invalid?: boolean;
}

export const Block = styled.div<IBlockProps>`
  font-weight: bold;
  color: pink;
  background-color: ${(props) => (props.invalid ? "red" : "green")};
`;

export const Danger = styled.p({
  fontWeight: "bold",
  color: "red",
});

export const MyComponent = styled("div")({
  color: "darkslategray",
  backgroundColor: "aliceblue",
  padding: 8,
  borderRadius: 4,
});
