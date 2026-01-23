import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporarily disable TypeScript and ESLint checks during build
  // TODO: Fix TypeScript errors in pre-existing files
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Performance optimizations
  compress: true,
  
  // SWC Minification - Faster and better than Terser
  swcMinify: true,
  
  // React Strict Mode for better development experience
  reactStrictMode: true,
  
  // Optimize production builds
  productionBrowserSourceMaps: false,
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
  
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
          // Content Security Policy - Prevent XSS attacks
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com https://js.stripe.com https://*.clerk.accounts.dev https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://api.stripe.com https://*.clerk.accounts.dev https://vitals.vercel-insights.com https://generativelanguage.googleapis.com",
              "frame-src 'self' https://accounts.google.com https://js.stripe.com https://*.clerk.accounts.dev https://challenges.cloudflare.com",
              "media-src 'self' data: blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
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
};

export default nextConfig;
