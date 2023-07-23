import {PrismaClient} from '@prisma/client';

export interface Context {
    prisma: PrismaClient;
}

export type EmptyRecord = Record<string | number | symbol, never>;

export interface ID {
    id: string;
};