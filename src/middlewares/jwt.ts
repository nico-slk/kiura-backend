import jwt, { Secret } from 'jsonwebtoken';

export const jwtGenerator = (uid: string) => {

  return new Promise((resolve, reject) => {

    const payload = { uid };
    jwt.sign(payload, process.env.JWT_KEY as Secret, {}, (err, token) => {
      if (!err) {
        resolve(token);
      } else {
        reject('Token generation fail: ' + err);
      }
    });

  });

};
