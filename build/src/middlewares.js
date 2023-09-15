"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const zod_1 = require("zod");
const morgan_1 = __importDefault(require("morgan"));
const helpers_1 = require("./helpers");
function requestLogger() {
    return (0, morgan_1.default)(":method :url :status :response-time ms");
}
function extractAndDecodeToken(req, res, next) {
    const { authorization } = req.headers;
    const authHeaderStrPrefix = "bearer ";
    if (authorization === undefined || !authorization.toLowerCase().startsWith(authHeaderStrPrefix)) {
        res.status(401).json({ message: "jsonWebToken missing, get one by logging in" });
        return;
    }
    const jsonWebToken = authorization.slice(authHeaderStrPrefix.length);
    if (process.env.JWT_SECRET === undefined) {
        res.status(500).json({ message: "Couldn't verify token due to some error" });
        return;
    }
    try {
        req.decodedToken = jsonwebtoken_1.default.verify(jsonWebToken, process.env.JWT_SECRET);
        next();
    }
    catch (error) {
        next(error);
    }
}
function unknownEndpoint(_req, res) {
    res.status(404).json({ error: "unknown endpoint" });
}
function errorHandler(error, _req, res, next) {
    if (error instanceof SyntaxError) {
        res.status(400).json({ error: "request body, invalid json" });
        return;
    }
    if (error instanceof zod_1.ZodError) {
        const [firstZodError] = error.errors;
        res.status(400).json({
            error: `request body, path - ${firstZodError.path.join(".")}, message - ${firstZodError.message}`
        });
        return;
    }
    if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
        res.status(401).json({
            error: error.message
        });
        return;
    }
    if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
    }
    helpers_1.helpers.logger("Unhandled error:", error);
    next(error);
}
exports.middlewares = {
    extractAndDecodeToken,
    unknownEndpoint,
    errorHandler,
    requestLogger
};
