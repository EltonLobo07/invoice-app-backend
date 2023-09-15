"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appBuilder = void 0;
const express_1 = __importDefault(require("express"));
const invoices_1 = require("./routes/invoices");
const cors_1 = __importDefault(require("cors"));
const users_1 = require("./routes/users");
const authentication_1 = require("./routes/authentication");
const middlewares_1 = require("./middlewares");
const appBuilder = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(middlewares_1.middlewares.requestLogger());
    app.use(users_1.usersRouter);
    app.use(authentication_1.authenticationRouter);
    app.use(invoices_1.invoicesRouter);
    app.use(middlewares_1.middlewares.unknownEndpoint);
    app.use(middlewares_1.middlewares.errorHandler);
    return app;
};
exports.appBuilder = appBuilder;
