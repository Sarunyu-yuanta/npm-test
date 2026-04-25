const KEY = "lumen.user";

export type StoredUser = {
  name: string;
  email: string;
  company?: string;
};

export function saveUser(user: StoredUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(user));
}

export function loadUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function clearUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export function updateUser(patch: Partial<StoredUser>) {
  const current = loadUser();
  if (!current) return;
  saveUser({ ...current, ...patch });
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
