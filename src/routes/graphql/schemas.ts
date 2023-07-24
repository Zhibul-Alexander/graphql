import {Type} from '@fastify/type-provider-typebox';
import {GraphQLObjectType, GraphQLList, GraphQLSchema, GraphQLString} from 'graphql';

import {UserType, CreateUserInputType, ChangeUserInputType} from './types/user.js';
import {MemberType, MemberTypeIdEnum} from './types/member.js';
import {PostType, CreatePostInputType, ChangePostInputType} from './types/post.js';
import {ProfileType, CreateProfileInputType, ChangeProfileInputType} from './types/profile.js';

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
        memberType: {
            type: MemberType,
            args: {
                id: {type: MemberTypeIdEnum!},
            },
        },
        memberTypes: {type: new GraphQLList(MemberType)},
        post: {
            type: PostType,
            args: {
                id: {type: UUIDType!},
            },
        },
        posts: {type: new GraphQLList(PostType)},
        profile: {
            type: ProfileType,
            args: {
                id: {type: UUIDType!},
            },
        },
        profiles: {
            type: new GraphQLList(ProfileType),
        },
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
        createPost: {
            type: PostType,
            args: {
                dto: {type: CreatePostInputType},
            },
        },
        changePost: {
            type: PostType,
            args: {
                id: {type: UUIDType!},
                dto: {type: ChangePostInputType},
            },
        },
        deletePost: {
            type: UUIDType,
            args: {
                id: {type: UUIDType!},
            },
        },
        createProfile: {
            type: ProfileType,
            args: {
                dto: {type: CreateProfileInputType},
            },
        },
        changeProfile: {
            type: ProfileType,
            args: {
                id: {type: UUIDType!},
                dto: {type: ChangeProfileInputType},
            },
        },
        deleteProfile: {
            type: UUIDType,
            args: {
                id: {type: UUIDType!},
            },
        },
        subscribeTo: {
            type: UserType,
            args: {
                userId: {type: UUIDType!},
                authorId: {type: UUIDType!},
            },
        },
        unsubscribeFrom: {
            type: GraphQLString,
            args: {
                userId: {type: UUIDType!},
                authorId: {type: UUIDType!},
            },
        },
    },
});

export const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
    types: [
        UserType, CreateUserInputType, ChangeUserInputType,
        MemberType, MemberTypeIdEnum,
        PostType, CreatePostInputType, ChangePostInputType,
        ProfileType, CreateProfileInputType, ChangeProfileInputType,
    ],
});