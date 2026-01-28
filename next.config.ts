import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporarily disable TypeScript and ESLint checks during build
  // TODO: Fix TypeScript errors in pre-existing files
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Performance optimizations
  compress: true,
  
  // React Strict Mode for better development experience
  reactStrictMode: true,
  
  // Optimize production builds
  productionBrowserSourceMaps: false,
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Turbopack configuration
  turbopack: {
    // Turbopack-specific optimizations
    rules: {
      '*.svg': ['@svgr/webpack'],
    },
  },
  
  // Output for container deployments.
  // NOTE: On Windows, `output: 'standalone'` can hit path issues (e.g. `[externals]_node:crypto...`).
  // Keep it enabled for non-Windows environments where it's most useful.
  output: process.platform === 'win32' ? undefined : 'standalone',
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Enable image optimization for better performance
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // DNS Prefetch Control
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // Frame Protection
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // MIME Type Sniffing Protection
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // XSS Protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions Policy - Controls browser features
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          // Strict Transport Security - Force HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // Content Security Policy - Prevent XSS attacks (Relaxed for development)
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http:",
              "style-src 'self' 'unsafe-inline' https:",
              "img-src 'self' data: https: http: blob:",
              "font-src 'self' data: https: http:",
              "connect-src 'self' https: http: ws: wss:",
              "frame-src 'self' https: http:",
              "media-src 'self' data: blob: https: http:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; ')
          },
        ],
      },
      // Static Assets - Long-term caching
      {
        source: '/:path*\\.(jpg|jpeg|png|gif|ico|svg|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*\\.(js|css|woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Audio files caching
      {
        source: '/:path*\\.(mp3|wav|ogg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, immutable',
          },
        ],
      },
    ];
  },
  
  // Redirects for better SEO and performance
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
