
import { atom } from 'jotai';
import { UserData } from './types';

export const usersAtom = atom<UserData[]>([]);
export const selectedUserAtom = atom<UserData | null>(null);
