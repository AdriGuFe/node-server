import { prisma } from '../../config/db.js';

export async function createTask(data: {
  title: string;
  description?: string;
  userId: number;
}) {
  return prisma.task.create({ data });
}

export async function listTasks(userId: number) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function findTaskById(id: number, userId: number) {
  return prisma.task.findFirst({
    where: { id, userId },
  });
}

export async function updateTask(
  id: number,
  userId: number,
  data: { title?: string; description?: string; done?: boolean },
) {
  // updateMany permite filtrar por userId (update solo acepta campos únicos)
  const result = await prisma.task.updateMany({
    where: { id, userId },
    data,
  });
  if (result.count === 0) return null;
  return findTaskById(id, userId);
}

export async function deleteTask(id: number, userId: number) {
  const result = await prisma.task.deleteMany({
    where: { id, userId },
  });
  return result.count > 0;
}