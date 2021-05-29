import { ADD_LIST } from '../types/index';

export const addList = (list) => ({
    type: ADD_LIST,
    data: list
})