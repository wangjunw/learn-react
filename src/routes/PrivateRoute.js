import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default connect(({ num: user }) => {
    return {
        isLogin: user.isLogin,
    };
})(function PrivateRoute({ isLogin, component: Component, ...restProps }) {
    console.log(isLogin);
    return (
        <Route
            {...restProps}
            render={(props) =>
                isLogin ? (
                    <Component {...restProps} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location.pathname },
                        }}
                    />
                )
            }
        />
    );
});
