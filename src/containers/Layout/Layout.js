import React, { Component } from 'react';

import Aux from '../../hoc/Aux'
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    sideDrawerCLosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) =>{
            return {showSideDrawer: !this.state.showSideDrawer};
            });
    }

    render(){
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerCLosedHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;