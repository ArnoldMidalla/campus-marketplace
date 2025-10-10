/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "teyohuqtwvgtfjxrynqh.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io", // ✅ Added for ImageKit images
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig; // ✅ changed line — only one export
