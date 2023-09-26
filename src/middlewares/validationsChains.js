import { body, param } from "express-validator";

export const emailValidation = () => body("email").trim().notEmpty().withMessage('email is empty').isEmail().withMessage('email is invalid')

export const passwordValidation = () => body("password").trim().notEmpty().withMessage('password is empty')

export const longLinkValidation = () => body("longLink").trim().notEmpty().withMessage('longLink is empty').isURL().withMessage('longLink is not a valid URL')

export const idValidation = () => param("id").trim().notEmpty().withMessage('id is empty').isMongoId().withMessage('id is an invalid mongoId')