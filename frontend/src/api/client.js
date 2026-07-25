/**
 * Tiny fetch wrapper: JSON handling, auth header, uniform error shape,
 * automatic redirect to /admin/login on 401 for admin calls.
 */
const BASE = '/api/v1';

export const getToken = () => localStorage.getItem('accessToken');
export const setTokens = ({ accessToken, refreshToken }) => {
  if (accessToken) localStorage.setItem('accessToken', accessToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
};
export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

async function request(path, { method = 'GET', body, isForm = false, auth = false } = {}) {
  const headers = {};
  if (!isForm) headers['Content-Type'] = 'application/json';
  if (auth && getToken()) headers.Authorization = `Bearer ${getToken()}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  let json = null;
  try {
    json = await res.json();
  } catch {
    /* non-JSON response */
  }

  if (res.status === 401 && auth) {
    // Try one silent refresh before giving up.
    const refreshed = await tryRefresh();
    if (refreshed) return request(path, { method, body, isForm, auth });
    clearTokens();
    if (window.location.pathname.startsWith('/admin')) window.location.href = '/admin/login';
  }

  if (!res.ok) {
    const message = json?.message || `Request failed (${res.status})`;
    const err = new Error(message);
    err.errors = json?.errors;
    err.status = res.status;
    throw err;
  }
  return json;
}

let refreshing = null;
async function tryRefresh() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return false;
  // Deduplicate concurrent refresh attempts.
  refreshing =
    refreshing ||
    fetch(`${BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
      .then(async (r) => {
        if (!r.ok) return false;
        const json = await r.json();
        setTokens({ accessToken: json.data.accessToken });
        return true;
      })
      .catch(() => false)
      .finally(() => {
        refreshing = null;
      });
  return refreshing;
}

export const api = {
  get: (path, auth = false) => request(path, { auth }),
  post: (path, body, auth = false) => request(path, { method: 'POST', body, auth }),
  put: (path, body, auth = false) => request(path, { method: 'PUT', body, auth }),
  patch: (path, body, auth = false) => request(path, { method: 'PATCH', body, auth }),
  delete: (path, auth = false) => request(path, { method: 'DELETE', auth }),
  postForm: (path, formData) => request(path, { method: 'POST', body: formData, isForm: true, auth: true }),
  putForm: (path, formData) => request(path, { method: 'PUT', body: formData, isForm: true, auth: true }),
};
