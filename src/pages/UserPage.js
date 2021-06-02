import React, { useContext } from 'react';
import { ThemeContext } from '../Context';

export default function UserPage() {
    const ctx = useContext(ThemeContext);
    console.log('user', ctx);
    return <div>{ctx.themeColor}</div>;
}
