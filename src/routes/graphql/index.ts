import {FastifyPluginAsyncTypebox} from '@fastify/type-provider-typebox';
import {graphql} from 'graphql';

import {getUser, getUsers, createUser, changeUser, deleteUser} from './resolvers/user.js';
import {getMemberType, getMemberTypes} from './resolvers/member.js';

import {createGqlResponseSchema, gqlResponseSchema, schema} from './schemas.js';

const rootValue = {
    getUser, getUsers, createUser, changeUser, deleteUser,
    getMemberType, getMemberTypes,
};

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
    fastify.route({
        url: '/',
        method: 'POST',
        schema: {
            ...createGqlResponseSchema,
            response: {
                200: gqlResponseSchema,
            },
        },
        async handler(request) {
            return await graphql({
                schema: schema,
                source: request.body.query,
                rootValue,
                variableValues: request.body.variables,
                contextValue: {prisma},
            });
        },
    });
};

export default plugin;
