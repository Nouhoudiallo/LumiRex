"use server"
import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = bcrypt.genSaltSync(16);
  return bcrypt.hashSync(password, saltRounds);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
