import {GraphQLEnumType, GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLList} from 'graphql';

import {getProfilesByMemberTypeId} from '../resolvers/profile.js';

import {MemberTypeId} from '../../member-types/schemas.js';
import {ProfileType} from './profile.js';
import {EmptyRecord, Context} from './index.js';

interface IMemberType {
    id: MemberTypeId;
    discount: number;
    postsLimitPerMonth: number;
}

export const MemberTypeIdEnum = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        [MemberTypeId.BASIC]: {value: MemberTypeId.BASIC},
        [MemberTypeId.BUSINESS]: {value: MemberTypeId.BUSINESS},
    },
});

export const MemberType = new GraphQLObjectType({
    name: 'Member',
    fields: () => ({
        id: {type: MemberTypeIdEnum},
        discount: {type: GraphQLFloat!},
        postsLimitPerMonth: {type: GraphQLInt!},
        profiles: {
            type: new GraphQLList(ProfileType),
            resolve: async (source: IMemberType, empty: EmptyRecord, context: Context) =>
                await getProfilesByMemberTypeId(source.id, context),
        },
    }),
});