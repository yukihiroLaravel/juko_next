import styled from 'styled-components';

const StyleSideBarList = styled.li<{ isSelected: boolean }>`
  border-top: 1px solid #b5b5b5;
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ isSelected }) => isSelected && '#ddd'};
  cursor: pointer;
  padding: 0.5rem;
  :hover {
    opacity: 0.8;
  }
`;

type Props = {
  onClick: () => void;
  isSelected: boolean;
  children: React.ReactNode;
};

export const SideBarList: React.FC<Props> = ({
  onClick,
  isSelected,
  children,
}) => {
  return (
    <StyleSideBarList onClick={onClick} isSelected={isSelected}>
      <p className="text-xl	text-[#6D8DFF]">{children}</p>
    </StyleSideBarList>
  );
};
