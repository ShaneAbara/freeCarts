/* 
  ____                _       _  __               _ 
 |  _ \              | |     | |/ _|             (_)
 | |_) |_   _        | | __ _| | |_ _ __ __ _ _____ 
 |  _ <| | | |   _   | |/ _` | |  _| '__/ _` |_  / |
 | |_) | |_| |  | |__| | (_| | | | | | | (_| |/ /| |
 |____/ \__, |   \____/ \__,_|_|_| |_|  \__,_/___|_|
         __/ |                                      
        |___/                                       
 */
var sleep = require('sleep');
var config = require('./config.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
var guild;
cartNum = 0

/* Server/guild ID */
server = config.server
/* This is a hidden channel, normal members should not be able to see this */
privateChannel = config.privateChannel
/* This is a public channel, 'everyone' should be able to see this */
publicChannel = config.publicChannel
/* Bot login token */
botToken = config.botToken

bot.login(botToken);

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.username}!`);
    guild = bot.guilds.get(server);
});


fileName = 'carts-' + (Math.round(((new Date).getTime())/1000)).toString() + '.json'
console.log(fileName)
fs.writeFile(fileName, '[]', 'utf8');


bot.on('message', message => {
    /* if (message.author.bot) return; */
    if (message.channel.type == 'dm') return;
    if (message.content === 'listroles') {
        findGuildMember(message, guild).then(member => {
            let str = '';
            for (let role of member.guild.roles.values()) {
                str += role.name + ' : ' + role.id + '\n';
            }
            message.author.send(str);
        });
    }
    if (message.channel.id == privateChannel) {
        cartNum += 1
        message.embeds.forEach((e) => {
            if (e.footer.text === 'Splashforce') {
                size = ((e.title).slice(20))
                email = (e.description).split(' ')[1].split('\n')[0]
                pass = (e.description).split(': ')[2]
                console.log('TESTING: ' + pass)
                loginURL = e.url
                img = e.thumbnail.url
                /* Look into getting sku from link /shrug */
                sku = ''
                console.log('Size: ' + size)
                console.log('Email:Pass : ' + email + ':' + pass)
                console.log('Login link: ' + loginURL)
                console.log('Image: ' + img)
                const embed = new Discord.RichEmbed()
                    .setColor(0x00FF00)
                    .setTimestamp()
                    .setDescription(`Size: ${size}`)
                    .setFooter(`Cart: # ${cartNum} • Made by Jalfrazi`, 'https://pbs.twimg.com/profile_images/999669687112749056/WK1RT5lY_400x400.jpg')
                    .setThumbnail(img)
                guild.channels.get(publicChannel).send({
                    embed
                });
                sleep.msleep(1500)
                writeCart(cartNum, email, pass, loginURL, img, size, sku)
            } else if (e.footer.text === 'yCopp Ultimate Adidas Bot') {
                //clothing size
                size = ((e.title).split(' ')[2].split(',')[0])
                email = (e.fields)[0]['value']
                pass = (e.fields)[1]['value']

                loginURL = e.url
                img = ''
                sku = ((e.title).split(',')[0])
                console.log('Size: ' + size)
                console.log('Email:Pass : ' + email + ':' + pass)
                console.log('Login link: ' + loginURL)
                console.log('Image: ' + img)
                const embed = new Discord.RichEmbed()
                    .setColor(0x00FF00)
                    .setTimestamp()
                    .setDescription(`Size: ${size} \nSKU: ${sku}`)
                    .setFooter(`Cart: # ${cartNum} • Made by Jalfrazi`, 'https://pbs.twimg.com/profile_images/999669687112749056/WK1RT5lY_400x400.jpg')

                guild.channels.get(publicChannel).send({
                    embed
                });
                sleep.msleep(1500)
                writeCart(cartNum, email, pass, loginURL, img, size, sku)

            } else if (e.footer.text === 'LatchKeyIO Adidas Bot') {
                size = (e.fields)[2]['value']
                email = (e.fields)[4]['value']
                pass = (e.fields)[5]['value']

                loginURL = e.url
                img = e.thumbnail.url
                sku = (e.fields)[1]['value']
                console.log('Size: ' + size)
                console.log('Email:Pass : ' + email + ':' + pass)
                console.log('Login link: ' + loginURL)
                console.log('Image: ' + img)
                const embed = new Discord.RichEmbed()
                    .setColor(0x00FF00)
                    .setTimestamp()
                    .setDescription(`Size: ${size} \nSKU: ${sku}`)
                    .setFooter(`Cart: # ${cartNum} • Made by Jalfrazi`, 'https://pbs.twimg.com/profile_images/999669687112749056/WK1RT5lY_400x400.jpg')
                    .setThumbnail(img)
                guild.channels.get(publicChannel).send({
                    embed
                });
                sleep.msleep(1500)
                writeCart(cartNum, email, pass, loginURL, img, size, sku)

            } else if (e.footer.text === 'Copyright BackdoorIO 2018, All Rights Reserved.') {
                size = (e.fields)[1]['value']
                userPass = (e.fields)[2]['value']
                email = (userPass).split(' ')[1].split('\n')[0]
                pass = (userPass).split(': ')[2]

                loginURL = ((e.fields)[5]['value']).substring(10).slice(0, -1)
                img = ''
                sku = (e.fields)[0]['value']
                console.log('Size: ' + size)
                console.log('Email:Pass : ' + email + ':' + pass)
                console.log('Login link: ' + loginURL)
                console.log('Image: ' + img)
                const embed = new Discord.RichEmbed()
                    .setColor(0x00FF00)
                    .setTimestamp()
                    .setDescription(`Size: ${size} \nSKU: ${sku}`)
                    .setFooter(`Cart: # ${cartNum} • Made by Jalfrazi`, 'https://pbs.twimg.com/profile_images/999669687112749056/WK1RT5lY_400x400.jpg')

                guild.channels.get(publicChannel).send({
                    embed
                });
                sleep.msleep(1500)
                writeCart(cartNum, email, pass, loginURL, img, size, sku)

            } else if ((e.footer.text).startsWith('NoMercy')) {
                size = (e.fields)[1]['value']
                email = (e.fields)[3]['value']
                pass = (e.fields)[4]['value']

                loginURL = e.url
                img = e.thumbnail.url
                sku = (e.fields)[0]['value']
                console.log('Size: ' + size)
                console.log('Email:Pass : ' + email + ':' + pass)
                console.log('Login link: ' + loginURL)
                console.log('Image: ' + img)
                const embed = new Discord.RichEmbed()
                    .setColor(0x00FF00)
                    .setTimestamp()
                    .setDescription(`Size: ${size} \nSKU: ${sku}`)
                    .setFooter(`Cart: # ${cartNum} • Made by Jalfrazi`, 'https://pbs.twimg.com/profile_images/999669687112749056/WK1RT5lY_400x400.jpg')
                    .setThumbnail(img)
                guild.channels.get(publicChannel).send({
                    embed
                });
                sleep.msleep(1500)
                writeCart(cartNum, email, pass, loginURL, img, size, sku)
            } else if (e.footer.text === 'Gen5 Adidas') {
                size = (e.fields)[1]['value']
                email = (e.fields)[3]['value']
                pass = (e.fields)[4]['value']
                loginURL = e.url
                img = e.thumbnail.url
                sku = (e.fields)[0]['value']
                console.log('Size: ' + size)
                console.log('Email:Pass : ' + email + ':' + pass)
                console.log('Login link: ' + loginURL)
                console.log('Image: ' + img)
                const embed = new Discord.RichEmbed()
                    .setColor(0x00FF00)
                    .setTimestamp()
                    .setDescription(`Size: ${size} \nSKU: ${sku}`)
                    .setFooter(`Cart: # ${cartNum} • Made by Jalfrazi`, 'https://pbs.twimg.com/profile_images/999669687112749056/WK1RT5lY_400x400.jpg')

                guild.channels.get(publicChannel).send({
                    embed
                });
                sleep.msleep(1500)
                writeCart(cartNum, email, pass, loginURL, img, size, sku)

            }
        })
    }
    if (message.channel.id == publicChannel) {
        message.react('🛒')
    }
})


