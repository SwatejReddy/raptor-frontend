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


export interface followerDetails {
    id: string,
    dateFollowed: string,
    followingId: string, //this has the person being followed id.
    userId: string, //this has the follower user id.
    user: {
        id: string,
        name: string,
        username: string,
    }
}

export interface followingDetails {
    id: string,
    dateFollowed: string,
    followingId: string, //this has the person being followed id.
    userId: string, //this has the follower user id.
    following: {
        id: string,
        name: string,
        username: string,
    }
}

export interface userDetails {
    id: string,
    name: string,
    username: string,
    email: string,
    verified: boolean,
    bio: string,
}
