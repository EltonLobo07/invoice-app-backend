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
Object.defineProperty(exports, "__esModule", { value: true });
exports.beforeShutdown = void 0;
const helpers_1 = require("./helpers");
const SHUTDOWN_SIGNALS = ["SIGINT", "SIGTERM"];
const SHUTDOWN_TIMER = 15000;
const shutdownListeners = [];
function processOnce(callback) {
    SHUTDOWN_SIGNALS.forEach(signal => process.once(signal, callback));
}
function forceExit() {
    setTimeout(() => {
        helpers_1.helpers.logger(`Could not close resources gracefully after ${SHUTDOWN_TIMER}ms: forcing shutdown`);
        return process.exit(1);
    }, SHUTDOWN_TIMER).unref();
}
function shutdownHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        helpers_1.helpers.logger("Shutting down");
        for (const listener of shutdownListeners) {
            try {
                yield listener();
            }
            catch (error) {
                helpers_1.helpers.logger(`A shutdown handler failed before completing with: ${error instanceof Error ? error.message : error}`);
            }
        }
        return process.exit(0);
    });
}
processOnce(forceExit);
processOnce(shutdownHandler); // To allow registering main async callback that never fails
function beforeShutdown(cleanupFn) {
    shutdownListeners.push(cleanupFn);
}
exports.beforeShutdown = beforeShutdown;
