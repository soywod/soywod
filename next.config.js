/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    loader: "custom",
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "js-yaml-loader",
    });
    config.module.rules.push({
      test: /\.toml$/,
      use: "@lcdev/toml-loader",
    });
    return config;
  },
};
