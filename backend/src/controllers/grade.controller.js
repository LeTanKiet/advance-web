import db from '../models/index.js';

const { Grade } = db.models;

class GradeController {
  async getAll(req, res) {
    try {
      const { classId } = req.query;

      const grades = await Grade.findAll({
        where: {
          classId,
        },
        raw: true,
      });
      return res.status(200).json(grades);
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }

  async create(req, res) {
    try {
      const existedGrade = await Grade.findOne({
        where: {
          studentId: req.body.studentId,
        },
      });

      if (existedGrade) {
        return res.status(400).send({ message: 'Student with this id already has grade' });
      }

      const data = await Grade.create(req.body);
      return res.status(201).json(data);
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

      const response = await Grade.update(body, {
        where: { id },
        returning: true,
        raw: true,
      });

      return res.status(200).json(response[1][0]);
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }

  async deleteGrade(req, res) {
    try {
      const {
        params: { id },
      } = req;
      await Grade.destroy({
        where: { id },
      });
      return res.status(200).send({ message: 'Delete successfully' });
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }
}

export default new GradeController();
