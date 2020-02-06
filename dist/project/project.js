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
const enquirer_1 = require("enquirer");
const logs_1 = require("../logs");
const crud_1 = require("./crud");
exports.project = (name) => {
    try {
    }
    catch (e) {
        logs_1.default.error(e);
    }
};
const confirmProject = (name) => __awaiter(void 0, void 0, void 0, function* () {
    if (crud_1.projectExists(name)) {
        logs_1.default.warn(`A project with the name ${name} already exists. Please delete it first if you would like to create a new one.`);
        const response = yield enquirer_1.prompt({
            type: 'confirm',
            name: 'confirmation',
            message: 'Project already exists. Would you like to overwrite it?',
        });
        return response.confirmation;
    }
    return true;
});
