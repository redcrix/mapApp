// module.exports = {
//   root: true,
//   extends: '@react-native-community',
// };

module.exports = {
    'extends': '@react-native-community',
    'parser': 'babel-eslint',
    'env': {
        'jest': true,
    },
    'rules': {
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'comma-dangle': 'off',
        'prettier/prettier': 'off',
    },
    'globals': {
        "fetch": false
    }
}