import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { bindActionCreators, connect } from '../kreact-redux/';

class ReactReduxPage extends Component {
    render() {
        console.log(this.props);
        const { count } = this.props;
        // const { dispatch } = this.props;
        return (
            <div>
                <h3>ReactReduxPage</h3>
                <p>{count}</p>
                {/* <button onClick={() => dispatch({ type: 'ADD' })}>直接调用dispacth</button> */}
                <button onClick={this.props.add}>
                    自定义mapDispatchToProps
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.count,
    };
};
// mapDispatchToProps可以是对象或者函数
// 1. 如果是对象，则每个方法都是一个新的函数，dispatch会执行新函数得返回值，如下
// const mapDispatchToProps = {
//     add: () => ({ type: 'ADD' }),
// };
// 2. 如果是函数，则函数接收dispatch为第一个参数，并返回一个对象，对象中得每个方法需要手动调用dispatch
// 如果有第二个参数，则参数为该组件自有得props，每次props更新，mapDispatchToProps也会执行
const mapDispatchToProps = (dispatch) => {
    let creators = {
        add: () => ({ type: 'ADD' }),
    };
    // 对creators中每个函数添加一层dispatch
    creators = bindActionCreators(creators, dispatch);
    return {
        ...creators,
    };
};
// 3. mapDispatchToProps如果传null，则props里会自动注入dispatch函数
export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxPage);
