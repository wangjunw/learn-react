import React from 'react';
import { Component } from 'react';
// import {
//     BrowserRouter as Router,
//     Route,
//     Link,
//     Switch,
//     useParams,
//     useRouteMatch,
//     useHistory,
//     useLocation,
//     withRouter,
// } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useParams,
    useRouteMatch,
    useHistory,
    useLocation,
    withRouter,
    Prompt,
} from '../kreact-router';

import HomePage from './routesPages/HomePage';
import LoginPage from './routesPages/LoginPage';
import UserPage from './routesPages/UserPage';
import _404Page from './routesPages/_404Page';

/**
 *
 * Switch 按顺序匹配到一个就不在匹配了
 * exact  精准匹配
 *
 */
export default function ReactRouterPage() {
    return (
        <div>
            <Router>
                <Link to="/">首页</Link>
                <Link to="/user">用户中心</Link>
                <Link to="/login">登录</Link>
                <Link to="/product/123">商品</Link>
                <Switch>
                    <Route exact path="/" component={HomePage}></Route>
                    <Route path="/user" component={UserPage}></Route>
                    <Route path="/login" component={LoginPage}></Route>
                    {/* <Route path="/product/:id" component={Product}></Route> */}
                    <Route
                        path="/product/:id"
                        render={() => <Product />}
                    ></Route>
                    <Route component={_404Page}></Route>
                </Switch>
            </Router>
        </div>
    );
}

// function Product(props) {
//     // let { match } = props;
//     // let { url, params } = match;
//     // hooks
//     const match = useRouteMatch();
//     const params = useParams();
//     const location = useLocation();
//     const history = useHistory();
//     let { url } = match;
//     let { id } = params;
//     return (
//         <div>
//             <p>商品:{id}</p>
//             <Link to={url + '/detail'}>详情</Link>
//             <Route path={url + '/detail'} component={Detail}></Route>
//         </div>
//     );
// }

class _Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm: true,
        };
    }
    render() {
        const { id } = this.props.match.params;
        return (
            <div>
                <p>商品:{id}</p>
                <button
                    onClick={() => {
                        this.setState({
                            confirm: !this.state.confirm,
                        });
                    }}
                >
                    按钮
                </button>
                <Link to="/">回家</Link>
                <Prompt
                    when={this.state.confirm}
                    message="确定离开吗？"
                ></Prompt>
            </div>
        );
    }
}
// withRouter将router的数据添加到props中
const Product = withRouter(_Product);

function Detail({ match }) {
    return (
        <div>
            <h3>detail</h3>
        </div>
    );
}
