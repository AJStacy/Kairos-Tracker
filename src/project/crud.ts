import db from '../db';
import { timestamp } from '../util';

export const getProjects = db.get('projects').value();

export const getProject = (name: string):void => db.get(`projects.${name}`).value();

export const projectExists = (name: string):boolean => db.has(`projects.${name}`).value();

export const createProject = (name: string, message: string):void => (
  db.get('projects').push({ created: timestamp(), message }).write()
);

export const updateProject = (name: string, message: string):void => {
  db.set(`projects.${name}`, { ...db.get(`projects.${name}`).value(), message }).write();
};

export const deleteProject = (name: string):void => {
  db.unset(`projects.${name}`).write();
};