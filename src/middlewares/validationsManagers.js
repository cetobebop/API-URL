import { emailValidation, idValidation, longLinkValidation, passwordValidation } from "./validationsChains.js";
import verifyErrors from "./verifyErrors.js";

export const loginValidations = [emailValidation(), passwordValidation(), verifyErrors];

export const registerValidations = [emailValidation(), passwordValidation(), verifyErrors]

export const createLinkValidations = [longLinkValidation(), verifyErrors]

export const getLinkValidations = [idValidation(), verifyErrors]

export const updateLinkValidations = [idValidation(), longLinkValidation(), verifyErrors]