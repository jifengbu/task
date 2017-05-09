import { FeedbackModel } from '../../../../models';

export default async ({ userId, content, email }) => {
    const feedback = new FeedbackModel({ clientId: userId, content, email });
    await feedback.save();
    return { success: true };
};
