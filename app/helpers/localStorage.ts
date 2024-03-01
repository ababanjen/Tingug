export const setLocalQueues = (queues: any[]) =>
  localStorage.setItem("queues", JSON.stringify(queues));

export const getLocalQueues = () =>
  JSON.parse(localStorage.getItem("queues") || '""') || [];

  export const setLocalFavorites = (favorites:any[]) =>   localStorage.setItem("favQueues", JSON.stringify(favorites));

  export const getLocalFavorites = () =>
  JSON.parse(localStorage.getItem("favQueues") || '""') || [];
