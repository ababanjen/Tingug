export const searchAPI = (search: string, limit?: number) =>
  `${process.env.API}/search?part=snippet&q=${search} karaoke&maxResults=${
    limit ?? 50
  }&chart=${limit ? "mostPopular" : ""}&key=${process.env.APIKEY}`;

export const searchByChannelId = (channelId: string) =>
  `${process.env.API}/search?part=snippet&channelId=${channelId}&maxResults=50&key=${process.env.APIKEY}`;
