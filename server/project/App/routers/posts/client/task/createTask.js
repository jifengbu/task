import { TaskModel, MediaModel } from '../../../../models';
import { getMediaId } from '../../../../utils';

export default async ({
    publisherId,
    examinerId,
    executorId,
    supervisorId,
    title,
    content,
    audioList,
    imageList,
    remindList,
    type,
    needStartTime,
    needEndTime,
}) => {
    let _audioList = [];
    if (audioList) {
        _audioList = audioList.map((item) => { item.url = getMediaId(item.url); return item; });
    }
    let _imageList= [];
    if (imageList) {
        _imageList = imageList.map((item) => { return getMediaId(item) });
    }

    const doc = new TaskModel({
        publisherId,
        examinerId,
        executorId,
        supervisorId,
        title,
        content,
        audioList: _audioList,
        imageList: _imageList,
        remindList,
        type,
        needStartTime,
        needEndTime,
    });
    await doc.save();
    MediaModel._updateRef(
        ..._audioList.map((item) => ({ [item.url]: 1 })),
        ..._imageList.map((item) => ({ [item]: 1 })),
    );
    return  doc.id;
};
