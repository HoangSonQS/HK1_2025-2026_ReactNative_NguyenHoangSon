"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function downloadFile(filename) {
    console.log("Downloading ".concat(filename, "..."));
    setTimeout(function () {
        console.log("".concat(filename, " downloaded!"));
    }, 3000);
}
downloadFile('testfile.txt');
