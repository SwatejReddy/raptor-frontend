import { RecoilValue } from "recoil";
import { rapt } from "./types";
import { followerDetails, followingDetails } from "./types";

export interface BlogProps {
    id: string;
    raptSelector: (id: string) => RecoilValue<rapt | undefined>;
}

export interface ProfileCardProps {
    userDetails: {
        id: string;
        name: string;
        username: string;
        email: string;
        verified: boolean;
        bio: string;
    };
    followers: Array<{
        id: string;
        dateFollowed: string;
        followingId: string; //this has the person being followed id.
        userId: string; //this has the follower user id.
        user: {
            id: string;
            name: string;
            username: string;
        }
    }>;
    following: {
        id: string;
        dateFollowed: string;
        followingId: string; //this has the person being followed id.
        userId: string; //this has the follower user id.
        following: {
            id: string;
            name: string;
            username: string;
        }
    }[];

    onFollowersClick: () => void;
    onFollowingClick: () => void;
}

export interface UserListProps {
    type: string; // Example: could be "followers" or "following"
    followers: followerDetails[];
    following: followingDetails[];
}
