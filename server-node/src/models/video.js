// eslint-disable-next-line import/no-extraneous-dependencies
import ytdl from 'ytdl-core';

export default function (Video) {
  Video.validatesUniquenessOf('videoLink');
  Video.validatesUniquenessOf('videoId');

  Video.shareVideo = async (req, videoLink) => {
    if (!req.accessToken || !req.accessToken.userId) {
      return Promise.reject(new Error('Authorization Required'));
    }
    const UserModel = Video.app.models.user;
    const NotificationModel = Video.app.models.Notification;

    const videoInfo = await ytdl.getBasicInfo(videoLink);

    const {
      title, description, videoId, embed, thumbnails,
    } = videoInfo.videoDetails;

    const newVideo = await Video.create({
      title,
      description,
      videoId,
      embed,
      thumbnails,
      videoLink,
      creatorId: req.accessToken.userId,
    });

    const receivers = await UserModel.find({ where: { id: { neq: req.accessToken.userId } } });

    if (receivers?.length > 0) {
      const arrNotification = receivers.reduce((arr, cur) => {
        arr.push({
          receiverId: cur.id,
          creatorId: req.accessToken.userId,
          videoId: newVideo.id,
        });
        return arr;
      }, []);

      NotificationModel.create(arrNotification);
    }

    return Promise.resolve(newVideo);
  };
}
