import {Type} from '@fastify/type-provider-typebox';
import {GraphQLObjectType, GraphQLList, GraphQLSchema} from 'graphql';

import {UserType, CreateUserInputType, ChangeUserInputType} from './types/user.js';
import {UUIDType} from './types/uuid.js';

export const gqlResponseSchema = Type.Partial(
    Type.Object({
        data: Type.Any(),
        errors: Type.Any(),
    }),
);

export const createGqlResponseSchema = {
    body: Type.Object(
        {
            query: Type.String(),
            variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
        },
        {
            additionalProperties: false,
        },
    ),
};

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {type: UUIDType!},
            },
        },
        users: {type: new GraphQLList(UserType)},
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                dto: {type: CreateUserInputType},
            },
        },
        changeUser: {
            type: UserType,
            args: {
                id: {type: UUIDType!},
                dto: {type: ChangeUserInputType},
            },
        },
        deleteUser: {
            type: UUIDType,
            args: {
                id: {type: UUIDType!},
            },
        },
    },
});

export const schema = new GraphQLSchema({query: Query, mutation: Mutation});