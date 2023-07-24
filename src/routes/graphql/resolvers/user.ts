import {ID, Context, EmptyRecord, UserSubscription} from '../types/index.js';

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

export const userSubscribeTo = async ({userId, authorId}: UserSubscription, {prisma}: Context) => {
    try {
        return prisma.user.update({where: {userId}, data: {userSubscribedTo: {create: {authorId}}}});
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const userUnsubscribeId = async ({userId, authorId}: UserSubscription, {prisma}: Context) => {
    try {
        await prisma.subscribersOnAuthors.delete({where: {subscriberId_authorId: {userId, authorId}}});
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const getUserSubscriptions = async (subscriberId: string, {prisma}: Context) => {
    return await prisma.user.findMany({where: {subscribedToUser: {some: {subscriberId}}}});
};

export const getUserFollowers = async (authorId: string, {prisma}: Context) => {
    return await prisma.user.findMany({where: {userSubscribedTo: {some: {authorId}}}});
};