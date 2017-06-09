'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} = ReactNative;

module.exports = React.createClass({
    componentDidMount () {
    },
    doComplete (id) {
        this.props.doComplete(id);
    },
    render () {
        const { data, onPress} = this.props;
        return (
            <TouchableOpacity onPress={onPress.bind(null,data)} style={{backgroundColor: '#FFFFFF',}}>
                <View style={[styles.rowContainer, { marginVertical: sr.s(this.props.rowHeight) }]}>
                    <Text
                        style={styles.textStyleAnother}>
                        {data.content}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    },
});

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 14,
        color: '#2A2A2A',
        fontFamily:'STHeitiSC-Medium',
        width: sr.w - 94,
        marginLeft: 23,
    },
    textStyleOther: {
        fontSize: 14,
        color: '#2A2A2A',
        marginLeft: 23,
        fontFamily:'STHeitiSC-Medium',
        width: sr.w - 56,
    },
    textStyleAnother: {
        fontSize: 13,
        color: '#666666',
        marginLeft: 20,
        width: sr.w-70,
        fontFamily:'STHeitiSC-Medium',
    },
    rowContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
    },
    btnStyle: {
        width: 40,
        height: 22,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconStyle: {
        width: 18,
        height: 18,
    },
    numStyle: {
        fontSize:12,
        width: 50,
        marginLeft: 30,
        color: '#666666',
    },
});
