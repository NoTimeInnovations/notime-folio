/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns : [
            {
                protocol : 'https',
                hostname : 'cdn.sanity.io'
            },
            {
                protocol : 'https',
                hostname : 'notime-folio-payload.vercel.app'
            }
        ]
    }
};

export default nextConfig;
