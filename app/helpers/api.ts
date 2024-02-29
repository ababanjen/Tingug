export const searchAPI = (search: string, limit?: number) =>
  `${process.env.API}/search?part=snippet&q=${search} karaoke&maxResults=${limit}&key=${process.env.APIKEY}`;
