import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { config } from "../config/env";
import { Admin } from "../models/Admin";

const SALT_ROUNDS = 10;
const ADMIN_EMAIL = "nomanshabbir10@gmail.com";
const ADMIN_PASSWORD = "Ns12345@";

const seedAdmin = async () => {
  try {
    await mongoose.connect(config.databaseUrl);
    console.log("MongoDB connected");

    const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log("Admin already exists, updating password...");
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);
      await Admin.updateOne({ email: ADMIN_EMAIL }, { password: hashedPassword });
      console.log("Admin password updated successfully");
    } else {
      console.log("Creating admin user...");
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);
      await Admin.create({
        email: ADMIN_EMAIL,
        password: hashedPassword
      });
      console.log("Admin user created successfully");
    }

    await mongoose.disconnect();
    console.log("Database disconnected");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAdmin();

