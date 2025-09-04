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
const baiB18_1 = require("./baiB18");
function fetchWithTimeout(promise, timeout) {
    return __awaiter(this, void 0, void 0, function* () {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error("API call timed out"));
            }, timeout);
        });
        return Promise.race([promise, timeoutPromise]);
    });
}
function getUserWithTimeout(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield fetchWithTimeout((0, baiB18_1.fetchUser)(id), 999); //timeout cua fetchUser duoc cai la 1000
            console.log(user);
        }
        catch (error) {
            console.error(error);
        }
    });
}
getUserWithTimeout(1);
