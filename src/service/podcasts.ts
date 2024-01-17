import { get, post } from "./networks";

// const paths = {
//   dashboard: `api/podcast-categories.json`,
//   singlePlaylist: ({ page, id }: { id: number; page: number }) =>
//     `api/playlistPodcasts.json?id=${id}&page=${page}`,
//   categoryPlaylist: ({ page, id }: { id: number; page: number }) =>
//     `api/categoryPlaylist.json?id=${id}&page=${page}`,
//   listSubjects: (page: number) => `api/podcast-subjects.json?page=${page}`,
//   listCategories: (page: number) =>
//     `api/podcast-allCategories.json?page=${page}`,
//   listArtists: (page: number) => `api/podcast-artists.json?page=${page}`,
//   listPlaylists: (page: number) => `api/podcast-playlists.json?page=${page}`,
//   listSubjectCategories: ({
//     page,
//     subjectId,
//   }: {
//     page: number;
//     subjectId: number;
//   }) => `api/subjectCategories.json?id=${subjectId}&page=${page}`,
//   listArtistPlaylists: ({
//     page,
//     artistId,
//   }: {
//     page: number;
//     artistId: number;
//   }) => `api/artistPlaylist.json?id=${artistId}?page=${page}`,
//   favouritePodcast: `api/podcast-favorite.json`,
// };

const paths = {
  dashboard: `api/dashboard.json`,
  podcastEpisodes: ({ page, id }: { id: number; page: number }) =>
    `api/podcastEpisodes.json?id=${id}&page=${page}`,
  categoryPodcasts: ({ page, id }: { id: number; page: number }) =>
    `api/categoryPodcasts.json?id=${id}&page=${page}`,
  listArtistPodcasts: ({
    page,
    artistId,
  }: {
    page: number;
    artistId: number;
  }) => `api/artistPodcasts.json?id=${artistId}&page=${page}`,
  listArtists: (page: number) => `api/getAllPodcasters.json?page=${page}`,
  listEpisodes: (page: number) => `api/getAllEpisodes.json`,

  listLanguagesCategories: ({
    page,
    languageId,
  }: {
    page: number;
    languageId: number;
  }) => `languageCategories`,
  favouritePodcast: `api/podcast-favorite.json`,
  listLanguages: (page: number) => `podcast-languages`,
  listCategories: (page: number) => `podcast-allCategories`,
  listPlaylists: (page: number) => `podcast-playlists`,
};

export const podcastDashboard = async ({
  token,
}: {
  token: string;
}): Promise<any> => {
  const url = paths.dashboard;
  // console.log('data...', token);
  const resp = await get(url, token);
  // console.log('data..', url, resp);

  return resp;
};

export const getPodcastEpisodes = async ({
  id,
  token,
  page,
}: {
  id: number;
  token: string;
  page: number;
}): Promise<any> => {
  const url = paths.podcastEpisodes({ id, page });
  const resp = await get(url, token);
  console.log("calling single playist..", resp, url, page);
  return resp;
};

export const getCategoryPodcasts = async ({ id, page, token }) => {
  console.log("getCategoryPlaylist", id, page, token);

  const url = paths.categoryPodcasts({ id, page });
  const resp = await get(url, token);
  console.log("url..", url, resp);
  return resp;
};

export const podcastLanguages = async ({
  page,
  token,
}: {
  token: string;
  page: number;
}): Promise<any> => {
  const url = paths.listLanguages(page);
  const resp = await get(url, token);
  console.log("url..", url, resp);
  return resp;
};

export const podcastCategories = async ({
  page,
  token,
}: {
  token: string;
  page: number;
}): Promise<any> => {
  const url = paths.listCategories(page);
  const resp = await get(url, token);
  console.log("url.....", url, resp);
  const Category = [
    {
      id: 1,
      name: "Sample 1",
      description: "Sample Audio 1",
      home_show: true,
    },
    {
      id: 2,
      name: "Sample 2",
      description: "Sample Audio 2",
      home_show: false,
    },
  ];
  const CategoryResp = [
    {
      categories: Category,
      total_pages: 1,
      current_page: 1,
    },
  ];

  return CategoryResp;
};

export const podcastArtists = async ({
  page,
  token,
}: {
  token: string;
  page: number;
}): Promise<any> => {
  const url = paths.listArtists(page);
  // console.log("ur....", url);
  const resp = await get(url, token);
  console.log("res..", url, resp);
  const Artist = [
    {
      id: 1,
      name: "Artist 1",
      description: "HipHop",
    },
    {
      id: 2,
      name: "Artist 2",
      description: "Carnatical Voice",
    },
  ];
  const ArtistResp = {
    podcasters: Artist,
    total_pages: 1,
    current_page: 1,
  };
  return ArtistResp;
};

export const podcastPlaylists = async ({
  page,
  token,
}: {
  token: string;
  page: number;
}): Promise<any> => {
  const url = paths.listPlaylists(page);
  const resp = await get(url, token);
  console.log("Playlist url..", url, resp);
  return resp;
};

export const podcastLanguagesCategories = async ({
  id,
  token,
  page,
}: {
  token: string;
  id: number;
  page: number;
}): Promise<any> => {
  const url = paths.listLanguagesCategories({ languageId: id, page });
  const resp = await get(url, token);
  console.log("cate.. resp..", url, resp);
  return resp;
};

export const artistPodcasts = async ({
  id,
  token,
  page,
}: {
  token: string;
  id: number;
  page: number;
}): Promise<any> => {
  const url = paths.listArtistPodcasts({ artistId: id, page });
  const resp = await get(url, token);
  // console.log('artist play resp..', url, resp);
  return resp;
};

export const podcastFabourites = async (
  token: string,
  params: { podcast: { podcast_id: number; status: boolean } }
): Promise<any> => {
  return await post(paths.favouritePodcast, token, params);
};

export const getAllEpisosdes = async ({ page, token }) => {
  const url = paths.listEpisodes(page);
  return await get(url, token);
};
