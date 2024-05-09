"use strict";
/*

Intro:

    We have asynchronous functions now, advanced technology.
    This makes us a tech startup officially now.
    But one of the consultants spoiled our dreams about
    inevitable future IT leadership.
    He said that callback-based asynchronicity is not
    popular anymore and everyone should use Promises.
    He promised that if we switch to Promises, this would
    bring promising results.

Exercise:

    We don't want to reimplement all the data-requesting
    functions. Let's decorate the old callback-based
    functions with the new Promise-compatible result.
    The final function should return a Promise which
    would resolve with the final data directly
    (i.e. users or admins) or would reject with an error
    (or type Error).

    The function should be named promisify.

Higher difficulty bonus exercise:

    Create a function promisifyAll which accepts an object
    with functions and returns a new object where each of
    the function is promisified.

    Rewrite api creation accordingly:

        const api = promisifyAll(oldApi);

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.promisify = void 0;
const admins = [
    { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
    { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
];
const users = [
    {
        type: "user",
        name: "Max Mustermann",
        age: 25,
        occupation: "Chimney sweep",
    },
    { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
];
function promisify(arg) {
    return null;
}
exports.promisify = promisify;
const oldApi = {
    requestAdmins(callback) {
        callback({
            status: "success",
            data: admins,
        });
    },
    requestUsers(callback) {
        callback({
            status: "success",
            data: users,
        });
    },
    requestCurrentServerTime(callback) {
        callback({
            status: "success",
            data: Date.now(),
        });
    },
    requestCoffeeMachineQueueLength(callback) {
        callback({
            status: "error",
            error: "Numeric value has exceeded Number.MAX_SAFE_INTEGER.",
        });
    },
};
exports.api = {
    requestAdmins: promisify(oldApi.requestAdmins),
    requestUsers: promisify(oldApi.requestUsers),
    requestCurrentServerTime: promisify(oldApi.requestCurrentServerTime),
    requestCoffeeMachineQueueLength: promisify(oldApi.requestCoffeeMachineQueueLength),
};
function logPerson(person) {
    console.log(` - ${person.name}, ${person.age}, ${person.type === "admin" ? person.role : person.occupation}`);
}
function startTheApp() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Admins:");
        (yield exports.api.requestAdmins()).forEach(logPerson);
        console.log("Users:");
        (yield exports.api.requestUsers()).forEach(logPerson);
        console.log("Server time:");
        console.log(`${new Date(yield exports.api.requestCurrentServerTime()).toLocaleString()}`);
        console.log("Coffee machine queue length:");
        console.log(`${yield exports.api.requestCoffeeMachineQueueLength()}`);
    });
}
startTheApp().then(() => {
    console.log("Success!");
}, (e) => {
    console.log(`Error: "${e.message}", but it's fine, sometimes errors are inevitable.`);
});
// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/generics.html
