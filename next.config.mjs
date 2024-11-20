/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard/home',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig