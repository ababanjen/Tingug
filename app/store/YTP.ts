import { create } from "zustand";

type SearchListTypes = any[] | null;
type CurrentPlayingTypes = {
  videoId: string;
  queue: number;
  title: string;
  singer: string;
} | null;

export type QueuesTypes =
  | {
      videoId: string;
      queue?: number;
      title: string;
      singer: string;
    }[]
  | null;

type TYPlayerStore = {
  list: SearchListTypes;
  currentPlaying: CurrentPlayingTypes;
  queues: QueuesTypes;
  rScores: number;
  finalScore: boolean;
  showSearch: boolean;
  successReservation: any;
  favorites: any;
  focusInput: boolean;
  expandSearchBar: boolean;
  skipScore: boolean;
  searchValue: string;
  setList: (data: SearchListTypes) => void;
  setCurrentPlaying: (data: CurrentPlayingTypes) => void;
  setQueues: (data: QueuesTypes) => void;
  setRScores: (data: number) => void;
  setFinalScore: (data: boolean) => void;
  setShowSearch: (data: boolean) => void;
  setSuccessReservation: (data: any) => void;
  setFavorites: (data: any) => void;
  setFocusInput: (data: boolean) => void;
  setExpandSearch: (data: boolean) => void;
  setSkipScore: (data: boolean) => void;
  setSearchValue: (data: string) => void;
};

export const useTYPlayerStore = create<TYPlayerStore>((set) => ({
  list: null,
  currentPlaying: null,
  queues: null,
  rScores: 0,
  finalScore: false,
  search: "",
  showSearch: false,
  successReservation: false,
  favorites: null,
  focusInput: false,
  expandSearchBar: true,
  skipScore: false,
  searchValue: "",
  setList: (data: SearchListTypes) => set(() => ({ list: data })),
  setCurrentPlaying: (data: CurrentPlayingTypes) =>
    set(() => ({ currentPlaying: data })),
  setQueues: (data: QueuesTypes) => set(() => ({ queues: data })),
  setRScores: (data: number) => set(() => ({ rScores: data })),
  setFinalScore: (data: boolean) => set(() => ({ finalScore: data })),
  setShowSearch: (data: boolean) => set(() => ({ showSearch: data })),
  setSuccessReservation: (data: any) =>
    set(() => ({ successReservation: data })),
  setFavorites: (data: any) => set(() => ({ favorites: data })),
  setFocusInput: (data: boolean) => set(() => ({ focusInput: data })),
  setExpandSearch: (data: boolean) => set(() => ({ expandSearchBar: data })),
  setSkipScore: (data: boolean) => set(() => ({ skipScore: data })),
  setSearchValue: (data: string) => set(() => ({ searchValue: data })),
}));
