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
const baiB14_1 = require("./baiB14");
function sequentialCalls() {
    return __awaiter(this, void 0, void 0, function* () {
        const result1 = yield (0, baiB14_1.mulByThree)(15);
        console.log(result1);
        const result2 = yield (0, baiB14_1.mulByThree)(result1);
        console.log(result2);
    });
}
sequentialCalls();
