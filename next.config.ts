// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;

// next.config.ts
