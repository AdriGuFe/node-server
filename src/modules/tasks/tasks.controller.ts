import type { Request, Response } from 'express';
import { createTask, listTasks, findTaskById, updateTask, deleteTask } from './tasks.service.js';

function fail(res: Response, error: any) {
  console.error('ERROR TAREAS:', error);
  if (error?.code === 'P2003') {
    return res.status(400).json({ error: 'El usuario asociado no existe' });
  }
  return res.status(500).json({ error: 'Error interno del servidor' });
}

export async function createTaskCtrl(req: Request, res: Response) {
  try {
    const task = await createTask({ ...req.body, userId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    fail(res, error);
  }
}

export async function listTasksCtrl(req: Request, res: Response) {
  try {
    res.json(await listTasks(req.user.id));
  } catch (error) {
    fail(res, error);
  }
}

export async function getTaskCtrl(req: Request, res: Response) {
  try {
    const task = await findTaskById(Number(req.params.id), req.user.id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    fail(res, error);
  }
}

export async function updateTaskCtrl(req: Request, res: Response) {
  try {
    const task = await updateTask(Number(req.params.id), req.user.id, req.body);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    fail(res, error);
  }
}

export async function deleteTaskCtrl(req: Request, res: Response) {
  try {
    const deleted = await deleteTask(Number(req.params.id), req.user.id);
    if (!deleted) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.status(204).send();
  } catch (error) {
    fail(res, error);
  }
}