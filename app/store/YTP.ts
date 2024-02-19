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
  finalScore:boolean;
  setList: (data: SearchListTypes) => void;
  setCurrentPlaying: (data: CurrentPlayingTypes) => void;
  setQueues: (data: QueuesTypes) => void;
  setRScores: (data: number) => void;
  setFinalScore: (data: boolean) => void;
};

export const useTYPlayerStore = create<TYPlayerStore>((set) => ({
  list: null,
  currentPlaying: null,
  queues: null,
  rScores: 0,
  finalScore:false,
  setList: (data: SearchListTypes) => set(() => ({ list: data })),
  setCurrentPlaying: (data: CurrentPlayingTypes) =>
    set(() => ({ currentPlaying: data })),
  setQueues: (data: QueuesTypes) => set(() => ({ queues: data })),
  setRScores: (data: number) => set(() => ({ rScores: data })),
  setFinalScore:(data: boolean) => set(() => ({ finalScore: data })),
}));
