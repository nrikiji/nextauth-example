import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions, prismaAdapter } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session?.user.id) {
    return res.status(401).end();
  }

  let user = await prismaAdapter.getUser(session!.user.id!);
  if (!user || user.email) {
    return res.status(401).end();
  }

  await prismaAdapter.updateUser({ ...user, email: req.body["email"] });

  res.status(200).json({});
}
