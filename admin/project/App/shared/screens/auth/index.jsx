import React, { PropTypes } from 'react';

export default class Auth extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
