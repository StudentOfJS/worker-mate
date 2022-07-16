export interface WorkerResponseType<T> {
    isTrusted: boolean;
    data: {
        type: 'error' | 'data';
        data: T;
    };
}