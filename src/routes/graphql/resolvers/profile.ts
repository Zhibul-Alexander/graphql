import {PrismaClient} from '@prisma/client';

import {ID, Context, EmptyRecord} from '../types/index.js';
import {ProfileInput} from '../types/profile.js';

import {MemberTypeId} from '../../member-types/schemas.js';


const prisma = new PrismaClient();

export const getProfile = async ({id}: ID, {prisma}: Context) => {
    return await prisma.profile.findUnique({where: {id}});
};

export const getProfiles = async (empty: EmptyRecord, {prisma}: Context) => {
    return await prisma.profile.findMany();
};

export const getProfileByUserId = async (userId: string, {prisma}: Context) => {
    return await prisma.profile.findUnique({where: {userId}});
};

export const getProfilesByMemberTypeId = async (memberTypeId: MemberTypeId, {prisma}: Context) => {
    return await prisma.profile.findMany({where: {memberTypeId}});
};

export const createProfile = async ({dto: data}: { dto: ProfileInput }, {prisma}: Context) => {
    try {
        return await prisma.profile.create({data});
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const changeProfile = async ({id, dto: data}: ID & { dto: Partial<ProfileInput> }, {prisma}: Context) => {
    try {
        return await prisma.profile.update({where: {id}, data});
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const deleteProfile = async ({id}: ID, {prisma}: Context) => {
    try {
        await prisma.profile.delete({where: {id}});
        return id;
    } catch (e) {
        console.log(e);
        return null;
    }
};