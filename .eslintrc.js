module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential', // this is a default sub-set of rules for your .vue files
    '@vue/typescript' // default typescript related rules
  ],
  rules: {    
   'vue/no-use-v-if-with-v-for': 'error',
    'vue/no-parsing-error': 'error',
    'vue/no-unused-vars': 'error',
    'no-useless-escape': 'error',
    'no-case-declarations': 'error',
	
	 "no-alert": 0,
	 "semi": [2, "always"],
	 "no-multi-spaces": "error",
     "quotes": ["error", "single"]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}


 // "parserOptions": {
 //        "ecmaVersion": 2018,
 //        "sourceType": "module",
 //        "ecmaFeatures": {
 //            "jsx": true
 //        },
 //        "allowImportExportEverywhere": false
 //    },