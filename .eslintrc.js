module.exports = {
  "extends": "google",
  "env": {
    "browser": true
  },
  "rules": {
    "no-unused-vars": "off",
    "semi": "off",
    "require-jsdoc": "off",
    "no-debugger": "off",
    "camelcase": "off",
    "max-len": ["error", 120, 4, {"ignoreUrls": true}]
  },
  "plugins": ["react"]
};