export interface GetManyOperationResponseDto {
    data: OperationReadDto[];
    count: number;
    total: number;
    page: number;
    pageCount: number;
}
export declare type Operation = object;
export interface OperationReadDto {
    id: string;
    name: string;
    status: "InProgress" | "Done" | "Failed";
}
export interface OperationCreateDto {
    name: string;
}
export declare type QueryParamsType = Record<string | number, any>;
export declare type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}
declare type CancelToken = Symbol | string | number;
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    baseUrl: string;
    private securityData;
    private securityWorker?;
    private abortControllers;
    private customFetch;
    private baseApiParams;
    constructor(apiConfig?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    private encodeQueryParam;
    private addQueryParam;
    private addArrayQueryParam;
    protected toQueryString(rawQuery?: QueryParamsType): string;
    protected addQueryParams(rawQuery?: QueryParamsType): string;
    private contentFormatters;
    private mergeRequestParams;
    private createAbortSignal;
    abortRequest: (cancelToken: CancelToken) => void;
    request: <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title No title
 * @version 1.0
 * @contact
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    operation: {
        /**
         * No description
         *
         * @name GetOneOperation
         * @summary Retrieve a single Operation
         * @request GET:/operation/{id}
         */
        getOneOperation: (id: string, query?: {
            fields?: string[] | undefined;
            join?: string[] | undefined;
            cache?: number | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<OperationReadDto, any>>;
        /**
         * No description
         *
         * @name GetManyOperations
         * @summary Retrieve multiple Operations
         * @request GET:/operation
         */
        getManyOperations: (query?: {
            fields?: string[] | undefined;
            s?: string | undefined;
            filter?: string[] | undefined;
            or?: string[] | undefined;
            sort?: string[] | undefined;
            join?: string[] | undefined;
            limit?: number | undefined;
            offset?: number | undefined;
            page?: number | undefined;
            cache?: number | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<GetManyOperationResponseDto, any>>;
        /**
         * No description
         *
         * @name CreateOneOperation
         * @summary Create a single Operation
         * @request POST:/operation
         */
        createOneOperation: (data: OperationCreateDto, params?: RequestParams) => Promise<HttpResponse<object, any>>;
    };
}
export {};
