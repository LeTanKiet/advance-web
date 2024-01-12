import { Op } from 'sequelize';
import db from '../models/index.js';

const { Class, ClassUser } = db.models;

class ClassController {
  async create(req, res) {
    try {
      const {
        body: { title, description },
        context: { userId },
      } = req;

      const data = await Class.create({
        title,
        description,
        owner: userId,
      });

      await ClassUser.create({
        classId: data.id,
        userId,
      });

      return res.status(200).json(data);
    } catch (error) {
      console.log('🚀 ~ file: class.controller.js:27 ~ ClassController ~ create ~ error:', error);
      return res.status(500).send({ message: 'Create class fail!' });
    }
  }

  async getAll(req, res) {
    try {
      const {
        context: { userId },
      } = req;

      let classes = [];
      // Improve this code by using include
      const classUsers = await ClassUser.findAll({
        where: { userId },
        attributes: { exclude: ['id'] },
      });
      classes = await Class.findAll({
        where: {
          id: {
            [Op.or]: classUsers.map((d) => d.classId).concat(0),
          },
        },
        raw: true,
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

      const response = await Class.update(body, {
        where: { id },
        returning: true,
        raw: true,
      });

      return res.status(200).json(response[1][0]);
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }

  async deleteClass(req, res) {
    try {
      const {
        params: { id },
      } = req;

      const number = await Class.destroy({
        where: { id },
      });

      if (number === 0) {
        return res.status(404).send({ message: 'Class not found' });
      }

      return res.status(200).send({ message: 'Successfully' });
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }

  async joinClass(req, res) {
    try {
      const {
        body: { link },
        context: { userId },
      } = req;

      const classId = Number(link.slice(link.lastIndexOf('/') + 1));

      const isJoined = await ClassUser.findOne({
        where: {
          classId,
          userId,
        },
      });
      if (!isJoined) {
        await ClassUser.create({
          userId,
          classId,
        });
      }

      const result = await Class.findByPk(classId);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }
}

export default new ClassController();
