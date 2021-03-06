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
    doComplete () {
        this.props.doComplete();
    },
    render () {
        const { data, onPress} = this.props;

        return (
            <View style={{backgroundColor: '#FFFFFF',}}>
                <View style={[styles.rowContainer, { marginVertical: sr.s(this.props.rowHeight) }]}>
                    <Text
                        style={styles.textStyleAnother}>
                        {data.content}
                    </Text>
                    {
                        !this.props.selected?
                            <TouchableOpacity
                                onPress={this.doComplete}
                                style={styles.btnStyle}>
                                <Image
                                    resizeMode='contain'
                                    source={app.img.leader_item_notOver}
                                    style={styles.iconStyle} />
                            </TouchableOpacity>
                        :
                            <TouchableOpacity
                                onPress={this.doComplete}
                                style={styles.btnStyle}>
                                <Image
                                    resizeMode='contain'
                                    source={app.img.leader_item_over}
                                    style={styles.iconStyle} />
                            </TouchableOpacity>
                    }
                </View>
            </View>
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
        width: sr.w-80,
        fontSize: 13,
        color: '#666666',
        marginLeft: 20,
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
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconStyle: {
        width: 18,
        height: 18,
    },
});
