import { fetcher } from "@/utils";

class Movie {
  async fetcher(path: string, options: RequestInit | undefined = {}) {
    const THEMOVIEDB_API_URL = process.env.THEMOVIEDB_API_URL;
    const THEMOVIEDB_ACCESS_TOKEN = process.env.THEMOVIEDB_ACCESS_TOKEN;

    if (!THEMOVIEDB_API_URL || !THEMOVIEDB_ACCESS_TOKEN) {
      throw new Error("The Movie Database environment variables are not configured.");
    }

    const url = `${THEMOVIEDB_API_URL}${path}`;

    options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${THEMOVIEDB_ACCESS_TOKEN}`,
      },
      ...options,
    };

    return await fetcher(url, options);
  }

  async list(type: string, page: string) {
    return await this.fetcher(`/movie/${type}?language=en-US&page=${page}`);
  }

  async search(q: string, page: string) {
    return await this.fetcher(`/search/movie?query=${encodeURIComponent(q)}&language=en-US&page=${page}`);
  }

  async detail(id: string) {
    return await this.fetcher(`/movie/${encodeURIComponent(String(id))}?language=en-US`);
  }

  async credits(id: string) {
    return await this.fetcher(`/movie/${encodeURIComponent(String(id))}/credits?language=en-US`);
  }

  async genres() {
    return await this.fetcher('/genre/movie/list');
  }
}

export default new Movie();
