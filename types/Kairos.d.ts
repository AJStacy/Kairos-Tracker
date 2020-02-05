declare const start: (label?: string | undefined, message?: string | undefined) => Promise<void>;
declare const stop: (id: string) => void;
declare const list: (id?: string | undefined) => void;
declare const project: (name: string) => void;
export { start, stop, list, project, };
