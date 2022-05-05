const config = {
  verbose: true,
  preset: "ts-jest",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/constants.ts",
    "!src/types.ts",
    "!src/index.ts",
  ],
}

module.exports = config
