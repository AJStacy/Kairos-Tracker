export interface Project {
  created: string;
  message: string;
}

export interface Projects {
  [name: string]: Project;
}