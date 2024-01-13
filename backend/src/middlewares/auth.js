import jwt from 'jsonwebtoken';
import { generateNewAccessToken } from '../utils/common.js';
import { ROLES } from '../utils/constants.js';
import db from '../models/index.js';

const { User } = db.models;

export function authentication(req, res, next) {
  const accessToken = req.cookies['access_token'];
  const refreshToken = req.cookies['refresh_token'];

  if (!accessToken) return res.status(401).send({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(accessToken, process.env.AT_SECRET);
    req.context = { userId: decoded.id };

    return next();
  } catch (error) {
    const { accessToken: newAccessToken, userId } = generateNewAccessToken(refreshToken);
    res.cookie('access_token', newAccessToken);
    req.context = { userId };

    if (newAccessToken) {
      return next();
    } else {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  }
}

export async function checkTeacherPermission(req, res, next) {
  const { userId } = req.context;
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (user.role === ROLES.teacher || user.role === ROLES.admin) return next();
  return res.status(403).send({ message: 'Permission denied' });
}

export async function checkAdminPermission(req, res, next) {
  const { userId } = req.context;
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (user.role === ROLES.admin) return next();
  return res.status(403).send({ message: 'Permission denied' });
}