/* FOR 1 CART ONLY */
redeemed = []
/* FOR 1 CART ONLY */



bot.on('messageReactionAdd', (reaction, user) => {



    /* FOR 1 CART ONLY */
    if(redeemed.includes(user.id)){
        console.log('includes')
        reaction.remove(user)
        return
    }
    /* FOR 1 CART ONLY */



    console.log('Reaction added; current count:', reaction.count);
    /* console.log(reaction.message.id); */
    if (reaction.message.channel.id == publicChannel) {
        if (reaction.count == 2) { /* could do > 1 ? */
            (reaction.users).forEach(element => {
                /* console.log(element)
                console.log(Object.keys(element)) */
                console.log(element['username'])
                console.log('user ID: ' + element['id'])
                cartID = (reaction.message.embeds[0].footer.text).split('# ')[1].split(' • M')[0]

                var contents = fs.readFileSync(`${fileName}`);
                var jsonContent = JSON.parse(contents);
                for (i = 0; i < jsonContent.length; i++) {
                    if (jsonContent[i]['id'] == cartID) {
                        if (element['bot'] != true) {



                            /* FOR 1 CART ONLY */
                            if(user.id != "215817216736755713")
                                redeemed.push(user.id)
                            /* FOR 1 CART ONLY */

                            

                            console.log(redeemed)
                            const embed = new Discord.RichEmbed()
                                .setColor(0x00FF00)
                                .setTimestamp()
                                .setTitle(`Size: ${jsonContent[i]['size']}`)
                                .setURL(jsonContent[i]['login'])
                                .setDescription(`Email: ${jsonContent[i]['email']} \nPassword: ${jsonContent[i]['pass']}`)
                                .setFooter(`Cart: # ${cartNum} • Made by Jalfrazi`, 'https://pbs.twimg.com/profile_images/999669687112749056/WK1RT5lY_400x400.jpg')
                            if (jsonContent[i]['image'] != '') {
                                embed.setThumbnail(jsonContent[i]['image'])
                            }
                            if (jsonContent[i]['sku'] != '') {
                                embed.setDescription(`Email: ${jsonContent[i]['email']} \nPassword: ${jsonContent[i]['pass']} \nSKU: ${jsonContent[i]['sku']}`)
                            }
                            guild.members.get(element['id']).send({
                                embed
                            });
                        }
                    }
                }
            });
            //reaction.message.delete()
        }
    }
});

function writeCart(cartNum, email, pass, loginURL, img, size, sku) {
    // Get content from file
    var contents = fs.readFileSync(`${fileName}`);
    // Define to JSON type
    var jsonContent = JSON.parse(contents);
    jsonContent.push({
        'id': (cartNum).toString(),
        'email': email,
        'pass': pass,
        'login': loginURL,
        'image': img,
        'size': size,
        'sku': sku
    })
    fs.writeFile(`./${fileName}`, JSON.stringify(jsonContent, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log('File has been created');
    });
}
