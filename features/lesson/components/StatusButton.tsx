import styled from 'styled-components';

export const StatusButton = ({ children, selected = false }) => {
  const background = selected ? '#D9D9D9' : '#00A5D4';
  return <Button background={background}>{children}</Button>;
};

const Button = styled.button`
  border: 1px solid black;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  background: ${(props) => props.background};
`;
