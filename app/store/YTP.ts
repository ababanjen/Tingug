import { create } from 'zustand'


type SearchListTypes = any[] | null
type CurrentPlayingTypes = {
  videoId: string;
  queue: number;
  title: string;
  singer: string;
} | null

export type QueuesTypes =
  | {
    videoId: string;
    queue?: number;
    title: string;
    singer: string;
  }[]
  | null


type TYPlayerStore = {
  list: SearchListTypes,
  currentPlaying: CurrentPlayingTypes,
  queues: QueuesTypes,
  setList: (data: SearchListTypes) => void,
  setCurrentPlaying: (data: CurrentPlayingTypes) => void,
  setQueues: (data: QueuesTypes) => void,
}

export const useTYPlayerStore = create<TYPlayerStore>((set) => ({
  list: null,
  currentPlaying: null,
  queues: null,
  setList: (data: SearchListTypes) => set(() => ({ list: data })),
  setCurrentPlaying: (data: CurrentPlayingTypes) => set(() => ({ currentPlaying: data })),
  setQueues: (data: QueuesTypes) => set(() => ({ queues: data })),
}));