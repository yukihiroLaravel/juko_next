import React from 'react';
import styled from 'styled-components';

type Props = {
  checked: boolean;
  onChange: () => void;
};

const Checkbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const Label = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: 50px;
  height: 25px;
  background: grey;
  display: inline-block;
  border-radius: 100px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 90px;
    transition: 0.3s;
  }
`;

const StyledSwitch = styled.div`
  ${Checkbox}:checked + ${Label} {
    background: #4caf50;
  }

  ${Checkbox}:checked + ${Label}::after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  ${Label}:active::after {
    width: 45px;
  }
`;

export const SwitchButton: React.FC<Props> = ({ checked, onChange }) => {
  return (
    <StyledSwitch>
      <Checkbox id="checkbox" type="checkbox" defaultChecked={checked} onChange={() => onChange()} />
      <Label htmlFor="checkbox" />
    </StyledSwitch>
  );
};
