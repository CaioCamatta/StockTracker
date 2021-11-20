import express from "express";
var router = express.Router();

// Import controllers
import {
  addService,
  getActiveServices,
  removeService,
  activateService,
  deactivateService,
} from "../controller/serviceController";

/* GET active services (home age). */
router.get("/services", getActiveServices);

/* POST add new service. */
router.post("/service/add", addService);

/* DELETE remove service. */
router.delete("/service/remove", removeService);

/* POST activate service. */
router.post("/service/activate", activateService);

/* POST deactivate service. */
router.post("/service/deactivate", deactivateService);

export default router;
