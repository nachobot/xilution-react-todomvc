import Joi from 'joi';
import Chance from 'chance';

import {
    registerUserRequestSchema,
    verifyUserRequestSchema,
    authenticateRequestSchema,
    putTodoRequestSchema,
    getTodoRequestSchema,
    deleteTodoRequestSchema,
    fetchTodosRequestSchema
} from '../../../src/backend/schemas';

const chance = new Chance();

const notObjects = [null, undefined, {}, [], '', chance.string(), chance.natural(), chance.bool()];

const buildInvalidBoolean = () => chance.pickone([null, undefined, {}, [], '', chance.string(), chance.natural()]);

const buildInvalidString = () => chance.pickone([null, undefined, {}, [], '', chance.natural(), chance.bool()]);

const buildInvalidEmail = () => chance.pickone([null, undefined, {}, [], '', chance.string(), chance.natural(), chance.bool()]);

describe('schemas tests', () => {
    describe('when validating register user requests', () => {
        test('when the request is invalid, the result should include a validation error', () => {
            const acutualValidationResult = Joi.validate({
                body: chance.pickone([...notObjects, {
                    email: buildInvalidEmail(),
                    firstName: buildInvalidString(),
                    lastName: buildInvalidString(),
                    password: buildInvalidString(),
                    username: buildInvalidString()
                }])
            }, registerUserRequestSchema);

            expect(acutualValidationResult.error).toBeTruthy();
        });

        test('when the request is valid, the result should not include a validation error', () => {
            const acutualValidationResult = Joi.validate({
                body: {
                    email: chance.email(),
                    firstName: chance.first(),
                    lastName: chance.last(),
                    password: chance.string(),
                    username: chance.string()
                }
            }, registerUserRequestSchema);

            expect(acutualValidationResult.error).toBeFalsy();
        });
    });

    describe('when validating verify user requests', () => {
        test('when the request is invalid, the result should include a validation error', () => {
            const acutualValidationResult = Joi.validate({
                body: chance.pickone([...notObjects, {
                    code: buildInvalidString(),
                    userRegistrationToken: buildInvalidString()
                }])
            }, verifyUserRequestSchema);

            expect(acutualValidationResult.error).toBeTruthy();
        });

        test('when the request is valid, the result should not include a validation error', () => {
            const acutualValidationResult = Joi.validate({
                body: {
                    code: chance.string(),
                    userRegistrationToken: chance.string()
                }
            }, verifyUserRequestSchema);

            expect(acutualValidationResult.error).toBeFalsy();
        });
    });

    describe('when validating authenticate requests', () => {
        test('when the request is invalid, the result should include a validation error', () => {
            const acutualValidationResult = Joi.validate({
                body: chance.pickone([...notObjects, {
                    password: buildInvalidString(),
                    username: buildInvalidString()
                }])
            }, authenticateRequestSchema);

            expect(acutualValidationResult.error).toBeTruthy();
        });

        test('when the request is valid, the result should not include a validation error', () => {
            const acutualValidationResult = Joi.validate({
                body: {
                    password: chance.string(),
                    username: chance.string()
                }
            }, authenticateRequestSchema);

            expect(acutualValidationResult.error).toBeFalsy();
        });
    });

    describe('when validating put todo requests', () => {
        test('when the request is invalid, the result should include a validation error', () => {
            const acutualValidationResult = Joi.validate({
                body: chance.pickone([...notObjects, {
                    completed: buildInvalidBoolean(),
                    id: buildInvalidString(),
                    text: buildInvalidString(),
                    userId: buildInvalidString()
                }]),
                parameters: chance.pickone([...notObjects, {
                    authorization: buildInvalidString()
                }])
            }, putTodoRequestSchema);

            expect(acutualValidationResult.error).toBeTruthy();
        });

        test('when the request is valid, the result should not include a validation error', () => {
            const actualValidationResult = Joi.validate({
                body: {
                    completed: chance.bool(),
                    id: chance.string(),
                    text: chance.string(),
                    userId: chance.string()
                },
                parameters: {
                    authorization: chance.string()
                }
            }, putTodoRequestSchema);

            expect(actualValidationResult.error).toBeFalsy();
        });
    });

    describe('when validating get todo requests', () => {
        test('when the request is invalid, the result should include a validation error', () => {
            const acutualValidationResult = Joi.validate({
                parameters: chance.pickone([...notObjects, {
                    authorization: buildInvalidString(),
                    id: buildInvalidString()
                }])
            }, getTodoRequestSchema);

            expect(acutualValidationResult.error).toBeTruthy();
        });

        test('when the request is valid, the result should not include a validation error', () => {
            const actualValidationResult = Joi.validate({
                parameters: {
                    authorization: chance.string(),
                    id: chance.string()
                }
            }, getTodoRequestSchema);

            expect(actualValidationResult.error).toBeFalsy();
        });
    });

    describe('when validating delete todo requests', () => {
        test('when the request is invalid, the result should include a validation error', () => {
            const acutualValidationResult = Joi.validate({
                parameters: chance.pickone([...notObjects, {
                    authorization: buildInvalidString(),
                    id: buildInvalidString()
                }])
            }, deleteTodoRequestSchema);

            expect(acutualValidationResult.error).toBeTruthy();
        });

        test('when the request is valid, the result should not include a validation error', () => {
            const actualValidationResult = Joi.validate({
                parameters: {
                    authorization: chance.string(),
                    id: chance.string()
                }
            }, deleteTodoRequestSchema);

            expect(actualValidationResult.error).toBeFalsy();
        });
    });

    describe('when validating fetch todos requests', () => {
        test('when the request is invalid, the result should include a validation error', () => {
            const acutualValidationResult = Joi.validate({
                parameters: chance.pickone([...notObjects, {
                    authorization: buildInvalidString()
                }])
            }, fetchTodosRequestSchema);

            expect(acutualValidationResult.error).toBeTruthy();
        });

        test('when the request is valid, the result should not include a validation error', () => {
            const actualValidationResult = Joi.validate({
                parameters: {
                    authorization: chance.string()
                }
            }, fetchTodosRequestSchema);

            expect(actualValidationResult.error).toBeFalsy();
        });
    });
});
