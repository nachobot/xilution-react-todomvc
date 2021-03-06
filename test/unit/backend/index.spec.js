/* eslint-disable max-nested-callbacks */
import Chance from 'chance';

import {
    doAuthenticate,
    doDeleteTodo,
    doFetchTodos,
    doGetTodo,
    doPutTodo,
    doRegisterUser,
    doVerifyUser
} from '../../../src/backend/index';
import {brokerRequest} from '../../../src/backend/requestAdapter';
import {registerUser, verifyUser, authenticate} from '../../../src/backend/identityBroker';
import {putTodo, getTodo, deleteTodo, fetchTodos} from '../../../src/backend/dataAccessorBroker';
import {
    registerUserRequestSchema,
    verifyUserRequestSchema,
    authenticateRequestSchema,
    putTodoRequestSchema,
    getTodoRequestSchema,
    deleteTodoRequestSchema,
    fetchTodosRequestSchema
} from '../../../src/backend/schemas';

jest.mock('../../../src/backend/requestAdapter');

const chance = new Chance();

describe('index tests', () => {
    let event,
        context,
        expectedResponse,
        actualError,
        actualResponse;

    beforeEach(() => {
        event = {};
        context = {};

        brokerRequest.mockResolvedValue(expectedResponse);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('when registering a user', () => {
        beforeEach((done) => {
            event = {
                body: JSON.stringify({
                    [chance.string()]: chance.string()
                })
            };

            doRegisterUser(event, context, (error, response) => {
                actualError = error;
                actualResponse = response;
                done();
            });
        });

        test('should not raise an error', () => {
            expect(actualError).toBeNull();
        });

        test('should yield the expected response', () => {
            expect(actualResponse).toEqual(expectedResponse);
        });

        test('should call brokerRequest once with the proper params', () => {
            expect(brokerRequest).toHaveBeenCalledTimes(1);
            expect(brokerRequest).toHaveBeenCalledWith({body: JSON.parse(event.body)}, registerUserRequestSchema, registerUser);
        });
    });

    describe('when verifying user', () => {
        beforeEach((done) => {
            event = {
                body: JSON.stringify({
                    [chance.string()]: chance.string()
                })
            };

            doVerifyUser(event, context, (error, response) => {
                actualError = error;
                actualResponse = response;
                done();
            });
        });

        test('should not raise an error', () => {
            expect(actualError).toBeNull();
        });

        test('should yield the expected response', () => {
            expect(actualResponse).toEqual(expectedResponse);
        });

        test('should call brokerRequest once with the proper params', () => {
            expect(brokerRequest).toHaveBeenCalledTimes(1);
            expect(brokerRequest).toHaveBeenCalledWith({body: JSON.parse(event.body)}, verifyUserRequestSchema, verifyUser);
        });
    });

    describe('when authenticating', () => {
        beforeEach((done) => {
            event = {
                body: JSON.stringify({
                    [chance.string()]: chance.string()
                })
            };

            doAuthenticate(event, context, (error, response) => {
                actualError = error;
                actualResponse = response;
                done();
            });
        });

        test('should not raise an error', () => {
            expect(actualError).toBeNull();
        });

        test('should yield the expected response', () => {
            expect(actualResponse).toEqual(expectedResponse);
        });

        test('should call brokerRequest once with the proper params', () => {
            expect(brokerRequest).toHaveBeenCalledTimes(1);
            expect(brokerRequest).toHaveBeenCalledWith({body: JSON.parse(event.body)}, authenticateRequestSchema, authenticate);
        });
    });

    describe('when putting a todo', () => {
        beforeEach((done) => {
            event = {
                body: JSON.stringify({
                    [chance.string()]: chance.string()
                }),
                headers: {
                    Authorization: chance.string()
                }
            };

            doPutTodo(event, context, (error, response) => {
                actualError = error;
                actualResponse = response;
                done();
            });
        });

        test('should not raise an error', () => {
            expect(actualError).toBeNull();
        });

        test('should yield the expected response', () => {
            expect(actualResponse).toEqual(expectedResponse);
        });

        test('should call brokerRequest once with the proper params', () => {
            expect(brokerRequest).toHaveBeenCalledTimes(1);
            expect(brokerRequest).toHaveBeenCalledWith({
                body: JSON.parse(event.body),
                parameters: {
                    authorization: event.headers.Authorization
                }
            }, putTodoRequestSchema, putTodo);
        });
    });

    describe('when getting a todo', () => {
        beforeEach((done) => {
            event = {
                headers: {
                    Authorization: chance.string()
                },
                pathParameters: {
                    id: chance.string()
                }
            };

            doGetTodo(event, context, (error, response) => {
                actualError = error;
                actualResponse = response;
                done();
            });
        });

        test('should not raise an error', () => {
            expect(actualError).toBeNull();
        });

        test('should yield the expected response', () => {
            expect(actualResponse).toEqual(expectedResponse);
        });

        test('should call brokerRequest once with the proper params', () => {
            expect(brokerRequest).toHaveBeenCalledTimes(1);
            expect(brokerRequest).toHaveBeenCalledWith({
                parameters: {
                    authorization: event.headers.Authorization,
                    id: event.pathParameters.id
                }
            }, getTodoRequestSchema, getTodo);
        });
    });

    describe('when deleting a todo', () => {
        beforeEach((done) => {
            event = {
                headers: {
                    Authorization: chance.string()
                },
                pathParameters: {
                    id: chance.string()
                }
            };

            doDeleteTodo(event, context, (error, response) => {
                actualError = error;
                actualResponse = response;
                done();
            });
        });

        test('should not raise an error', () => {
            expect(actualError).toBeNull();
        });

        test('should yield the expected response', () => {
            expect(actualResponse).toEqual(expectedResponse);
        });

        test('should call brokerRequest once with the proper params', () => {
            expect(brokerRequest).toHaveBeenCalledTimes(1);
            expect(brokerRequest).toHaveBeenCalledWith({
                parameters: {
                    authorization: event.headers.Authorization,
                    id: event.pathParameters.id
                }
            }, deleteTodoRequestSchema, deleteTodo);
        });
    });

    describe('when fetching todos', () => {
        beforeEach((done) => {
            event = {
                headers: {
                    Authorization: chance.string()
                },
                pathParameters: {
                    id: chance.string()
                }
            };

            doFetchTodos(event, context, (error, response) => {
                actualError = error;
                actualResponse = response;
                done();
            });
        });

        test('should not raise an error', () => {
            expect(actualError).toBeNull();
        });

        test('should yield the expected response', () => {
            expect(actualResponse).toEqual(expectedResponse);
        });

        test('should call brokerRequest once with the proper params', () => {
            expect(brokerRequest).toHaveBeenCalledTimes(1);
            expect(brokerRequest).toHaveBeenCalledWith({
                parameters: {
                    authorization: event.headers.Authorization
                }
            }, fetchTodosRequestSchema, fetchTodos);
        });
    });
});
/* eslint-enable */
