export interface rapt {
    id: string;
    userId: string;
    title: string;
    content: string;
    likes: number;
    bookmarks: number;
    dateCreated: string;
    dateUpdated: string;
    user: {
        name: string;
        username: string;
        id: string;
    }
}