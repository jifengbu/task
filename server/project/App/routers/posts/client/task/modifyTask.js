import { TaskModel, MediaModel } from '../../../../models';
import { getMediaId, omitNil } from '../../../../utils';

export default async ({
    userId,
    taskId,
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
        _audioList = audioList.map((item) => { return getMediaId(item) });
    }
    let _imageList= [];
    if (imageList) {
        _imageList = audioList.map((item) => { return getMediaId(item) });
    }
    const doc = await TaskModel.findByIdAndUpdate(taskId, omitNil({
        executorId,
        title,
        content,
        audioList: _audioList,
        imageList: _imageList,
        type,
        startTime,
        endTime,
    }), { new: true }).select({
        executorId: 1,
        title: 1,
        content: 1,
        audioList: 1,
        imageList: 1,
        type: 1,
        startTime: 1,
        endTime: 1,
    }).populate({
        path: 'executorId',
        select: { name: 1, phone: 1 },
    });
    if (!doc) {
        return { success: false, msg: '修改失败' };
    }
    MediaModel._updateRef(
        ...(audioList ? _audioList : []).map((item) => ({ [item]: 1 })),
        ...(audioList ? doc.audioList : []).map((item) => ({ [item]: -1 })),
        ...(imageList ? _imageList : []).map((item) => ({ [item]: 1 })),
        ...(imageList ? doc.imageList : []).map((item) => ({ [item]: -1 })),
    );
    return { success: true, context: doc  };
};
