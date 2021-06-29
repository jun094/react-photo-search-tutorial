import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import styled from 'styled-components';

const DropStyle = styled.div`
    & .btn-drop-root {
        & button {
            height: 40px;
        }
    }
`;

function DropDownBtn() {
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);

    return (
        <DropStyle>
            <ButtonDropdown className="btn-drop-root" isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>전체</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>전체</DropdownItem>
                    <DropdownItem>제목</DropdownItem>
                    <DropdownItem>설명</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        </DropStyle>
    );
}

export default DropDownBtn;
