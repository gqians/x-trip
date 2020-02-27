module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
	    "indent": ["error", "tab"],
		"no-tabs": "off",
		"semi": [2, "always"],
		"camelcase": 2,
		"css-rcurlyexpected":0,
		"react/jsx-filename-extension": [0],
		"jsx-a11y/anchor-is-valid": [0],
		"no-multi-spaces": 2,
		"jsx-quotes": 2,
		"react/jsx-closing-bracket-location": 2,
		"react/jsx-boolean-value": 2,
		"react/wrap-multilines": 0,
		"react/no-string-refs": 1,
		"react/self-closing-comp": 1,
		"react/jsx-pascal-case": 2,
		"template-curly-spacing": [1, "always"],
		"prefer-const": 1,
		"react/prefer-es6-class": 1,
		"react/jsx-filename-extension": [1, {
			"extensions": [".js", ".jsx"]
		}],
		"react/jsx-curly-spacing": [1, "always"], //在jsx属性和表达式中强制空格。
		"react/no-deprecated": 1, //不使用弃用的方法
		"react/jsx-no-undef": 1, //在jsx中禁止未声明的变量
		"no-undef": 1, //不能有未定义的变量
		"react/jsx-no-duplicate-props": 1, //防止在jsx中重复的props
		"react/jsx-key": 1, //子数组和迭代器中验证jsx具有key属性
		"react/no-array-index-key": 1, //防止在数组中遍历中使用数组key做索引
		"class-methods-use-this": 0, //该规则旨在标记不使用的类方法this
		"no-empty": 1, //块语句中的内容不能为空
		"no-case-declarations": 1, //不允许在 case 子句中使用词法声明
		"no-return-assign": 1, //禁止在 return 语句中使用赋值语句
		"no-param-reassign": 1, //不允许对function对参数重新赋值
		"no-shadow": 1, //禁止 var 声明 与外层作用域的变量同名
		"camelcase": 2, //强制使用骆驼拼写法命名约定
		"no-unused-vars": 2, //禁止出现未使用过的变量
		"react/jsx-closing-tag-location": 1, //强制执行多行JSX元素的结束标记位置
		"react/jsx-no-literals": 0, //在JSX中使用文字字符串时，您可以将其包装在JSX容器中{'TEXT'}
		"no-prototype-builtins":0,
  }
}
