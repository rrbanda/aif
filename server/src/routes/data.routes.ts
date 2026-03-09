import { Router, type Request, type Response, type NextFunction } from "express";
import {
  listCustomers,
  getCustomer,
  getCustomerModels,
  getCustomerModel,
  getCustomerPortfolio,
  getCustomerUseCase,
  getCustomerMetrics,
  getCustomerInfrastructure,
  getCustomerDeliverables,
  getCustomerDeliverable,
  getCustomerStates,
  getCustomerTraining,
  getPersonas,
} from "../services/data.service.js";

const router = Router();

function p(val: string | string[] | undefined): string {
  return Array.isArray(val) ? val[0] : val || "";
}

router.get(
  "/personas",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getPersonas();
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/customers",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const customers = await listCustomers();
      res.json({ customers, count: customers.length });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/customers/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getCustomer(p(req.params.id));
      if (!data) return res.status(404).json({ error: "Customer not found" });
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/customers/:id/models",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const models = await getCustomerModels(p(req.params.id));
      res.json({ models, count: models.length });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/customers/:id/models/:modelId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model = await getCustomerModel(p(req.params.id), p(req.params.modelId));
      if (!model) return res.status(404).json({ error: "Model not found" });
      res.json(model);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/customers/:id/portfolio",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const useCases = await getCustomerPortfolio(p(req.params.id));
      res.json({ use_cases: useCases, count: useCases.length });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/customers/:id/portfolio/:ucId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uc = await getCustomerUseCase(p(req.params.id), p(req.params.ucId));
      if (!uc) return res.status(404).json({ error: "Use case not found" });
      res.json(uc);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/customers/:id/metrics/:modelId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const metrics = await getCustomerMetrics(
        p(req.params.id),
        p(req.params.modelId)
      );
      res.json(metrics ?? { entries: [] });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/customers/:id/infrastructure",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const infra = await getCustomerInfrastructure(p(req.params.id));
      res.json(infra ?? {});
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/customers/:id/deliverables",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deliverables = await getCustomerDeliverables(p(req.params.id));
      res.json({ deliverables, count: deliverables.length });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/customers/:id/deliverables/:filename",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const content = await getCustomerDeliverable(
        p(req.params.id),
        p(req.params.filename)
      );
      if (!content)
        return res.status(404).json({ error: "Deliverable not found" });
      res.type("text/plain").send(content);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/customers/:id/states",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const states = await getCustomerStates(p(req.params.id));
      res.json({ states, count: states.length });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/customers/:id/training",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const training = await getCustomerTraining(p(req.params.id));
      res.json({ members: training, count: training.length });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
