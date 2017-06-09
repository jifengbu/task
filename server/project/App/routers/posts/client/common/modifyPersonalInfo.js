import { ClientModel, MediaModel } from '../../../../models';
import { getMediaId, omitNil } from '../../../../utils';
import moment from 'moment';

const YEAR_TIME = 31536000000;

export default async ({
    userId,
    userName,
    sex,
    userHead,
    birthday,
    position,
}) => {
    let _userHead = getMediaId(userHead);
    let age = birthday ? Math.floor(moment().diff(moment(birthday)) / YEAR_TIME) : undefined;
    const doc = await ClientModel.findByIdAndUpdate(userId, omitNil({
        name: userName,
        sex,
        head: _userHead,
        post:position,
    }));
    if (!doc) {
        return { success: false, msg: '修改失败' };
    }
    if (_userHead) {
        MediaModel._updateRef(
            { [_userHead]: 1 },
            { [doc.head]: -1 }
        );
    }
    return { success: true };
};
