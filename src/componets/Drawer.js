import React from 'react';
import styled from 'styled-components';

const DrawerStyle = styled.div`
    position: fixed;
    top: 0;
    right: ${(props) => (props.open ? 0 : '-500px')};
    height: 100vh;
    transition: right 0.4s;
    box-sizing: border-box;
    z-index: 999;
    display: flex;
    overflow: auto;
`;

const DrawerBox = styled.div`
    width: min-content;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
    padding: 80px 96px;
    box-shadow: -3px 0px 30px 2px rgba(0, 0, 0, 0.15);
    margin-left: 24px;
`;

const DrawerCancel = styled.div`
    cursor: pointer;
    margin-top: 24px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #5094fa;
    border-radius: 3px;
    box-shadow: -3px 0px 30px 2px rgba(0, 0, 0, 0.15);
`;

function Drawer({ children, open, color, toggleDrawer, backgroundColor }) {
    return (
        <DrawerStyle open={open}>
            <DrawerCancel onClick={toggleDrawer}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.5738 1.57438L7.14877 6.00063L11.5738 10.4256L10.4263 11.5744L6.00002 7.14813L1.57377 11.5744L0.42627 10.4256L4.85127 6.00063L0.42627 1.57438L1.57377 0.425629L6.00002 4.85188L10.4263 0.425629L11.5738 1.57438Z"
                        fill="white"
                    />
                </svg>
            </DrawerCancel>
            <DrawerBox color={color} backgroundColor={backgroundColor}>
                {children}
            </DrawerBox>
        </DrawerStyle>
    );
}

export default Drawer;
