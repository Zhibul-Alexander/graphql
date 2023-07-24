import {PrismaClient} from '@prisma/client';

import {ID, Context} from '../types/index.js';
import {PostInput} from '../types/post.js';

const prisma = new PrismaClient();

export const getPost = async ({id}: ID) => {
    return await prisma.post.findUnique({where: {id}});
};

export const getPosts = async () => {
    return await prisma.post.findMany();
};

export const getPostsByUserId = async (authorId: string, {prisma}: Context) => {
    return await prisma.post.findMany({where: {authorId}});
};

export const createPost = async ({dto: data}: { dto: PostInput }, {prisma}: Context) => {
    return await prisma.post.create({data});
};

export const changePost = async ({id, dto: data}: ID & { dto: Partial<PostInput> }, {prisma}: Context) => {
    try {
        return await prisma.post.update({where: {id}, data});
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const deletePost = async ({id}: ID, {prisma}: Context) => {
    try {
        await prisma.post.delete({where: {id}});
        return id;
    } catch (e) {
        console.log(e);
        return null;
    }
};