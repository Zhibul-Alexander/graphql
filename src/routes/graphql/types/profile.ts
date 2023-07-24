import {GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLInputObjectType} from 'graphql';

import {getMemberType} from '../resolvers/member.js';
import {getUser} from '../resolvers/user.js';

import {MemberTypeId} from '../../member-types/schemas.js';

import {EmptyRecord, Context} from './index.js';

import {UUIDType} from './uuid.js';
import {MemberType, MemberTypeIdEnum} from './member.js';
import {UserType} from './user.js';

export interface Profile {
    id: string;
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: MemberTypeId;
    userId: string;
}

export interface ProfileInput {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: MemberTypeId;
    userId: string;
}

export const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: {type: UUIDType!},
        isMale: {type: GraphQLBoolean!},
        yearOfBirth: {type: GraphQLInt!},
        memberType: {
            type: MemberType!,
            resolve: async (source: Profile, empty: EmptyRecord, context: Context) => {
                return await getMemberType({id: source.memberTypeId}, context);
            },
        },
        user: {
            type: UserType,
            resolve: async (source: Profile, empty: EmptyRecord, context: Context) => {
                return await getUser({id: source.userId}, context);
            },
        },
    }),
});

export const CreateProfileInputType = new GraphQLInputObjectType({
    name: 'CreateProfileInput',
    fields: {
        isMale: {type: GraphQLBoolean!},
        yearOfBirth: {type: GraphQLInt!},
        memberTypeId: {type: MemberTypeIdEnum!},
        userId: {type: UUIDType!},
    },
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    fields: {
        isMale: {type: GraphQLBoolean},
        yearOfBirth: {type: GraphQLInt},
        memberTypeId: {type: MemberTypeIdEnum},
    },
});