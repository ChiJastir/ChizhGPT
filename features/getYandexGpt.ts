const axios = require('axios')

module.exports = async function makeGptRequest(prompt: string) {
    const apiKey = 't1.9euelZrNj82ckJmeipqaip3MyJuazu3rnpWanZOQi5WKnM-Mm5jInJnJj5Hl8_dsHXRT-e8Mbjwd_t3z9yxMcVP57wxuPB3-zef1656VmsicjsuUl8yRlYmbyJWOkYuO7_zF656VmsicjsuUl8yRlYmbyJWOkYuO.jwOwoSZJegZbzDgv0nvCEz93VAyS5qJlX_x2G6Dvm3ABC0IBArSEb10ad_N6pYP3-J6dcZiGYQ-4M1lYKOylAw'
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
        console.error('Ошибка при выполнении запроса к Yandex GPT')
        throw error;
    }
}