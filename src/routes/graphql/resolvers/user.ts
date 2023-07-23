import {ID, Context, EmptyRecord} from '../types/index.js';

import {UserInput} from '../types/user.js';

export const getUser = async ({id}: ID, {prisma}: Context) => {
    return await prisma.user.findUnique({where: {id}});
};

export const getUsers = async (empty: EmptyRecord, {prisma}: Context) => {
    return await prisma.user.findMany();
};

export const createUser = async ({dto: data}: { dto: UserInput }, {prisma}: Context) => {
    return await prisma.user.create({data});
};

export const changeUser = async ({id, dto: data}: ID &
    { dto: Partial<UserInput> }, {prisma}: Context) => {
    try {
        return await prisma.user.update({where: {id}, data});
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const deleteUser = async ({id}: ID, {prisma}: Context) => {
    try {
        await prisma.user.delete({where: {id}});
        return id;
    } catch (e) {
        console.log(e);
        return null;
    }
};