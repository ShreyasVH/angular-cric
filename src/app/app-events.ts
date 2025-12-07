export type AppEvent =
    | { type: 'LOADER_SHOW'; payload?: { text?: string } }
    | { type: 'LOADER_HIDE' }
    | { type: 'USER_LOGIN'; payload: { id: string } };
