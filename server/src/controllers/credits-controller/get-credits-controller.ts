import { Request, Response } from "express";
import creditsService from "../../services/credits-service";


export default (req: Request, res: Response) => {

  const credits = creditsService.getCredits();
  res.send(credits);
}
