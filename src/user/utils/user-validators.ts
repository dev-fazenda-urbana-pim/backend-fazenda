import { sign } from "jsonwebtoken";

export function generateAccessToken(userId: string) {
  const token = sign(
    { userId },
    process.env.JWT_SECRET as string,
    {
      subject: userId,
      expiresIn: "1d",
    }
  )

  return token
}

export function isValidUUID(userId: string) {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(userId);
};