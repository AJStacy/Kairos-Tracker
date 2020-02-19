import { kdb, Table } from '../db';
import { DBSchema, Projects } from '../_contracts';
import { timestamp } from '../util';
import { Project } from '../_contracts';

export const projects = new Table<'projects'>(kdb, 'projects');

// export const getProjects = kdb.get('projects').value();

// export const getProject = (name: string):Project => db.get(`projects.${name}`).value();

// export const projectExists = (name: string):boolean => db.has(`projects.${name}`).value();

// export const createProject = (name: string, message: string):void => (
//   db.set(`projects.${name}`, { created: timestamp(), message }).write()
// );

// export const updateProject = (name: string, message: string):void => {
//   db.set(`projects.${name}`, { ...db.get(`projects.${name}`).value(), message }).write();
// };

// export const deleteProject = (name: string):void => {
//   db.unset(`projects.${name}`).write();
// };