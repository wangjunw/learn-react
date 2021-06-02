import React, { PureComponent } from 'react';
import { ThemeProvider } from '../Context';
import HomePage from './HomePage';
import ConsumerPage from './ConsumerPage';
export default class ContextPage extends PureComponent {
    constructor() {
        super();
        this.state = {
            theme: {
                themeColor: 'red',
            },
        };
    }
    static getDerivedStateFromProps() {}
    getSnapshotBeforeUpdate() {}
    render() {
        const { theme } = this.state;
        return (
            <div>
                <ThemeProvider>
                    <HomePage></HomePage>
                    {/* <ConsumerPage></ConsumerPage> */}
                </ThemeProvider>
            </div>
        );
    }
}
