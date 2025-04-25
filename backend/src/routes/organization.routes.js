import express from "express";
import { Organization } from "../model/organization.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, price, plan, address, adminPass, adminName } = req.body;

    const org = await Organization.create({
      name,
      phone,
      email,
      price,
      plan,
      address,
      adminPass,  // Assuming it's a string (not a file)
      adminName,
    });

    console.log("Organization created:", org);

    res.status(201).json({ message: "Organization created", org });
  } catch (err) {
    console.error("Error creating organization:", err);
    res.status(500).json({ error: "Something went wrong", details: err });
  }
});

export default router;


    