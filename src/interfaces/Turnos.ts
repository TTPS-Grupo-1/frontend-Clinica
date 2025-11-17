export interface UserState {
    auth: {
        user: {
            id: number;
            rol: string;
        } | null;
    };
}
