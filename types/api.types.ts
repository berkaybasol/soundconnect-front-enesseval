export interface ApiErrorResponse {
    code:number;
    details:[];
    httpStatus:string;
    message:string;
    path:string;
    timestamp:string;
}