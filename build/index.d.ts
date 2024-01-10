export declare class moocard {
    constructor(options?: {
        name?: string;
        author?: string;
        color?: string;
        thumbnail?: string;
        requester?: string;
    });

    public setName(name: string): this;
    public setAuthor(author: string): this;
    public setColor(color: string): this;
    public setThumbnail(thumbnail: string): this;
    public setRequester(requester: string): this;

    public build(): Promise<Buffer>;
}