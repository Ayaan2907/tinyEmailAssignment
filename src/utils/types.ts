export interface EventBody
{
    id: string;
    name: string;
    desc: string;
    date: string;
};

export enum ViewType {
    DAY = "day",
    WEEK = "week",
    MONTH = "month",
};