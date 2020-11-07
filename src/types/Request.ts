import { Request } from "express";

export interface Session{
	userId?: string
}

export interface AuthRequest<T, K, Q> extends Request{
	userData?: Session,
	filename?: string
}
