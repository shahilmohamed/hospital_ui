import { Drug } from "./Drug";

export interface DrugsResponse {
    status: number;
    message: string;
    data: Drug[];
    totalPage: number;
    totalCount: number;
}