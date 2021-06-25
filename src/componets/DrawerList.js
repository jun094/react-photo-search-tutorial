import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'red',
        color: (props) => props.color,
    },
});

function DrawerList({ anchor, drawerState, toggleDrawer }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Drawer anchor={anchor} open={drawerState} onClose={toggleDrawer(false)}>
                asdfasdfasdfasdf
            </Drawer>
        </div>
    );
}

export default DrawerList;
