import prisma from "../src/lib/prisma-client";

const ROLES = ["USER", "ADMIN", "SUPERADMIN", "STAFF", "VENDOR", "AUDITOR"].map(
  (role) => ({ role_name: role })
);

async function main() {
  // roles
}
