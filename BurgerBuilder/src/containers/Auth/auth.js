import React, {Component} from 'react';
import Input from '../../UI/Input/Input';
import Button  from '../../UI/Button/Button';
import styles from '../Auth/auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {checkValidity} from '../../shared/validation';
import background from '../../assets/images/Login_bg.png';
import {NavLink} from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email-Id',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount () {
        if (!this.props.buildingBurger && this.props.authRedirect !== '/') {
            this.onSetAuthRedirect();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls })
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }
    
    switchAuthModeHandler = () => {
        this.setState(prevstate => {
            return {isSignUp: !prevstate.isSignUp}
        })
    };

    render () {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementArray.map(formElement => (
            <div>
                <label for={formElement.id} className={styles.Tag}>{formElement.id}</label>
                <Input 
                    key={formElement.id}
                    id={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                    // invalid={!this.state.orderForm[formElement.id].valid} 
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched} />
            </div>
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p className={styles.error}>{this.props.error.message}</p>
            );
        }

        let authRedirect = null
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirect} />
        }

        return (
            <div className={styles.Auth} style={{ backgroundImage: `url(${background})` }}>
                <div className={styles.Authform}>
                    {authRedirect}
                    {errorMessage}
                    <br></br>
                    {this.state.isSignUp ? <span className={styles.Signup}>SIGN UP</span> : <span className={styles.Signup}>SIGN IN</span>}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        {/* <Button btnType="Success">SUBMIT</Button> */}
                        <button type="submit" className={styles.Button}>SUBMIT</button>
                    </form>
                    <Button 
                        clicked={this.switchAuthModeHandler} 
                        btnType="Danger">
                            <span className={styles.Switch}>Switch to </span> 
                            {this.state.isSignUp 
                                ? <span className={styles.Switchto}>Sign In</span> 
                                : <span className={styles.Switchto}>Sign Up</span>}
                    </Button>
                    <br>
                    </br>
                    <NavLink to="/">
                        <span className={styles.Switch}>Back to </span>
                        <span className={styles.Switchto}>Home</span>
                    </NavLink>                    
                </div>
            </div>
        ); 
    };
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirect: () => dispatch(actions.authRedirectPath('/'))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));