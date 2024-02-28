export const searchAPI = (search: string) =>
  `${process.env.API}?part=snippet&q=${search} karaoke&maxResults=50&key=${process.env.APIKEY}`;
