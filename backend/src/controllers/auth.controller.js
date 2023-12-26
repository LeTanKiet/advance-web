import bcrypt from 'bcrypt';
import { ROLES, SALT_ROUNDS } from '../utils/constants.js';
import { clearCookies, createToken, generatePIN, setCookies } from '../utils/common.js';
import db from '../models/index.js';
import { transporter } from '../hooks/useNodeMailer.js';

const { User } = db.models;

class AuthController {
  async signUp(req, res) {
    try {
      const { email, password, role } = req.body;

      const existedUser = await User.findOne({ where: { email }, raw: true });
      if (existedUser) {
        return res.status(400).send({ message: 'User existed' });
      }

      const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        role,
      });

      const tokens = createToken(newUser);
      setCookies(res, tokens);

      const pin = generatePIN();
      await transporter.sendMail({
        from: 'kietletest.dev@gmail.com',
        to: email,
        subject: 'Confirm your authentication',
        html: `
        <h3>Your pin: ${pin}</h3>
        `,
      });

      return res.status(201).json({ ...newUser.dataValues, pin: pin });
    } catch (error) {
      console.error('error: ', error);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const existedUser = await User.findOne({ where: { email }, raw: true });

      if (!existedUser) {
        return res.status(401).send({ message: 'User not found' });
      }

      if (!bcrypt.compareSync(password, existedUser.password)) {
        return res.status(401).send({ message: 'Password is incorrect!' });
      }

      const tokens = createToken(existedUser);
      setCookies(res, tokens);

      return res.status(200).json(existedUser);
    } catch (error) {
      console.error('error: ', error);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  async loginGoogle(req, res) {
    const profile = req.profile;
    const name = profile.displayName;
    const email = profile.emails[0].value;
    const avatar = profile.photos[0].value;
    const role = ROLES.student;

    const existedUser = await User.findOne({ where: { email }, raw: true });
    if (existedUser) {
      const tokens = createToken(existedUser);
      setCookies(res, tokens);
      return res.redirect(`${process.env.CLIENT_URL}`);
    }

    const newUser = await User.create({
      email,
      name,
      avatar,
      role,
    });

    const tokens = createToken(newUser);
    setCookies(res, tokens);

    return res.redirect(`${process.env.CLIENT_URL}create-profile`);
  }

  async loginFacebook(req, res) {
    const profile = req.profile;
    const role = ROLES.student;
    const name = profile.displayName;
    const email = profile.emails[0].value;
    const avatar = profile.photos[0].value;

    const existedUser = await User.findOne({ where: { email }, raw: true });
    if (existedUser) {
      const tokens = createToken(existedUser);
      setCookies(res, tokens);
      return res.redirect(`${process.env.CLIENT_URL}`);
    }

    const newUser = await User.create({
      email,
      name,
      avatar,
      role,
    });

    const tokens = createToken(newUser);
    setCookies(res, tokens);

    return res.redirect(`${process.env.CLIENT_URL}create-profile`);
  }

  async logout(req, res) {
    clearCookies(res);
    return res.status(200).send({ message: 'Success' });
  }

  async getMe(req, res) {
    try {
      const { userId } = req.context;
      const user = await User.findOne({
        where: { id: userId },
        raw: true,
      });

      return res.status(200).json(user);
    } catch (error) {
      console.error('error: ', error);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  async refresh(req, res) {
    try {
      const { userId } = req.context;

      const user = await User.findOne({
        where: { id: userId },
        raw: true,
      });
      const tokens = createToken(user);

      return res.status(200).json(tokens);
    } catch (error) {
      console.error('error: ', error);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  async updateProfile(req, res) {
    const { userId } = req.context;

    const user = await User.findOne({
      where: { id: userId },
    });
    if (req.body.password) {
      const hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
      user.update({ password: hashedPassword });
    } else {
      user.update(req.body);
    }

    return res.send({ message: 'Success' });
  }
}

export default new AuthController();
