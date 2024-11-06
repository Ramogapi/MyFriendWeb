import { User } from "./user";

export class UserResponse{
    transactionId!: string;
    response!: User;
    time!: string;
    status!: string;
}