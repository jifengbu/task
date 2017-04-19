import React, { Component } from 'react';
import {
    Text,
    Linking,
    TextInput,
    TouchableOpacity,
} from 'react-native';
class TouchableCall extends Component {
    protoTypes:{
        url:React.ProtoTypes.string
    }
    render () {
        return (
            <TouchableOpacity onPress={() => {
                Linking.canOpenURL(this.props.url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + this.props.url);
                    } else {
                        return Linking.openURL(this.props.url);
                    }
                }).catch(err => console.error('An error occurred', err));
            }}>
                <Text>{this.props.url}</Text>
            </TouchableOpacity>

        );
    }
}
module.exports = TouchableCall;
