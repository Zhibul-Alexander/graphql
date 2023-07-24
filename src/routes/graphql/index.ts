import {FastifyPluginAsyncTypebox} from '@fastify/type-provider-typebox';
import {graphql, validate, parse} from 'graphql';
import depthLimit from 'graphql-depth-limit';

import {getUser, getUsers, createUser, changeUser, deleteUser} from './resolvers/user.js';
import {getMemberType, getMemberTypes} from './resolvers/member.js';
import {getPost, getPosts, getPostsByUserId, createPost, changePost, deletePost} from './resolvers/post.js';
import {getProfile, getProfiles, createProfile, changeProfile, deleteProfile} from './resolvers/profile.js';

import {createGqlResponseSchema, gqlResponseSchema, schema} from './schemas.js';

const rootValue = {
    getUser, getUsers, createUser, changeUser, deleteUser,
    getMemberType, getMemberTypes,
    getPost, getPosts, getPostsByUserId, createPost, changePost, deletePost,
    getProfile, getProfiles, createProfile, changeProfile, deleteProfile,
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
            const validationResult = validate(schema, parse(request.body.query), [depthLimit(5)]);

            if (validationResult.length) {
                return {validationResult};
            }

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
