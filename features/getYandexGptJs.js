const axios = require('axios')

module.exports = async function makeGptRequest(prompt) {
    const token = await axios.get('https://functions.yandexcloud.net/d4e9bou6oqqcvv9mpjch')
    const url = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion'

    console.log(token.data.access_token)

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
        'Authorization': `${token.data.token_type} ${token.data.access_token}`,
    }

    try {
        const response = await axios.post(url, data, { headers })
        return response.data.result.alternatives[0].message.text
    } catch (error) {
        console.error('Ошибка при выполнении запроса к Yandex GPT', error)
        throw error;
    }
}