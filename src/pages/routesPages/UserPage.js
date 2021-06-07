import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from '../../kreact-router';
export default connect(
    ({ num: user }) => ({
        isLogin: user.isLogin,
    }),
    {
        logout: () => ({ type: 'LOGOUT', payload: false }),
    }
)(function UserPage({ logout }) {
    return (
        <div>
            UserPage
            <button onClick={logout}>推出登录</button>
            {/* <Redirect to="/login" push /> */}
        </div>
    );
});
