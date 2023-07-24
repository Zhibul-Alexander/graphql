import {ID, Context, EmptyRecord} from '../types/index.js';

export const getMemberType = async ({id}: ID, {prisma}: Context) => {
    return await prisma.memberType.findUnique({where: {id}});
};

export const getMemberTypes = async (empty: EmptyRecord, {prisma}: Context) => {
    return await prisma.memberType.findMany();
};