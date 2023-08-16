import { prisma } from '@/utils/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userSession = await getServerSession(req, res, authOptions);

  if (!userSession?.user) {
    res.status(401).json({ message: 'Unauthorized, not logged in' });
    return;
  }

  const orders = await prisma.order.findMany({
    where: { userId: userSession.user.id, status: 'Complete' },
    include: { products: true },
  });
  res.status(200).json(orders);
}
