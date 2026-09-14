const API_URL = import.meta.env.VITE_API_URL || '/api'

export async function api(path, { token, ...options } = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
    ...options,
  })
  const data = response.status === 204 ? null : await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(data?.message || 'The server API is unavailable. Check the Vercel deployment and environment variables.')
  }
  return data
}
