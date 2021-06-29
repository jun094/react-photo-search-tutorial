import React, { useState } from 'react';
import styled from 'styled-components';

const StyleDropDown = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #2b2d36;
    padding: 9px 16px;
    box-sizing: border-box;
    border: ${(props) => (props.dropdownOpen ? '1px solid #1D6CE0' : '1px solid #cdced6')};
    box-sizing: border-box;
    border-radius: 3px 0px 0px 3px;

    & svg {
        margin-left: 48px;
    }
`;
const StyleDropMenu = styled.div`
    z-index: 999;
    box-sizing: border-box;
    position: absolute;
    top: 46px;
    left: 0;
    font-size: 14px;
    font-weight: 400;
    color: #2b2d36;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgb(0 0 0 / 20%);
    border-radius: 3px;

    height: ${(props) => (props.dropdownOpen ? '91px' : '0')};
    transition: height 0.4s;
    overflow: hidden;
    padding: ${(props) => (props.dropdownOpen ? '4px 0' : '0')};

    & .drop-item {
        width: 119px;
        padding: 4px 16px;
        box-sizing: border-box;
    }
    & .drop-item:hover {
        cursor: pointer;
        font-weight: 500;
        background: rgba(80, 148, 250, 0.24);
        color: #1d6ce0;
    }
`;
function DropDownBtn() {
    const [selectState, setSelectState] = useState('전체');
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = (e) => {
        const { id } = e.target;
        if (id) setSelectState(id);
        setOpen(!dropdownOpen);
    };

    return (
        <div style={{ position: 'relative' }}>
            <StyleDropDown dropdownOpen={dropdownOpen} onClick={toggle}>
                {selectState}
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.00006 7.79999L0.122559 1.92249L1.27131 0.773743L6.00006 5.50249L10.7288 0.773743L11.8776 1.92249L6.00006 7.79999Z"
                        fill="#525463"
                    />
                </svg>
            </StyleDropDown>
            <StyleDropMenu dropdownOpen={dropdownOpen} onClick={toggle}>
                <div id="전체" className="drop-item">
                    전체
                </div>
                <div id="제목" className="drop-item">
                    제목
                </div>
                <div id="설명" className="drop-item">
                    설명
                </div>
            </StyleDropMenu>
        </div>
    );
}

export default DropDownBtn;
