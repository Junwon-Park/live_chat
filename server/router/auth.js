import express from 'express';
import { body, header } from 'express-validator';
import { validate } from '../middleware/validator.js';
// 에러를 처리하는 로직의 재사용성을 위해 모듈화 했다.

const router = express.Router();

const loginValidate = [
  body('userId')
    .isEmpty()
    .withMessage(`ID를 입력하세요!`)
    .trim()
    .isLength({ min: 4, max: 10 })
    .withMessage(`4 ~ 10자 사이로 입력해주세요!`),
  body('password')
    .isEmpty()
    .withMessage(`비밀번호를 입력하세요!`)
    .trim()
    .isLength({ min: 6, max: 8 })
    .withMessage(`6 ~ 12자 사이로 입력해주세요!`),
  validate
];

const signupValidate = [
  ...loginValidate,
  body('userName').notEmpty().withMessage(`이름을 필수에요!`),
  body('email')
    .notEmpty()
    .withMessage(`email은 필수에요!`)
    .isEmail()
    .withMessage('email을 다시 한 번 확인하세요!')
    .normalizeEmail(),
  body(`picure`).optional({ nullable: true, checkFalsy: true }),
  // 이 필드는 null이거나 falsy 값일 때(비어 있을 때)에도 허용한다.
  validate
];

const checkTokenValidate = [
  header('token').isEmpty().withMessage(`인증할 토큰이 필요해요!`),
  validate
];

router.post('/signup', signupValidate, () => {});
router.post('/login', loginValidate, () => {});
router.post('/checktoken', checkTokenValidate, () => {});

export default router;