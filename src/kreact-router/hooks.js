import React, { useContext } from 'react';
import { RouterContext } from './Context';

const useHistory = () => {
    return useContext(RouterContext).history;
};
const useLocation = () => {
    return useContext(RouterContext).location;
};
const useParams = () => {
    const match = useContext(RouterContext).match;
    return match ? match.params : {};
};
const useRouteMatch = () => {
    return useContext(RouterContext).match;
};
export { useParams, useRouteMatch, useHistory, useLocation };
