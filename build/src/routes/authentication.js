"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRouter = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../validation-schemas/authentication");
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_queries_1 = require("../queries/users.queries");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pool_1 = require("../pool");
exports.authenticationRouter = express_1.default.Router();
exports.authenticationRouter.post("/api/login", (req, res, next) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const loginDetails = authentication_1.autheticationDetailsSchema.parse(req.body);
            const [userInDb] = yield users_queries_1.getUserByEmail.run({
                email: loginDetails.email
            }, pool_1.pool);
            if (!userInDb || !(yield bcrypt_1.default.compare(loginDetails.password, userInDb.password_hash))) {
                res.status(401).json({ message: "invalid credentials" });
                return;
            }
            if (process.env.JWT_SECRET === undefined) {
                res.status(500).json({ message: "Couldn't authenticate due to some errorr" });
                return;
            }
            const token = {
                id: userInDb.id,
                email: loginDetails.email
            };
            res.status(201).json({
                name: userInDb.name,
                jsonWebToken: jsonwebtoken_1.default.sign(token, process.env.JWT_SECRET)
            });
        }
        catch (error) {
            next(error);
        }
    }))();
});
