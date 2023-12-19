const axios = require('axios')

module.exports = async function makeGptRequest(prompt: string) {
    const apiKey = 't1.9euelZrMkcmenImZz8vMkcedk8uaju3rnpWanZOQi5WKnM-Mm5jInJnJj5Hl8_czYHhT-e9GTVZ__d3z93MOdlP570ZNVn_9zef1656VmpiOkZrIx82ZipDOyZSXlZKJ7_zF656VmpiOkZrIx82ZipDOyZSXlZKJ.YjHqrk0uEwL4lkx4MFUwM2gKbuKJ4CQOzmjs8M-_wg1yMfuaEryTauSolF8Bg8GH5dSXYH5t-VrBx5td0ZXQAg'
    const url = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion'

    const data = {
        "modelUri": "gpt://b1g6qmudmdql1joi7u5j/yandexgpt-lite",
        "completionOptions": {
        "stream": false,
            "temperature": 0.6,
            "maxTokens": "2000"
    },
        "messages": [
            {
                "role": "user",
                "text": prompt
            },
        ]
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    }

    try {
        const response = await axios.post(url, data, { headers })
        return response.data.result.alternatives[0].message.text
    } catch (error) {
        console.error('Ошибка при выполнении запроса к Yandex GPT API:', error)
        throw error;
    }
}