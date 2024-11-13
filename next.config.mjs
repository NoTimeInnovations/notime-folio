/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "notime-folio-payload.vercel.app",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },{
        protocol : "https",
        hostname : "d226h5j12693lp.cloudfront.net"
      }
    ],
  },
};

export default nextConfig;
