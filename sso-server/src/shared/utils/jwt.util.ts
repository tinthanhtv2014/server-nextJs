import jwt from "jsonwebtoken";

export function createToken(payload: any): string {
  // const expiresIn = checkAcess ? "24h" : "30d";
  const token = jwt.sign(
    {
      userId: payload.userId,
      role: payload.role,
      emailAddress: payload.emailAddress,
      firstName: payload.firstName,
      lastName: payload.lastName,
      fullName: payload.fullName,
      address: payload.address,
      phoneNumber: payload.phoneNumber,
      privateKey: payload.privateKey,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "30d",
    }
  );
  return token;
}
