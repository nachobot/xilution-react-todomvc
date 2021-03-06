import {validate} from 'joi';

import {
    buildInputValidationProxyResponse,
    buildSuccessProxyResponse,
    buildErrorProxyResponse
} from './proxyResponseBuilders';

export const brokerRequest = async (request, schema, func) => {
    const inputValidationResult = validate(request, schema);

    if (inputValidationResult.error) {
        return buildInputValidationProxyResponse(inputValidationResult);
    }

    try {
        const response = await func(request);

        return buildSuccessProxyResponse(response);
    } catch (error) {
        return buildErrorProxyResponse({
            ...request,
            action: func.toString
        }, error);
    }
};
