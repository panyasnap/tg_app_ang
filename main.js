import {Telegraf, Markup} from "telegraf";
import {message} from "telegraf/filters";
import 'dotenv/config'

const token = process.env.TOKEN

const bot = new Telegraf(token)

const webAppUrl = 'https://miniapp-tg.web.app'
bot.command('start', (ctx) => {
    ctx.reply('Привет, нажми на кнопку ниже чтобы запустить приложение!',
        Markup.keyboard([
            Markup.button.webApp(
                "Отправить", webAppUrl + '/feedback'
            )
        ]).resize())
})
bot.on(message('web_app_data'),async ctx => {
    const data = ctx.webAppData.data.json()
    ctx.reply(`Ваше сообщение: ${data?.feedback}`?? 'empty message')
})
bot.launch()