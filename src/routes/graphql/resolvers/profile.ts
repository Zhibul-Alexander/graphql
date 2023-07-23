import {PrismaClient} from '@prisma/client';

import {ID, Context} from '../types/index.js';
import {ProfileInput} from '../types/profile.js';

const prisma = new PrismaClient();

export const getProfile = async (args: ID) => {
    return await prisma.profile.findUnique({where: {id: args.id}});
};

export const getProfiles = async () => {
    return await prisma.profile.findMany();
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