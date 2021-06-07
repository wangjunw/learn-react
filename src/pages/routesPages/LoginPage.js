import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

export default connect(
    ({ num: user }) => ({
        isLogin: user.isLogin,
    }),
    {
        login: () => ({ type: 'LOGIN', payload: true }),
    }
)(function LoginPage(props) {
    const { isLogin, location, login } = props;
    if (isLogin) {
        // 考虑没有被PrivateRoute包裹的组件，默认跳首页
        const { from = '/' } = location.state || {};
        return <Redirect to={from} />;
    }
    return (
        <div>
            <p>LoginPage</p>
            <button onClick={login}>登录</button>
        </div>
    );
});
