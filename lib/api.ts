const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestConfig = {
  method?: HttpMethod;
  body?: any;
  isFormData?: boolean;
  token?: string | null;
  headers?: Record<string, string>;
};

async function request<T>(
  url: string,
  {
    method = "GET",
    body,
    isFormData = false,
    token,
    headers = {},
  }: RequestConfig = {}
): Promise<T> {
  const finalHeaders: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...headers,
  };

  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers: finalHeaders,
  };

  if (body !== undefined && body !== null) {
    options.body = isFormData ? body : JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${url}`, options);

  if (!res.ok) {
    let message = res.statusText;
    try {
      const errorBody = await res.json();
      message = errorBody.message || JSON.stringify(errorBody);
    } catch {
      const text = await res.text();
      if (text) message = text;
    }

    throw new Error(message);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

export const api = {
  get: <T>(url: string, token?: string | null) =>
    request<T>(url, { method: "GET", token }),

  post: <T>(url: string, body: unknown, token?: string | null) =>
    request<T>(url, { method: "POST", body, token }),

  put: <T>(url: string, body: unknown, token?: string | null) =>
    request<T>(url, { method: "PUT", body, token }),

  patch: <T>(url: string, body: unknown, token?: string | null) =>
    request<T>(url, { method: "PATCH", body, token }),

  delete: <T>(url: string, token?: string | null) =>
    request<T>(url, { method: "DELETE", token }),

  postForm: <T>(url: string, formData: FormData, token?: string | null) =>
    request<T>(url, {
      method: "POST",
      body: formData,
      isFormData: true,
      token,
    }),

  putForm: <T>(url: string, formData: FormData, token?: string | null) =>
    request<T>(url, {
      method: "PUT",
      body: formData,
      isFormData: true,
      token,
    }),
};
