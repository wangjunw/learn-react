import React, { PureComponent } from 'react';
import { ThemeConsumer } from '../Context';
export default class ConsumerPage extends PureComponent {
    render() {
        return (
            <div>
                <h3>consumer-page</h3>
                <ThemeConsumer>
                    {(ctx) => <div>{ctx.themeColor}</div>}
                </ThemeConsumer>
            </div>
        );
    }
}
