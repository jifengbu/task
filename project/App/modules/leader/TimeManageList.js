'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    ListView,
    View,
    TouchableOpacity,
} = ReactNative;

const TaskSupervision = require('./TaskSupervision.js');
const RecordItemView = require('./RecordItemView.js');
const InputBoxAlert = require('./InputBoxAlert.js');

module.exports = React.createClass({
    getInitialState () {
        this.timeList = [{
                'time':'12:00',
                'content':'你想要。。。。。吃饭吗。。',
                'isOver': 0,
        },{
                'time':'12:00',
                'content':'你想要。。。。。吃饭吗。。你想要。。。。。吃饭吗。。',
                'isOver': 1,
        },];
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            dataSource: this.ds.cloneWithRows(this.timeList),
        };
    },
    doComplete() {
        console.log('-------');
    },
    doDelete() {

    },
    doSave(context) {
        console.log('=context==',context);
    },
    setAlert() {
    },
    doUpdate() {
        app.showModal(
            <InputBoxAlert doDelete={this.doDelete} doConfirm={this.doSave} setAlert={this.setAlert}/>
        );
    },
    addTimeItem() {
        app.showModal(
            <InputBoxAlert doDelete={this.doDelete} doConfirm={this.doSave} setAlert={this.setAlert}/>
        );
    },
    renderSeparator (sectionID, rowID) {
        return (
            <View
                style={styles.separator}
                key={rowID} />
        );
    },
    renderRow (obj, sectionID, rowID) {
        return (
            <RecordItemView
                rowHeight={8}
                data={obj}
                onPress={this.doUpdate}
                doComplete={this.doComplete}
                />
        );
    },
    render () {
        const {dataSource} = this.state;
        return (
            <View style={styles.container}>
                <ListView
                    ref={listView => { this.listView = listView; }}
                    initialListSize={1}
                    removeClippedSubviews={false}
                    enableEmptySections
                    onEndReached={this.onEndReached}
                    style={styles.listStyle}
                    dataSource={dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    renderFooter={this.renderFooter}
                    />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={this.addTimeItem}
                        style={styles.buttonStyle}>
                        <Image
                            resizeMode='stretch'
                            source={app.img.leader_item_add}
                            style={styles.buttonImageStyle} />
                        <Text style={styles.buttonTextStyle}>
                            新增
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    buttonContainer: {
        marginVertical: 5,
    },
    buttonTextStyle: {
        fontSize: 14,
        color: '#f46136',
    },
    buttonStyle: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonImageStyle: {
        marginRight: 12,
        width: 13,
        height: 13,
    },
    listStyle: {
        alignSelf:'stretch',
        backgroundColor: '#FFFFFF',
        // height: sr.h -150,
    },
    separator: {
        height: 1,
        width: sr.w - 40,
        alignSelf: 'center',
        backgroundColor: '#d4d4d4',
    },
    icon: {
        position: 'absolute',
        right: 2,
        top: 2,
        width: 32,
        height: 33,
    },
});
