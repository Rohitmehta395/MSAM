import 'server-only';
import { serverEnv } from '@/config/server-env';
import type { TrustedProxyStrategy } from './types';

/**
 * Validates whether a string is a well-formed IPv4 or IPv6 address.
 * Rejects malformed strings, hostnames, ports, and multi-IP values.
 */
export function isValidIp(ip: string): boolean {
  if (!ip || typeof ip !== 'string') return false;
  const trimmed = ip.trim();

  // IPv4 check: 4 octets, 0-255 each, no leading zeroes unless '0'
  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const v4Match = trimmed.match(ipv4Regex);
  if (v4Match) {
    return v4Match.slice(1, 5).every((octet) => {
      const num = Number(octet);
      return num >= 0 && num <= 255 && String(num) === octet;
    });
  }

  // IPv6 check: colons, hexadecimal, 2-8 groups
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
  if (ipv6Regex.test(trimmed)) {
    return true;
  }

  return false;
}

/**
 * Default fallback identifier when client IP cannot be securely established.
 * Using a unified identifier ensures unverified clients share a rate limit bucket,
 * preventing attackers from bypassing limits by rotating spoofed headers.
 */
export const UNTRUSTED_CLIENT_IP = 'untrusted-client';

/**
 * Resolves the client IP address under the designated trust policy.
 *
 * TRUST STRATEGIES & DEPLOYMENT ASSUMPTIONS:
 * 1. 'none' (Default in development & local testing):
 *    Assumes a direct untrusted client connection or unknown proxy architecture.
 *    Client-supplied headers (x-real-ip, x-forwarded-for, etc.) are completely ignored
 *    to prevent attackers from bypassing rate limits by rotating spoofed addresses.
 *    Returns UNTRUSTED_CLIENT_IP ('untrusted-client').
 *
 * 2. 'vercel' (Default in production per architecture roadmap line 131):
 *    DEPLOYMENT ASSUMPTION: This mode assumes the application is hosted on Vercel's edge
 *    network. Vercel edge routers guarantee that client-supplied x-real-ip and x-vercel-ip
 *    headers are stripped/overwritten with the connecting TCP socket IP.
 *    CRITICAL WARNING: If this application is deployed outside of Vercel (e.g. standalone Node,
 *    Docker container, AWS ECS, or Render) without a dedicated edge proxy that strips incoming
 *    headers, DO NOT use 'vercel' mode because attackers can forge x-real-ip. In such
 *    deployments, explicitly configure TRUST_PROXY_STRATEGY='trusted-proxy' or 'none'.
 *
 * 3. 'trusted-proxy':
 *    DEPLOYMENT ASSUMPTION: Assumes exactly one trusted reverse proxy (e.g. AWS ALB, Cloudflare,
 *    Nginx) sits directly in front of the application. The trusted proxy appends the connecting
 *    client IP to the end of x-forwarded-for. The function extracts the last (rightmost) IP,
 *    bypassing any client-spoofed prefix addresses.
 */
export function getClientIp(req: Request, strategyOverride?: TrustedProxyStrategy): string {
  const strategy = strategyOverride ?? serverEnv.TRUST_PROXY_STRATEGY;

  switch (strategy) {
    case 'none':
      return UNTRUSTED_CLIENT_IP;

    case 'vercel': {
      // Vercel edge guarantees x-real-ip / x-vercel-ip are overwritten by edge
      const vercelIp = (req.headers.get('x-vercel-ip') || req.headers.get('x-real-ip'))?.trim();
      if (vercelIp && isValidIp(vercelIp)) {
        return vercelIp;
      }
      return UNTRUSTED_CLIENT_IP;
    }

    case 'trusted-proxy': {
      // Behind 1 trusted proxy: client IP is the rightmost entry appended by the proxy
      const forwardedFor = req.headers.get('x-forwarded-for')?.trim();
      if (forwardedFor) {
        const parts = forwardedFor
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean);
        const rightmostIp = parts[parts.length - 1];
        if (rightmostIp && isValidIp(rightmostIp)) {
          return rightmostIp;
        }
      }
      return UNTRUSTED_CLIENT_IP;
    }

    default:
      return UNTRUSTED_CLIENT_IP;
  }
}

/**
 * Anonymizes/masks an IP address for safe logging without exposing personal network identifiers.
 * IPv4: 192.168.1.100 -> 192.168.1.xxx
 * IPv6: 2001:db8:85a3::8a2e -> 2001:db8:85a3::xxxx
 */
export function maskIp(ip: string): string {
  if (ip === UNTRUSTED_CLIENT_IP) {
    return 'untrusted-client';
  }
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
    }
  } else if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length > 2) {
      return `${parts.slice(0, 3).join(':')}::xxxx`;
    }
  }
  return 'xxx.xxx.xxx.xxx';
}
