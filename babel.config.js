module.exports = api => {
  api.cache(true)

  return {
    presets: [
      "next/babel",
      ["@babel/env", {targets: "> 0.25%", useBuiltIns: "usage", corejs: "3.6.4"}],
    ],
  }
}
