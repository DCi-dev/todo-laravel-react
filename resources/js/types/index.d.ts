export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export type TodoType = {
    id: number;
    task: string;
    status?: TodoStatus;
    deadline: string;
    human_status?: ['Pending', 'Completed', 'In Progress']
}

export type TodoStatus = 'pending' | 'completed' | 'in_progress';
