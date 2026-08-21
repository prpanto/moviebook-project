import type { Request, Response } from "express";
import { Movie } from "../services";

class Controller {
  async list(req: Request, res: Response) {
    const type = (req.query.type as string) || "now_playing";
    const page = (req.query.page as string) || "1";
    
    const data = await Movie.list(type, page);

    return res.json(data);
  }

  async search(req: Request, res: Response) {
    const q = req.query.q as string;
    const page = (req.query.page as string) || "1";

    try {
      const data = await Movie.search(q, page);

      return res.json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async detail(req: Request, res: Response) {
    try {
      const data = await Movie.detail(req.params.id as string);

      return res.json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async credits(req: Request, res: Response) {
    try {
      const data = await Movie.credits(req.params.id as string);

      return res.json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async genres(req: Request, res: Response) {
    try {
      const data = await Movie.genres();

      return res.json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new Controller();
