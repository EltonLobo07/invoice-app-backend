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
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../validation-schemas/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_queries_1 = require("../queries/users.queries");
const pool_1 = require("../pool");
const helpers_1 = require("../helpers");
exports.usersRouter = express_1.default.Router();
exports.usersRouter.post("/api/users", (req, res, next) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const signupDetails = users_1.signupDetailsSchema.parse(req.body);
            const [user] = yield users_queries_1.getUserByEmail.run({
                email: signupDetails.email
            }, pool_1.pool);
            if (user) {
                res.status(409).json({ message: "email already present" });
                return;
            }
            const passwordHash = yield bcrypt_1.default.hash(signupDetails.password, 10);
            const [addedUser] = yield users_queries_1.addUser.run({
                name: signupDetails.name,
                email: signupDetails.email,
                passwordHash
            }, pool_1.pool);
            if (!addedUser) {
                res.status(500).json("Couldn't add user due to some error");
                return;
            }
            res.status(201).json(helpers_1.helpers.recursiveKeyCamelCase(addedUser));
        }
        catch (error) {
            next(error);
        }
    }))();
});
