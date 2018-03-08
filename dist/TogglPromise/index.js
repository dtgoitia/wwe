"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function getProjectName(togglClient, projectId) {
    return new Promise((resolve, reject) => {
        togglClient.getProjectData(projectId, (err, projectData) => {
            if (!err) {
                const project = {
                    "id": projectId,
                    "name": projectData.name
                };
                resolve(project);
            }
            else {
                const msg = 'something went wrong getting the name of the project with the ID ' + projectId;
                reject(new Error(msg));
            }
        });
    });
}
exports.getProjectName = getProjectName;
function getProjectNames(projectIds, togglClient) {
    return __awaiter(this, void 0, void 0, function* () {
        let projectNames = [];
        const pendingPromises = projectIds.map((projectId) => {
            return getProjectName(togglClient, projectId);
        });
        return yield Promise.all(pendingPromises).then((data) => data);
    });
}
exports.getProjectNames = getProjectNames;
function getClientsPromise(togglClient) {
    return new Promise((resolve, reject) => {
        togglClient.getClients((err, clients) => {
            if (!err) {
                resolve(clients);
            }
            else {
                reject(new Error("err.message"));
            }
        });
    });
}
exports.getClientsPromise = getClientsPromise;
function getClients(togglClient) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield getClientsPromise(togglClient);
    });
}
exports.getClients = getClients;
//# sourceMappingURL=index.js.map