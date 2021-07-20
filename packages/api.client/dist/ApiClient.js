"use strict";
/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = exports.HttpClient = exports.ContentType = void 0;
var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
class HttpClient {
    constructor(apiConfig = {}) {
        this.baseUrl = "";
        this.securityData = null;
        this.abortControllers = new Map();
        this.customFetch = (...fetchParams) => fetch(...fetchParams);
        this.baseApiParams = {
            credentials: "same-origin",
            headers: {},
            redirect: "follow",
            referrerPolicy: "no-referrer",
        };
        this.setSecurityData = (data) => {
            this.securityData = data;
        };
        this.contentFormatters = {
            [ContentType.Json]: (input) => input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
            [ContentType.FormData]: (input) => Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key];
                formData.append(key, property instanceof Blob
                    ? property
                    : typeof property === "object" && property !== null
                        ? JSON.stringify(property)
                        : `${property}`);
                return formData;
            }, new FormData()),
            [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
        };
        this.createAbortSignal = (cancelToken) => {
            if (this.abortControllers.has(cancelToken)) {
                const abortController = this.abortControllers.get(cancelToken);
                if (abortController) {
                    return abortController.signal;
                }
                return void 0;
            }
            const abortController = new AbortController();
            this.abortControllers.set(cancelToken, abortController);
            return abortController.signal;
        };
        this.abortRequest = (cancelToken) => {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                abortController.abort();
                this.abortControllers.delete(cancelToken);
            }
        };
        this.request = (_a) => __awaiter(this, void 0, void 0, function* () {
            var { body, secure, path, type, query, format, baseUrl, cancelToken } = _a, params = __rest(_a, ["body", "secure", "path", "type", "query", "format", "baseUrl", "cancelToken"]);
            const secureParams = ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
                this.securityWorker &&
                (yield this.securityWorker(this.securityData))) ||
                {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const queryString = query && this.toQueryString(query);
            const payloadFormatter = this.contentFormatters[type || ContentType.Json];
            const responseFormat = format || requestParams.format;
            return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, Object.assign(Object.assign({}, requestParams), { headers: Object.assign(Object.assign({}, (type && type !== ContentType.FormData ? { "Content-Type": type } : {})), (requestParams.headers || {})), signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0, body: typeof body === "undefined" || body === null ? null : payloadFormatter(body) })).then((response) => __awaiter(this, void 0, void 0, function* () {
                const r = response;
                r.data = null;
                r.error = null;
                const data = !responseFormat
                    ? r
                    : yield response[responseFormat]()
                        .then((data) => {
                        if (r.ok) {
                            r.data = data;
                        }
                        else {
                            r.error = data;
                        }
                        return r;
                    })
                        .catch((e) => {
                        r.error = e;
                        return r;
                    });
                if (cancelToken) {
                    this.abortControllers.delete(cancelToken);
                }
                if (!response.ok)
                    throw data;
                return data;
            }));
        });
        Object.assign(this, apiConfig);
    }
    encodeQueryParam(key, value) {
        const encodedKey = encodeURIComponent(key);
        return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
    }
    addQueryParam(query, key) {
        return this.encodeQueryParam(key, query[key]);
    }
    addArrayQueryParam(query, key) {
        const value = query[key];
        return value.map((v) => this.encodeQueryParam(key, v)).join("&");
    }
    toQueryString(rawQuery) {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
        return keys
            .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
            .join("&");
    }
    addQueryParams(rawQuery) {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }
    mergeRequestParams(params1, params2) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, this.baseApiParams), params1), (params2 || {})), { headers: Object.assign(Object.assign(Object.assign({}, (this.baseApiParams.headers || {})), (params1.headers || {})), ((params2 && params2.headers) || {})) });
    }
}
exports.HttpClient = HttpClient;
/**
 * @title No title
 * @version 1.0
 * @contact
 */
class Api extends HttpClient {
    constructor() {
        super(...arguments);
        this.operation = {
            /**
             * No description
             *
             * @name GetOneOperation
             * @summary Retrieve a single Operation
             * @request GET:/operation/{id}
             */
            getOneOperation: (id, query, params = {}) => this.request(Object.assign({ path: `/operation/${id}`, method: "GET", query: query, format: "json" }, params)),
            /**
             * No description
             *
             * @name GetManyOperations
             * @summary Retrieve multiple Operations
             * @request GET:/operation
             */
            getManyOperations: (query, params = {}) => this.request(Object.assign({ path: `/operation`, method: "GET", query: query, format: "json" }, params)),
            /**
             * No description
             *
             * @name CreateOneOperation
             * @summary Create a single Operation
             * @request POST:/operation
             */
            createOneOperation: (data, params = {}) => this.request(Object.assign({ path: `/operation`, method: "POST", body: data, type: ContentType.Json, format: "json" }, params)),
        };
    }
}
exports.Api = Api;
//# sourceMappingURL=ApiClient.js.map