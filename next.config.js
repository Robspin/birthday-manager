/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const webpack = (config) => {
  config.infrastructureLogging = {
    level: "error",
  }
  return config
}

module.exports = { nextConfig, webpack }
