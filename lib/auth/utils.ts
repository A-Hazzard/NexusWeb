import { User, Session } from '../database/schema';
import { db } from '../database/connection';

// Simple JWT-like token generation (in production, use a proper JWT library)
export function generateToken(): string {
  return crypto.randomUUID() + '.' + Date.now() + '.' + Math.random().toString(36).substr(2, 9);
}

// Simple password hashing (in production, use bcrypt or similar)
export function hashPassword(password: string): string {
  // This is a simple hash for development - in production use bcrypt
  return btoa(password + 'nexusweb-salt').replace(/[^a-zA-Z0-9]/g, '');
}

export function verifyPassword(password: string, hash: string): boolean {
  const expectedHash = hashPassword(password);
  return hash === expectedHash;
}

// Session management
export async function createSession(userId: string): Promise<Session> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const session = await db.create('sessions', {
    user_id: userId,
    token,
    expires_at: expiresAt,
  });

  return session;
}

export async function validateSession(token: string): Promise<User | null> {
  const session = await db.findSessionByToken(token);
  
  if (!session) return null;
  
  if (session.expires_at < new Date()) {
    // Session expired, delete it
    await db.delete('sessions', session.id);
    return null;
  }

  const user = await db.findById('users', session.user_id);
  return user;
}

export async function deleteSession(token: string): Promise<boolean> {
  const session = await db.findSessionByToken(token);
  if (!session) return false;

  return await db.delete('sessions', session.id);
}

// User authentication
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await db.findUserByEmail(email);
  
  if (!user || !user.is_active) return null;
  
  if (!verifyPassword(password, user.password_hash)) return null;
  
  // Update last login
  await db.update('users', user.id, { last_login: new Date() });
  
  return user;
}

// Role-based access control
export function hasPermission(user: User, requiredRole: User['role']): boolean {
  const roleHierarchy = {
    'admin': 4,
    'editor': 3,
    'author': 2,
    'contributor': 1,
  };

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

export function canEditPost(user: User, postAuthorId?: string): boolean {
  if (hasPermission(user, 'editor')) return true;
  if (user.role === 'author' && postAuthorId === user.id) return true;
  return false;
}

export function canDeletePost(user: User, postAuthorId?: string): boolean {
  if (hasPermission(user, 'editor')) return true;
  if (user.role === 'author' && postAuthorId === user.id) return true;
  return false;
}

export function canManageUsers(user: User): boolean {
  return hasPermission(user, 'admin');
}

export function canManageCategories(user: User): boolean {
  return hasPermission(user, 'editor');
}

export function canManageTags(user: User): boolean {
  return hasPermission(user, 'editor');
}

export function canUploadMedia(user: User): boolean {
  return hasPermission(user, 'author');
}

// Middleware helper for API routes
export async function authenticateRequest(request: Request): Promise<User | null> {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  return await validateSession(token);
}

// Response helpers
export function createAuthResponse(user: User, session: Session) {
  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    token: session.token,
    expires_at: session.expires_at,
  };
}

export function createErrorResponse(message: string, status: number = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function createSuccessResponse(data: unknown, status: number = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
