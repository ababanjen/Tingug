/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    API:process.env.API,
    APIKEY:process.env.APIKEY,
  }
};
export default nextConfig;
