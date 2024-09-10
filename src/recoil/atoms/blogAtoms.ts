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
}

export const raptsAtom = atom<Rapt[]>({
    key: "raptsAtom",
    default: []
});

export const raptByIdSelector = selectorFamily<Rapt | undefined, string>({
    key: "raptByIdSelector",
    get: (id: string) => ({ get }) => {
        const rapts = get(raptsAtom);
        return rapts.find(rapt => rapt.id === id);
    }
});