import db from '../models/index.js';

const { Notification } = db.models;

class NotificationController {
  async getAll(req, res) {
    try {
      const {
        query: { studentId, classId },
      } = req;

      const data = await Notification.findAll({
        where: {
          studentId,
          classId,
        },
        raw: true,
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }
}

export default new NotificationController();
