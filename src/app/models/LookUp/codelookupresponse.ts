import { CodeLookUp } from "./codelookup";

export class CodeLookUpResponse{
    transactionId!: string;
    response!: CodeLookUp[];
    time!: string;
    status!: string;
} 