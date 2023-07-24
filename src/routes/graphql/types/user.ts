import {GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInputObjectType} from 'graphql';

import {getProfileByUserId} from '../resolvers/profile.js';
import {getPostsByUserId} from '../resolvers/post.js';
import {getUserSubscriptions, getUserFollowers} from '../resolvers/user.js';

import {EmptyRecord, Context} from '../types/index.js';

import {ProfileType} from '../types/profile.js';
import {PostType} from '../types/post.js';

import {UUIDType} from './uuid.js';

export interface User {
    id: string;
    name: string;
    balance: number;
};

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
        userSubscribedTo: {
            type: new GraphQLList(UserType),
            resolve: async (source: User, empty: EmptyRecord, context: Context) =>
                await getUserSubscriptions(source.id, context),
        },
        subscribedToUser: {
            type: new GraphQLList(UserType),
            resolve: async (source: User, empty: EmptyRecord, context: Context) =>
                await getUserFollowers(source.id, context),
        },
        profile: {
            type: ProfileType,
            resolve: async (source: User, empty: EmptyRecord, context: Context) =>
                await getProfileByUserId(source.id, context),
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: async (source: User, empty: EmptyRecord, context: Context) =>
                await getPostsByUserId(source.id, context),
        },
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