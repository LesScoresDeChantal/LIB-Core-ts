import type { OutgoingHttpHeaders } from 'http';
import https from 'https';

export function getRAW(url: string, headers: OutgoingHttpHeaders = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    });

    req.on('error', reject);
    req.end();
  });
}

export async function get(url: string, headers: OutgoingHttpHeaders = {}): Promise<any> {
  const data = await getRAW(url, headers);
  try {
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to parse JSON from '${url}': ${error.message}`);
  }
}

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | string;

export function requestRAW(method: HTTPMethod, url: string, headers: OutgoingHttpHeaders = {}, body?: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method, headers,
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    });

    req.on('error', reject);

    if (body) req.end(body);
    else req.end();
  });
}

export async function request(method: HTTPMethod, url: string, headers: OutgoingHttpHeaders = {}, body?: any): Promise<any> {
  const data = await requestRAW(method, url, headers, body);
  try {
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to parse JSON from '${url}': ${error.message}`);
  }
}
