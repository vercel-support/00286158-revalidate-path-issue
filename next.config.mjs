/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/edge',
        destination: '/node',
      },
    ];
  }
};

export default nextConfig;
