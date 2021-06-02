import React, { PureComponent } from 'react';
import { ThemeContext } from '../Context';
import UserPage from './UserPage';
export default class HomePage extends PureComponent {
    // 只能接受单一context
    static contextType = ThemeContext;
    render() {
        console.log(this);
        return (
            <div>
                <h3>2222</h3>
                {/* <UserPage></UserPage> */}
            </div>
        );
    }
}
