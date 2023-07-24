import {GraphQLObjectType, GraphQLString, GraphQLInputObjectType} from 'graphql';

import {getUser} from '../resolvers/user.js';

import {UserType} from './user.js';
import {UUIDType} from './uuid.js';

import {EmptyRecord, Context} from './index.js';

export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
}

export interface PostInput {
    title: string;
    content: string;
    authorId: string;
}

export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {type: UUIDType!},
        title: {type: GraphQLString!},
        content: {type: GraphQLString!},
        author: {
            type: UserType,
            resolve: async (source: Post, empty: EmptyRecord, context: Context) => {
                return await getUser({id: source.authorId}, context);
            },
        },
    }),
});

export const CreatePostInputType = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: {
        title: {type: GraphQLString!},
        content: {type: GraphQLString!},
        authorId: {type: UUIDType!},
    },
});

export const ChangePostInputType = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    fields: () => ({
        title: {type: GraphQLString},
        content: {type: GraphQLString},
    }),
});