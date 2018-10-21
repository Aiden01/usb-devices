module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": ["plugin:prettier/recommended"],
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "plugins": ["prettier"],
    "rules": {
        "indent": [
            "error",
            4,
            { SwitchCase: 1 }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};