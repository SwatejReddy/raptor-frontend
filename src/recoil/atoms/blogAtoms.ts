import { atom, selectorFamily } from "recoil";

interface Rapt {
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

export const latestRaptsAtom = atom<Rapt[]>({
    key: "latestRaptsAtom",
    default: []
});

export const latestRaptByIdSelector = selectorFamily<Rapt | undefined, string>({
    key: "latestRaptByIdSelector",
    get: (id: string) => ({ get }) => {
        const rapts = get(latestRaptsAtom);
        return rapts.find(rapt => rapt.id === id);
    }
});

export const userLatestRaptsAtom = atom<Rapt[]>({
    key: "userLatestRaptsAtom",
    default: []
});

export const userLatestRaptsByIdSelector = selectorFamily<Rapt | undefined, string>({
    key: "userLatestRaptsByIdSelector",
    get: (id: string) => ({ get }) => {
        const rapts = get(userLatestRaptsAtom);
        return rapts.find(rapt => rapt.id === id);
    }
});

export const userLikedRaptsAtom = atom<Rapt[]>({
    key: "userLikedRaptsAtom",
    default: []
});

export const userLikedRaptsByIdSelector = selectorFamily<Rapt | undefined, string>({
    key: "userLikedRaptsByIdSelector",
    get: (id: string) => ({ get }) => {
        const rapts = get(userLikedRaptsAtom);
        return rapts.find(rapt => rapt.id === id);
    }
});

export const searchedRaptsAtom = atom<Rapt[]>({
    key: "searchedRaptsAtom",
    default: []
});

export const searchedRaptsByIdSelector = selectorFamily<Rapt | undefined, string>({
    key: "searchedRaptsByIdSelector",
    get: (id: string) => ({ get }) => {
        const rapts = get(searchedRaptsAtom);
        return rapts.find(rapt => rapt.id === id);
    }
});
