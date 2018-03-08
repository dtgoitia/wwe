import { IProject } from './IProject';
import { IClient } from './IClient';

export function getProjectName(togglClient: any, projectId: string) : Promise<IProject|Error> {
  return new Promise((resolve, reject) => {
    togglClient.getProjectData(projectId, (err: Error, projectData: any) => {
      if (!err) {
        const project: IProject = {
          "id": projectId,
          "name": projectData.name
        };
        resolve(project);
      } else {
        const msg = 'something went wrong getting the name of the project with the ID ' + projectId;
        reject(new Error(msg));
      }
    });
  });
}

export async function getProjectNames(projectIds: string[], togglClient: any) {
  let projectNames: IProject[] = [];

  const pendingPromises = projectIds.map((projectId: string) => {
    return getProjectName(togglClient, projectId);
  });
  
  return await Promise.all(pendingPromises).then((data) => data);
}

export function getClientsPromise(togglClient:any): Promise<any|Error> {
  return new Promise((resolve, reject) => {
    togglClient.getClients((err: Error, clients: any) => {
      if (!err) {
        resolve(clients)
      } else {
        reject(new Error("err.message"))
      }
    })
  })
}

export async function getClients(togglClient: any) {
  return await getClientsPromise(togglClient);
}