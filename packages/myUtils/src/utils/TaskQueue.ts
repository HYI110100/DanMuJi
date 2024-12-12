export class TaskQueue {
    private queue: Array<{ task: () => Promise<any>; resolve: (value: any) => void; reject: (reason?: any) => void }>;
    private isProcessing: boolean; // 队列是否正在处理
    private maxConcurrency: number; // 最大并发任务数
    private currentConcurrency: number; // 当前并发任务数

    constructor(maxConcurrency: number = 5) {
        this.queue = [];
        this.isProcessing = false;
        this.maxConcurrency = maxConcurrency;
        this.currentConcurrency = 0;
    }

    /**
     * 添加任务到队列
     * @param task 一个返回 Promise 的异步任务函数
     * @returns 返回一个 Promise，能拿到该任务的执行结果
     */
    public addTask<T>(task: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.processQueue();
        });
    }

    /**
     * 处理队列中的任务
     */
    private async processQueue(): Promise<void> {
        if (this.isProcessing || this.currentConcurrency >= this.maxConcurrency || this.queue.length === 0) return;

        this.isProcessing = true;
        while (this.queue.length > 0 && this.currentConcurrency < this.maxConcurrency) {
            const { task, resolve, reject } = this.queue.shift()!;

            this.currentConcurrency++;
            try {
                const result = await task();
                resolve(result); // 保证按顺序返回结果
            } catch (error) {
                reject(error); // 确保失败任务的顺序依然正确
            } finally {
                this.currentConcurrency--;

                // 如果队列中还有任务，继续处理
                if (this.queue.length > 0) {
                    this.processQueue();
                }
            }
        }
        this.isProcessing = false;
    }

    /**
     * 获取当前队列长度
     */
    public getQueueLength(): number {
        return this.queue.length;
    }

    /**
     * 获取当前并发任务数量
     */
    public getCurrentConcurrency(): number {
        return this.currentConcurrency;
    }
}
