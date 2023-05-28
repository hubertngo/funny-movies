import utils from 'loopback/lib/utils';
import g from 'loopback/lib/globalize';

const splitPrincipal = (name, realmDelimiter) => {
  const parts = [null, name];

  if (!realmDelimiter) {
    return parts;
  }
  const index = name.indexOf(realmDelimiter);

  if (index !== -1) {
    parts[0] = name.substring(0, index);
    parts[1] = name.substring(index + realmDelimiter.length);
  }
  return parts;
};

const normalizeCredentials = (credentials = {}, realmRequired, realmDelimiter) => {
  const query = {};

  if (!realmRequired) {
    if (credentials.email) {
      query.email = credentials.email;
    } else if (credentials.username) {
      query.username = credentials.username;
    } else if (credentials.phone) {
      query.phone = credentials.phone;
    }
  } else {
    if (credentials.realm) {
      query.realm = credentials.realm;
    }
    let parts;

    if (credentials.email) {
      parts = splitPrincipal(credentials.email, realmDelimiter);
      query.email = parts[1];

      if (parts[0]) {
        query.realm = parts[0];
      }
    } else if (credentials.username) {
      parts = splitPrincipal(credentials.username, realmDelimiter);
      query.username = parts[1];
      if (parts[0]) {
        query.realm = parts[0];
      }
    } else if (credentials.phone) {
      parts = splitPrincipal(credentials.phone, realmDelimiter);
      query.phone = parts[1];
      if (parts[0]) {
        query.realm = parts[0];
      }
    }
  }
  return query;
};

export default function (credentials, fn) {
  const self = this;

  const callback = typeof fn === 'function' ? fn : utils.createPromiseCallback();

  let realmDelimiter;
  // Check if realm is required
  const realmRequired = !!(self.settings.realmRequired || self.settings.realmDelimiter);

  if (realmRequired) {
    realmDelimiter = self.settings.realmDelimiter;
  }

  const query = normalizeCredentials(credentials, realmRequired, realmDelimiter);

  if (realmRequired && !query.realm) {
    const err1 = new Error(g.f('{{realm}} is required'));

    err1.statusCode = 400;
    err1.code = 'REALM_REQUIRED';
    callback(err1);
    return callback.promise;
  }

  if (!query.email && !query.username && !query.phone) {
    const err2 = new Error(g.f('{{username}} or {{email}} or {{phone}} is required'));

    err2.statusCode = 400;
    err2.code = 'USERNAME_EMAIL_PHONE_REQUIRED';
    callback(err2);
    return callback.promise;
  }

  self.findOne({
    where: query,
  }, (err, user) => {
    const defaultError = new Error(g.f('login failed'));

    defaultError.statusCode = 401;
    defaultError.code = 'LOGIN_FAILED';

    // eslint-disable-next-line consistent-return
    const tokenHandler = (errr, token) => {
      if (errr) {
        return callback(errr);
      }
      // if (Array.isArray(include) ? include.indexOf('user') !== -1 : include === 'user') {
      // NOTE(bajtos) We can't set token.user here:
      //  1. token.user already exists, it's a function injected by
      //     "AccessToken belongsTo User" relation
      //  2. ModelBaseClass.toJSON() ignores own properties, thus
      //     the value won't be included in the HTTP response
      // See also loopback#161 and loopback#162
      // token.__data.user = user;
      // }
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      token.__data.user = user;

      callback(errr, token);
    };

    if (err) {
      defaultError.message = `An error is reported from User.findOne: ${err}`;
      callback(defaultError);
    } else if (user) {
      user.hasPassword(credentials.password, (er, isMatch) => {
        if (er) {
          defaultError.message = `An error is reported from User.hasPassword: ${err}`;
          callback(defaultError);
        } else if (isMatch) {
          if (user.status === 'inactive') {
            defaultError.message = 'Account was blocked';
            return callback(defaultError);
          }

          if (self.settings.emailVerificationRequired && !user.emailVerified) {
            // Fail to log in if email verification is not done yet
            // debug('User email has not been verified');
            const returnError = new Error(g.f('login failed as the email has not been verified'));
            returnError.statusCode = 401;
            returnError.code = 'LOGIN_FAILED_EMAIL_NOT_VERIFIED';
            returnError.details = {
              userId: user.id,
            };
            callback(returnError);
          } else if (user.createAccessToken.length === 2) {
            user.createAccessToken(credentials.ttl, tokenHandler);
          } else {
            user.createAccessToken(credentials.ttl, credentials, tokenHandler);
          }
        } else {
          defaultError.message = `The password is invalid for user ${(query.email || query.username || query.phone)}`;
          callback(defaultError);
        }
      });
    } else {
      defaultError.message = `No matching record is found for user ${(query.email || query.username || query.phone)}`;
      callback(defaultError);
    }
  });
  return callback.promise;
}
