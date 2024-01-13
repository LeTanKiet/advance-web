import { Op } from 'sequelize';
import db from '../models/index.js';

const { User, ClassUser } = db.models;

class UserController {
  async getAll(req, res) {
    try {
      const { classId } = req.query;

      let users = [];
      if (classId) {
        const classUsers = await ClassUser.findAll({
          where: { classId },
          attributes: { exclude: ['id'] },
        });
        users = await User.findAll({
          where: {
            id: {
              [Op.or]: classUsers.map((d) => d.userId).concat(0),
            },
          },
        });
      } else {
        users = await User.findAll({
          order: [['id', 'DESC']],
        });
      }

      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }

  async getById(req, res) {
    try {
      const {
        params: { id },
      } = req;

      const user = await User.findByPk(id);

      return res.status(200).send({ message: 'Successfully' });
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }

  async update(req, res) {
    try {
      const {
        params: { id },
        body,
      } = req;

      const response = await User.update(body, {
        where: { id },
        returning: true,
        raw: true,
      });

      return res.status(200).json(response[1][0]);
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }

  async deleteUser(req, res) {
    try {
      const {
        params: { id },
      } = req;

      const number = await User.destroy({
        where: { id },
      });

      if (number === 0) {
        return res.status(404).send({ message: 'User not found' });
      }

      return res.status(200).send({ message: 'Successfully' });
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }
}

export default new UserController();
