import React, { Component } from 'react';
import styles from './layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Aux from '../../hoc/_Aux/_Aux';
import {connect} from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showToolbarColor: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
           return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    // showToolbarColorHandler() {
    //     if (window.location.pathname === '/Auth' || window.location.pathname === '/') {
    //         this.setState({showToolbarColor: false})
    //     } else {
    //         this.setState({showToolbarColor: true})
    //     }
    // }

    // UNSAFE_componentWillReceiveProps () {
    //     // console.log('Layout componentDidUpdate');
    //     // console.log('Layout ' + window.location.pathname)
    //     this.showToolbarColorHandler();        
    // }

    render () {
        // console.log('[toolbarcolor]' + this.state.showToolbarColor);
        // let toolbar = null;
        // if (this.state.showToolbarColor === false) {
        //     toolbar = <Toolbar 
        //         bg="NULL"
        //             drawerToggle={this.sideDrawerToggleHandler}
        //             isAuth={this.props.isAuthenticated} />
        // }
        // if (this.state.showToolbarColor === true) {
        //     toolbar = <Toolbar 
        //             bg="#252323"
        //             drawerToggle={this.sideDrawerToggleHandler}
        //             isAuth={this.props.isAuthenticated} />
        // }
        return (
            <Aux>  
                <Toolbar 
                        bg="#252323"
                        drawerToggle={this.sideDrawerToggleHandler}
                        isAuth={this.props.isAuthenticated} />;
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}
                    isAuth={this.props.isAuthenticated} />
                <main className={styles.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);