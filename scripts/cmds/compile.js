const axios = require("axios");



module.exports = {

    config: {

        name: "compile",

        role: 2,

        category: "compiler",

    },

    onStart: async function ({ message, args }) {

        try {

            const code = args.join(" ");

            const language = /^#!\s*\/bin\/bash/.test(code) ? 'bash' :

                             /public\s+class\s+\w+/.test(code) && /public\s+static\s+void\s+main\s*\(/.test(code) ? 'java' :

                             /def\s+\w+\s*\(/.test(code) || /import\s+\w+/.test(code) || code.includes('print(') ? 'python' :

                             /^\s*#include\s+<.*?>/.test(code) || /namespace\s+\w+/.test(code) ? 'cpp' :

                             /^\s*using\s+System/.test(code) || /namespace\s+\w+/.test(code) ? 'csharp' :

                             /^\s*require\s*\(\s*['"][^'"]+['"]\s*\)/.test(code) || /function\s+\w+\s*\(/.test(code) || /console\.log\(/.test(code) ? 'node' :

                             /^\s*import\s+\w+/.test(code) || /function\s+\w+\s*\(/.test(code) ? 'typescript' :

                             /(\bfor\s+\w+\s+in\s+\w+|\bwhile\s+\w+|\becho\s+.*)/.test(code) ? 'bash' : 'unsupported';



            const { data } = await axios.post('https://apiv3-2l3o.onrender.com/compile', {

                language,

                code,

                input: ''

            });

            message.reply(data.output);

        } catch (error) {

            message.reply(error.response?.data || error.message);

        }

    }

};
