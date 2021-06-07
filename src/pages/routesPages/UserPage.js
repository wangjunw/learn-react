import React from 'react';
import { Redirect } from '../../kreact-router';
export default function UserPage() {
    return (
        <div>
            UserPage <Redirect to="/login" push />
        </div>
    );
}
