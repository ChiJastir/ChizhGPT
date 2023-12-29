import {Message} from "node-telegram-bot-api";
import client from "./api";
import {gql} from "graphql-request";
import {textNormalize} from "./utils";

const makeGptRequest = require('./features/getYandexGpt')
const TelegramBot = require('node-telegram-bot-api')

const API_KEY_BOT = '6948871781:AAGTvDEw6XEE3WJc9tkHYhITvRU5TbSmmI0';
const bot = new TelegramBot(API_KEY_BOT, {
    polling: true
})

bot.on('text', async (msg: Message) => {
    console.log({role: 'user', text: msg.text})
    // await bot.sendMessage(6948325826,'у меня кошка отжала ноут. я отдыхаю')
    if (msg.text === '/start') {
        const createChat = gql`
            mutation{
                initChat(input: {
                    chat: ${msg.chat.id},
                    first_name: "${msg.chat.first_name}",
                    last_name: "${msg.chat.last_name}",
                    user_name: "${msg.chat.username}",
                }){
                    id,
                    chat,
                    first_name,
                    last_name,
                    user_name
                }
            }
        `

        await client.request(createChat)
        await bot.sendMessage(msg.chat.id, 'Добро пожаловать) Этот бот базируется на YandexGPT. Для начала работы просто напиши свой запрос')
    }
    else {
        const createMessage = gql`
            mutation{
                addMessage(input: {
                    chat_id: ${msg.chat.id},
                    text: "${textNormalize(msg.text ?? '')}",
                    role: "user",
                    type: "text"
                }){
                    id,
                    chat_id,
                    type,
                    role,
                    text
                }
            }
        `
        await client.request(createMessage)
        const msgWait = await bot.sendMessage(msg.chat.id, `Чиж думает...`);

        const getMessages = gql`
            query{
                getMessages(input: {
                    chat_id: ${msg.chat.id}
                }){
                    role,
                    text
                }
            }
        `
        const asd: any = await client.request(getMessages)
        console.log(asd.getMessages)
        makeGptRequest(asd.getMessages).then(async (generatedText: string) => {
            console.log(generatedText)
            const createGptMessage = gql`
                mutation{
                    addMessage(input: {
                        chat_id: ${msg.chat.id},
                        text: "${textNormalize(generatedText)}",
                        role: "assistant",
                        type: "text"
                    }){
                        id,
                        chat_id,
                        text,
                        role,
                        type
                    }
                }
            `
            await client.request(createGptMessage)
            await bot.editMessageText(generatedText, {
                chat_id: msgWait.chat.id,
                message_id: msgWait.message_id
            })
        })
    }
})