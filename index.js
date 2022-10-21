const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '5633009251:AAEo9_RULZYTanz1IKNj1H9k1WFd5D8qGAk'

const bot = new TelegramApi(token,{polling:true})

bot.setMyCommands([
    {command:'/start',description:'Запуск бота'},
    {command:'/info',description:'Для чего этот бот нужен'},
    {command:'/game',description:'Поиграть в игрульку пока меня нет'},
])


const chats={}



const startGame= async (chatId) =>{
            await bot.sendMessage(chatId, 'Сейчас мы поиграем в игру, крууутую\nЯ закадал число, отгадай')
            const randomNumber = Math.floor(Math.random()*10)
            chats[chatId]= randomNumber;
            await bot.sendMessage(chatId,'Отгадывай',gameOptions)
}

  const start=()=>{
    bot.on('message', async ( msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        if (text == '/start'){
            await bot.sendPhoto(chatId,'https://yobte.ru/uploads/posts/2019-11/panda-54-foto-28.jpg')
            return bot.sendMessage(chatId, `Здарова вас приветствует бот армейца`);
        }
        if (text == '/info'){
            return bot.sendMessage(chatId, `Бот создан по фану.\nСдесь вы можите отслеживать через какое время я вернусь\u{1F607}, а так же можно поиграть в мини игру в игру "быки и коровы"\u{1F939}`);
        }
        if (text == '/game'){
            return startGame(chatId)
        }
        
        await bot.sendPhoto(chatId,'https://celes.club/uploads/posts/2021-11/1637626170_13-celes-club-p-grustnaya-panda-zhivotnie-krasivo-foto-18.jpg')   
        bot.sendMessage(chatId,`У создателя бота лапки и он не шарит в нейросетях \u{1F970}`)
            
            
        
      });
      bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if ('/again' == data){
            return startGame(chatId)
        }
        if (String(data) === String(chats[chatId])){
            return await bot.sendMessage(chatId,'Красава изи победа',againOptions)
        }else{
            await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`,againOptions);
        }
        
        
    })
  }
  start()