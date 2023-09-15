import { helpers } from "./helpers";

const SHUTDOWN_SIGNALS = ["SIGINT", "SIGTERM"] as const;
const SHUTDOWN_TIMER = 15000;

type ShutdownCallback = () => Promise<void> | void;
const shutdownListeners: ShutdownCallback[] = [];

function processOnce(callback: () => void) {
    SHUTDOWN_SIGNALS.forEach(signal => process.once(signal, callback));
}

function forceExit() {
    setTimeout(() => {
        helpers.logger(`Could not close resources gracefully after ${SHUTDOWN_TIMER}ms: forcing shutdown`);
        return process.exit(1);
    }, SHUTDOWN_TIMER).unref();
}

async function shutdownHandler() {
    helpers.logger("Shutting down");
    for (const listener of shutdownListeners) {
        try {
            await listener();
        }
        catch(error) {
            helpers.logger(`A shutdown handler failed before completing with: ${error instanceof Error ? error.message : error}`);
        }
    }
    return process.exit(0);
}

processOnce(forceExit);
processOnce(shutdownHandler as () => void); // To allow registering main async callback that never fails


export function beforeShutdown(cleanupFn: ShutdownCallback) {
    shutdownListeners.push(cleanupFn);
}
