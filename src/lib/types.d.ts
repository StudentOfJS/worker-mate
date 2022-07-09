export interface WorkerResponseType {
    isTrusted: boolean;
    data: {
        type: 'error' | 'data';
        data: unknown;
    };
}