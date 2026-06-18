// next.config.ts
const nextConfig = {
  allowedDevOrigins: ["confident-ladder-portside.ngrok-free.dev"],
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;

// next.config.ts
