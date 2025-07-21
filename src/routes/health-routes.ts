import { Request, Response, Router } from "express";

const healthRoutes = Router();

healthRoutes.get("/api/health", lidarComARequisicao);

function lidarComARequisicao(request: Request, response: Response) {
  // console.log("  EXECUTANDO o /api/health");

  // throw new Error("TESTE");

  response.json({
    data: `Healthy - ${new Date().toISOString()}`,
  });
}

export default healthRoutes;
