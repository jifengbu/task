import { TaskModel, ClientModel, MediaModel } from '../../../../models';
import { getMediaId, testPhone } from '../../../../utils';

export default async ({
    userId,
    executorId,
    title,
    content,
    audioList,
    imageList,
    type,
    startTime,
    endTime,
}) => {
    let _audioList = [];
    if (audioList) {
        _audioList = audioList.map((item) => { item.img = getMediaId(item.img); return item; });
    }
    let _imageList= [];
    if (imageList) {
        _imageList = audioList.map((item) => { item.img = getMediaId(item.img); return item; });
    }
    const doc = new TaskModel({
        publisherId: userId,
        executorId,
        title,
        content,
        audioList: _audioList,
        imageList: _imageList,
        type,
        startTime,
        endTime,
    });
    await doc.save();
    MediaModel._updateRef(
        ..._audioList.map((item) => ({ [item]: 1 })),
        ..._imageList.map((item) => ({ [item]: 1 })),
    );
    return { success: true, context: doc };
};
