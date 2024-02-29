export const searchAPI = (search: string) =>
  `${process.env.API}/search?part=snippet&q=${search} karaoke&maxResults=50&key=${process.env.APIKEY}`;
