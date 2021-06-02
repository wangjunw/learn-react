import React, { PureComponent } from 'react';

const hoc = (Com) => (props) => {
    return (
        <div style={{ border: 'solid' }}>
            <Com name={props.name}></Com>
        </div>
    );
};

function Child(props) {
    return <div>child-{props.name}</div>;
}
const HocCom = hoc(Child);

export default class HocPage extends PureComponent {
    render() {
        return (
            <div>
                <h3>hocPage</h3>
                <HocCom name="xiao" />
            </div>
        );
    }
}
