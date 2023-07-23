import {GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInputObjectType} from 'graphql';

import {UUIDType} from './uuid.js';

export interface UserInput {
    name: string;
    balance: number;
};

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: UUIDType!},
        name: {type: GraphQLString!},
        balance: {type: GraphQLFloat!},
    }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: {
        name: {type: GraphQLString!},
        balance: {type: GraphQLFloat!},
    },
});

export const ChangeUserInputType = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    fields: {
        name: {type: GraphQLString},
        balance: {type: GraphQLFloat},
    },
});