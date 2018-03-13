import { IProject } from './IProject';
import { IClient } from './IClient';
import { IEntry } from './IEntry';

export function getProjectName(togglClient: any, projectId: string) : Promise<IProject> {
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

export async function getProjectNames(projectIds: string[], togglClient: any) : Promise<IProject[]> {
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
        resolve(clients);
      } else {
        reject(new Error(err.message));
      }
    })
  })
}

export function getClientProjectsPromise(toggleClient:any, clientId: number|string, active: string|boolean): Promise<any|Error> {
  return new Promise((resolve, reject) => {
    toggleClient.getClientProjects(clientId, active, (err:Error, projects: any) => { // TODO Change project type to IProject
      if (!err) {
        resolve(projects);
      } else {
        reject(new Error(err.message));
      }
    });
  });
}

export function getTimeEntriesPromise(
  togglClient:any,
  startDate?:string|number|Date,
  endDate?:string|number|Date
): Promise<any|Error> {
  return new Promise((resolve, reject) => {
    togglClient.getTimeEntries(startDate, endDate, (err: Error, timeEntries: any) => {
      if (!err) {
        resolve(timeEntries);
      } else {
        reject(new Error(err.message));
      }
    });
  });
}