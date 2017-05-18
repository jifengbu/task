import omitBy from 'lodash/omitBy';
import forEach from 'lodash/forEach';
import removeConnector from '../actions/remove-connector';

export default {
    list: {},
    redirectPathnameList: {},
    update (location, data, connectorId, store, pathname) {
        if (pathname) {
            this.redirectPathnameList[location] = pathname;
            location = pathname;
        }
        if (data) {
            if (this.list[location]) {
                Object.assign(this.list[location].data, data);
            } else {
                let obj = { connectorId, store, hasKeepData: true };
                if (typeof data === 'object') {
                    obj.data = data;
                }
                this.list[location] = obj;
            }
        } else if (this.list[location]) {
            delete this.list[location];
        }
    },
    get (location, props) {
        location = this.redirectPathnameList[location] || location;
        let obj = this.list[location] || {};
        if (!props.keepLastKeepData) {
            forEach(this.list, (o, key) => {
                if (key !== location) {
                    o.store.dispatch(removeConnector(o.connectorId));
                }
            });
        }
        return obj;
    },
    getHasKeepData (location) {
        location = this.redirectPathnameList[location] || location;
        return (this.list[location] || {}).hasKeepData;
    },
    getKeepData (location) {
        location = this.redirectPathnameList[location] || location;
        return (this.list[location] || {}).data;
    },
    removeConnectorId (connectorId) {
        this.list = omitBy(this.list, (o) => o.connectorId === connectorId);
    },
};
