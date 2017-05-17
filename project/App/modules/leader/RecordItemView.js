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
            <TouchableOpacity style={{backgroundColor: '#FFFFFF',}} onPress={onPress}>
                <View style={[styles.rowContainer, { marginVertical: sr.s(this.props.rowHeight) }]}>
                    <Text
                        numberOfLines={1}
                        style={styles.numStyle}>
                        {data.time}
                    </Text>
                    <Text
                        style={styles.textStyleAnother}>
                        {data.content}
                    </Text>
                    {
                        this.props.data.isOver === 0 ?
                            <TouchableOpacity
                                onPress={this.doComplete}
                                style={styles.btnStyle}>
                                <Image
                                    resizeMode='contain'
                                    source={app.img.leader_item_notOver}
                                    style={styles.iconStyle} />
                            </TouchableOpacity>
                        :
                            <View
                                style={styles.btnStyle}>
                                <Image
                                    resizeMode='contain'
                                    source={app.img.leader_item_over}
                                    style={styles.iconStyle} />
                            </View>
                    }
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
        fontSize: 12,
        color: '#666666',
        fontFamily:'STHeitiSC-Medium',
        width: sr.w - 150,
    },
    rowContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
    },
    btnStyle: {
        width: 40,
        height: 22,
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
