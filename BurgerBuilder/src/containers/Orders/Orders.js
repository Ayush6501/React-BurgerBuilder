import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../components/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
import Illustration from '../../components/Order/OrderIllustration';
import styles from './Orders.module.css';

class Orders extends Component {
    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render () {
        let orders = <Spinner />
        const order = <div className={styles.orders}>
                {this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients= {order.ingredients}
                    price={+order.price} />))}
            </div>
    

        if (!this.props.loading) {
            orders = 
                <div className={styles.parent}>
                    <h1 style={{
                            color: '#252323',
                            paddingLeft: '15px',
                            fontWeight: 'bold',
                            fontSize: '4em'
                        }}>My Orders: </h1>
                    <div className={styles.orderparent}>
                        <div className={styles.orderchild}>
                            {order}
                        </div>
                        <div>
                            <Illustration/>
                        </div>
                    </div>
                </div>
        }

        return (
            <div className="">
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));