import db from '../models/index.js';

const { Grade } = db.models;

class GradeController {
  async getAll(req, res) {
    try {
      const { classId, studentId } = req.query;

      let grades = [];
      if (studentId) {
        grades = grades = await Grade.findAll({
          where: {
            classId,
            studentId,
            isMarked: true,
          },
          raw: true,
          order: [['id', 'ASC']],
        });
      } else {
        grades = await Grade.findAll({
          where: {
            classId,
          },
          raw: true,
          order: [['id', 'ASC']],
        });
      }

      return res.status(200).json(grades);
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }

  async create(req, res) {
    try {
      const data = await Grade.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }

  async updateScore(req, res) {
    try {
      const {
        params: { studentId },
        body,
      } = req;

      const existedGrade = await Grade.findOne({
        where: {
          studentId,
          gradeName: body.gradeName,
        },
      });

      if (existedGrade) {
        await Grade.update(
          {
            score: body[body.gradeName],
          },
          {
            where: { studentId, gradeName: body.gradeName },
            returning: true,
            raw: true,
          },
        );
      } else {
        await Grade.create({
          studentId,
          gradeName: body.gradeName,
          classId: body.classId,
          needReview: body.needReview,
          isMarked: body.isMarked,
          scale: body.scale,
          score: body[body.gradeName],
          fullname: body.fullname,
        });
      }

      return res.status(200).send({ message: 'Success' });
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

      await Grade.update(body, {
        where: {
          gradeName: body.gradeName,
        },
      });

      return res.status(200).send({ message: 'Success' });
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }

  async deleteGrade(req, res) {
    try {
      const {
        query: { studentId, gradeName },
      } = req;

      console.log('🚀 ~ GradeController ~ deleteGrade ~ studentId:', studentId, gradeName);
      if (studentId) {
        await Grade.destroy({
          where: { studentId },
        });
      } else {
        await Grade.destroy({
          where: { gradeName },
        });
      }

      return res.status(200).send({ message: 'Delete successfully' });
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }

  async review(req, res) {
    try {
      const {
        params: { id },
      } = req;

      const response = await Grade.update(
        {
          needReview: true,
        },
        {
          where: { studentId: id },
          returning: true,
          raw: true,
        },
      );

      return res.status(200).json(response[1][0]);
    } catch (error) {
      return res.status(500).send({ message: error.message || 'Internal server error' });
    }
  }
}

export default new GradeController();
