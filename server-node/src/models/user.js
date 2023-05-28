import login from 'src/services/login';

export default function (User) {
  User.validatesUniquenessOf('phone');
  User.validatesUniquenessOf('email');

  // User.disableRemoteMethod('create', true);
  User.disableRemoteMethodByName('deleteById', true);
  User.disableRemoteMethodByName('__delete__accessTokens', true);
  User.disableRemoteMethodByName('__create__accessTokens', true);
  User.disableRemoteMethodByName('__destroyById__accessTokens', true);

  // eslint-disable-next-line no-param-reassign
  User.login = login;

  User.checkIn = async (req) => {
    if (!req.accessToken || !req.accessToken.userId) {
      return Promise.reject(new Error('Authorization Required'));
    }
    try {
      const userId = req.accessToken.userId;
      const user = await User.findById(userId, {});
      if (user) {
        await user.updateAttributes({ lastCheckIn: new Date() });
        return Promise.resolve(user.toJSON());
      }
      return Promise.reject();
    } catch (err) {
      return Promise.reject(err);
    }
  };
}
