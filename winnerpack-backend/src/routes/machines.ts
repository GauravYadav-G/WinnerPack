import { Router, Request, Response } from "express";
import { connectDB } from "../db";
import { Machine } from "../models";
import { initialMachines } from "../fallback-data";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/machines — public; auto-seeds if empty; falls back to initialMachines on DB failure
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const reseed = req.query.reseed === "true";

    try {
      await connectDB();

      if (reseed) {
        await Machine.deleteMany({});
      }

      let dbMachines = await Machine.find({}).sort({ createdAt: -1 });

      if (dbMachines.length === 0) {
        await Machine.insertMany(initialMachines);
        dbMachines = await Machine.find({}).sort({ createdAt: -1 });
      }

      res.json(dbMachines);
    } catch (dbErr) {
      console.warn("DB connection failed in machines GET, falling back to static contents:", dbErr);
      res.json(initialMachines);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/machines — protected; creates new machine
router.post("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const body = req.body;

    if (!body.model) {
      res.status(400).json({ error: "Machine model is required" });
      return;
    }

    const newMachine = await Machine.create(body);
    res.status(201).json(newMachine);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/machines/:id — public; looks up by model field; falls back to initialMachines
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    try {
      await connectDB();
      const machine = await Machine.findOne({ model: id });
      if (machine) {
        res.json(machine);
        return;
      }
    } catch (dbErr) {
      console.warn("DB connection failed in machine GET, falling back to static contents:", dbErr);
    }

    // Fallback if DB is disconnected/fails or machine not found in DB
    const fallbackMachine = initialMachines.find((m) => m.model === id);
    if (!fallbackMachine) {
      res.status(404).json({ error: "Machine not found" });
      return;
    }
    res.json(fallbackMachine);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/machines/:id — protected; update by model field
router.put("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await connectDB();
    const updatedMachine = await Machine.findOneAndUpdate(
      { model: id },
      req.body,
      { new: true }
    );
    if (!updatedMachine) {
      res.status(404).json({ error: "Machine not found" });
      return;
    }
    res.json(updatedMachine);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/machines/:id — protected; hard-delete by model field
router.delete("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await connectDB();
    const deletedMachine = await Machine.findOneAndDelete({ model: id });
    if (!deletedMachine) {
      res.status(404).json({ error: "Machine not found" });
      return;
    }
    res.json({ message: "Machine deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
