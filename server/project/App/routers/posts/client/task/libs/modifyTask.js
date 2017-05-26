import { TaskModel, MediaModel } from '../../../../../models';
import { getMediaId, omitNil } from '../../../../../utils';

export default async ({
    taskId,
    executorId,
    supervisorId,
    title,
    content,
    audioList,
    imageList,
    remindList,
    type,
    expectStartTime,
    expectFinishTime,
    modifyTime,
}) => {
    let _audioList = [];
    if (audioList) {
        _audioList = audioList.map((item) => { item.url = getMediaId(item.url); return item; });
    }
    let _imageList = [];
    if (imageList) {
        _imageList = imageList.map((item) => { return getMediaId(item); });
    }
    const doc = await TaskModel.findByIdAndUpdate(taskId, omitNil({
        executorId,
        supervisorId,
        title,
        content,
        audioList: _audioList,
        imageList: _imageList,
        remindList,
        type,
        expectStartTime,
        expectFinishTime,
        modifyTime,
    }));
    if (doc) {
        MediaModel._updateRef(
            ...(audioList ? _audioList : []).map((item) => ({ [item.url]: 1 })),
            ...(audioList ? doc.audioList : []).map((item) => ({ [item.url]: -1 })),
            ...(imageList ? _imageList : []).map((item) => ({ [item]: 1 })),
            ...(imageList ? doc.imageList : []).map((item) => ({ [item]: -1 })),
        );
    }
    return doc;
};
