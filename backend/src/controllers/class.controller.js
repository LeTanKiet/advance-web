import { Op } from 'sequelize';
import db from '../models/index.js';

const { Class, ClassUser, User } = db.models;

class ClassController {
  async create(req, res) {
    try {
      const { title, description } = req.body;

      const data = await Class.create({
        title,
        description,
      });

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).send({ message: 'Create class fail!' });
    }
  }

  async getAll(req, res) {
    try {
      const { userId } = req.query;

      // Improve this code by using include
      const classUsers = await ClassUser.findAll({
        where: { userId },
        attributes: { exclude: ['id'] },
      });
      const classes = await Class.findAll({
        where: {
          id: {
            [Op.or]: classUsers.map((d) => d.classId),
          },
        },
      });

      return res.status(200).send(classes);
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

      await Class.update(body, {
        where: { id },
      });

      return res.status(200).send({ message: 'Successfully' });
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }

  async deleteClass(req, res) {
    try {
      const {
        params: { id },
      } = req;

      await Class.destroy({
        where: { id },
      });

      return res.status(200).send({ message: 'Successfully' });
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }
}

export default new ClassController();
