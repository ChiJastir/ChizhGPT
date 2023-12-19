import {Message} from "node-telegram-bot-api";

const makeGptRequest = require('./features/getYandexGpt')
const TelegramBot = require('node-telegram-bot-api')

const API_KEY_BOT = '';
const bot = new TelegramBot(API_KEY_BOT, {
    polling: true
})

bot.on('text', async (msg: Message) => {
    if (msg.text === '/start') {
        await bot.sendMessage(msg.chat.id, 'Добро пожаловать) Этот бот базируется на YandexGPT. Для начала работы просто напиши свой запрос')
    }
    else {
        const msgWait = await bot.sendMessage(msg.chat.id, `Чиж думает...`);

        makeGptRequest(msg.text ?? '').then((generatedText: string) => {
            // bot.deleteMessage(msgWait.chat.id, msgWait.message_id);
            // bot.sendMessage(msg.chat.id, generatedText)

            bot.editMessageText(generatedText, {
                chat_id: msgWait.chat.id,
                message_id: msgWait.message_id
            })
        }).catch((error: any) => {
            console.error(error)
        })
    }
})