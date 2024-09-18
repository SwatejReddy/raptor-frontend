import { atom, selectorFamily } from "recoil";
import { rapt } from "@/types/types";

export const latestRaptsAtom = atom<rapt[]>({
    key: "latestRaptsAtom",
    default: []
});

export const latestRaptByIdSelector = selectorFamily<rapt | undefined, string>({
    key: "latestRaptByIdSelector",
    get: (id: string) => ({ get }) => {
        const rapts = get(latestRaptsAtom);
        return rapts.find(rapt => rapt.id === id);
    }
});

export const userLatestRaptsAtom = atom<rapt[]>({
    key: "userLatestRaptsAtom",
    default: []
});

export const userLatestRaptsByIdSelector = selectorFamily<rapt | undefined, string>({
    key: "userLatestRaptsByIdSelector",
    get: (id: string) => ({ get }) => {
        const rapts = get(userLatestRaptsAtom);
        return rapts.find(rapt => rapt.id === id);
    }
});

export const userLikedRaptsAtom = atom<rapt[]>({
    key: "userLikedRaptsAtom",
    default: []
});

export const userLikedRaptsByIdSelector = selectorFamily<rapt | undefined, string>({
    key: "userLikedRaptsByIdSelector",
    get: (id: string) => ({ get }) => {
        const rapts = get(userLikedRaptsAtom);
        return rapts.find(rapt => rapt.id === id);
    }
});

export const searchedRaptsAtom = atom<rapt[]>({
    key: "searchedRaptsAtom",
    default: []
});

export const searchedRaptsByIdSelector = selectorFamily<rapt | undefined, string>({
    key: "searchedRaptsByIdSelector",
    get: (id: string) => ({ get }) => {
        const rapts = get(searchedRaptsAtom);
        return rapts.find(rapt => rapt.id === id);
    }
});
