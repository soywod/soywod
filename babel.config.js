module.exports = api => {
  api.cache(true)

  return {
    presets: [
      ["@babel/env", {targets: "> 0.25%", useBuiltIns: "usage", corejs: "3.6.4"}],
      "next/babel",
    ],
  }
}
