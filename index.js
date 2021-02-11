/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */

/**
 * This source code below is free, please DO NOT sell this in any form!
 * Source code ini gratis, jadi tolong JANGAN jual dalam bentuk apapun!
 *
 * If you copying one of our source code, please give us CREDITS. Because this is one of our hardwork.
 * Apabila kamu menjiplak salah satu source code ini, tolong berikan kami CREDIT. Karena ini adalah salah satu kerja keras kami.
 *
 * If you want to contributing to this source code, pull requests are always open.
 * Apabila kamu ingin berkontribusi ke source code ini, pull request selalu kami buka.
 * 
 * Thanks for the contributions.
 * Terima kasih atas kontribusinya.
 */

/********** MODULES **********/
const { decryptMedia, Client } = require('@open-wa/wa-automate')
const fs = require('fs-extra')
const config = require('../config.json')
const Nekos = require('nekos.life')
const neko = new Nekos()
const os = require('os')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const api = new API()
const sagiri = require('sagiri')
const NanaAPI = require('nana-api')
const nana = new NanaAPI()
const isPorn = require('is-porn')
const exec = require('await-exec')
const fetch = require('node-fetch')
const webp = require('webp-converter')
const sharp = require('sharp')
const saus = sagiri(config.nao, { results: 5 })
const axios = require('axios')
const tts = require('node-gtts')
const nekobocc = require('nekobocc')
const ffmpeg = require('fluent-ffmpeg')
const bent = require('bent')
const ms = require('parse-ms')
const toMs = require('ms')
const canvas = require('canvacord')
const mathjs = require('mathjs')
const path = require('path')
const emojiUnicode = require('emoji-unicode')
const genshin = require('genshin-impact-api')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const NSFAI = require('nsfai')
const google = require('google-it')
const Clarifai = require('clarifai')
const translate = require('@vitalets/google-translate-api')
const bdr = require('rumus-bdr')
/********** END OF MODULES **********/

/********** UTILS **********/
const { msgFilter, color, processTime, isUrl, createSerial } = require('../tools')
const { nsfw, weeaboo, downloader, fun, misc, toxic } = require('../lib')
const { uploadImages, toBuffer } = require('../tools/fetcher')
const { ind, eng } = require('./text/lang/')
const { limit, level, card, register, afk, reminder, premium } = require('../function')
const Exif = require('../tools/exif')
const exif = new Exif()
const Takestick = require('../tools/takestick')
const takestick = new Takestick()
const cd = 4.32e+7
const cdd = 1.2e+5
const errorImg = 'https://i.ibb.co/jRCpLfn/user.png'
const tanggal = moment.tz('Asia/Jakarta').format('DD-MM-YYYY')
const apiNSF = ['8030db045ffb48239d7e31b2565ea870', 'd5c178e1e8704ed0bdc8e3cca5d1bf51']
const apiNSFW = apiNSF[Math.floor(Math.random() * apiNSF.length)]
const noPorn = new NSFAI(apiNSFW)
const appC = new Clarifai.App({ apiKey: apiNSFW })
/********** END OF UTILS **********/

/********** DATABASES **********/
const _nsfw = JSON.parse(fs.readFileSync('./database/group/nsfw.json'))
const _antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _antinsfw = JSON.parse(fs.readFileSync('./database/group/antinsfw.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
const _autosticker = JSON.parse(fs.readFileSync('./database/group/autosticker.json'))
const _ban = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
const _premium = JSON.parse(fs.readFileSync('./database/bot/premium.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const _mute = JSON.parse(fs.readFileSync('./database/group/mute.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
const _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const _afk = JSON.parse(fs.readFileSync('./database/user/afk.json'))
const _reminder = JSON.parse(fs.readFileSync('./database/user/reminder.json'))
const _bg = JSON.parse(fs.readFileSync('./database/user/card/background.json'))
const _setting = JSON.parse(fs.readFileSync('./database/bot/setting.json'))
let { memberLimit, groupLimit } = _setting
/********** END OF DATABASES **********/

/********** MESSAGE HANDLER **********/
// eslint-disable-next-line no-undef
module.exports = msgHandler = async (bocchi = new Client(), message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName
        const botNumber = await bocchi.getHostNumber() + '@c.us'
        const blockNumber = await bocchi.getBlockedIds()
        const ownerNumber = config.ownerBot
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await bocchi.getGroupAdmins(groupId) : ''
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')

        const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''
        const prefix  = config.prefix
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const uaOverride = config.uaOverride
        const q = args.join(' ')
        const ar = args.map((v) => v.toLowerCase())
        const url = args.length !== 0 ? args[0] : ''

        /********** VALIDATOR **********/
        const isCmd = body.startsWith(prefix)
        const isBlocked = blockNumber.includes(sender.id)
        const isOwner = sender.id === ownerNumber
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isBanned = _ban.includes(sender.id)
        const isPremium = premium.checkPremiumUser(sender.id, _premium)
        const isRegistered = register.checkRegisteredUser(sender.id, _registered)
        const isNsfw = isGroupMsg ? _nsfw.includes(groupId) : false
        const isMute = isGroupMsg ? _mute.includes(groupId) : false
        const isWelcomeOn = isGroupMsg ? _welcome.includes(groupId) : false
        const isDetectorOn = isGroupMsg ? _antilink.includes(groupId) : false
        const isLevelingOn = isGroupMsg ? _leveling.includes(groupId) : false
        const isAutoStickerOn = isGroupMsg ? _autosticker.includes(groupId) : false
        const isAntiNsfw = isGroupMsg ? _antinsfw.includes(groupId) : false
        const isAfkOn = afk.checkAfkUser(sender.id, _afk)
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isImage = type === 'image'
        /********** END OF VALIDATOR **********/

        // Automate
        premium.expiredCheck(_premium)

        // ROLE (Change to what you want, or add) and you can change the role sort based on XP.
        const levelRole = level.getLevelingLevel(sender.id, _level)
        var role = 'Copper V'
        if (levelRole <= 5) {
            role = 'Copper IV'
        } else if (levelRole <= 10) {
            role = 'Copper III'
        } else if (levelRole <= 15) {
            role = 'Copper II'
        } else if (levelRole <= 20) {
            role = 'Copper I'
        } else if (levelRole <= 25) {
            role = 'Silver V'
        } else if (levelRole <= 30) {
            role = 'Silver IV'
        } else if (levelRole <= 35) {
            role = 'Silver III'
        } else if (levelRole <= 40) {
            role = 'Silver II'
        } else if (levelRole <= 45) {
            role = 'Silver I'
        } else if (levelRole <= 50) {
            role = 'Gold V'
        } else if (levelRole <= 55) {
            role = 'Gold IV'
        } else if (levelRole <= 60) {
            role = 'Gold III'
        } else if (levelRole <= 65) {
            role = 'Gold II'
        } else if (levelRole <= 70) {
            role = 'Gold I'
        } else if (levelRole <= 75) {
            role = 'Platinum V'
        } else if (levelRole <= 80) {
            role = 'Platinum IV'
        } else if (levelRole <= 85) {
            role = 'Platinum III'
        } else if (levelRole <= 90) {
            role = 'Platinum II'
        } else if (levelRole <= 95) {
            role = 'Platinum I'
        } else if (levelRole <= 100) {
            role = 'Exterminator'
        }

        // Leveling [BETA] by Slavyan
        if (isGroupMsg && isRegistered && !isBanned && isLevelingOn) {
            const currentLevel = level.getLevelingLevel(sender.id, _level)
            const checkId = level.getLevelingId(sender.id, _level)
            const checkBg = card.getBg(sender.id, _bg)
            try {
                if (currentLevel === undefined && checkId === undefined) level.addLevelingId(sender.id, _level)
                if (checkBg === undefined) card.addBg(sender.id, _bg)
                const amountXp = Math.floor(Math.random() * 10) + 150
                const requiredXp = 200 * (Math.pow(2, currentLevel) - 1)
                const getLevel = level.getLevelingLevel(sender.id, _level)
                level.addLevelingXp(sender.id, amountXp, _level)
                if (requiredXp <= level.getLevelingXp(sender.id, _level)) {
                    level.addLevelingLevel(sender.id, 1, _level)
                    const fetchXp = 200 * (Math.pow(2, level.getLevelingLevel(sender.id, _level)) - 1)
                    await bocchi.reply(from, `*「 LEVEL UP 」*\n\n➸ *Name*: ${pushname}\n➸ *XP*: ${level.getLevelingXp(sender.id, _level)} / ${fetchXp}\n➸ *Level*: ${getLevel} -> ${level.getLevelingLevel(sender.id, _level)} 🆙 \n➸ *Role*: *${role}*\n\nCongrats!! 🎉🎉`, id)
                }
            } catch (err) {
                console.error(err)
            }
        }

        // Anti-group link detector
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/chat.whatsapp.com)/gi))) {
                const valid = await bocchi.inviteInfo(chats)
                if (valid) {
                    console.log(color('[KICK]', 'red'), color('Received a group link and it is a valid link!', 'yellow'))
                    await bocchi.reply(from, ind.linkDetected(), id)
                    await bocchi.removeParticipant(groupId, sender.id)
                } else {
                    console.log(color('[WARN]', 'yellow'), color('Received a group link but is not a valid link!', 'yellow'))
                }
            }
        }

        // Anti NSFW links but kinda uneffective
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isAntiNsfw && !isOwner) {
            if (isUrl(chats)) {
                const classify = new URL(isUrl(chats))
                console.log(color('[FILTER]', 'yellow'), 'Checking link:', classify.hostname)
                isPorn(classify.hostname, async (err, status) => {
                    if (err) return console.error(err)
                    if (status) {
                        console.log(color('[NSFW]', 'red'), color('The link is classified as NSFW!', 'yellow'))
                        await bocchi.reply(from, ind.linkNsfw(), id)
                        await bocchi.removeParticipant(groupId, sender.id)
                    } else {
                        console.log(('[NEUTRAL]'), color('The link is safe!'))
                    }
                })
            }
        }
        //ANTIPORN By: VideFrelan
        
        if (isGroupMsg && isAntiNsfw && !isOwner && !isGroupAdmins && isBotGroupAdmins) {
            if (type === 'image') {
                const dataMediaa = await decryptMedia(message)
                const mediaType = `${dataMediaa.toString('base64')}`
                noPorn.predict(mediaType)
                .then(async(res) => {
                const { confidence } = res
                const nilaipersen = ((confidence / 1.000000) * 100).toFixed(1) + '%'
                    if (!res.sfw) {
                    bocchi.reply(from, `*...:* *PORN DETECTOR* *:...*\n\nGambar ini tidak aman untuk grup dan Anda akan dikick!\n*Keyakinan: ${nilaipersen}/100%*!`, id)
                    .then(() => {
                        bocchi.removeParticipant(groupId, sender.id)
                        console.log(color('[KICK]', 'red'), color(`${sender.id} telah di-kick karena mengirimkan foto 18+`, 'green'))
                    })
                }
            })
          } else if (type === 'video') {
                const dataMediaa = await decryptMedia(message)
                const inPorn = './temp/video/DetectingPorn.mp4'
                const outPorn = './temp/video/outPorn.png'
                fs.writeFile(inPorn, dataMediaa, err => {
                    if (err) return console.log(err)
                        exec(`ffmpeg -ss 1 -i ${inPorn} -vframes 1 -filter:v 'yadif',scale=1280:720' ${outPorn}`, async function() {
                        fs.readFile(outPorn, { encoding: 'base64' }, async (err, base64) => {
                    if (err) return console.log(err)
                        noPorn.predict(base64)
                        .then(async(res) => {
                            const { confidence } = res
                            const nilaipersen = ((confidence / 1.000000) * 100).toFixed(1) + '%'
                            console.log(res)
                     if (!res.sfw) {
                            bocchi.reply(from, `*...:* *PORN DETECTOR* *:...*\n\nAnda akan di-kick karena video ini mengandung pornografi!\n*Keyakinan: ${nilaipersen}/100%*!`, id)
                            .then(() => {
                            bocchi.removeParticipant(groupId, sender.id)
                            console.log(color('[KICK]', 'red'), color(`${sender.id} telah di-kick karena mengirimkan video 18+`, 'green'))
                            fs.unlinkSync(inPorn)
                            fs.unlinkSync(outPorn)
                            })
                        } else if (res.sfw) {
                            fs.unlinkSync(inPorn)
                            fs.unlinkSync(outPorn)
                           }
                        })
                    })
                })
            })
        }
    }

        // Auto-sticker
        if (isGroupMsg && isAutoStickerOn && isMedia && isImage && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await bocchi.sendImageAsSticker(from, imageBase64)
            console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
        }

        // AFK by Slavyan
        if (isGroupMsg) {
            for (let ment of mentionedJidList) {
                if (afk.checkAfkUser(ment, _afk)) {
                    const getId = afk.getAfkId(ment, _afk)
                    const getReason = afk.getAfkReason(getId, _afk)
                    const getTime = afk.getAfkTime(getId, _afk)
                    await bocchi.reply(from, ind.afkMentioned(getReason, getTime), id)
                }
            }
            if (afk.checkAfkUser(sender.id, _afk) && !isCmd) {
                _afk.splice(afk.getAfkPosition(sender.id, _afk), 1)
                fs.writeFileSync('./database/user/afk.json', JSON.stringify(_afk))
                await bocchi.sendText(from, ind.afkDone(pushname))
            }
        }

        // Ignore banned and blocked users
        if (isCmd && (isBanned || isBlocked) && !isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && (isBanned || isBlocked) && isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        /* Anti-spam
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))
*/
        // Log
        if (isCmd && !isGroupMsg) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isGroupMsg) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))
        
        // Mute
        if (isCmd && isMute && (!isGroupAdmins, !isOwner, !isPremium)) return
        
        // Kerang
         const apakah = [
            'Ya',
            'Tidak',
            'Coba Ulangi'
            ]

        const bisakah = [
            'Bisa',
            'Tidak Bisa',
            'Coba Ulangi'
            ]

        const kapankah = [
            '1 Minggu lagi',
            '1 Bulan lagi',
            '1 Tahun lagi'
            ]

        const rate = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
            ]
        
        const balas = [
			`Nandayo ${pushname}?`,
			'Nani Daling?',
			'Haik!',
			'Areee...?',
			'Arerereee...?'
			]
			
	    // SLOT
	    
	    const sotoy = [
		'🍊 : 🍒 : 🍐',
		'🍒 : 🔔 : 🍊',
		'🍇 : 🍒 : 🍐',
		'🍊 : 🍋 : 🔔',
		'🔔 : 🍒 : 🍐',
		'🔔 : 🍒 : 🍊',
        '🍊 : 🍋 : 🔔',		
		'🍐 : 🍒 : 🍋',
		'🍐 : 🍐 : 🍐',
		'🍊 : 🍒 : 🍒',
		'🔔 : 🔔 : 🍇',
		'🍌 : 🍒 : 🔔',
		'🍐 : 🔔 : 🔔',
		'🍊 : 🍋 : 🍒',
		'🍋 : 🍋 : 🍌',
		'🔔 : 🔔 : 🍇',
		'🔔 : 🍐 : 🍇',
		'🔔 : 🔔 : 🔔',
		'🍒 : 🍒 : 🍒',
		'🍌 : 🍌 : 🍌',
		'🍇 : 🍇 : 🍇'
		]
		
        // Anti-spam
        if (isCmd && !isOwner) msgFilter.addFilter(from)
        
        if (chats.match("chika") || chats.match("Chika") || chats.match("CHIKA")) {
                    const bls = balas[Math.floor(Math.random() * (balas.length))]
					await bocchi.reply(from, `*${bls}* \n\n`, id)
				}　
				
        switch (command) {
            // Register by Slavyan
            case 'register':
                if (isRegistered) return await bocchi.reply(from, ind.registeredAlready(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const namaUser = q.substring(0, q.indexOf('|') - 1)
                const umurUser = q.substring(q.lastIndexOf('|') + 2)
                const serialUser = createSerial(20)
                if (Number(umurUser) >= 40) return await bocchi.reply(from, ind.ageOld(), id)
                register.addRegisteredUser(sender.id, namaUser, umurUser, time, serialUser, _registered)
                await bocchi.reply(from, ind.registered(namaUser, umurUser, sender.id, time, serialUser), id)
                console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
            break

            // Level [BETA] by Slavyan
            case 'level':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isLevelingOn) return await bocchi.reply(from, ind.levelingNotOn(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const userLevel = level.getLevelingLevel(sender.id, _level)
                const userXp = level.getLevelingXp(sender.id, _level)
                if (userLevel === undefined && userXp === undefined) return await bocchi.reply(from, ind.levelNull(), id)
                const ppLink = await bocchi.getProfilePicFromServer(sender.id)
                if (ppLink === undefined) {
                    var pepe = errorImg
                } else {
                    pepe = ppLink
                }
                const bege = card.getBg(sender.id, _bg)
                const requiredXp = 200 * (Math.pow(2, userLevel) - 1)
                const randomHexs = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
                const randomHex = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
                const rank = new canvas.Rank()
                    .setAvatar(pepe)
                    .setLevel(userLevel)
                    .setRank(1, `${role}`, true) // Set value to true if you want to display user's roles
                    .setCurrentXP(userXp)
                    .setRequiredXP(requiredXp)
                    .setProgressBar([randomHexs, randomHex], 'GRADIENT')
                    .setBackground('IMAGE', bege)
                    .setUsername(pushname)
                    .setDiscriminator(sender.id.substring(6, 10))
                rank.build()
                    .then(async (buffer) => {
                        canvas.write(buffer, `${pushname}_card.png`)
                        await bocchi.sendFile(from, `${pushname}_card.png`, `${pushname}_card.png`, '', id)
                        fs.unlinkSync(`${pushname}_card.png`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'leaderboard':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isLevelingOn) return await bocchi.reply(from, ind.levelingNotOn(), id)
                if (!isGroupMsg) return await bocchi.reply(from. ind.groupOnly(), id)
                const resp = _level
                _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let leaderboard = '-----[ *LEADERBOARD* ]----\n\n'
                let nom = 0
                try {
                    for (let i = 0; i < 10; i++) {
                        var roles = 'Copper V'
                        if (resp[i].level <= 5) {
                            roles = 'Copper IV'
                        } else if (resp[i].level <= 10) {
                            roles = 'Copper III'
                        } else if (resp[i].level <= 15) {
                            roles = 'Copper II'
                        } else if (resp[i].level <= 20) {
                            roles = 'Copper I'
                        } else if (resp[i].level <= 25) {
                            roles = 'Silver V'
                        } else if (resp[i].level <= 30) {
                            roles = 'Silver IV'
                        } else if (resp[i].level <= 35) {
                            roles = 'Silver III'
                        } else if (resp[i].level <= 40) {
                            roles = 'Silver II'
                        } else if (resp[i].level <= 45) {
                            roles = 'Silver I'
                        } else if (resp[i].level <= 50) {
                            roles = 'Gold V'
                        } else if (resp[i].level <= 55) {
                            roles = 'Gold IV'
                        } else if (resp[i].level <= 60) {
                            roles = 'Gold III'
                        } else if (resp[i].level <= 65) {
                            roles = 'Gold II'
                        } else if (resp[i].level <= 70) {
                            roles = 'Gold I'
                        } else if (resp[i].level <= 75) {
                            roles = 'Platinum V'
                        } else if (resp[i].level <= 80) {
                            roles = 'Platinum IV'
                        } else if (resp[i].level <= 85) {
                            roles = 'Platinum III'
                        } else if (resp[i].level <= 90) {
                            roles = 'Platinum II'
                        } else if (resp[i].level <= 95) {
                            roles = 'Platinum I'
                        } else if (resp[i].level <= 100) {
                            roles = 'Exterminator'
                        }
                        nom++
                        leaderboard += `${nom}. wa.me/${_level[i].id.replace('@c.us', '')}\n➸ *XP*: ${_level[i].xp} *Level*: ${_level[i].level}\n➸ *Role*: ${roles}\n\n`
                    }
                    await bocchi.reply(from, leaderboard, id)
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, ind.minimalDb(), id)
                }
            break
            case 'setbackground':
            case 'setbg':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isLevelingOn) return await bocchi.reply(from, ind.levelingNotOn(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isUrl(url)) return await bocchi.reply(from, ind.wrongFormat(), id)
                const levels = level.getLevelingLevel(sender.id, _level)
                const xps = level.getLevelingXp(sender.id, _level)
                if (levels === undefined && xps === undefined) return await bocchi.reply(from, ind.levelNull(), id)
                card.replaceBg(sender.id, url, _bg)
                await bocchi.reply(from, 'Success set new background!', id)
            break

            // Downloader
            case 'joox':
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                downloader.joox(q)
                    .then(async ({ result }) => {
                        await bocchi.sendFileFromUrl(from, result[0].linkImg, `${result[0].judul}.jpg`, ind.joox(result), id)
                        await bocchi.sendFileFromUrl(from, result[0].linkMp3, `${result[0].judul}.mp3`, '', id)
                        console.log('Success sending music from Joox!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'igdl': // by: VideFrelan
            case 'instagram':
            case 'ig':
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('instagram.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                downloader.insta(url)
                    .then(async ({ result }) => {
                        for (let i = 0; i < result.post.length; i++) {
                            if (result.post[i].type === "image") {
                                await bocchi.sendFileFromUrl(from, result.post[i].urlDownload, 'igpostdl.jpg', `*...:* *Instagram Downloader* *:...*\n\nUsername: ${result.owner_username}\nCaption: ${result.caption}`, id)
                            } else if (result.post[i].type === "video") {
                                await bocchi.sendFileFromUrl(from, result.post[i].urlDownload, 'igpostdl.mp4', `*...:* *Instagram Downloader* *:...*\n\nUsername: ${result.owner_username}\nCaption: ${result.caption}`, id)
                            }
                        }
                        console.log('Success sending Instagram media!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'fb':
            case 'facebook':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(pushname), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isUrl(url) && !url.includes('facebook.com')) return await bocchi.reply(from, `URL bukan dari facebook!`, id)
                await bocchi.reply(from, ind.wait(), id)
                downloader.fba(url)
                .then(async ({ result, title }) => {
                            await bocchi.sendFileFromUrl(from, result[0].link, 'videofb.mp4', `*「 FACEBOOK DOWNLOADER 」*\n\n➸ *Title* : ${title}`, id)
                            console.log(from, 'Success sending Facebook video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, `Ada yang Error!`, id)
                    })
            break
            case 'ytmp4':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isUrl(url) && !url.includes('youtu.be')) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                downloader.ytdlb(url)
                    .then(async (res) => {
                            await bocchi.sendFileFromUrl(from, res.thumb, `${res.title}.jpg`, `*「 YOUTUBE DOWNLOADER 」*\n\n➸ *Title* : ${res.title}\n\n_Media sedang dikirim harap tunggu_`, id)
                            const responses = await fetch(res.result);
                            const buffer = await responses.buffer(); 
                            await fs.writeFile(`./temp/ytv3.mp4`, buffer)
                            await bocchi.sendFile(from, `./temp/ytv3.mp4`, `ytv3.mp4`, '', id)
                            console.log('Success sending YouTube audio!')
                            fs.unlinkSync(`./temp/ytv3.mp4`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'ytmp3':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isUrl(url) && !url.includes('youtu.be')) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                downloader.ytmpb(url)
                    .then(async (res) => {
                            await bocchi.sendFileFromUrl(from, res.thumb, `${res.title}.jpg`, `*「 YOUTUBE DOWNLOADER 」*\n\n➸ *Title* : ${res.title}\n\n_Media sedang dikirim harap tunggu_`, id)
                            const responses = await fetch(res.result);
                            const buffer = await responses.buffer(); 
                            await fs.writeFile(`./temp/yta3.mp3`, buffer)
                            await bocchi.sendFile(from, `./temp/yta3.mp3`, `yta3.mp3`, '', id)
                            console.log('Success sending YouTube audio!')
                            fs.unlinkSync(`./temp/yta3.mp3`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'tiktokstalk':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.tikStalk(q)
                    .then(async ({ status, result }) => {
                        if (status !== 200) {
                            await bocchi.reply(from, 'Not found.', id)
                        } else {
                            const tikxt = `*「 TIKTOK STALK 」*\n\n➸ *Username*: ${result.username}\n➸ *Bio*: ${result.bio}\n➸ *Nickname*: ${result.nickname}\n➸ *Followers*: ${result.followers}\n➸ *Followings*: ${result.following}\n➸ *Total Video*: ${result.video}\n➸ *Total Likes* : ${result.likes}`
                            await bocchi.sendFileFromUrl(from, result.user_picture, 'insta.jpg', tikxt, id)
                            console.log('Success sending Tiktok stalk!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'tiktoknowm':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                if (!isUrl(url) && !url.includes('tiktok.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                downloader.tikNoWm(url)
                    .then(async ({ result }) => {
                        await bocchi.sendFileFromUrl(from, result.link, 'tiktok.mp4', `*「 TIKTOK DOWNLOADER 」*\n\n➸ *Title* : ${result.title}\n➸ *Description* : ${result.description}\n➸ *Uploader by* : ${result.uploader}`, id)
                        console.log('Success sending Tiktok video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'tiktok':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isUrl(url) && !url.includes('tiktok.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/tiktokwm?url=${url}&apikey=${config.lolhuman}`, 'tiktok.mp4', '', id)
            break
            case 'tiktokmusic':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isUrl(url) && !url.includes('tiktok.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/tiktokmusic?url=${url}&apikey=${config.lolhuman}`, 'tiktok.mp3', '', id)
            break
            case 'soundcloud':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isUrl(url) && !url.includes('soundcloud.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const scdl = await axios.get(`https://lolhuman.herokuapp.com/api/soundcloud?url=${url}&apikey=${config.lolhuman}`)
                await bocchi.sendFileFromUrl(from, scdl.data.result, `${scdl.data.title}_sc.mp3`, '', id)
                break
            case 'twitter':
            case 'twt':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isUrl(url) && !url.includes('twitter.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                downloader.tweet(url)
                    .then(async (res) => {
                        await bocchi.sendFileFromUrl(from, res.result[1].link, 'twit.mp4', `*「 TWITTER DOWNLOADER 」*\n\n➸ *Title* : ${res.title}\n➸ *Resolusi* : ${res.result[1].resolution}`, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'cocofun':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(pushname), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isUrl(url) && !url.includes('coco.fun')) return await bocchi.reply(from, `URL bukan dari facebook!`, id)
                await bocchi.reply(from, ind.wait(), id)
                downloader.coco(url)
                .then(async ({ result }) => {
                            await bocchi.sendFileFromUrl(from, result.video, 'videofb.mp4', `*「 COCOFUN DOWNLOADER 」*\n\n`, id)
                            console.log(from, 'Success sending CocoFun video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, `Ada yang Error!`, id)
                    })
            break

            // Misc
            case 'say':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.sendText(from, q)
            break
            case 'kapankah':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return bocchi.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
                await bocchi.sendText(from, `Pertanyaan: *kapankah ${q}* \n\nJawaban: ${ans}`)
            break
            case 'rate':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                const awr = rate[Math.floor(Math.random() * (rate.length))]
                await bocchi.sendText(from, `Pertanyaan: *rate ${q}* \n\nJawaban: ${awr}`)
            break
            case 'nilai':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                const awwr = rate[Math.floor(Math.random() * (rate.length))]
                await bocchi.sendText(from, `Pertanyaan: *nilai ${q}* \n\nJawaban: ${awwr}`)
            break
            case 'apakah':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
                await bocchi.sendText(from, `Pertanyaan: *apakah ${q}* \n\nJawaban: ${jawab}`)
            break
             case 'bisakah':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
                await bocchi.sendText(from, `Pertanyaan: *bisakah ${q}* \n\nJawaban: ${jbsk}`)
            break
            case 'ttp':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                console.log('Creating ttp..!')
                misc.ttp(q)
                    .then(async (res) => {
                        await bocchi.reply(from, ind.wait(), id)
                        await bocchi.sendImageAsSticker(from, res.base64)
                        console.log('Success creating ttp!')
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
            break
            case 'bokep':
            case 'randombokep':
            if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
            nsfw.bokep()
                    .then(async (res) => {
                        const bokepp = JSON.parse(JSON.stringify(res))
                        const bokep2 =  bokepp[Math.floor(Math.random() * bokepp.length)]
                        await bocchi.sendFileFromUrl(from, bokep2.image, 'meme.jpg', bokep2.teks, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'email':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const emailnya = q.substring(0, q.indexOf('|') - 1)
                const subjeknya = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const pesannya = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                misc.email(emailnya, subjeknya, pesannya)
                    .then(async ({ result }) => {
                        if (result.status !== '200') return await bocchi.reply(from, result.logs, id)
                        await bocchi.reply(from, result.log_lengkap, id)
                        console.log(`Success sending email to ${emailnya}!`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'afk':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (isAfkOn) return await bocchi.reply(from, ind.afkOnAlready(), id)
                const reason = q ? q : 'Nothing.'
                afk.addAfkUser(sender.id, time, reason, _afk)
                await bocchi.reply(from, ind.afkOn(pushname, reason), id)
            break
            case 'lyric':
            case 'lirik':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.lirik(q)
                    .then(async ({ result }) => {
                        if (result.code !== 200) return await bocchi.reply(from, 'Not found.', id)
                        await bocchi.reply(from, result.result, id)
                        console.log('Success sending lyric!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'shortlink':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url)) return await bocchi.reply(from, ind.wrongFormat(), id)
                const urlShort = await misc.shortener(url)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.reply(from, urlShort, id)
                console.log('Success!')
            break
            case 'shortlink2':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url)) return await bocchi.reply(from, ind.wrongFormat(), id)
                const urlBitly = await axios.get(`https://tobz-api.herokuapp.com/api/bitly?url=${url}&apikey=${config.tobz}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.reply(from, urlBitly.data.result, id)
                console.log('Success!')
            break
            case 'shortlink3':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url)) return await bocchi.reply(from, ind.wrongFormat(), id)
                const urlol = await axios.get(`https://lolhuman.herokuapp.com/api/shortlink2?url=${url}&apikey=${config.lolhuman}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.reply(from, urlol.data.result, id)
                console.log('Success!')
            break
            case 'wikipedia':
            case 'wiki':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.wiki(q)
                    .then(async ({ result, status }) => {
                        if (status !== 200) {
                            return await bocchi.reply(from, 'Not found.', id)
                        } else {
                            await bocchi.reply(from, result, id)
                            console.log('Success sending Wiki!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'instastory': //By: VideFrelan
            case 'igstory':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.its(q)
                    .then(async ({ result }) => {
                        for (let i = 0; i < result.story.itemlist.length; i++) {
                            const { urlDownload } = result.story.itemlist[i]
                            await bocchi.sendFileFromUrl(from, urlDownload, '', 'By: VideFrelan', id)
                            console.log('Success sending IG Story!')
                        }
                    })
            break
            case 'kbbi':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.kbbi(q)
                    .then(async ({ result }) => {
                        if (result.response === '204') {
                            await bocchi.reply(from, 'not found', id)
                        } else {
                            await bocchi.reply(from, result.hasil, id)
                            console.log('Success sending definition!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'wpsearch':
            case 'wallpapersearch':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.wps(q)
                    .then(async ({ status, result }) => {
                        if (status === '404') {
                            await bocchi.reply(from, 'not found', id)
                        } else {
                            await bocchi.sendFileFromUrl(from, result, 'wp.jpg', `Hasil pencarian Wallpaper : ${q}`, id)
                            console.log('Success sending wallpaper!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'linesticker':
            case 'linestiker':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.linesticker()
                    .then(async ({ result }) => {
                        let lines = `-----[ *NEW STICKER* ]-----`
                        for (let i = 0; i < result.hasil.length; i++) {
                            lines +=  `\n\n➸ *Title*: ${result.hasil[i].title}\n➸ *URL*: ${result.hasil[i].uri}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, lines, id)
                        console.log('Success sending sticker Line!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, `Error!\n{err}`, id)
                    })
            break
            case 'jadwalsholat':
            case 'jadwalsolat':
            case 'js':
            case 'jadwalshalat':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.jadwalSholat(q)
                    .then((data) => {
                        data.map(async ({isya, subuh, dzuhur, ashar, maghrib, terbit}) => {
                            const x = subuh.split(':')
                            const y = terbit.split(':')
                            const xy = x[0] - y[0]
                            const yx = x[1] - y[1]
                            const perbandingan = `${xy < 0 ? Math.abs(xy) : xy} jam ${yx < 0 ? Math.abs(yx) : yx} menit`
                            const msg = `Jadwal sholat untuk ${q} dan sekitarnya ( *${tanggal}* )\n\nDzuhur: ${dzuhur}\nAshar: ${ashar}\nMaghrib: ${maghrib}\nIsya: ${isya}\nSubuh: ${subuh}\n\nDiperkirakan matahari akan terbit pada pukul ${terbit} dengan jeda dari subuh sekitar ${perbandingan}`
                            await bocchi.reply(from, msg, id)
                            console.log('Success sending jadwal sholat!')
                        })
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'gempa':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.bmkg()
                    .then(async ({ result }) => {
                        const teksInfo = `${result.lokasi}\n\nKoordinat: ${result.koordinat}\nKedalaman: ${result.kedalaman}\nMagnitudo: ${result.magnitude} SR\nPotensi: ${result.potensi}\n\n${result.waktu}`
                        await bocchi.sendFileFromUrl(from, result.maps, 'gempa.jpg', teksInfo, id)
                        console.log('Success sending info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'igstalk':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.igStalk(q)
                    .then(async ({ status, result }) => {
                        if (status !== 200) {
                            await bocchi.reply(from, 'Not found.', id)
                        } else {
                            const text = `*「 IG STALK 」*\n\n➸ *Username*: ${result.username}\n➸ *Bio*: ${result.bio}\n➸ *Full name*: ${result.fullname}\n➸ *Followers*: ${result.followers}\n➸ *Followings*: ${result.following}\n➸ *Total posts*: ${result.posts}`
                            await bocchi.sendFileFromUrl(from, result.photo_profile, 'insta.jpg', text, id)
                            console.log('Success sending IG stalk!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'gsmarena':
            if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                try {
                    misc.gsmarena(q)
                        .then(async ({ result }) => {
                            await bocchi.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.gsm(result), id)
                            console.log('Success sending phone info!')
                        })
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'receipt':
            case 'resep':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                try {
                    misc.resep(q)
                        .then(async ({ result }) => {
                            await bocchi.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.receipt(result), id)
                            console.log('Success sending food receipt!')
                        })
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'findsticker':
            case 'findstiker':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                try {
                    misc.sticker(q)
                        .then(async ({ result }) => {
                            if (result.response !== 200) return await bocchi.reply(from, 'Not found!', id)
                            for (let i = 0; i < result.data.length; i++) {
                                await bocchi.sendStickerfromUrl(from, result.data[i])
                            }
                            console.log('Success sending sticker!')
                        })
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, `Error!\n\n${err}`, id)
                }
            break
            case 'movie':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.movie(q)
                    .then(async ({ result }) => {
                        let movies = `Result for: *${result.judul}*`
                        for (let i = 0; i < result.data.length; i++) {
                            movies +=  `\n\n➸ *Quality:* : ${result.data[i].resolusi}\n➸ *URL*: ${result.data[i].urlDownload}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        movies += '\n\nBy: VideFrelan'
                        await bocchi.reply(from, movies, id)
                        console.log('Success sending movie result!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'cekongkir': // By: VideFrelan
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                const kurir = q.substring(0, q.indexOf('|') - 1)
                const askot = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const tukot = q.substring(q.lastIndexOf('|') + 2)
                misc.ongkir(kurir, askot, tukot)
                    .then(async ({ result }) => {
                        let onkir = `-----[ *${result.title}* ]-----`
                        for (let i = 0; i < result.data.length; i++) {
                            onkir +=  `\n\n➸ *Layanan*: ${result.data[i].layanan}\n➸ *Estimasi*: ${result.data[i].etd}\n➸ *Tarif*: ${result.data[i].tarif}\n➸ *Info*: ${result.informasi}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        onkir += '\n\nBy: VideFrelan'
                        await bocchi.reply(from, onkir, id)
                        console.log('Success sending ongkir info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'distance':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                const kotaAsal = q.substring(0, q.indexOf('|') - 1)
                const kotaTujuan = q.substring(q.lastIndexOf('|') + 2)
                misc.distance(kotaAsal, kotaTujuan)
                    .then(async ({ result }) => {
                        if (result.response !== 200) {
                            await bocchi.reply(from, 'Error!', id)
                        } else {
                            await bocchi.reply(from, result.data, id)
                            console.log('Success sending distance info!')
                        }
                    })
            break
            case 'ytsearch':
            case 'yts':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                try {
                    misc.ytSearch(q)
                        .then(async ({ result }) => {
                            for (let i = 0; i < 5; i++) {
                                const { urlyt, image, title, channel, duration, views } = await result[i]
                                await bocchi.sendFileFromUrl(from, image, `${title}.jpg`, ind.ytResult(urlyt, title, channel, duration, views), id)
                                console.log('Success sending YouTube results!')
                            }
                        })
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'tts':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                const speech = q.substring(q.indexOf('|') + 2)
                const ptt = tts(ar[0])
                try {
                    await bocchi.reply(from, ind.wait(), id)
                    ptt.save(`${speech}.mp3`, speech, async () => {
                        await bocchi.sendPtt(from, `${speech}.mp3`, id)
                        fs.unlinkSync(`${speech}.mp3`)
                    })
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'tomp3': //by: Piyobot
                    if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                    if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                    if ((isMedia || isQuotedVideo)) {
                        await bocchi.reply(from, ind.wait(), id)
                        const encryptMedia = isQuotedVideo ? quotedMsg : message
                        const _mimetype = isQuotedVideo ? quotedMsg.mimetype : mimetype
                        console.log(color('[WAPI]', 'green'), 'Downloading and decrypt media...')
                        const mediaData = await decryptMedia(encryptMedia)
                        let temp = './temp'
                        let name = new Date() * 1
                        let fileInputPath = path.join(temp, 'video', `${name}.${_mimetype.replace(/.+\//, '')}`)
                        let fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                        fs.writeFile(fileInputPath, mediaData, err => {
                            // ffmpeg -y -t 5 -i <input_file> -vf "scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease" -qscale 100 <output_file>.webp
                            ffmpeg(fileInputPath)
                                .format('mp3')
                                .on('start', function (commandLine) {
                                    console.log(color('[FFmpeg]', 'green'), commandLine)
                                })
                                .on('progress', function (progress) {
                                    console.log(color('[FFmpeg]', 'green'), progress)
                                })
                                .on('end', function () {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    // fs.readFile(fileOutputPath, { encoding: 'base64' }, (err, base64) => {
                                    // if (err) return bocchi.sendText(from, 'Ada yang error saat membaca file .mp3') && console.log(color('[ERROR]', 'red'), err)
                                    bocchi.sendFile(from, fileOutputPath, 'audio.mp3', '', id)
                                    // })
                                    setTimeout(() => {
                                        try {
                                            fs.unlinkSync(fileInputPath)
                                            fs.unlinkSync(fileOutputPath)
                                        } catch (e) {
                                        }
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                    } else {
                        await bocchi.reply(from, ind.wrongFormat(), id)
                    }
            break
            case 'playstore':
            case 'ps':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                try {
                    misc.playstore(q)
                        .then(async ({ result }) => {
                            for (let i = 0; i < 5; i++) {
                                const { app_id, icon, title, developer, description, price, free } = result[i]
                                await bocchi.sendFileFromUrl(from, icon, `${title}.jpg`, ind.playstore(app_id, title, developer, description, price, free))
                            }
                            console.log('Success sending PlayStore result!')
                        })
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, `Error!\n\n${err}`, id)
                }
            break
            case 'math':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (typeof mathjs.evaluate(q) !== "number") {
                    await bocchi.reply(from, ind.notNum(q), id)
                } else {
                    await bocchi.reply(from, `*「 MATH 」*\n\n${q} = ${mathjs.evaluate(q)}`, id)
                }
            break
            case 'shopee':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                const namaBarang = q.substring(0, q.indexOf('|') - 1)
                const jumlahBarang = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                try {
                    misc.shopee(namaBarang, jumlahBarang)
                        .then(async ({ result }) => {
                            for (let i = 0; i < result.items.length; i++) {
                                const { nama, harga, terjual, shop_location, description, link_product, image_cover } = result.items[i]
                                await bocchi.sendFileFromUrl(from, image_cover, `${nama}.jpg`, ind.shopee(nama, harga, terjual, shop_location, description, link_product))
                            }
                            console.log('Success sending Shopee data!')
                        })
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, `Error!\n\n${err}`, id)
                }
            break
            case 'mutual':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) return await bocchi.reply(from, 'Command ini tidak bisa digunakan di dalam grup!', id)
                await bocchi.reply(from, 'Looking for a partner...', id)
                await bocchi.sendContact(from, register.getRegisteredRandomId(_registered))
                await bocchi.sendText(from, `Partner found: 🙉\n*${prefix}next* — find a new partner`)
            break
            case 'next':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) return await bocchi.reply(from, 'Command ini tidak bisa digunakan di dalam grup!', id)
                await bocchi.reply(from, 'Looking for a partner...', id)
                await bocchi.sendContact(from, register.getRegisteredRandomId(_registered))
                await bocchi.sendText(from, `Partner found: 🙉\n*${prefix}next* — find a new partner`)
            break
            case 'tafsir':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (args.length === 0) return bocchi.reply(from, `Untuk menampilkan ayat Al-Qur'an tertentu beserta tafsir dan terjemahannya\ngunakan ${prefix}tafsir surah ayat\n\nContoh: ${prefix}tafsir Al-Mulk 10`, id)
                await bocchi.reply(from, ind.wait(), id)
                const responSurah = await axios.get('https://raw.githubusercontent.com/VideFrelan/words/main/tafsir.txt')
                const { data } = responSurah.data
                const idx = data.findIndex((post) => {
                    if ((post.name.transliteration.id.toLowerCase() === args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() === args[0].toLowerCase())) return true
                })
                const nomerSurah = data[idx].number
                if (!isNaN(nomerSurah)) {
                    const responseh = await axios.get('https://api.quran.sutanlab.id/surah/'+ nomerSurah + '/'+ args[1])
                    const { data } = responseh.data
                    let pesan = ''
                    pesan += 'Tafsir Q.S. ' + data.surah.name.transliteration.id + ':' + args[1] + '\n\n'
                    pesan += data.text.arab + '\n\n'
                    pesan += '_' + data.translation.id + '_\n\n' + data.tafsir.id.long
                    await bocchi.reply(from, pesan, id)
                }
            break
            case 'listsurah':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.listSurah()
                    .then(async ({ result }) => {
                        let list = '-----[ AL-QUR\'AN LIST ]-----\n\n'
                        for (let i = 0; i < result.list.length; i++) {
                            list += `${result.list[i]}\n\n`
                        }
                        await bocchi.reply(from, list, id)
                        console.log('Success sending Al-Qur\'an list!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'surah':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.getSurah(args[0])
                    .then(async ({ result }) => {
                        await bocchi.reply(from, `${result.surah}\n\n${result.quran}`, id)
                        console.log('Success sending surah!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'motivasi':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                misc.motivasi()
                    .then(async (body) => {
                        const motivasiSplit = body.split('\n')
                        const randomMotivasi = motivasiSplit[Math.floor(Math.random() * motivasiSplit.length)]
                        await bocchi.sendText(from, randomMotivasi)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'katabijak':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                console.log('Sending random katabijak..')
                const kbja = await axios.get(`https://lolhuman.herokuapp.com/api/random/katabijak?apikey=${config.lolhuman}`)
                await bocchi.reply(from, kbja.data.result, id)
                    .then(() => console.log('Success sending katabijak..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'play':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.ytPlay(q)
                    .then(async ({ result }) => {
                        if (Number(result.size.split(' MB')[0]) >= 10.0) return bocchi.sendFileFromUrl(from, result.image, `${result.title}.jpg`, `Judul: ${result.title}\nSize: *${result.size}*\n\nGagal, Maksimal video size adalah *10MB*!`, id)
                        await bocchi.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.ytPlay(result), id)
                        const responses = await fetch(result.mp3);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./temp/play.mp3`, buffer)
                        await bocchi.sendFile(from, `./temp/play.mp3`, `play.mp3`, '', id)
                        console.log('Success sending YouTube audio!')
                        fs.unlinkSync(`./temp/play.mp3`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'whois':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.whois(args[0])
                    .then(async ({ result }) => {
                        await bocchi.reply(from, `*「 WHOIS 」*\n\n➸ *IP address*: ${result.ip_address}\n➸ *City*: ${result.city}\n➸ *Region*: ${result.region}\n➸ *Country*: ${result.country}\n➸ *ZIP code*: ${result.postal_code}\n➸ *Latitude and longitude*: ${result.latitude_longitude}\n➸ *Time zone*: ${result.time_zone}\n➸ *Call code*: ${result.calling_code}\n➸ *Currency*: ${result.currency}\n➸ *Language code*: ${result.languages}\n➸ *ASN*: ${result.asn}\n➸ *Organization*: ${result.org}`, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'toxic':
                if (!isRegistered) return await bocchi.reply(from , ind.notRegistered(), id)
                await bocchi.reply(from, toxic(), id)
            break
            case 'alkitab':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.alkitab(q)
                    .then(async ({ result }) => {
                        let alkitab = `-----[ *AL-KITAB* ]-----`
                        for (let i = 0; i < result.length; i++) {
                            alkitab +=  `\n\n➸ *Ayat*: ${result[i].ayat}\n➸ *Isi*: ${result[i].isi}\n➸ *Link*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, alkitab, id)
                        console.log('Success sending Al-Kitab!')
                    })
            break
            case 'university':
            case 'univ':
            case 'universitas':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.univ(q)
                    .then(async ({ result }) => {
                        let univx = `-----[ *SEARCH UNIVERSITY* ]-----`
                        for (let i = 0; i < result.length; i++) {
                            univx +=  `\n\n➸ *Universitas*: ${result[i].universitas}\n➸ *Jurusan*: ${result[i].jurusan}\n➸ *Jenjang*: ${result[i].jenjang}\n➸ *No SK*: ${result[i].no_sk}\n➸ *Akreditasi*: ${result[i].peringkat}\n➸ *Status*: ${result[i].status}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, univx, id)
                        console.log('Success sending University info!')
                    })
            break
            case 'cuaca':
            case 'weather':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.cuaca(q)
                    .then(async ({ result }) => {
                        await bocchi.reply(from, `➸ Tempat : ${result.tempat}\n➸ Angin : ${result.angin}\n➸ Cuaca : ${result.cuaca}\n➸ Deskripsi : ${result.description}\n➸ Latitude : ${result.latitude}\n➸ Longitude : ${result.longitude}\n➸ Kelembapan : ${result.kelembapan}\n➸ Suhu : ${result.suhu}\n➸ Udara : ${result.udara}`, id)
                        console.log('Success sending cuaca!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Gagal mengambil informasi cuaca, mungkin tempat tidak terdaftar/salah!!', id)
                    })
            break
            case 'tiktoksearch':
            case 'tiktokhastag':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.tktksearch(q)
                    .then(async ({ result }) => {
                        let tktkx = `-----[ *SEARCH TIKTOK* ]-----`
                        for (let i = 0; i < result.length; i++) {
                            tktkx +=  `\n\n➸ *Nama Akun*: ${result[i].nickName}\n➸ *Username*: ${result[i].name}\n➸ *Title*: ${result[i].title}\n➸ *Link*: ${result[i].urlVideo}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.sendFileFromUrl(from, result[0].urlImage, 'js.jpg', tktkx, id)
                        console.log('Success sending Tiktok result!')
                    })
            break
            case 'mediafire':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('mediafire.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                downloader.mfire(url)
                    .then(async ({ result }) => {
                        await bocchi.reply(from, `➸ *Nama File* : ${result.title}\n\n➸ *Ukuran* : ${result.filesize}\n➸ *Tipe* : ${result.extension}\n➸ *Tanggal Upload* : ${result.upload_date}\n\n*Link Direct Download*\n${result.download}`, id)
                        console.log('Success sending mediafire info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Gagal mengambil informasi cuaca, mungkin tempat tidak terdaftar/salah!!', id)
                    })
            break
            case 'tebakgambar': //By: Rashid
                if (!isGroupMsg) return bocchi.reply(from, ind.groupOnly(), id)
                if (!isRegistered) return  bocchi.reply(from, ind.notRegistered(), id)
                const sleepp = async (ms) => {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }
                fun.tebakgambar()
                .then(async ({ result }) => {
                    await bocchi.sendFileFromUrl(from, result.soal_gbr, 'jssk.jpg', `_Silahkan Jawab Maksud Dari Gambar Ini_`, id)
                    bocchi.sendText(from, `30 Detik Tersisa...`, id)
                    await sleepp(10000)
                    bocchi.sendText(from, `20 Detik Tersisa...`, id)
                    await sleepp(10000)
                    bocchi.sendText(from, `10 Detik Tersisa...`, id)
                    await sleepp(10000)
                    await bocchi.reply(from, `*Jawaban*: ${result.jawaban}\n`, id)
                })
                .then(async () => {
                    console.log('Sukses mengirim jawaban tebak gambar!')
                })
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'error')
                })
            break
            case 'family100': //By: Rashid
                if (!isGroupMsg) return bocchi.reply(from, ind.groupOnly(), id)
                if (!isRegistered) return  bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                const sleeppp = async (ms) => {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }
                fun.family()
                .then(async ({ result }) => {
                    await bocchi.reply(from,` ➸ *Soal* : ${result.soal}\n_Silahkan DiJawab_`, id)
                    bocchi.sendText(from, `30 Detik Tersisa...`, id)
                    await sleeppp(10000)
                    bocchi.sendText(from, `20 Detik Tersisa...`, id)
                    await sleeppp(10000)
                    bocchi.sendText(from, `10 Detik Tersisa...`, id)
                    await sleeppp(10000)
                    await bocchi.reply(from, `➸ *Jawaban*: ${result.jawaban}\n`, id)
                })
                .then(async () => {
                    console.log('Sukses mengirim jawaban family 100')
                })
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'error')
                })
            break
            case 'hilih':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                fun.hilihteks(q)
                .then(async ({ result }) => {
                    await bocchi.reply(from, result.kata, id)
                    console.log('Success sending hilih text!')
                })
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            break
            case 'alay':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                fun.alayteks(q)
                .then(async ({ result }) => {
                    await bocchi.reply(from, result, id)
                    console.log('Success sending alay text!')
                })
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            break
            case 'artinama':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                fun.arti(q)
                .then(async ({ result }) => {
                    await bocchi.reply(from, `Nama *${q}* Memiliki Arti : ${result}`, id)
                    console.log('Success')
                })
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            break
            case 'bapakfont':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                fun.bapakteks(q)
                .then(async ({ result }) => {
                    await bocchi.reply(from, result, id)
                    console.log('Success sending bapak text!')
                })
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            break
            case 'bucin':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                fun.bucinx()
                .then(async ({ result }) => {
                    await bocchi.reply(from, result, id)
                    console.log('Success sending random bucin!')
                })
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            break
            case 'infoalamat':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                misc.alamat(q)
                .then(async ({ result }) => {
                    await bocchi.reply(from, `${result.data}\n\n${result.deskripsi}`, id)
                    console.log('Success sending Info alamat from query!')
                })
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            break
            case 'linkgroup':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, ind.botNotAdmin(), id)
                var gclink = await bocchi.getGroupInviteLink(groupId)
                var linkgc  = `Link group : *${formattedTitle}*\n\n ${gclink}`
                bocchi.reply(from, linkgc, id)
            break
            case 'gitstalk':
            case 'gitprofile':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.gitstalk(q)
                    .then(async ({ status, result }) => {
                        if (status ==! 200) {
                            await bocchi.reply(from, 'Not found.', id)
                        } else {
                            const gitext = `*「 GITHUB PROFILE 」*\n\n➸ *Username*: ${result.username}\n➸ *Bio*: ${result.biography}\n➸ *Location*: ${result.location}\n➸ *Followers*: ${result.follower}\n➸ *Followings*: ${result.following}\n➸ *Company*: ${result.company}\n➸ *Total gists Public*: ${result.public_gists}\n➸ *Total Repository*: ${result.public_repository}\n\n➸ *Url*: ${result.url}\n`
                            await bocchi.sendFileFromUrl(from, result.avatar, 'insta.jpg', gitext, id)
                            console.log('Success sending GITHUB stalk!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
             case 'husbu':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.husbu()
                    .then(async ({ result }) => {
                        await bocchi.sendFileFromUrl(from, result, 'husbu.jpg', `nih`, id)
                            .then(() => console.log('Success sending husbu!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'loli':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.loli()
                    .then(async ({ result }) => {
                        await bocchi.sendFileFromUrl(from, result, 'husbu.jpg', '', id)
                            .then(() => console.log('Success sending husbu!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'elf':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.elf()
                    .then(async ({ result }) => {
                        await bocchi.sendFileFromUrl(from, result, 'husbu.jpg', `Nih`, id)
                            .then(() => console.log('Success sending husbu!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'shota':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.shota()
                    .then(async ({ result }) => {
                        await bocchi.sendFileFromUrl(from, result, 'husbu.jpg', '', id)
                            .then(() => console.log('Success sending husbu!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'fanart':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.fanart()
                    .then(async ({ result }) => {
                        await bocchi.sendFileFromUrl(from, result, 'husbu.jpg', '', id)
                            .then(() => console.log('Success sending husbu!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'wallpaper':
            case 'wallnime':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.wp()
                    .then(async ({ result }) => {
                        await bocchi.sendFileFromUrl(from, result, 'husbu.jpg', '', id)
                            .then(() => console.log('Success sending husbu!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'pixivsearch':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/pixiv/${q}?apikey=${config.lolhuman}`, `pixiv.jpg`, `*Hasil Pencarian Pixiv : ${q}*`, id)
            break
            case 'googleimage':
            case 'googleimg':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/gimage/${q}?apikey=${config.lolhuman}`, `pixiv.jpg`, `*Hasil Pencarian Google : ${q}*`, id)
            break
            case 'burnpaper':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating burn text...')
                const burnc = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=burn_paper&text=${q}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, burnc.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'lovepaper':
            case 'lovetext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating love text...')
                const lovof = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=love_paper&text=${q}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, lovof.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'grasstext':
            case 'grass':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating grass text...')
                const grasof = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=message_under_the_grass&text=${q}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, grasof.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'metalic':
            case 'metalictext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating metalic text...')
                const metalof = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=metalic_text_glow&text=${q}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, metalof.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'wolfmetal':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating wolfmetal text...')
                const wolfof = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=wolf_metal&text=${q}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, wolfof.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'flowertext':
            case 'flower':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating flower text...')
                const plocof = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=wooden_boards&text=${q}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, plocof.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case '8bit':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                 if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const bit1 = q.substring(0, q.indexOf('|') - 1)
                const bit2 = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                const bitof = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=bit8&text1=${bit1}&text2=${bit2}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, bitof.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'harrypotter':
            case 'harrypoter':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating harry potter text...')
                const harryp = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=harry_potter&text=${q}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, harryp.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'crossfire':
            case 'cf':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating cf text...')
                const crossa = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=crossfire&text=${q}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, crossa.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'warface':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating warface text...')
                const walfes = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=warface&text=${q}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, walfes.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'overwatch':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating overwatch text...')
                const owatv = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=overwatch&text=${q}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, owatv.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'corona':
            case 'coronavirus':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.corona(q)
                    .then(async (res) => {
                        await bocchi.sendText(from, '🌎️ Covid Info - ' + q + ' 🌍️\n\n✨️ Total Cases: ' + `${res.cases}` + '\n📆️ Today\'s Cases: ' + `${res.todayCases}` + '\n☣️ Total Deaths: ' + `${res.deaths}` + '\n☢️ Today\'s Deaths: ' + `${res.todayDeaths}` + '\n⛩️ Active Cases: ' + `${res.active}` + '.')
                        console.log('Success sending Result!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'moddroid':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                downloader.modroid(q)
                    .then(async ({ status, result }) => {
                        if (status !== 200) {
                            await bocchi.reply(from, 'Not found.', id)
                        } else {
                        await bocchi.sendFileFromUrl(from, result[0].image, 'ksk.jpg', `*「 APK DITEMUKAN 」*\n\n➸ *Nama File* : ${result[0].title}\n\n➸ *Ukuran* : ${result[0].size}\n➸ *Publisher* : ${result[0].publisher}\n➸ *Version* : ${result[0].latest_version}\n➸ *Genre* : ${result[0].genre}\n\n*Link Download*\n${result[0].download}`, id)
                        console.log('Success sending info apk mod!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'error', id)
                    })
            break
            case 'happymod':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                downloader.happymod(q)
                    .then(async ({ status, result }) => {
                        if (status !== 200) {
                            await bocchi.reply(from, 'Not found.', id)
                        } else {
                        await bocchi.sendFileFromUrl(from, result[0].image, 'ksk.jpg', `*「 APK DITEMUKAN 」*\n\n➸ *Nama File* : ${result[0].title}\n\n➸ *Ukuran* : ${result[0].size}\n➸ *Root* : ${result[0].root}\n➸ *Version* : ${result[0].version}\n➸ *Harga Apk* : ${result[0].price}\n\n*Link Download*\n${result[0].download}`, id)
                        console.log('Success sending mod apk info!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!!', id)
                    })
            break
            case 'googledrive':
            case 'gdrive':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                const regex = new RegExp("\/d\/(.+)\/", 'gi')
                if (!q.match(regex)) return await bocchi.reply(from, ind.wrongFormat(), id)
                const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                function niceBytes(x){
                    let l = 0, n = parseInt(x, 10) || 0;
                        while(n >= 1024 && ++l){
                               n = n/1024;
                        }
                        return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
                    }
                    const m = q.match(regex)
                    const fileid = m.toString().trimStart('/', 'd').trim('/');
                    const linke = 'https://drive.google.com/file' + fileid + 'view?usp=sharing'
                    fetch('https://gdbypass.host/api/?link='+linke)
                        .then((res) => {
                            status = res.status
                            return res.json()
                        })
                        .then(async(body) => {
                            const fileName = body.data.Filename
                            const size = body.data.Filesize
                            const newLink = body.data.NewUnlimitedURL
                            const ling = await misc.shortener(newLink)
                            bocchi.reply(from, `*「 GOOGLE DRIVE 」*\n\n• *Nama File :* ${fileName}\n*• File Size :* ${niceBytes(size)}\n*• Short Link :* ${ling}`, id)
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
            break
            case 'threats':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediatt = isQuotedImage ? quotedMsg : message
                const dataPotott = await decryptMedia(encryptMediatt, uaOverride)
                const fotottNya = await uploadImages(dataPotott, `fotoProfiltt.${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=threats&url=${fotottNya}&raw=1`, 'Wasted.jpg', 'Ini...', id)
                console.log('Success sending Threats image!')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'glass':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediagl = isQuotedImage ? quotedMsg : message
                const dataPotogl = await decryptMedia(encryptMediagl, uaOverride)
                const fotoglNya = await uploadImages(dataPotogl, `fotoProfilgl.${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://some-random-api.ml/canvas/glass?avatar=${fotoglNya}`, 'Wasted.jpg', 'Ini...', id)
                console.log('Success sending image!')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'greyscale':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediags = isQuotedImage ? quotedMsg : message
                const dataPotogs = await decryptMedia(encryptMediags, uaOverride)
                const fotogsNya = await uploadImages(dataPotogs, `fotoProfilgs ${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://some-random-api.ml/canvas/greyscale?avatar=${fotogsNya}`, 'Wasted.jpg', 'Ini...', id)
                console.log('Success sending image!')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'invert':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediaiv = isQuotedImage ? quotedMsg : message
                const dataPotoiv = await decryptMedia(encryptMediaiv, uaOverride)
                const fotoivNya = await uploadImages(dataPotoiv, `fotoProfiliv.${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://some-random-api.ml/canvas/invert?avatar=${fotoivNya}`, 'Wasted.jpg', 'Ini...', id)
                console.log('Success sending image!')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'invertgrey':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediaig = isQuotedImage ? quotedMsg : message
                const dataPotoig = await decryptMedia(encryptMediaig, uaOverride)
                const fotoigNya = await uploadImages(dataPotoig, `fotoProfilig.${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://some-random-api.ml/canvas/invertgreyscale?avatar=${fotoigNya}`, 'Wasted.jpg', 'Ini...', id)
                console.log('Success sending image!')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'brightness':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediabn = isQuotedImage ? quotedMsg : message
                const dataPotobn = await decryptMedia(encryptMediabn, uaOverride)
                const fotobnNya = await uploadImages(dataPotobn, `fotoProfilbn.${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://some-random-api.ml/canvas/brightness?avatar=${fotobnNya}`, 'Wasted.jpg', 'Ini...', id)
                console.log('Success sending image!')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'threshold':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediath = isQuotedImage ? quotedMsg : message
                const dataPototh = await decryptMedia(encryptMediath, uaOverride)
                const fotothNya = await uploadImages(dataPototh, `fotoProfilth.${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://some-random-api.ml/canvas/threshold?avatar=${fotothNya}`, 'Wasted.jpg', 'Ini...', id)
                console.log('Success sending image!')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'sepia':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediasa = isQuotedImage ? quotedMsg : message
                const dataPotosa = await decryptMedia(encryptMediasa, uaOverride)
                const fotosaNya = await uploadImages(dataPotosa, `fotoProfilsa.${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://some-random-api.ml/canvas/sepia?avatar=${fotosaNya}`, 'Wasted.jpg', 'Ini...', id)
                console.log('Success sending image!')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'buriq':
            case 'burik':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediabq = isQuotedImage ? quotedMsg : message
                const dataPotobq = await decryptMedia(encryptMediabq, uaOverride)
                const fotobqNya = await uploadImages(dataPotobq, `fotoProfilbq.${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=jpeg&url=${fotobqNya}&raw=1`, 'Wasted.jpg', 'Ini...', id)
                console.log('Success sending image!')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'readqr':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediaqr = isQuotedImage ? quotedMsg : message
                const dataPotoqr = await decryptMedia(encryptMediaqr, uaOverride)
                const fotoqrNya = await uploadImages(dataPotoqr, `fotoProfilqr.${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                const qrread = await axios.get(`http://lolhuman.herokuapp.com/api/read-qr?url=${fotoqrNya}&apikey=${config.lolhuman}`)
                await bocchi.reply(from, qrread.data.result, id)
                console.log('Success')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'deepfry':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediadf = isQuotedImage ? quotedMsg : message
                const dataPotodf = await decryptMedia(encryptMediadf, uaOverride)
                const fotodfNya = await uploadImages(dataPotodf, `fotoProfildf.${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=deepfry&image=${fotodfNya}&raw=1`, 'Wasted.jpg', 'Ini...', id)
                console.log('Success sending deepfry image!')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'blurfry':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediabf = isQuotedImage ? quotedMsg : message
                const dataPotobf = await decryptMedia(encryptMediabf, uaOverride)
                const fotobfNya = await uploadImages(dataPotobf, `fotoProfilbf.${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=blurpify&image=${fotobfNya}&raw=1`, 'Wasted.jpg', 'Ini...', id)
                console.log('Success sending Blurfry image!')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'magik':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediamk = isQuotedImage ? quotedMsg : message
                const dataPotomk = await decryptMedia(encryptMediamk, uaOverride)
                const fotomkNya = await uploadImages(dataPotomk, `fotoProfilmk.${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=magik&image=${fotomkNya}&raw=1&intensity=5`, 'Wasted.jpg', 'Ini...', id)
                console.log('Success sending Magik image!')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'captcha':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediacc = isQuotedImage ? quotedMsg : message
                const dataPotocc = await decryptMedia(encryptMediacc, uaOverride)
                const fotoccNya = await uploadImages(dataPotocc, `fotoProfilcc.${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=captcha&url=${potoccNya}&username=${q}&raw=1`, 'Wasted.jpg', 'Ini...', id)
                console.log('Success sending captcha image!')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'runtime':
                function format(seconds){
                function pad(s){
                return (s < 10 ? '0' : '') + s;
                }
                var hours = Math.floor(seconds / (60*60));
                var minutes = Math.floor(seconds % (60*60) / 60);
                var seconds = Math.floor(seconds % 60);

                return pad(hours) + ' Hours-' + pad(minutes) + ' Minutes-' + pad(seconds) + ' Second';
                  }

                var uptime = process.uptime();
                const timebot = format(uptime)
                bocchi.reply(from, `── *「 BOT UPTIME 」* ──\n\n ❏ *${timebot}*`, id)
            break
            case 'listgroup':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                    bocchi.getAllGroups().then((res) => {
                    let berhitung1 = 1
                    let gc = `*This is list of group* :\n`
                    for (let i = 0; i < res.length; i++) {
                        gc += `\n\n*No : ${i+1}*\n*Nama* : ${res[i].name}\n*Pesan Belum Dibaca* : ${res[i].unreadCount} chat\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                    }
                    bocchi.reply(from, gc, id)
                })
            break
            case 'ownergroup':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const Owner_ = chat.groupMetadata.owner
                await bocchi.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
            break
            case 'avatar':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.avatar()
                    .then(async (res) => {
                        await bocchi.sendFileFromUrl(from, res[0].photoUrl, 'ksk.jpg', `*「 AVATAR CHARACTER 」*\n\n➸ *Nama* : ${res[0].name}\n➸ *Gender* : ${res[0].gender}\n➸ *Hair* : ${res[0].hair}\n`, id)
                        console.log('Success sending Avatar pict')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'error', id)
                    })
            break
            case 'kurs':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.kurs(q)
                    .then(async (res) => {
                    if (res.success ==! true) {
                            const kurss = `*Maaf mata uang tidak terdaftar,list mata uang terdaftar adalah:*\n${res.errors.valid_currencies}`
                            const kurzz = kurss.replace(',', "\n")
                            await bocchi.reply(from, kurss, id)
                        } else {
                        const kurss = `*「 KURS 」*\n\n*Saat ini kurs untuk 1 ${res.source} adalah ${res.converted_value} Rupiah*`
                        const kurzz = kurss.replace('.', ",")
                        await bocchi.reply(from, kurzz, id)
                        console.log('Success sending kurs info!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'genshininfo':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                try {
                        const character = genshin.characters(q)
                        console.log('Searching for character...')
                        await bocchi.sendFileFromUrl(from, character.image, 'wangi.jpg', `*「 CHARACTER 」*\n\n*${character.title}*\n*${character.description}*\n➸ *Name : ${character.name}*\n➸ *Nation : ${character.nation}*\n➸ *Gender : ${character.gender}*\n➸ *Birthday : ${character.birthday}*\n➸ *Constellation : ${character.constellation}*\n➸ *Rarity : ${character.rarity}*\n➸ *Vision : ${character.vision}*\n➸ *Weapon : ${character.weapon}*\n\n*${character.url}*`)
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Character salah atau tidak terdaftar', id)
                    }
            break
            case 'wattpadsearch':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.wtpd(q)
                    .then(async ({ result }) => {
                        let wtpdx = `-----[ *SEARCH WATTPAD* ]-----`
                        for (let i = 0; i < result.length; i++) {
                            wtpdx +=  `\n\n➸ *Judul : ${result[i].title}*\n➸ *Dibaca : ${result[i].reads}*\n➸ *Votes : ${result[i].votes}*\n\n${result[i].description}\n\n*${result[i].url}*\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.sendFileFromUrl(from, result[0].thumb, 'js.jpg', wtpdx, id)
                        console.log('Success sending Waddpatt result!')
                    })
            break
            case 'wattpadinfo':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isUrl(url) && !url.includes('wattpad.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.wtpdinfo(url)
                    .then(async (res) => {
                        let wtpdingfo = `-----[ *WATTPAD INFO* ]-----\n\n➸ *Judul* : ${res.title}\n➸ *Dibaca* : ${res.reads}\n➸ *Votes* : ${res.votes}\n➸ *Jumlah Story* : ${res.parts_count}\n\n${res.desc}\n\n*Author dari Novel ini adalah ${res.author.name}*\n*${res.author.url}*\n\n*Ini Isinya* :‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎`
                        for (let i = 0; i < res.parts.length; i++) {
                            wtpdingfo +=  `\n\n➸ *Title* : ${res.parts[i].title}\n*Url : ${res.parts[i].url}*\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.sendFileFromUrl(from, res.author.pic, 'js.jpg', wtpdingfo, id)
                        console.log('Success sending Waddpatt result!')
                    })
            break
            case 'twtstalk':
            case 'twitterstalk':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.twtStalk(q)
                    .then(async ({ result }) => {
                        if (result.status === 204) {
                            await bocchi.reply(from, 'Not found.', id)
                        } else {
                            const texttt = `*「 TWITTER STALK 」*\n\n➸ *Username*: ${result.username}\n➸ *Full name*: ${result.fullname}\n➸ *Followers*: ${result.followers}\n➸ *Following*: ${result.following}\n➸ *Tweets*: ${result.tweet_count}\n➸ *Joined On*: ${result.joined_on}\n\n➸ *Profile Banner URL*: \n${result.pp_banner}`
                            await bocchi.sendFileFromUrl(from, result.pp, 'insta.jpg', texttt, id)
                            console.log('Success sending TWT stalk!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'freepik':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.freepik(q)
                    .then(async ({ result, status }) => {
                        if (status !== 200) {
                            await bocchi.reply(from, 'Not found.', id)
                        } else {
                            const frpk = JSON.parse(JSON.stringify(result))
                            const frpk2 =  frpk[Math.floor(Math.random() * frpk.length)]
                            await bocchi.sendFileFromUrl(from, frpk2.title, 'meme.jpg', `*Hasil Pencarian Freepik : ${q}*`, id)
                            .then(() => console.log('Success sending freepik image..'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'google':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                google({ 'query': q })
                    .then(results => {
                    let vars = `-----[ *GOOGLE SEARCH* ]-----\n\n_*Search Result from : ${q}*_`
                    for (let i = 0; i < results.length; i++) {
                        vars +=  `\n\n• *Judul* : ${results[i].title}\n• *Deskripsi* : ${results[i].snippet}\n• *Link : ${results[i].link}*\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        bocchi.reply(from, vars, id)
                    })
                    .catch(e => {
                    console.log(e)
                        bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'linedl':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) return await bocchi.reply(from, ind.pcOnly(), id)
                if (!isUrl(url) && !url.includes('store.line.me')) return await bocchi.reply(from, ind.wrongFormat(), id)
                downloader.line(url)
                    .then(async (res) => {
                        await bocchi.sendFileFromUrl(from, res.thumb, 'line.png', `*「 LINE STICKER DOWNLOADER 」*\n\n➸ *Title* : ${res.title}\n➸ *Type Sticker* : ${res.type}\n\n_Mohon tunggu,sticker akan segera dikirim_`, id)
                        for (let i = 0; i < res.sticker.length; i++) {
				        await bocchi.sendStickerfromUrl(from, `${res.sticker[i]}`)
                            .then(() => console.log('Success sending line sticker..'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'hadis':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (args.length !== 2) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                try {
                    if (ar[0] === 'darimi') {
                        const hdar = await axios.get(`https://api.hadith.sutanlab.id/books/darimi/${args[1]}`)
                        await bocchi.sendText(from, `${hdar.data.data.contents.arab}\n${hdar.data.data.contents.id}\n*H.R. Darimi*`, id)
                    } else if (ar[0] === 'ahmad') {
                        const hmad = await axios.get(`https://api.hadith.sutanlab.id/books/ahmad/${args[1]}`)
                        await bocchi.sendText(from, `${hmad.data.data.contents.arab}\n${hmad.data.data.contents.id}\n*H.R. Ahmad*`, id)
                    } else if (ar[0] === 'bukhari') {
                        const hbukh = await axios.get(`https://api.hadith.sutanlab.id/books/bukhari/${args[1]}`)
                        await bocchi.sendText(from, `${hbukh.data.data.contents.arab}\n${hbukh.data.data.contents.id}\n*H.R. Bukhori*`, id)
                    } else if (ar[0] === 'muslim') {
                        const hmus = await axios.get(`https://api.hadith.sutanlab.id/books/muslim/${args[1]}`)
                        await bocchi.sendText(from, `${hmus.data.data.contents.arab}\n${hmus.data.data.contents.id}\n*H.R. Muslim*`, id)
                    } else if (ar[0] === 'malik') {
                        const hmal = await axios.get(`https://api.hadith.sutanlab.id/books/malik/${args[1]}`)
                        await bocchi.sendText(from, `${hmal.data.data.contents.arab}\n${hmal.data.data.contents.id}\n*H.R. Malik*`, id)
                    } else if (ar[0] === 'nasai') {
                        const hnas = await axios.get(`https://api.hadith.sutanlab.id/books/nasai/${args[1]}`)
                        await bocchi.sendText(from, `${hnas.data.data.contents.arab}\n${hnas.data.data.contents.id}\n*H.R. Nasa'i*`, id)
                    } else if (ar[0] === 'tirmidzi') {
                        const htir = await axios.get(`https://api.hadith.sutanlab.id/books/tirmidzi/${args[1]}`)
                        await bocchi.sendText(from, `${htir.data.data.contents.arab}\n${htir.data.data.contents.id}\n*H.R. Tirmidzi*`, id)
                    } else if (ar[0] === 'ibnumajah') {
                        const hibn = await axios.get(`https://api.hadith.sutanlab.id/books/ibnu-majah/${args[1]}`)
                        await bocchi.sendText(from, `${hibn.data.data.contents.arab}\n${hibn.data.data.contents.id}\n*H.R. Ibnu Majah*`, id)
                    } else if (ar[0] === 'abudaud') {
                        const habud = await axios.get(`https://api.hadith.sutanlab.id/books/abu-daud/${args[1]}`)
                        await bocchi.sendText(from, `${habud.data.data.contents.arab}\n${habud.data.data.contents.id}\n*H.R. Abu Daud*`, id)
                    } else {
                        await bocchi.sendText(from, `
        _*Assalamu'alaikum wr. wb.*_
        
*Daftar bot hadis :*\n
1. Hadis Bukhari ada 6638 Hadis
	_keybot_ : ${prefix}hadis bukhari 1\n
2. Hadis Muslim ada 4930 Hadis
	_keybot_ : ${prefix}hadis muslim 25\n
3. Hadis Tirmidzi ada 3625 Hadis
	_keybot_ : ${prefix}hadis tirmidzi 10\n
4. Hadis nasai ada 5364 Hadis
	_keybot_ : ${prefix}hadis nasai 6\n
5. Hadis Ahmad ada 4305 Hadis
	_keybot_ : ${prefix}hadis ahmad 5\n
6. Hadis Abu Daud ada 4419 Hadis
	_keybot_ : ${prefix}hadis abudaud 45\n
7. Hadis Malik ada 1587 Hadis
	_keybot_ : ${prefix}hadis malik 45\n
8. Hadis Ibnu Majah ada 4285 Hadis
	_keybot_ : ${prefix}hadis ibnumajah 8\n
9. Hadis Darimi ada 2949 Hadis
    _keybot_ : ${prefix}hadis darimi 3
    
		*Semoga Bermanfaat*
        _*Wassalam*_`, id)
                    }
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'wikien': //By: VideFrelan
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.wikien(q)
                    .then(async ({ result }) => {
                        if (result.status !== '200') {
                            await bocchi.reply(from, 'Not Found!', id)
                        } else {
                            await bocchi.reply(from, `➸ *PageId*: ${result.pageid}\n➸ *Title*: ${result.title}\n➸ *Result*: ${result.desc}`, id)
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'translate':
            case 'trans':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const texto = q.substring(0, q.indexOf('|') - 1)
                const languaget = q.substring(q.lastIndexOf('|') + 2)
                translate(texto, {to: languaget}).then(res => {bocchi.reply(from, res.text, id)})
            break
            case 'dogfact':
            case 'dog':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                const dogf = await axios.get('https://some-random-api.ml/animal/dog')
                await bocchi.sendFileFromUrl(from, dogf.data.image, 'cat.jpg', dogf.data.fact, id)
            break
            case 'catfact':
            case 'cat':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                const catf = await axios.get('https://some-random-api.ml/animal/cat')
                await bocchi.sendFileFromUrl(from, catf.data.image, 'cat.jpg', catf.data.fact, id)
            break
            case 'pandafact':
            case 'panda':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                const pandaf = await axios.get('https://some-random-api.ml/animal/panda')
                await bocchi.sendFileFromUrl(from, pandaf.data.image, 'cat.jpg', pandaf.data.fact, id)
            break
            case 'foxfact':
            case 'fox':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                const foxf = await axios.get('https://some-random-api.ml/animal/fox')
                await bocchi.sendFileFromUrl(from, foxf.data.image, 'cat.jpg', foxf.data.fact, id)
            break
            case 'birdfact':
            case 'bird':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                const birdf = await axios.get('https://some-random-api.ml/animal/birb')
                await bocchi.sendFileFromUrl(from, birdf.data.image, 'cat.jpg', birdf.data.fact, id)
            break
            case 'koalafact':
            case 'koala':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                const koalaf = await axios.get('https://some-random-api.ml/animal/koala')
                await bocchi.sendFileFromUrl(from, koalaf.data.image, 'cat.jpg', koalaf.data.fact, id)
            break
            case 'racoonact':
            case 'racoon':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                const raconf = await axios.get('https://some-random-api.ml/animal/racoon')
                await bocchi.sendFileFromUrl(from, raconf.data.image, 'cat.jpg', raconf.data.fact, id)
            break
            case 'kangaroofact':
            case 'kangaroo':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                const kangarof = await axios.get('https://some-random-api.ml/animal/kangaroo')
                await bocchi.sendFileFromUrl(from, kangarof.data.image, 'cat.jpg', kangarof.data.fact, id)
            break
            case 'joke':
            case 'jokes':
            case 'randomjoke':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                const jokef = await axios.get('https://some-random-api.ml/joke')
                await bocchi.reply(from, jokef.data.joke, id)
            break
            case 'kelpersegi':
                if (!isRegistered) return await bocchi.reply(from, ind.registered(), id)
                const persegi = bdr.datar.keliling.persegi(q, false)
                const caraPersegi = bdr.datar.keliling.persegi(q, true)
                await bocchi.reply(from, `*Hasil*: ${persegi}\n*Rumus*: ${caraPersegi}`, id)
            break
            case 'luaspersegi':
                if (!isRegistered) return await bocchi.reply(from, ind.registered(), id)
                const luaspersegi = bdr.datar.luas.persegi(q, false)
                const luaspersegis = bdr.datar.luas.persegi(q, true)
                await bocchi.reply(from, `*Hasil*: ${luaspersegi}\n*Rumus*: ${luaspersegis}`, id)
            break
            case 'kuadrat':
                if (!isRegistered) return await bocchi.reply(from, ind.registered(), id)
                const kuadrat = bdr.rdb.kuadrat(q)
                await bocchi.reply(from, `*Hasil*: ${kuadrat}`, id)
            break
            case 'kubik':
                if (!isRegistered) return await bocchi.reply(from, ind.registered(), id)
                const kubik = bdr.rdb.kubik(q)
                await bocchi.reply(from, `*Hasil*: ${kubik}`, id)
            break
            case 'creepyfact': // By Kris
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                fetch('https://raw.githubusercontent.com/TheSploit/CreepyFact/main/creepy.txt')
                    .then((res) => res.text())
                    .then(async (body) => {
                        let creepyx = body.split('\n')
                        let creepyz = creepyx[Math.floor(Math.random() * creepyx.length)]
                        await bocchi.reply(from, creepyz, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'stickerp':
            case 'stikerp':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await bocchi.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize({
                                    width: 512,
                                    height: 512,
                                    fit: 'contain',
                                    background: {
                                        r: 255,
                                        g: 255,
                                        b: 255,
                                        alpha: 0
                                    }
                                })
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: true })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await bocchi.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'stikernobg':
            case 'stickernobg': //by: VideFrelan
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                    await bocchi.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const q = await uploadImages(mediaData, `stickernobg.${sender.id}`)
                    misc.stickernobg(q)
                    .then(async ({ result }) => {
                        await bocchi.sendStickerfromUrl(from, result.image)
                        console.log('Success sending Sticker no background!')
                    })
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'apkpure':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.apkPure(q)
                    .then(async ({ status, result }) => {
                        if (status ==! 'true') {
                            await bocchi.reply(from, 'not found', id)
                        } else {
                        let txt = '*「 APKPURE SEARCH 」*'
                        for (let i = 0; i < result.length; i++) {
                            txt += `\n\n➸ *Title : ${result[i].title}*\n➸ *Rating: ${result[i].rating}*\n\n*${result[i].url}*\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.sendFileFromUrl(from, result[0].thumbnail, 'apk.jpg', txt, id)
                        console.log('Success sending result APKPure!')
                        }
                     })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'neonimesearch':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.neosearch(q)
                    .then(async ({ result }) => {
                        let neose = `-----[ *NEONIME SEARCH* ]-----`
                        for (let i = 0; i < result.length; i++) {
                            neose += `\n\n➸ *Title: ${result[i].title}*\n➸ *Description*: ${result[i].desc}\n\n*${result[i].link}*\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.sendFileFromUrl(from, result[0].thumb, 'ksks.jpg', neose, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'hitunghuruf':
            case 'jumlahhuruf':
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                console.log('Menghitung...')
                const itungcuk = await axios.get(`https://videfikri.com/api/jumlahhuruf/?query=${q}`)
                await bocchi.reply(from, itungcuk.data.result.jumlah, id)
                    .then(() => console.log('Success..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'balikhuruf':
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                console.log('Sedang membalikkan huruf...')
                const balikcuk = await axios.get(`https://videfikri.com/api/hurufterbalik/?query=${q}`)
                await bocchi.reply(from, balikcuk.data.result.kata, id)
                    .then(() => console.log('Success..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'quotenime':
            case 'quotesnime':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                console.log('Sending random quote...')
                const quotezznime = await axios.get(`https://lolhuman.herokuapp.com/api/random/quotesnime?apikey=${config.lolhuman}`)
                await bocchi.sendText(from, `➸ *Quotes* : ${quotezznime.data.result.quote}\n➸ *Character* : ${quotezznime.data.result.character} from Anime *${quotezznime.data.result.anime}*`, id)
                    .then(() => console.log('Success sending quotes..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'quotenime2':
            case 'quotesnime2':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                console.log('Sending random quote...')
                const quoteznime = await axios.get('https://some-random-api.ml/animu/quote')
                await bocchi.sendText(from, `➸ *Quotes* : ${quoteznime.data.sentence}\n➸ *Character* : ${quoteznime.data.characther} from Anime *${quoteznime.data.anime}*`, id)
                    .then(() => console.log('Success sending quotes..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'chord':
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                console.log('Sedang mencari chord gitar....')
                const chordcuk = await axios.get(`https://tobz-api.herokuapp.com/api/chord?q=${q}&apikey=${config.tobz}`)
                await bocchi.reply(from, chordcuk.data.result, id)
                    .then(() => console.log('Success..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'oleave':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly())
                await bocchi.sendText(from, 'Bot diperintahkan owner untuk Keluar').then(() => bocchi.leaveGroup(groupId))
            break
            case 'jadwaltv':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                try {
                    if (ar[0] === 'indosiar') {
                        const jtvc = await axios.get(`https://mhankbarbar.tech/api/jdtv?ch=${ar[0]}&apiKey=${config.barbar}`)
                        await bocchi.sendText(from, `-----[ *JADWAL TV* ]-----\n\n${jtvc.data.result}`, id)
                    } else if (ar[0] === 'transtv') {
                        const jtvc = await axios.get(`https://mhankbarbar.tech/api/jdtv?ch=${ar[0]}&apiKey=${config.barbar}`)
                        await bocchi.sendText(from, `-----[ *JADWAL TV* ]-----\n\n${jtvc.data.result}`, id)
                    } else if (ar[0] === 'trans7') {
                        const jtvc = await axios.get(`https://mhankbarbar.tech/api/jdtv?ch=${ar[0]}&apiKey=${config.barbar}`)
                        await bocchi.sendText(from, `-----[ *JADWAL TV* ]-----\n\n${jtvc.data.result}`, id)
                    } else if (ar[0] === 'rtv') {
                        const jtvc = await axios.get(`https://mhankbarbar.tech/api/jdtv?ch=${ar[0]}&apiKey=${config.barbar}`)
                        await bocchi.sendText(from, `-----[ *JADWAL TV* ]-----\n\n${jtvc.data.result}`, id)
                    } else if (ar[0] === 'sctv') {
                        const jtvc = await axios.get(`https://mhankbarbar.tech/api/jdtv?ch=${ar[0]}&apiKey=${config.barbar}`)
                        await bocchi.sendText(from, `-----[ *JADWAL TV* ]-----\n\n${jtvc.data.result}`, id)
                    } else if (ar[0] === 'rcti') {
                        const jtvc = await axios.get(`https://mhankbarbar.tech/api/jdtv?ch=${ar[0]}&apiKey=${config.barbar}`)
                        await bocchi.sendText(from, `-----[ *JADWAL TV* ]-----\n\n${jtvc.data.result}`, id)
                    } else if (ar[0] === 'nettv') {
                        const jtvc = await axios.get(`https://mhankbarbar.tech/api/jdtv?ch=${ar[0]}&apiKey=${config.barbar}`)
                        await bocchi.sendText(from, `-----[ *JADWAL TV* ]-----\n\n${jtvc.data.result}`, id)
                    } else if (ar[0] === 'kompastv') {
                        const jtvc = await axios.get(`https://mhankbarbar.tech/api/jdtv?ch=${ar[0]}&apiKey=${config.barbar}`)
                        await bocchi.sendText(from, `-----[ *JADWAL TV* ]-----\n\n${jtvc.data.result}`, id)
                    } else if (ar[0] === 'antv') {
                        const jtvc = await axios.get(`https://mhankbarbar.tech/api/jdtv?ch=${ar[0]}&apiKey=${config.barbar}`)
                        await bocchi.sendText(from, `-----[ *JADWAL TV* ]-----\n\n${jtvc.data.result}`, id)
                    } else if (ar[0] === 'gtv') {
                        const jtvc = await axios.get(`https://mhankbarbar.tech/api/jdtv?ch=${ar[0]}&apiKey=${config.barbar}`)
                        await bocchi.sendText(from, `-----[ *JADWAL TV* ]-----\n\n${jtvc.data.result}`, id)
                    } else if (ar[0] === 'inewstv') {
                        const jtvc = await axios.get(`https://mhankbarbar.tech/api/jdtv?ch=${ar[0]}&apiKey=${config.barbar}`)
                        await bocchi.sendText(from, `-----[ *JADWAL TV* ]-----\n\n${jtvc.data.result}`, id)
                    } else if (ar[0] === 'mnctv') {
                        const jtvc = await axios.get(`https://mhankbarbar.tech/api/jdtv?ch=${ar[0]}&apiKey=${config.barbar}`)
                        await bocchi.sendText(from, `-----[ *JADWAL TV* ]-----\n\n${jtvc.data.result}`, id)
                    } else if (ar[0] === 'metrotv') {
                        const jtvc = await axios.get(`https://mhankbarbar.tech/api/jdtv?ch=${ar[0]}&apiKey=${config.barbar}`)
                        await bocchi.sendText(from, `-----[ *JADWAL TV* ]-----\n\n${jtvc.data.result}`, id)
                    } else {
                        await bocchi.sendText(from, `
        _*TIDAK TERDAFTAR*_
        
*Daftar list Channel tv :*\n
1. Channel Indosiar
	_keybot_ : ${prefix}jadwaltv indosiar\n
2. Channel TransTV
	_keybot_ : ${prefix}jadwaltv transtv\n
3. Channel Trans7
	_keybot_ : ${prefix}jadwaltv trans7\n
4. Channel Rajawali TV
	_keybot_ : ${prefix}jadwaltv rtv\n
5. Channel SCTV
	_keybot_ : ${prefix}jadwaltv sctv\n
6. Channel RCTI
	_keybot_ : ${prefix}jadwaltv rcti\n
7. Channel NetTV
	_keybot_ : ${prefix}jadwaltv nettv\n
8. Channel KompasTV
	_keybot_ : ${prefix}jadwaltv kompastv\n
9. Channel ANTV
    _keybot_ : ${prefix}jadwaltv antv\n
10. Channel GlobalTV
    _keybot_ : ${prefix}jadwaltv gtv\n
11. Channel Inews TV
    _keybot_ : ${prefix}jadwaltv inews\n
12. Channel MNCTV
    _keybot_ : ${prefix}jadwaltv mnctv\n
13. Channel MetroTV
    _keybot_ : ${prefix}jadwaltv metrotv

        _*List TV Index*_`, id)
                    }
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'xnxxdl':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                if (!isUrl(url) && !url.includes('xnxx.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                nsfw.xnxdl(url)
                    .then(async ({ result }) => {
                        if (Number(result.size.split(' MB')[0]) >= 30) {
                            await bocchi.reply(from, ind.videoLimit(), id)
                        } else {
                            await bocchi.sendFileFromUrl(from, result.thumb, `${result.judul}.jpg`, `*「 XNXX DOWNLOADER 」*\n\n➸ *Title* : ${result.judul}\n➸ *Description* : ${result.desc}\n➸ *Size* : ${result.size}\n\n_Harap tunggu media sedang dikirim_`, id)
                            await bocchi.sendFileFromUrl(from, result.vid, `${result.judul}.mp4`, '', id)
                            console.log('Success sending Xnxx video!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'xvideosdl':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('xvideos.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    nsfw.xvdl(url)
                        .then(async (res) => {
                            if (Number(res.size.split(' MB')[0]) >= 30) {
                                const shortxv = await misc.shortener(res.vid)
                                await bocchi.reply(from, `*「 XVIDEOS DOWNLOADER 」*\n\n➸ *Title* : ${res.judul}\n➸ *Size* : ${res.size}\n\nUkuran video melebihi batas,file download akan disajikan dalam bentuk link\n*${shortxv}*`, id)
                            } else {
                                await bocchi.sendFileFromUrl(from, res.vid, 'xnxx.mp4', `*「 XVIDEOS DOWNLOADER 」*\n\n➸ *Title* : ${res.judul}\n➸ *Size* : ${res.size}`, id)
                                console.log('Success sending xvideos!')
                            }
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    nsfw.xvdl(url)
                        .then(async (res) => {
                            if (Number(res.size.split(' MB')[0]) >= 30) {
                                const shortxv = await misc.shortener(res.vid)
                                await bocchi.reply(from, `*「 XVIDEOS DOWNLOADER 」*\n\n➸ *Title* : ${res.judul}\n➸ *Size* : ${res.size}\n\nUkuran video melebihi batas,file download akan disajikan dalam bentuk link\n*${shortxv}*`, id)
                            } else {
                                await bocchi.sendFileFromUrl(from, res.vid, 'xnxx.mp4', `*「 XVIDEOS DOWNLOADER 」*\n\n➸ *Title* : ${res.judul}\n➸ *Size* : ${res.size}`, id)
                                console.log('Success sending xvideos!')
                            }
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                }
            break
            case 'goldbutton':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                try {
                const gbutto = await axios.get(`https://api.zeks.xyz/api/gplaybutton?text=${q}&apikey=${config.zeks}`)
                const staging = await toBuffer(gbutto.data.result)
                const buffer = `data:image/jpg;base64,${staging.toString('base64')}`
                await bocchi.sendImage(from, buffer, `${q}.jpg`, '', id)
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'lighttext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                try {
                const lightwr = await axios.get(`https://api.zeks.xyz/api/lithgtext?text=${q}&apikey=${config.zeks}`)
                const staging = await toBuffer(lightwr.data.result)
                const buffer = `data:image/jpg;base64,${staging.toString('base64')}`
                await bocchi.sendImage(from, buffer, `${q}.jpg`, '', id)
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'silverbutton':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                try {
                const sbutto = await axios.get(`https://api.zeks.xyz/api/splaybutton?text=${q}&apikey=${config.zeks}`)
                const staging = await toBuffer(sbutto.data.result)
                const buffer = `data:image/jpg;base64,${staging.toString('base64')}`
                await bocchi.sendImage(from, buffer, `${q}.jpg`, '', id)
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'colourtext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                try {
                const colott = await axios.get(`https://api.zeks.xyz/api/colortext?text=${q}&apikey=${config.zeks}`)
                const staging = await toBuffer(colott.data.result)
                const buffer = `data:image/jpg;base64,${staging.toString('base64')}`
                await bocchi.sendImage(from, buffer, `${q}.jpg`, '', id)
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'revoke':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return bocchi.reply(from, ind.botNotAdmin(), id)
                await bocchi.revokeGroupInviteLink(groupId);
                bocchi.sendTextWithMentions(from, `Link group telah direset oleh admin @${sender.id.replace('@c.us', '')}`)
            break
            case 'flamingtext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating flaming text...')
                const flamingze = await axios.get(`https://api.zeks.xyz/api/flametext?text=${q}&apikey=${config.zeks}`)
                await bocchi.sendFileFromUrl(from, flamingze.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'howgay':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                console.log('Rate gay....')
                const apiaru = await axios.get('https://arugaz.herokuapp.com/api/howgay')
                bocchi.reply(from, `*${apiaru.data.desc}*\n\n*Persen Gay : ${apiaru.data.persen}%*\n`, id)
            break
            case 'whipped':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                console.log('Rate kebucinan....')
                const apiarug = await axios.get('https://arugaz.herokuapp.com/api/howbucins')
                bocchi.reply(from, `*${apiarug.data.desc}*\n\n*Persen Bucin : ${apiarug.data.persen}*\n`, id)
            break
            case 'indohot':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    nsfw.indohot()
                        .then(async ({ result }) => {
                            await bocchi.reply(from, `➸ *Judul*: ${result.judul}\n➸ *Durasi*: ${result.durasi}\n➸ *Genre*: ${result.genre}\n➸ *Country*: ${result.country}\n\n*${result.url}*`, id)
                                .then(() => console.log('Success sending indohot!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    nsfw.indohot()
                        .then(async ({ result }) => {
                            await bocchi.reply(from, `➸ *Judul*: ${result.judul}\n➸ *Durasi*: ${result.durasi}\n➸ *Genre*: ${result.genre}\n➸ *Country*: ${result.country}\n\n*${result.url}*`, id)
                                .then(() => console.log('Success sending indohot!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                }
            break
            case 'bacakomik':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.bkomik(q)
                    .then(async ({ result }) => {
                        let bcomix = `-----[ *SEARCH BACAKOMIK* ]-----`
                        for (let i = 0; i < result.length; i++) {
                            bcomix +=  `\n\n➸ *Judul* : ${result[i].judul}\n➸ *Genre* : ${result[i].genre}\n➸ *Rating* : ${result[i].rating}\n➸ *Pengarang* : ${result[i].pengarang}\n➸ *Rilis* : ${result[i].dirilis}\n➸ *Latest Updated* : ${result[i].update_terakhir}\n\n*${result[i].link}*\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.sendFileFromUrl(from, result[0].thumbnail, 'js.jpg', bcomix, id)
                        console.log('Success sending Waddpatt result!')
                    })
            break
            case 'anoboylatest':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.anoboylts()
                    .then(async ({ result }) => {
                        let anoboyIngfo = '-----[ *ANOBOY LATEST-UPDATE* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            anoboyIngfo += `\n\n➸ *Title*: ${result[i].title}\n➸ *Date*: ${result[i].date}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.sendFileFromUrl(from, result[0].image, 'kdkd.jpg', anoboyIngfo, id)
                        console.log('Success sending on-going anime!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'anoboysearch':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.anosearch(q)
                    .then(async ({ result }) => {
                        let anoboyser = '-----[ *ANOBOY SEARCH* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            anoboyser += `\n\n➸ *Title*: ${result[i].title}\n➸ *Release Date* : ${result[i].date}\n➸ *URL*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.sendFileFromUrl(from, result[0].image, 'kdkd.jpg', anoboyser, id)
                        console.log('Success sending result anime!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'quotemaker':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/quotemaker?text=${q}&apikey=${config.lolhuman}`, 'quote.jpg', '', id)
                console.log('Success!')
            break
            
            case 'reminder': // by Slavyan
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const timeRemind = q.substring(0, q.indexOf('|') - 1)
                const messRemind = q.substring(q.lastIndexOf('|') + 2)
                const parsedTime = ms(toMs(timeRemind))
                reminder.addReminder(sender.id, messRemind, timeRemind, _reminder)
                await bocchi.sendTextWithMentions(from, `*「 REMINDER 」*\n\nReminder diaktifkan! :3\n\n➸ *Pesan*: ${messRemind}\n➸ *Durasi*: ${parsedTime.hours} jam ${parsedTime.minutes} menit ${parsedTime.seconds} detik\n➸ *Untuk*: @${sender.id.replace('@c.us', '')}`, id)
                const intervRemind = setInterval(async () => {
                    if (Date.now() >= reminder.getReminderTime(sender.id, _reminder)) {
                        await bocchi.sendTextWithMentions(from, `⏰ *「 REMINDER 」* ⏰\n\nAkhirnya tepat waktu~ @${sender.id.replace('@c.us', '')}\n\n➸ *Pesan*: ${reminder.getReminderMsg(sender.id, _reminder)}`)
                        _reminder.splice(reminder.getReminderPosition(sender.id, _reminder), 1)
                        fs.writeFileSync('./database/user/reminder.json', JSON.stringify(_reminder))
                        clearInterval(intervRemind)
                    }
                }, 1000)
            break
            case 'slot':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const somtoy = sotoy[Math.floor(Math.random() * (sotoy.length))]	
                const somtoyy = sotoy[Math.floor(Math.random() * (sotoy.length))]	
                const somtoyyy = sotoy[Math.floor(Math.random() * (sotoy.length))]	
                if (somtoyy  == '🍌 : 🍌 : 🍌') {
	     	    bocchi.sendText(from, `[  🎰 | *SLOTS* ]\n-----------------\n${somtoy}\n${somtoyy} <=====\n${somtoyyy}\n-----------------\n[  🎰 | *YOU WIN* ]`, id)
	     	    } else if (somtoyy == '🍒 : 🍒 : 🍒') {
	     	    bocchi.sendText(from, `[  🎰 | *SLOTS* ]\n-----------------\n${somtoy}\n${somtoyy} <=====\n${somtoyyy}\n-----------------\n[  🎰 | *YOU WIN* ]`, id)
	     	    } else if (somtoyy == '🔔 : 🔔 : 🔔') {
	     	    bocchi.sendText(from, `[  🎰 | *SLOTS* ]\n-----------------\n${somtoy}\n${somtoyy} <=====\n${somtoyyy}\n-----------------\n[  🎰 | *YOU WIN* ]`, id)
	     	    } else if (somtoyy == '🍐 : 🍐 : 🍐') {
	     	    bocchi.sendText(from, `[  🎰 | *SLOTS* ]\n-----------------\n${somtoy}\n${somtoyy} <=====\n${somtoyyy}\n-----------------\n[  🎰 | *YOU WIN* ]`, id)
	     	    } else if (somtoyy == '🍇 : 🍇 : 🍇') {
	     	    bocchi.sendText(from, `[  🎰 | *SLOTS* ]\n-----------------\n${somtoy}\n${somtoyy} <=====\n${somtoyyy}\n-----------------\n[  🎰 | *YOU WIN* ]`, id)
	     	    } else {
	     	    bocchi.sendText(from, `[  🎰 | *SLOTS* ]\n-----------------\n${somtoy}\n${somtoyy} <=====\n${somtoyyy}\n-----------------\n[  🎰 | *LOST* ]`, id)
	     	    }
	        break
            case 'imagetourl':
            case 'imgtourl':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await bocchi.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const linkImg = await uploadImages(mediaData, `${sender.id}_img`)
                    await bocchi.reply(from, linkImg, id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'infohoax':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.infoHoax()
                    .then(async ({ result }) => {
                        let txt = '*「 HOAXES 」*'
                        for (let i = 0; i < result.length; i++) {
                            const { tag, title, link } = result[i]
                            txt += `\n\n➸ *Status*: ${tag}\n➸ *Deskripsi*: ${title}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.sendFileFromUrl(from, result[0].image, 'hoax.jpg', txt, id)
                        console.log('Success sending info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'trending':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.trendingTwt(q)
                    .then(async ({ result }) => {
                        let txt = '*「 TRENDING TWITTER 」*'
                        for (let i = 0; i < result.data.length; i++) {
                            txt += `\n\n*${result.data[i].title}*\n➸ *Jumlah Tweets*: ${result.data[i].tweet_count}\n➸ *Link*: ${result.data[i].url}`
                        }
                        await bocchi.reply(from, txt, id)
                        console.log('Success sending trending!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'jobseek':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.jobSeek()
                    .then(async ({ data }) => {
                        let txt = '*「 JOB SEEKER 」*'
                        for (let i = 0; i < data.length; i++) {
                            const { perusahaan, link, profesi, gaji, lokasi, pengalaman, edukasi, desc, syarat } = data[i]
                            txt += `\n\n➸ *Perusahaan*: ${perusahaan}\n➸ *Lokasi*: ${lokasi}\n➸ *Profesi*: ${profesi}\n➸ *Gaji*: ${gaji}\n➸ *Pengalaman*: ${pengalaman}\n➸ *Deskripsi*: ${desc}\n➸ *Syarat*: ${syarat}\n➸ *Edukasi*: ${edukasi}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, txt, id)
                        console.log('Success sending jobseek!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'spamcall':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                if (isNaN(Number(args[0]))) return await bocchi.reply(from, ind.wrongFormat())
                await bocchi.reply(from, ind.wait(), id)
                misc.spamcall(args[0])
                    .then(async ({ result }) => {
                        if (result.status !== 200) {
                            await bocchi.reply(from, result.logs, id)
                        } else {
                            await bocchi.reply(from, result.logs, id)
                            console.log('Success sending spam!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'spamsms':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (args.length !== 2) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isNaN(Number(args[0])) && isNaN(Number(args[1]))) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (Number(args[1]) > 10) return await bocchi.reply(from, 'Maximum 10 SMS.', id)
                await bocchi.reply(from, ind.wait(), id)
                misc.spamsms(args[0], args[1])
                    .then(async ({ status, logs, msg }) => {
                        if (status !== 200) {
                            await bocchi.reply(from, msg, id)
                        } else {
                            await bocchi.reply(from, logs, id)
                            console.log('Success sending spam!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break

            // Bot
            case 'menu':
            case 'help':
                const jumlahUser = _registered.length
                const levelMenu = level.getLevelingLevel(sender.id, _level)
                const xpMenu = level.getLevelingXp(sender.id, _level)
                const reqXpMenu = 200 * (Math.pow(2, levelMenu) - 1)
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (args[0] === '1') {
                    await bocchi.sendText(from, ind.menuDownloader())
                } else if (args[0] === '2') {
                    await bocchi.sendText(from, ind.menuText())
                } else if (args[0] === '3') {
                    if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                    await bocchi.sendText(from, ind.menuPremi())
                } else if (args[0] === '4') {
                    await bocchi.sendText(from, ind.menuSticker())
                } else if (args[0] === '5') {
                    await bocchi.sendText(from, ind.menuWeeaboo())
                } else if (args[0] === '6') {
                    await bocchi.sendText(from, ind.menuFun())
                } else if (args[0] === '7') {
                    await bocchi.sendText(from, ind.menuImage())
                } else if (args[0] === '8') {
                    if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                    await bocchi.sendText(from, ind.menuKerang())
                } else if (args[0] === '9') {
                    if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                    await bocchi.sendText(from, ind.menuModeration())
                } else if (args[0] === '10') {
                    if (isGroupMsg && !isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.sendText(from, ind.menuNsfw())
                } else if (args[0] === '11') {
                    if (!isOwner) return await bocchi.reply(from, ind.ownerOnly())
                    await bocchi.sendText(from, ind.menuOwner())
                } else if (args[0] === '12') {
                    if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                    await bocchi.sendText(from, ind.menuLeveling())
                } else if (args[0] === '13') {
                    await bocchi.sendText(from, ind.menuPray())
                } else if (args[0] === '14') {
                    if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                    await bocchi.sendText(from, ind.menuMisc())
                } else if (args[0] === '15') {
                    await bocchi.sendText(from, ind.menuBot())
                } else if (args[0] === '16') {
                    await bocchi.sendText(from, ind.menuPrice())
                } else {
                    await bocchi.sendText(from, ind.menu(jumlahUser, levelMenu, xpMenu, role, pushname, reqXpMenu, isPremium ? 'YES' : 'NO'))
                }
            break
            case 'rules':
            case 'rule':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.sendText(from, ind.rules())
            break
            case 'nsfw':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isNsfw) return await bocchi.reply(from, ind.nsfwAlready(), id)
                    _nsfw.push(groupId)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await bocchi.reply(from, ind.nsfwOn(), id)
                } else if (ar[0] === 'disable') {
                    _nsfw.splice(groupId, 1)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await bocchi.reply(from, ind.nsfwOff(), id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'status':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.sendText(from, `*RAM*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem / 1024 / 1024)} MB\n*CPU*: ${os.cpus()[0].model}`)
            break
            case 'listblock':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                let block = ind.listBlock(blockNumber)
                for (let i of blockNumber) {
                    block += `@${i.replace('@c.us', '')}\n`
                }
                await bocchi.sendTextWithMentions(from, block)
            break
            case 'owner':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.sendContact(from, ownerNumber)
            break
            case 'ping':
            case 'p':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.sendText(from, `Pong!\nSpeed: ${processTime(t, moment())} secs`)
            break
            case 'delete':
            case 'del':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!quotedMsg) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!quotedMsgObj.fromMe) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
            case 'report':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.emptyMess(), id)
                const lastReport = limit.getLimit(sender.id, _limit)
                if (lastReport !== undefined && cd - (Date.now() - lastReport) > 0) {
                    const time = ms(cd - (Date.now() - lastReport))
                    await bocchi.reply(from, ind.limit(time), id)
                } else {
                    if (isGroupMsg) {
                        await bocchi.sendText(ownerNumber, `-----[ REPORT ]-----\n\n*From*: ${pushname}\n*ID*: ${sender.id}\n*Group*: ${(name || formattedTitle)}\n*Message*: ${q}`)
                        await bocchi.reply(from, ind.received(pushname), id)
                    } else {
                        await bocchi.sendText(ownerNumber, `-----[ REPORT ]-----\n\n*From*: ${pushname}\n*ID*: ${sender.id}\n*Message*: ${q}`)
                        await bocchi.reply(from, ind.received(pushname), id)
                    }
                    limit.addLimit(sender.id, _limit)
                }
            break
            case 'tos':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.sendLinkWithAutoPreview(from, 'https://github.com/SlavyanDesu/BocchiBot', ind.tos(ownerNumber))
            break
            case 'join':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('chat.whatsapp.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const checkInvite = await bocchi.inviteInfo(url)
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly()) 
                    await bocchi.joinGroupViaLink(url)
                    await bocchi.reply(from, ind.ok(), id)
                    await bocchi.sendText(checkInvite.id, `Hello!! I was invited by ${pushname}`)
            break
            case 'premiumcheck':
            case 'cekpremium':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                const cekExp = ms(premium.getPremiumExpired(sender.id, _premium) - Date.now())
                await bocchi.reply(from, `*「 PREMIUM EXPIRE 」*\n\n➸ *ID*: ${sender.id}\n➸ *Premium left*: ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)`, id)
            break
            case 'premiumlist':
            case 'listpremium':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                let listPremi = '「 *PREMIUM USER LIST* 」\n\n'
                let nomorList = 0
                const deret = premium.getAllPremiumUser(_premium)
                const arrayPremi = []
                for (let i = 0; i < deret.length; i++) {
                    const checkExp = ms(premium.getPremiumExpired(deret[i], _premium) - Date.now())
                    arrayPremi.push(await bocchi.getContact(premium.getAllPremiumUser(_premium)[i]))
                    nomorList++
                    listPremi += `${nomorList}. wa.me/${premium.getAllPremiumUser(_premium)[i].replace('@c.us', '')}\n➸ *Expired*: ${checkExp.days} day(s) ${checkExp.hours} hour(s) ${checkExp.minutes} minute(s)\n\n`
                }
                await bocchi.reply(from, listPremi, id)
            break
            case 'getpic':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (mentionedJidList.length !== 0) {
                    const userPic = await bocchi.getProfilePicFromServer(mentionedJidList[0])
                    if (userPic === undefined) {
                        var pek = errorImg
                    } else {
                        pek = userPic
                    }
                    await bocchi.sendFileFromUrl(from, pek, 'pic.jpg', '', id)
                } else if (args.length !== 0) {
                    const userPic = await bocchi.getProfilePicFromServer(args[0] + '@c.us')
                    if (userPic === undefined) {
                        var peks = errorImg
                    } else {
                        peks = userPic
                    }
                    await bocchi.sendFileFromUrl(from, peks, 'pic.jpg', '', id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'serial':
                if (!isRegistered) return await bocchi.reply(from, ind.registered(), id)
                if (isGroupMsg) return await bocchi.reply(from, ind.pcOnly(), id)
                if (args.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                const serials = args[0]
                if (register.checkRegisteredUserFromSerial(serials, _registered)) {
                    const name = register.getRegisteredNameFromSerial(serials, _registered)
                    const age = register.getRegisteredAgeFromSerial(serials, _registered)
                    const time = register.getRegisteredTimeFromSerial(serials, _registered)
                    const id = register.getRegisteredIdFromSerial(serials, _registered)
                    await bocchi.sendText(from, ind.registeredFound(name, age, time, serials, id))
                } else {
                    await bocchi.sendText(from, ind.registeredNotFound(serials))
                }
            break

            // Weeb zone
            case 'neko':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Getting neko image...')
                await bocchi.sendFileFromUrl(from, (await neko.sfw.neko()).url, 'neko.jpg', '', null, null, true)
                    .then(() => console.log('Success sending neko image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break 
            case 'kemono':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Getting kemonomimi image...')
                await bocchi.sendFileFromUrl(from, (await neko.sfw.kemonomimi()).url, 'kemono.jpg', '', null, null, true)
                    .then(() => console.log('Success sending kemonomimi image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'kusonime':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.anime(q)
                    .then(async ({ info, link_dl, sinopsis, thumb, title, error, status }) => {
                        if (status === false) {
                            return await bocchi.reply(from, error, id)
                        } else {
                            let animek = `${title}\n\n${info}\n\nSinopsis: ${sinopsis}\n\nLink download:\n${link_dl}`
                            await bocchi.sendFileFromUrl(from, thumb, 'animek.jpg', animek, null, null, true)
                                .then(() => console.log('Success sending anime info!'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'dewabatch':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.dewa(q)
                    .then(async ({ result, sinopsis, error, status, thumb }) => {
                         if (status === false) {
                            return await bocchi.reply(from, error, id)
                        } else {
                            let dewak = `${result}\n\n${sinopsis}\n`
                            await bocchi.sendFileFromUrl(from, thumb, 'animek.jpg', dewak, null, null, true)
                                .then(() => console.log('Success sending anime info!'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'wait':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await bocchi.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    weeaboo.wait(imageBase64)
                        .then(async (result) => {
                            if (result.docs && result.docs.length <= 0) {
                                return await bocchi.reply(from, 'Anime not found! :(', id)
                            } else {
                                const { title, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = result.docs[0]
                                let teks = ''
                                if (similarity < 0.92) {
                                    teks = 'Low similarity. 🤔\n\n'
                                } else {
                                    teks += `*Title*: ${title}\n*Romaji*: ${title_romaji}\n*English*: ${title_english}\n*Episode*: ${episode}\n*Similarity*: ${(similarity * 100).toFixed(1)}%`
                                    const video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`
                                    await bocchi.sendFileFromUrl(from, video, `${title_romaji}.mp4`, teks, id)
                                        .then(() => console.log('Success sending anime source!'))
                                }
                            }
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'source':
            case 'sauce':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await bocchi.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    try {
                        const imageLink = await uploadImages(mediaData, `sauce.${sender.id}`)
                        console.log('Searching for source...')
                        const results = await saus(imageLink)
                        for (let i = 0; i < results.length; i++) {
                            let teks = ''
                            if (results[i].similarity < 80.00) {
                                teks = 'Low similarity. 🤔\n\n'
                            } else {
                                teks += `*Link*: ${results[i].url}\n*Site*: ${results[i].site}\n*Author name*: ${results[i].authorName}\n*Author link*: ${results[i].authorUrl}\n*Similarity*: ${results[i].similarity}%`
                                await bocchi.sendLinkWithAutoPreview(from, results[i].url, teks)
                                    .then(() => console.log('Source found!'))
                            }
                        }
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'waifu':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.waifu(false)
                    .then(async ({ url }) => {
                        await bocchi.sendFileFromUrl(from, url, 'waifu.png', '', id)
                            .then(() => console.log('Success sending waifu!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'anitoki':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.anitoki()
                    .then(async ({ result }) => {
                        let anitoki = `-----[ *ANITOKI LATEST* ]-----`
                        for (let i = 0; i < result.length; i++) {
                            anitoki += `\n\n➸ *Title*: ${result[i].title}\n➸ *URL*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, anitoki, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'neonime':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.neonime()
                    .then(async ({ status, result }) => {
                        if (status !== 200) return await bocchi.reply(from, `Not found.`, id)
                        let neoInfo = '-----[ *NEONIME LATEST* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            const { date, title, link, desc } = result[i]
                            neoInfo += `\n\n➸ *Title: ${title}*\n➸ *Date*: ${date}\n➸ *Synopsis*: ${desc}\n\n *${link}*\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.sendFileFromUrl(from, result[0].thumb, 'ksk.jpg', neoInfo, id)
                        console.log('Success sending Neonime latest update!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'anoboyongoing':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                weeaboo.anoboy()
                    .then(async ({ result }) => {
                        let anoboyInfo = '-----[ *ANOBOY ON-GOING* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            anoboyInfo += `\n\n➸ *Title*: ${result[i].judul}\n➸ *URL*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, anoboyInfo, id)
                        console.log('Success sending on-going anime!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break

            // Fun
            case 'asupan': // shansekai
                if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                fun.asupan()
                    .then(async (body) => {
                        const asupan = body.split('\n')
                        const asupanx = asupan[Math.floor(Math.random() * asupan.length)]
                        await bocchi.sendFileFromUrl(from, `http://sansekai.my.id/ptl_repost/${asupanx}`, 'asupan.mp4', 'Follow IG: https://www.instagram.com/ptl_repost untuk mendapatkan asupan lebih banyak.', id)
                        console.log('Success sending video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'dadu': // by CHIKAA CHANTEKKXXZZ
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                fun.dadu()
                    .then(async (body) => {
                        const dadugerak = body.split('\n')
                        const dadugerakx = dadugerak[Math.floor(Math.random() * dadugerak.length)]
                        await bocchi.sendStickerfromUrl(from, dadugerakx)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'doge':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                fun.doge()
                    .then(async (body) => {
                        const dogeg = body.split('\n')
                        const dogegx = dogeg[Math.floor(Math.random() * dogeg.length)]
                        await bocchi.sendStickerfromUrl(from, dogegx)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'spongbobstick':
            case 'patrick':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                fun.patr()
                    .then(async (body) => {
                        const petrik = body.split('\n')
                        const petrikx = petrik[Math.floor(Math.random() * petrik.length)]
                        await bocchi.sendStickerfromUrl(from, petrikx)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'bucinstick':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                fun.bucin()
                    .then(async (body) => {
                        const bucinn = body.split('\n')
                        const bucinnx = bucinn[Math.floor(Math.random() * bucinn.length)]
                        await bocchi.sendStickerfromUrl(from, bucinnx)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'nimestick': // by CHIKAA CHANTEKKXXZZ
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                fun.wife()
                    .then(async (body) => {
                        const wifegerak = body.split('\n')
                        const wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
                        await bocchi.sendStickerfromUrl(from, wifegerakx)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'citacita': // Piyobot
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                fun.cita()
                    .then(async (body) => {
                        const cita = body.split('\n')
                        const randomCita = cita[Math.floor(Math.random() * cita.length)]
                        await bocchi.sendFileFromUrl(from, randomCita, 'cita.mp3', '', id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'caklontong': //By: VideFrelan
                if (!isGroupMsg) return bocchi.reply(from, ind.groupOnly(), id)
                if (!isRegistered) return  bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                const sleep = async (ms) => {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }
                fun.caklontong()
                .then(async ( { result }) => {
                    await bocchi.reply(from, `➸ *Soal*: ${result.soal}`, id)
                    bocchi.sendText(from, `30 Detik Tersisa...`, id)
                    await sleep(10000)
                    bocchi.sendText(from, `20 Detik Tersisa...`, id)
                    await sleep(10000)
                    bocchi.sendText(from, `10 Detik Tersisa...`, id)
                    await sleep(10000)
                    await bocchi.reply(from, `➸ *Jawaban*: ${result.jawaban}\n${result.desk}`, id)
                })
                .then(async () => {
                    console.log('Sukses mengirim jawaban caklontong!')
                })
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, `Ada yang Error!`)
                })
            break
            case 'profile':
            case 'me':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (quotedMsg) {
                    const getQuoted = quotedMsgObj.sender.id
                    const profilePic = await bocchi.getProfilePicFromServer(getQuoted)
                    const username = quotedMsgObj.sender.name
                    const statuses = await bocchi.getStatus(getQuoted)
                    const benet = _ban.includes(getQuoted) ? 'Yes' : 'No'
                    const adm = groupAdmins.includes(getQuoted) ? 'Yes' : 'No'
                    const premi = premium.checkPremiumUser(getQuoted, _premium) ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(getQuoted, _level)
                    const xpMe = level.getLevelingXp(getQuoted, _level)
                    const req = 200 * (Math.pow(2, levelMe) - 1)
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfp = errorImg
                    } else {
                        pfp = profilePic
                    }
                    await bocchi.sendFileFromUrl(from, pfp, `${username}.jpg`, ind.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                } else {
                    const profilePic = await bocchi.getProfilePicFromServer(sender.id)
                    const username = pushname
                    const statuses = await bocchi.getStatus(sender.id)
                    const benet = isBanned ? 'Yes' : 'No'
                    const adm = isGroupAdmins ? 'Yes' : 'No'
                    const premi = isPremium ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(sender.id, _level)
                    const xpMe = level.getLevelingXp(sender.id, _level)
                    const req = 200 * (Math.pow(2, levelMe) - 1)
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfps = errorImg
                    } else {
                        pfps = profilePic
                    }
                    await bocchi.sendFileFromUrl(from, pfps, `${username}.jpg`, ind.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                }
            break
            case 'hartatahta':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating harta tahta text...')
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/hartatahta?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'sarah':
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating sarah text...')
                await bocchi.sendFileFromUrl(from, `https://rest.farzain.com/api/special/fansign/indo/viloid.php?apikey=ppqeuy&text=${q}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'cosplay':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating cosplay text...')
                await bocchi.sendFileFromUrl(from, `https://rest.farzain.com/api/special/fansign/cosplay/cosplay.php?apikey=rambu&text=${q}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'trumptweet':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating trump text...')
                await bocchi.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${q}&raw=1`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'kanna':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating kanna text...')
                await bocchi.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=kannagen&text=${q}&raw=1`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'silk':
            case 'silktext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating silk text...')
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/silktext?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'changemymind':
            case 'mymind':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating my mind text...')
                await bocchi.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=changemymind&text=${q}&raw=1`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'coffee':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating coffee text...')
                const cofcof = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=coffee&text=${q}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, cofcof.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'kpop':
            case 'k-pop':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Sending random kpop...')
                const pelastik = await axios.get(`https://tobz-api.herokuapp.com/api/randomkpop?apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, pelastik.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success sending image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'ukir':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating ukir text...')
                const cofcoff = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=wood_block&text=${q}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, cofcoff.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'smoke':
            case 'smoketext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating smoke text...')
                const smoje = await axios.get(`https://api.zeks.xyz/api/smoketext?text=${q}&apikey=${config.zeks}`)
                await bocchi.sendFileFromUrl(from, smoje.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'jamdunia':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Search time in query...')
                const jaduni = await axios.get(`https://api.zeks.xyz/api/jamdunia?q=${q}&apikey=${config.zeks}`)
                await bocchi.reply(from, `*HASIL QUERY*\n\n*➸Tempat* : ${jaduni.data.result.tempat}\n*➸Tanggal* : ${jaduni.data.result.tanggal}\n*➸Waktu* : ${jaduni.data.result.waktu}\n`, id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'darkjoke':
            case 'darkjokes':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Sending darkjoke image...')
                const rendark = await axios.get(`https://api.zeks.xyz/api/darkjokes?apikey=${config.zeks}`)
                await bocchi.sendFileFromUrl(from, rendark.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success sending image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'memeindo':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Sending memeindo image...')
                const renmeme = await axios.get(`https://api.zeks.xyz/api/memeindo?apikey=${config.zeks}`)
                await bocchi.sendFileFromUrl(from, renmeme.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success sending image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'onecak':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Sending onecak image...')
                await bocchi.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/onecak?apikey=${config.lolhuman}` `sj.jpg`, '', id)
                    .then(() => console.log('Success sending image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'qrmaker':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('creating qr image...')
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/generateqr?data=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success sending image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'meme':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Sending memeindo image...')
                const memedolo = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes')
                const amjaymemeni = memedolo.data
                await bocchi.sendFileFromUrl(from, `${amjaymemeni.url}`, 'meme.jpg', `${amjaymemeni.title}`, '', id)
                .then(() => console.log('Success sending image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
             case 'quote':
             case 'quotes':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                console.log('Sending random quote...')
                const quotez2 = await axios.get(`https://tobz-api.herokuapp.com/api/randomquotes?apikey=${config.tobz}`)
                await bocchi.sendText(from, `➸ *Quotes* : ${quotez2.data.quotes}\n➸ *Author* : ${quotez2.data.author}`, id)
                    .then(() => console.log('Success sending quotes..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'pinterest':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                const ptrst = await fetch(`https://api.vhtear.com/pinterest?query=${q}&apikey=${config.vhtear}`)
                const ptrs = await ptrst.json()
                const ptrsn = ptrs.result
                const b = JSON.parse(JSON.stringify(ptrsn))
                const ptrs2 =  b[Math.floor(Math.random() * b.length)]
                await bocchi.sendFileFromUrl(from, ptrs2, 'meme.jpg', `*Hasil Pencarian Pinterest : ${q}*`, id)
                    .then(() => console.log('Success sending pinterest..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'nickepep': //CHIKABOT
            case 'nickff': //CHIKABOT
		        if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
		        const amjayepep = await fetch(`https://api.zeks.xyz/api/nickepep?apikey=${config.zeks}`) 
	            const ptrsss = await amjayepep.json()
	            const amjayepep2 = ptrsss.result 
                const amjayepep3 = JSON.parse(JSON.stringify(amjayepep2))         
		        const amjayepep1 = amjayepep3[Math.floor(Math.random() * (amjayepep2.length))]
		        bocchi.reply(from, `「 *GENERATE NICK EPEP* 」\n\n ${amjayepep1}`, id)
		            .then(() => console.log('Success sending nickepep..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'fakta':
            case 'fact':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                console.log('Sending random fact...')
                const faqta = await axios.get(`https://lolhuman.herokuapp.com/api/random/faktaunik?apikey=${config.lolhuman}`)
                await bocchi.reply(from, faqta.data.result, id)
                    .then(() => console.log('Success sending fact..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'namaninja':
            case 'nickninja':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                const ninn = await axios.get(`https://lolhuman.herokuapp.com/api/ninja/${q}?apikey=${config.lolhuman}`)
                await bocchi.reply(from, ninn.data.result, id)
                    .then(() => console.log('Success sending nickname..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
             case 'fakename':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const nunn = await axios.get(`https://lolhuman.herokuapp.com/api/random/nama?apikey=${config.lolhuman}`)
                await bocchi.reply(from, nunn.data.result, id)
                    .then(() => console.log('Success sending nickname..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'fckmylife':
            case 'fml':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                console.log('Sending random fml...')
                const fmgl = await axios.get(`https://api.zeks.xyz/api/fml`)
                await bocchi.sendText(from, fmgl.data.result, id)
                    .then(() => console.log('Success sending fml.'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'pantun':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                console.log('Sending random fact...')
                const pantt = await axios.get(`https://lolhuman.herokuapp.com/api/random/pantun?apikey=${config.lolhuman}`)
                await bocchi.reply(from, pantt.data.result, id)
                .then(() => console.log('Success sending random pantun..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'colourviewer':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('#')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                const cvr = q.replace('#', "")
                await bocchi.sendFileFromUrl(from, `https://some-random-api.ml/canvas/colorviewer?hex=${cvr}`, `color.jpg`, '', id)
                    .then(() => console.log('Succes'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'rgbtohex':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes(',')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const rth = await axios.get(`https://some-random-api.ml/canvas/hex?rgb=${q}`)
                await bocchi.reply(from, rth.data.hex, id)
                .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'hextorgb':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('#')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const htrr = q.replace('#', "")
                const htr = await axios.get(`https://some-random-api.ml/canvas/rgb?hex=${htrr}`)
                await bocchi.reply(from, `*HEX* : *${q}*\n*RGB* : *${htr.data.r},${htr.data.g},${htr.data.b}*`, id)
                .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'texttobinary':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const ttb = await axios.get(`https://some-random-api.ml/binary?text=${q}`)
                await bocchi.reply(from, ttb.data.binary, id)
                .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'binarytotext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const btt = await axios.get(`https://some-random-api.ml/binary?decode=${q}`)
                await bocchi.reply(from, btt.data.text, id)
                .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'texttobase64':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const ttb64 = await axios.get(`https://some-random-api.ml/base64?encode=${q}`)
                await bocchi.reply(from, ttb64.data.base64, id)
                .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'base64totext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const b64tt = await axios.get(`https://some-random-api.ml/base64?decode=${q}`)
                await bocchi.reply(from, b64tt.data.text, id)
                .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'puisi':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                console.log('Sending random puisi...')
                const resss = await axios.get(`https://masgi.herokuapp.com/api/puisi2`)
                await bocchi.reply(from, resss.data.data, id)
                    .then(() => console.log('Success sending puisi...'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'cerpen':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                console.log('Sending random cerpen...')
                const cerpwn = await axios.get(`https://masgi.herokuapp.com/api/cerpen`)
                await bocchi.reply(from, cerpwn.data.data, id)
                    .then(() => console.log('Success sending cerpen..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'brainly':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Search answer....')
                const barni = await axios.get(`https://api.vhtear.com/branly?query=${q}&apikey=${config.vhtear}`)
                await bocchi.reply(from, barni.data.result.data, id)
                    .then(() => console.log('Success Sending Answer...'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'brainlysearch':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                console.log('Search answer....')
                await bocchi.reply(from, ind.wait(), id)
                misc.brainly(q)
                    .then(async (res) => {
                        let branx = `-----[ *SEARCH BRAINLY* ]-----`
                        for (let i = 0; i < res.length; i++) {
                            branx +=  `\n\n➸ *Judul*: ${res[i].title}\n➸ *Url*: ${res[i].url}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, branx, id)
                        console.log('Success sending Result!')
                    })
            break
            case 'jadwalbola':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                console.log('jadwal bola...')
                await bocchi.reply(from, ind.wait(), id)
                misc.jbola()
                    .then(async ({ result }) => {
                        let jbx = `-----[ *JADWAL BOLA* ]-----`
                        for (let i = 0; i < result.data.length; i++) {
                            jbx +=  `\n\n➸ *Pertandingan*: ${result.data[i].pertandingan}\n➸ *KickOff*: ${result.data[i].kickoff}\n➸ *Stasiun Tv*: ${result.data[i].stasiuntv}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, jbx, id)
                        console.log('Success sending Result!')
                    })
            break
            case 'berita':
            case 'news':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                console.log('Menampilkan berita...')
                await bocchi.reply(from, ind.wait(), id)
                misc.berita()
                    .then(async ({ result }) => {
                        let beritax = `-----[ *BERITA* ]-----`
                        for (let i = 0; i < result.data.length; i++) {
                            beritax +=  `\n\n➸ *Title*: ${result.data[i].title}\n\n${result.data[i].description}\n➸ *Selengkapnya*: ${result.data[i].url}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.sendFileFromUrl(from, result.data[0].urlToImage, 'berita.jpg', beritax, id)
                        console.log('Success sending Result!')
                    })
            break
            case 'shadow':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating shadow text...')
                const shadof = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=shadow&text=${q}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, shadof.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'babi':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const gmek = await bocchi.getGroupMembersId(groupId)
                console.log('Choose babi....')
                let gmik = gmek[Math.floor(Math.random() * gmek.length)]
                const mmkk = `YANG PALING BABI DISINI ADALAH @${gmik.replace(/@c.us/g, '')}`
                bocchi.sendTextWithMentions(from, mmkk, id)
            break
             case 'ganteng': //Chika Chantexxzz
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const gmeek = await bocchi.getGroupMembersId(groupId)
                console.log('Choose random member handsome. ....')
                let gmiik = gmeek[Math.floor(Math.random() * gmeek.length)]
                const mmkkk = `YANG PALING GANTENG DISINI ADALAH @${gmiik.replace(/@c.us/g, '')}`
                bocchi.sendTextWithMentions(from, mmkkk, id)
            break
             case 'sange':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const gmeeek = await bocchi.getGroupMembersId(groupId)
                console.log('Choose member sange....')
                let gmiiik = gmeeek[Math.floor(Math.random() * gmeeek.length)]
                const mmkkkk = `YANG PALING SANGE DISINI ADALAH @${gmiiik.replace(/@c.us/g, '')}`
                bocchi.sendTextWithMentions(from, mmkkkk, id)
            break
            case 'partner':
            case 'pasangan':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                const nama = q.substring(0, q.indexOf('|') - 1)
                const pasangan = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                fun.pasangan(nama, pasangan)
                    .then(async ({ result }) => {
                        await bocchi.reply(from, result.hasil, id)
                            .then(() => console.log('Success sending fortune!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'zodiac':
            case 'zodiak':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                fun.zodiak(args[0])
                    .then(async ({ result }) => {
                        if (result.status === 204) {
                            return await bocchi.reply(from, result.ramalan, id)
                        } else {
                            let ramalan = `Zodiak: ${result.zodiak}\n\nRamalan: ${result.ramalan}\n\nAngka laksek: ${result.nomorKeberuntungan}\n\n${result.motivasi}\n\n${result.inspirasi}`
                            await bocchi.reply(from, ramalan, id)
                                .then(() => console.log('Success sending zodiac fortune!'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'write':
            case 'nulis':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating writing...')
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/write?text=${q}&apikey=${config.vhtear}`, 'nulis.jpg', '', id)
                    .then(() => console.log('Success sending write image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'ffbanner': // By: VideFrelan
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating FF banner...')
                const teks1ffanjg = q.substring(0, q.indexOf('|') - 1)
                const teks2ffanjg = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/bannerff?title=${teks1ffanjg}&text=${teks2ffanjg}&apikey=${config.vhtear}`, id)
                console.log('Success!')
            break
            case 'pubgbanner': // By: Chika
            case 'pubg':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating PUBG banner...')
                const teks1pubg = q.substring(0, q.indexOf('|') - 1)
                const teks2pubg = q.substring(q.lastIndexOf('|') + 2)
                const pubgpu = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=pubg&text1=${teks1pubg}&text2=${teks2pubg}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, pubgpu.data.result, id)
                console.log('Success!')
            break
            case 'csgobanner':
            case 'csgo':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                console.log('Creating csgo banner...')
                const cgso = await axios.get(`https://tobz-api.herokuapp.com/api/photooxy?theme=csgo&text=${q}&apikey=${config.tobz}`)
                await bocchi.sendFileFromUrl(from, cgso.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'narutobanner':
            case 'naruto':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating naruto banner...')
                const narutotext = await axios.get(`https://api.zeks.xyz/api/naruto?text=${q}&apikey=${config.zeks}`)
                await bocchi.sendFileFromUrl(from, narutotext.data.result, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'fflogo': // By: VideFrelan
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q.includes('|')) return bocchi.reply(from, `Untuk membuat Logo Karakter Freefire\ngunakan ${prefix}fflogo karakter | teks\n\nContoh: ${prefix}fflogo alok | Fikri gans`, id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating FF logo...')
                const karakter = q.substring(0, q.indexOf('|') - 1)
                const teksff = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/logoff?hero=${karakter}&text=${teksff}&apikey=${config.vhtear}`, id)
                console.log('Success!')
            break
            case 'simi': // by: VideFrelan
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                fun.simi(q)
                    .then(async ({ result }) => {
                        await bocchi.reply(from, result, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, `Error!\n\n${err}`, id)
                    })
            break
            case 'glitchtext':
            case 'glitch':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const teks1 = q.substring(0, q.indexOf('|') - 1)
                const teks2 = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating glitch text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/glitch/${teks1}/${teks2}?apikey=${config.lolhuman}`, 'glitch.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'avenger':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const tekss1 = q.substring(0, q.indexOf('|') - 1)
                const tekss2 = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/avenger/${tekss1}/${tekss2}?apikey=${config.lolhuman}`, 'glitch.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'spacetext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const tezs1 = q.substring(0, q.indexOf('|') - 1)
                const tezs2 = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/space/${tezs1}/${tezs2}?apikey=${config.lolhuman}`, 'glitch.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'marvel':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const texs1 = q.substring(0, q.indexOf('|') - 1)
                const texs2 = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/marvelstudio/${texs1}/${texs2}?apikey=${config.lolhuman}`, 'glitch.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'ninjalogo':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const tecs1 = q.substring(0, q.indexOf('|') - 1)
                const tecs2 = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/ninjalogo/${tecs1}/${tecs2}?apikey=${config.lolhuman}`, 'glitch.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'lionlogo':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const tevs1 = q.substring(0, q.indexOf('|') - 1)
                const tevs2 = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/avenger/${tevs1}/${tevs2}?apikey=${config.lolhuman}`, 'glitch.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'wolflogo':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const tebs1 = q.substring(0, q.indexOf('|') - 1)
                const tebs2 = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/wolflogo/${tebs1}/${tebs2}?apikey=${config.lolhuman}`, 'glitch.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'steel3d':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const tens1 = q.substring(0, q.indexOf('|') - 1)
                const tens2 = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/steel3d/${tens1}/${tens2}?apikey=${config.lolhuman}`, 'glitch.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'phmaker':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const kiri = q.substring(0, q.indexOf('|') - 1)
                const kanan = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating Pornhub text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/pornhub/${kiri}/${kanan}?apikey=${config.lolhuman}`, 'ph.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
             case 'water':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating water text...')
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/water_maker?text=${q}&apikey=${config.vhtear}`, 'ph.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'blackpink':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating Blackpink text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/blackpink/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
             case 'neon':
             case 'neontext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating neon text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/neon/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
             case 'greenneon':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating Green neon text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/greenneon/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'glowtext':
            case 'glow':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating glow text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/advanceglow/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
             case 'labtext':
             case 'lab':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating lab text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/futureneon/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
             case 'sandwriting':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating sanwriting text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/sandwriting/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'sandsummer':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/sandsummer/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'sandengraved':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/sandengraved/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'metaldark':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/metaldark/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'miniontext':
            case 'minion':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/minion/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'deluxesilver':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/deluxesilver/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'newyear':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/newyearcard/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'bloodtext':
            case 'blood':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/blood/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'halloween':
            case 'halloweentext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/halloween/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'jokerlogo':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/jokerlogo/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'firework':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/fireworksparkle/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'leaves':
            case 'leavestext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/natureleaves/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'bokeh':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/bokeh/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'toxictext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/toxic/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'strawberrytext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/strawberry/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case '3dtext':
            case 'text3d':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/box3d/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'roadtext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/roadwarning/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'breakwall':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/breakwall/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'icetext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/icecold/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'luxury':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/luxury/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'skytext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/cloud/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'summersand':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/summersand/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'horrortext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/horrorblood/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'christmas':
            case 'christmastext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/christmas/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'thunder':
            case 'thundertext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/thunder/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'code':
            case 'carbon':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating carboon text...')
                await bocchi.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/carbon?code=${q}?apikey=${config.lolhuman}`, `carbon.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'gmlogo':
            case 'gaminglogo':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating Thunder text...')
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/gamelogo?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'galaxy':
            case 'galaxytext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/neonlight/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'holographic':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/holographic/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case '1917':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating text...')
                await bocchi.sendFileFromUrl(from, `http://lolhuman.herokuapp.com/api/textprome/text1917/${q}?apikey=${config.lolhuman}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'tod':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                await bocchi.sendFileFromUrl(from, `https://blog.elevenia.co.id/wp-content/uploads/2020/04/27420-truth-or-dare.jpg`, 'tod.jpg', 'Sebelum bermain berjanjilah akan melaksanakan apapun perintah yang diberikan.' , id)
                await bocchi.sendText(from, `Silakan ketik *${prefix}truth* atau *${prefix}dare*`)
            break
            case 'weton':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const tgl = q.substring(0, q.indexOf('|') - 1)
                const bln = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const thn = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                fun.weton(tgl, bln, thn)
                    .then(async ({ result }) => {
                        await bocchi.reply(from, result.hasil, id)
                        console.log('Success sending weton info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'ramaljadian':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const tggl = q.substring(0, q.indexOf('|') - 1)
                const blln = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const thhn = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                fun.rml(tggl, bgln, thhn)
                    .then(async ({ result }) => {
                        await bocchi.reply(from, `*${result.karakteristik}*\n\n${result.deskripsi}`, id)
                        console.log('Success sending info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'truth':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                fun.truth()
                    .then(async (body) => {
                        const tod = body.split('\n')
                        const randomTod = tod[Math.floor(Math.random() * tod.length)]
                        await bocchi.reply(from, randomTod, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'dare':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                fun.dare()
                    .then(async (body) => {
                        const dare = body.split('\n')
                        const randomDare = dare[Math.floor(Math.random() * dare.length)]
                        await bocchi.reply(from, randomDare, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'triggered':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await bocchi.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.gif`)
                    const fileOutputPath = path.join(temp, 'video', `${name}.mp4`)
                    canvas.Canvas.trigger(mediaData)
                        .then((buffer) => {
                            canvas.write(buffer, fileInputPath)
                            ffmpeg(fileInputPath)
                                .outputOptions([
                                    '-movflags faststart',
                                    '-pix_fmt yuv420p',
                                    '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
                                ])
                                .inputFormat('gif')
                                .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                                .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                                .on('end', async () => {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    await bocchi.sendMp4AsSticker(from, fileOutputPath, { fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0 })
                                    console.log(color('[WAPI]', 'green'), 'Success sending GIF!')
                                    setTimeout(() => {
                                        fs.unlinkSync(fileInputPath)
                                        fs.unlinkSync(fileOutputPath)
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                   } else if (quotedMsg && quotedMsg.type == 'chat') {
                    await bocchi.reply(from, ind.wait(), id)
                    const ppRaw = await bocchi.getProfilePicFromServer(quotedMsgObj.sender.id)
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(ppRaw, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.gif`)
                    const fileOutputPath = path.join(temp, 'video', `${name}.mp4`)
                    canvas.Canvas.trigger(mediaData)
                        .then((buffer) => {
                            canvas.write(buffer, fileInputPath)
                            ffmpeg(fileInputPath)
                                .outputOptions([
                                    '-movflags faststart',
                                    '-pix_fmt yuv420p',
                                    '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
                                ])
                                .inputFormat('gif')
                                .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                                .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                                .on('end', async () => {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    await bocchi.sendMp4AsSticker(from, fileOutputPath, { fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0 })
                                    console.log(color('[WAPI]', 'green'), 'Success sending GIF!')
                                    setTimeout(() => {
                                        fs.unlinkSync(fileInputPath)
                                        fs.unlinkSync(fileOutputPath)
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    const ppRaw = await bocchi.getProfilePicFromServer(sender.id)
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(ppRaw, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.gif`)
                    const fileOutputPath = path.join(temp, 'video', `${name}.mp4`)
                    canvas.Canvas.trigger(ppRaw)
                        .then((buffer) => {
                            canvas.write(buffer, fileInputPath)
                            ffmpeg(fileInputPath)
                                .outputOptions([
                                    '-movflags faststart',
                                    '-pix_fmt yuv420p',
                                    '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
                                ])
                                .inputFormat('gif')
                                .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                                .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                                .on('end', async () => {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    await bocchi.sendMp4AsSticker(from, fileOutputPath, { fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0 })
                                    console.log(color('[WAPI]', 'green'), 'Success sending GIF!')
                                    setTimeout(() => {
                                        fs.unlinkSync(fileInputPath)
                                        fs.unlinkSync(fileOutputPath)
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                }
            break
			case 'gay':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                try {
                    if (isMedia && isImage) {
                        const ppRaw = await decryptMedia(message, uaOverride)
                        canvas.Canvas.rainbow(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg && quotedMsg.type == 'chat') {
                        const ppRaw = await bocchi.getProfilePicFromServer(quotedMsgObj.sender.id)
                        canvas.Canvas.rainbow(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                canvas.Canvas.rainbow(mediaData)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                     } else {
                        const ppRaw = await bocchi.getProfilePicFromServer(sender.id)
                        canvas.Canvas.rainbow(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
			case 'jail':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                try {
                    if (isMedia && isImage) {
                        const ppRaw = await decryptMedia(message, uaOverride)
                        canvas.Canvas.jail(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg && quotedMsg.type == 'chat') {
                        const ppRaw = await bocchi.getProfilePicFromServer(quotedMsgObj.sender.id)
                        canvas.Canvas.jail(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    }  else if (quotedMsg && quotedMsg.type == 'image') {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        canvas.Canvas.jail(mediaData)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                     } else {
                        const ppRaw = await bocchi.getProfilePicFromServer(sender.id)
                        canvas.Canvas.jail(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
			case 'wanted':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                try {
                    if (isMedia && isImage) {
                        const ppRaw = await decryptMedia(message, uaOverride)
                        canvas.Canvas.wanted(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg && quotedMsg.type == 'chat') {
                        const ppRaw = await bocchi.getProfilePicFromServer(quotedMsgObj.sender.id)
                        canvas.Canvas.wanted(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg && quotedMsg.type == 'image') {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        canvas.Canvas.wanted(mediaData)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                     } else {
                        const ppRaw = await bocchi.getProfilePicFromServer(sender.id)
                        canvas.Canvas.wanted(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
			case 'beautiful':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                try {
                    if (isMedia && isImage) {
                        const ppRaw = await decryptMedia(message, uaOverride)
                        canvas.Canvas.beautiful(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg && quotedMsg.type == 'chat') {
                        const ppRaw = await bocchi.getProfilePicFromServer(quotedMsgObj.sender.id)
                        canvas.Canvas.beautiful(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg && quotedMsg.type == 'image') {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        canvas.Canvas.beautiful(mediaData)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                     } else {
                        const ppRaw = await bocchi.getProfilePicFromServer(sender.id)
                        canvas.Canvas. beautiful(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
			case 'hitler':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                try {
                    if (isMedia && isImage) {
                        const ppRaw = await decryptMedia(message, uaOverride)
                        canvas.Canvas.hitler(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg && quotedMsg.type == 'chat') {
                        const ppRaw = await bocchi.getProfilePicFromServer(quotedMsgObj.sender.id)
                        canvas.Canvas.hitler(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg && quotedMsg.type == 'image') {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        canvas.Canvas.hitler(mediaData)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                     } else {
                        const ppRaw = await bocchi.getProfilePicFromServer(sender.id)
                        canvas.Canvas.hitler(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
			case 'trash':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                try {
                    if (isMedia && isImage) {
                        const ppRaw = await decryptMedia(message, uaOverride)
                        canvas.Canvas.trash(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg && quotedMsg.type == 'chat') {
                        const ppRaw = await bocchi.getProfilePicFromServer(quotedMsgObj.sender.id)
                        canvas.Canvas.trash(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg && quotedMsg.type == 'image') {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        canvas.Canvas.trash(mediaData)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                     } else {
                        const ppRaw = await bocchi.getProfilePicFromServer(sender.id)
                        canvas.Canvas.trash(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await bocchi.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'wasted':
            if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                const encryptMediaWt = isQuotedImage ? quotedMsg : message
                const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${sender.id}`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`, 'Wasted.jpg', 'Ini..., sticker nya lagi di kirim', id).then(() => bocchi.sendStickerfromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`))
                console.log('Success sending Wasted image!')
                .catch(async (err) => {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                })
            } else {
                await bocchi.reply(from, ind.wrongFormat(), id)
            }
            break
            case 'kiss':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                try {
                    if (isMedia && isImage) {
                        const ppRaw = await bocchi.getProfilePicFromServer(sender.id)
                        const ppSecond = await decryptMedia(message, uaOverride)
                        if (ppRaw === undefined) {
                            var ppFirst = errorImg
                        } else {
                            ppFirst = ppRaw
                        }
                        canvas.Canvas.kiss(ppFirst, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await bocchi.sendFile(from, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else if (quotedMsg) {
                        const ppRaw = await bocchi.getProfilePicFromServer(sender.id)
                        const ppSecond = await bocchi.getProfilePicFromServer(quotedMsgObj.sender.id)
                        if (ppRaw === undefined) {
                            var ppFirsts = errorImg
                        } else {
                            ppFirsts = ppRaw
                        }
                        canvas.Canvas.kiss(ppFirsts, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await bocchi.sendFile(from, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else {
                        await bocchi.reply(from, ind.wrongFormat(), id)
                    }
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'spank':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                try {
                    if (isMedia && isImage) {
                        const ppRaw = await bocchi.getProfilePicFromServer(sender.id)
                        const ppSecond = await decryptMedia(message, uaOverride)
                        if (ppRaw === undefined) {
                            var ppFirst = errorImg
                        } else {
                            ppFirst = ppRaw
                        }
                        canvas.Canvas.spank(ppFirst, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await bocchi.sendFile(from, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else if (quotedMsg) {
                        const ppRaw = await bocchi.getProfilePicFromServer(sender.id)
                        const ppSecond = await bocchi.getProfilePicFromServer(quotedMsgObj.sender.id)
                        if (ppRaw === undefined) {
                            var ppFirsts = errorImg
                        } else {
                            ppFirsts = ppRaw
                        }
                        canvas.Canvas.spank(ppFirsts, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await bocchi.sendFile(from, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else {
                        await bocchi.reply(from, ind.wrongFormat(), id)
                    }
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'phcomment':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const usernamePh = q.substring(0, q.indexOf('|') - 1)
                const commentPh = q.substring(q.lastIndexOf('|') + 2)
                const ppPhRaw = await bocchi.getProfilePicFromServer(sender.id)
                if (ppPhRaw === undefined) {
                    var ppPh = errorImg
                } else {
                    ppPh = ppPhRaw
                }
                const dataPpPh = await bent('buffer')(ppPh)
                const linkPpPh = await uploadImages(dataPpPh, `${sender.id}_ph`)
                await bocchi.reply(from, ind.wait(), id)
                const preproccessPh = await axios.get(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${linkPpPh}&text=${commentPh}&username=${usernamePh}`)
                await bocchi.sendFileFromUrl(from, preproccessPh.data.message, 'ph.jpg', '', id)
                console.log('Success creating image!')
            break
            case 'ytcomment':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const usernameYt = q.substring(0, q.indexOf('|') - 1)
                const commentYt = q.substring(q.lastIndexOf('|') + 2)
                const ppYtRaw = await bocchi.getProfilePicFromServer(sender.id)
                if (ppYtRaw === undefined) {
                    var ppYt = errorImg
                } else {
                    ppYt = ppYtRaw
                }
                const dataPpYt = await bent('buffer')(ppYt)
                const linkPpYt = await uploadImages(dataPpYt, `${sender.id}_ph`)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://some-random-api.ml/canvas/youtube-comment?avatar=${linkPpYt}&comment=${commentYt}&username=${usernameYt}`, 'ph.jpg', '', id)
                console.log('Success creating image!')
            break
            case 'readmore':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const rawReadMore = `a‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​b`
                const pertama = q.substring(0, q.indexOf('|') - 1)
                const kedua = q.substring(q.lastIndexOf('|') + 2)
                const formatted1 = rawReadMore.replace('a', pertama)
                const formatted2 = formatted1.replace('b', kedua)
                await bocchi.sendText(from, formatted2)
            break
            case 'retro':
            case 'retrotext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const atasnya = q.substring(0, q.indexOf('|') - 1)
                const tengahnya = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const bawahnya = q.substring(q.lastIndexOf('|') + 2)
                console.log('Creating neon text...')
                const retro = await axios.get(`https://api.zeks.xyz/api/retro?text1=${atasnya}&text2=${tengahnya}&text3=${bawahnya}&apikey=${config.zeks}`)
                await bocchi.sendFileFromUrl(from, retro.data.result, `retro.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'quotemaker2':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const quotenya = q.substring(0, q.indexOf('|') - 1)
                const wmnya = q.substring(q.lastIndexOf('|') + 2)
                console.log('Creating qm text...')
                await bocchi.sendFileFromUrl(from, `https://api.xteam.xyz/quotemaker?text=${quotenya}&wm=${wmnya}&APIKEY=${config.xteam}`, `retro.jpg`, 'nah jadi', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'googletext':
            case 'googleteks':
            case 'googlemaker':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const atasnya1 = q.substring(0, q.indexOf('|') - 1)
                const tengahnya2 = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const bawahnya3 = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/googletext?text1=${atasnya1}&text2=${tengahnya2}&text3=${bawahnya3}&apikey=${config.vhtear}`, 'neon.jpg', '', id)
                console.log('Success creating image!')
            break
            case 'firemaker':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/fire_maker?text=${q}&apikey=${config.vhtear}`)
                console.log('Success creating image!')
            break
            case 'metal':
            case 'metaltext':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/metal_maker?text=${q}&apikey=${config.vhtear}`)
                console.log('Success creating image!')
            break
            case 'mlmaker':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const namaHero = q.substring(0, q.indexOf('|') - 1)
                const teksMl = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/logoml?hero=${namaHero}&text=${teksMl}&apikey=${config.vhtear}`)
                console.log('Success creating image!')
            break
            case 'balloonmaker':
            case 'blmaker':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                const namaKiri = q.substring(0, q.indexOf('|') - 1)
                const namaKanan = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/balloonmaker?text1=${namaKiri}&text2=${namaKanan}&apikey=${config.vhtear}`)
                console.log('Success creating image!')
            break
            case 'sliding':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendVideoAsGif(from, `https://api.vhtear.com/slidingtext?text=${q}&apikey=${config.vhtear}`, 'sliding.gif', '', id)
                console.log('Success creating GIF!')
            break

            // Sticker
            case 'stickerwm': // By Slavyan
            case 'stcwm':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await bocchi.reply(from, ind.wait(), id)
                    const packname = q.substring(0, q.indexOf('|') - 1)
                    const author = q.substring(q.lastIndexOf('|') + 2)
                    exif.create(packname, author, `stc_${sender.id}`)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/stc_${sender.id}.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: true })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await bocchi.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                        fs.unlinkSync(`stc_${sender.id}`)
                                    }
                                })
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                    } else {
                        await bocchi.reply(from, ind.wrongFormat(), id)
                    }
            break
            case 'stickermeme':
            case 'stcmeme':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await bocchi.reply(from, ind.wait(), id)
                    const top = q.substring(0, q.indexOf('|') - 1)
                    const bottom = q.substring(q.lastIndexOf('|') + 2)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const getUrl = await uploadImages(mediaData, `meme.${sender.id}`)
                    const create = `https://api.memegen.link/images/custom/${top}/${bottom}.png?background=${getUrl}`
                    const meme = await bent('buffer')(create)
                    webp.buffer2webpbuffer(meme, 'png', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: true })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await bocchi.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'takestick': // By: VideFrelan
                    if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                    if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                    if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                    if (quotedMsg && quotedMsg.type == 'sticker') {
                        const mediaDataTake = await decryptMedia(quotedMsg)
                        await bocchi.reply(from, ind.wait(), id)
                        const packnames = q.substring(0, q.indexOf('|') - 1)
                        const authors = q.substring(q.lastIndexOf('|') + 2)
                        takestick.create(packnames, authors)
                        webp.buffer2webpbuffer(mediaDataTake, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/takestickstage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/takestick_data.exif ./temp/takestickstage_${sender.id}.webp -o ./temp/takestick_${sender.id}.webp`, { log: true })
                                    if (fs.existsSync(`./temp/takestick_${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/takestick_${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await bocchi.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/takestick_${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/takestickstage_${sender.id}.webp`)
                                    }
                                })
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                    } else {
                        await bocchi.reply(from, ind.wrongFormat(), id)
                    }
            break
            case 'sticker':
            case 'stiker':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await bocchi.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: true })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await bocchi.sendRawWebpAsSticker(from, base64)
                                        await bocchi.reply(from, ind.ok(), id)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'stickergif':
            case 'stikergif':
            case 'sgif':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && type === 'video' || mimetype === 'image/gif') {
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await bocchi.sendMp4AsSticker(from, videoBase64, { fps: 10, startTime: `00:00:00.0`, endTime : `00:00:05.0`, loop: 0 })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                await bocchi.sendText(from, ind.ok())
                            })
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, ind.videoLimit(), id)
                    }
                } else if (isQuotedGif || isQuotedVideo) {
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await bocchi.sendMp4AsSticker(from, videoBase64, { fps: 10, startTime: `00:00:00.0`, endTime : `00:00:03.0`, loop: 0 })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                await bocchi.sendText(from, ind.ok())
                            })
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, ind.videoLimit(), id)
                    }
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'ttg':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${q}&apikey=${config.vhtear}`)
                    .then(() => console.log('Success creating GIF!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case 'stickertoimg':
            case 'stikertoimg':
            case 'toimg':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isQuotedSticker) {
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await bocchi.sendFile(from, imageBase64, 'sticker.jpg', '', id)
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'emojisticker':
            case 'emojistiker':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return bocchi.reply(from, ind.wrongFormat(), id)
                const emoji = emojiUnicode(args[0])
                await bocchi.reply(from, ind.wait(), id)
                console.log('Creating emoji code for =>', emoji)
                await bocchi.sendStickerfromUrl(from, `https://api.vhtear.com/emojitopng?code=${emoji}&apikey=${config.vhtear}`)
                    .then(async () => {
                        await bocchi.reply(from, ind.ok(), id)
                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Emoji not supported!', id)
                    })
            break

            // NSFW
           // NSFW
            case 'multilewds':
            case 'multilewd':
            case 'mlewds':
            case 'mlewd':
                // Premium unlocked
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    nsfw.mlewd()
                        .then(async ({ memes }) => {
                            for (let i = 0; i < memes.length; i++) {
                                await bocchi.sendFileFromUrl(from, memes[i].url, 'lewd.jpg', '', id)
                                    .then(() => console.log('Success sending multi lewds!'))
                            }
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    nsfw.mlewd()
                        .then(async ({ memes }) => {
                            for (let i = 0; i < memes.length; i++) {
                                await bocchi.sendFileFromUrl(from, memes[i].url, 'lewd.jpg', '', id)
                                    .then(() => console.log('Success sending multi lewds!'))
                            }
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                }
            break
            case 'multifetish':
            case 'mfetish':
                // Premium unlocked
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                if (ar.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        if (ar[0] === 'armpits') {
                            nsfw.marmpits()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'armpit.jpg', '', id)
                                            .then(() => console.log('Success sending multi armpits pic!'))
                                    }
                                })
                        } else if (ar[0] === 'feets') {
                            nsfw.mfeets()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'feets.jpg', '', id)
                                            .then(() => console.log('Success sending multi feets pic!'))
                                    }
                                })
                        } else if (ar[0] === 'thighs') {
                            nsfw.mthighs()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'thighs.jpg', '', id)
                                            .then(() => console.log('Success sending multi thighs pic!'))
                                    }
                                })
                        } else if (ar[0] === 'ass') {
                            nsfw.mass()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'ass.jpg', '', id)
                                            .then(() => console.log('Success sending multi ass pic!'))
                                    }
                                })
                        } else if (ar[0] === 'boobs') {
                            nsfw.mboobs()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'boobs.jpg', '', id)
                                            .then(() => console.log('Success sending multi boobs pic!'))
                                    }
                                })
                        } else if (ar[0] === 'belly') {
                            nsfw.mbelly()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'belly.jpg', '', id)
                                            .then(() => console.log('Success sending multi belly pic!'))
                                    }
                                })
                        } else if (ar[0] === 'sideboobs') {
                            nsfw.msideboobs()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'sideboobs.jpg', '', id)
                                            .then(() => console.log('Success sending multi sideboobs pic!'))
                                    }
                                })
                        } else if (ar[0] === 'ahegao') {
                            nsfw.mahegao()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'ahegao.jpg', '', id)
                                            .then(() => console.log('Success sending multi ahegao pic!'))
                                    }
                                })
                        } else {
                            await bocchi.reply(from, 'Tag not found.', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        if (ar[0] === 'armpits') {
                            nsfw.marmpits()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'armpit.jpg', '', id)
                                            .then(() => console.log('Success sending multi armpits pic!'))
                                    }
                                })
                        } else if (ar[0] === 'feets') {
                            nsfw.mfeets()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'feets.jpg', '', id)
                                            .then(() => console.log('Success sending multi feets pic!'))
                                    }
                                })
                        } else if (ar[0] === 'thighs') {
                            nsfw.mthighs()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'thighs.jpg', '', id)
                                            .then(() => console.log('Success sending multi thighs pic!'))
                                    }
                                })
                        } else if (ar[0] === 'ass') {
                            nsfw.mass()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'ass.jpg', '', id)
                                            .then(() => console.log('Success sending multi ass pic!'))
                                    }
                                })
                        } else if (ar[0] === 'boobs') {
                            nsfw.mboobs()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'boobs.jpg', '', id)
                                            .then(() => console.log('Success sending multi boobs pic!'))
                                    }
                                })
                        } else if (ar[0] === 'belly') {
                            nsfw.mbelly()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'belly.jpg', '', id)
                                            .then(() => console.log('Success sending multi belly pic!'))
                                    }
                                })
                        } else if (ar[0] === 'sideboobs') {
                            nsfw.msideboobs()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'sideboobs.jpg', '', id)
                                            .then(() => console.log('Success sending multi sideboobs pic!'))
                                    }
                                })
                        } else if (ar[0] === 'ahegao') {
                            nsfw.mahegao()
                                .then(async ({ memes }) => {
                                    for (let i = 0; i < memes.length; i++) {
                                        await bocchi.sendFileFromUrl(from, memes[i].url, 'ahegao.jpg', '', id)
                                            .then(() => console.log('Success sending multi ahegao pic!'))
                                    }
                                })
                        } else {
                            await bocchi.reply(from, 'Tag not found.', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                }
            break
            case 'cersex':
            case 'ceritasex':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    nsfw.cersex()
                        .then(async ({ result }) => {
                            await bocchi.sendFileFromUrl(from, result.image, 'waifu.jpg', `➸ *Judul*: ${result.judul}\n\n\n${result.cerita}`, id)
                                .then(() => console.log('Success sending cersex!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    nsfw.cersex()
                        .then(async ({ result }) => {
                            await bocchi.sendFileFromUrl(from, url, 'waifu.jpg', `➸ *Judul*: ${result.judul}\n\n\n${result.cerita}`, id)
                                .then(() => console.log('Success sending cersex!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                }
            break
            case 'nhdl':
                // Premium unlocked
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                if (args.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    const kode = args[0]
                    const validate = await nhentai.exists(kode)
                    if (validate === true) {
                        try {
                            const dojin = await nhentai.getDoujin(kode)
                            const { title } = dojin
                            await exec(`nhentai --id=${kode} --output=./temp/doujin/${kode} --format=${kode} --no-html --pdf --rm-origin-dir`)
                            await bocchi.sendFile(from, `./temp/doujin/${kode}/${kode}.pdf`, `${title}.pdf`, '', id)
                            fs.unlinkSync(`./temp/doujin/${kode}/${kode}.pdf`)
                        } catch (err) {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        }
                    } else {
                        await bocchi.reply(from, ind.nhFalse(), id)
                    }
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    const kode = args[0]
                    const validate = await nhentai.exists(kode)
                    if (validate === true) {
                        try {
                            const dojin = await nhentai.getDoujin(kode)
                            const { title } = dojin
                            await exec(`nhentai --id=${kode} --output=./temp/doujin/${kode} --format=${kode} --no-html --pdf --rm-origin-dir`)
                            await bocchi.sendFile(from, `./temp/doujin/${kode}/${kode}.pdf`, `${title}.pdf`, '', id)
                            fs.unlinkSync(`./temp/doujin/${kode}/${kode}.pdf`)
                        } catch (err) {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        }
                    } else {
                        await bocchi.reply(from, ind.nhFalse(), id)
                    }
                }
            break
            case 'lewds':
            case 'lewd':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    nsfw.randomLewd()
                        .then(async ({ url }) => {
                            await bocchi.sendFileFromUrl(from, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Success sending lewd!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    nsfw.randomLewd()
                        .then(async ({ url }) => {
                            await bocchi.sendFileFromUrl(from, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Success sending lewd!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                }
            break
            case 'fetish':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (ar.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        if (ar[0] === 'armpits') {
                            nsfw.armpits()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'armpits.jpg', '', id)
                                        .then(() => console.log('Success sending armpits pic!'))
                                })
                        } else if (ar[0] === 'feets') {
                            nsfw.feets()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'feets.jpg', '', id)
                                        .then(() => console.log('Success sending feets pic!'))
                                })
                        } else if (ar[0] === 'thighs') {
                            nsfw.thighs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'thighs.jpg', '', id)
                                        .then(() => console.log('Success sending thighs pic!'))
                                })
                        } else if (ar[0] === 'ass') {
                            nsfw.ass()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'ass.jpg', '', id)
                                        .then(() => console.log('Success sending ass pic!'))
                                })
                        } else if (ar[0] === 'boobs') {
                            nsfw.boobs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'boobs.jpg', '', id)
                                        .then(() => console.log('Success sending boobs pic!'))
                                })
                        } else if (ar[0] === 'belly') {
                            nsfw.belly()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'belly.jpg', '', id)
                                        .then(() => console.log('Success sending belly pic!'))
                                })
                        } else if (ar[0] === 'sideboobs') {
                            nsfw.sideboobs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'sideboobs.jpg', '', id)
                                        .then(() => console.log('Success sending sideboobs pic!'))
                                })
                        } else if (ar[0] === 'ahegao') {
                            nsfw.ahegao()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
                                        .then(() => console.log('Success sending ahegao pic!'))
                                })
                        } else {
                            await bocchi.reply(from, 'Tag not found.', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, err, id)
                    }
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        if (ar[0] === 'armpits') {
                            nsfw.armpits()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'armpits.jpg', '', id)
                                        .then(() => console.log('Success sending armpits pic!'))
                                })
                        } else if (ar[0] === 'feets') {
                            nsfw.feets()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'feets.jpg', '', id)
                                        .then(() => console.log('Success sending feets pic!'))
                                })
                        } else if (ar[0] === 'thighs') {
                            nsfw.thighs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'thighs.jpg', '', id)
                                        .then(() => console.log('Success sending thighs pic!'))
                                })
                        } else if (ar[0] === 'ass') {
                            nsfw.ass()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'ass.jpg', '', id)
                                        .then(() => console.log('Success sending ass pic!'))
                                })
                        } else if (ar[0] === 'boobs') {
                            nsfw.boobs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'boobs.jpg', '', id)
                                        .then(() => console.log('Success sending boobs pic!'))
                                })
                        } else if (ar[0] === 'belly') {
                            nsfw.belly()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'belly.jpg', '', id)
                                        .then(() => console.log('Success sending belly pic!'))
                                })
                        } else if (ar[0] === 'sideboobs') {
                            nsfw.sideboobs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'sideboobs.jpg', '', id)
                                        .then(() => console.log('Success sending sideboobs pic!'))
                                })
                        } else if (ar[0] === 'ahegao') {
                            nsfw.ahegao()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
                                        .then(() => console.log('Success sending ahegao pic!'))
                                })
                        } else {
                            await bocchi.reply(from, 'Tag not found.', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                }
            break
            case 'nhentai':
            case 'nh':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isNaN(Number(args[0]))) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${args[0]}...`)
                    const validate = await nhentai.exists(args[0])
                    if (validate === true) {
                        try {
                            const pic = await api.getBook(args[0])
                                .then((book) => {
                                     return api.getImageURL(book.cover)
                                })
                            const dojin = await nhentai.getDoujin(args[0])
                            const { title, details, link } = dojin
                            const { tags, artists, languages, categories } = await details
                            let teks = `*Title*: ${title}\n\n*Tags*: ${tags.join(', ')}\n\n*Artists*: ${artists}\n\n*Languages*: ${languages.join(', ')}\n\n*Categories*: ${categories}\n\n*Link*: ${link}`
                            await bocchi.sendFileFromUrl(from, pic, 'nhentai.jpg', teks, id)
                                .then(() => console.log('Success sending nHentai info!'))
                        } catch (err) {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        }
                    } else {
                        await bocchi.reply(from, ind.nhFalse(), id)
                    }
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${args[0]}...`)
                    const validate = await nhentai.exists(args[0])
                    if (validate === true) {
                        try {
                            const pic = await api.getBook(args[0])
                                .then((book) => {
                                     return api.getImageURL(book.cover)
                                })
                            const dojin = await nhentai.getDoujin(args[0])
                            const { title, details, link } = dojin
                            const { tags, artists, languages, categories } = await details
                            let teks = `*Title*: ${title}\n\n*Tags*: ${tags.join(', ')}\n\n*Artists*: ${artists}\n\n*Languages*: ${languages.join(', ')}\n\n*Categories*: ${categories}\n\n*Link*: ${link}`
                            await bocchi.sendFileFromUrl(from, pic, 'nhentai.jpg', teks, id)
                                .then(() => console.log('Success sending nHentai info!'))
                        } catch (err) {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        }
                    } else {
                        await bocchi.reply(from, ind.nhFalse(), id)
                    }
                }
            break
            case 'nhsearch':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${q}...`)
                    nana.search(q)
                        .then(async (g) => {
                            let txt = `-----[ *NHENTAI* ]-----\n\n➸ *Result for*: ${q}`
                            for (let i = 0; i < g.results.length; i++) {
                                const { id, title, language } = g.results[i]
                                txt += `\n\n➸ *Title*: ${title}\n➸ *Language*: ${language.charAt(0).toUpperCase() + language.slice(1)}\n➸ *Link*: nhentai.net/g/${id}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            await bocchi.sendFileFromUrl(from, g.results[0].thumbnail.s, `${g.results[0].title}`, txt, id)
                                .then(() => console.log('Success sending nHentai results!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    console.log(`Searching nHentai for ${q}...`)
                    nana.search(q)
                        .then(async (g) => {
                            let txt = `-----[ *NHENTAI* ]-----\n\n➸ *Result for*: ${q}`
                            for (let i = 0; i < g.results.length; i++) {
                                const { id, title, language } = g.results[i]
                                txt += `\n\n➸ *Title*: ${title}\n➸ *Language*: ${language.charAt(0).toUpperCase() + language.slice(1)}\n➸ *Link*: nhentai.net/g/${id}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            await bocchi.sendFileFromUrl(from, g.results[0].thumbnail.s, `${g.results[0].title}`, txt, id)
                                .then(() => console.log('Success sending nHentai results!'))
                        })
                        .catch(async(err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                }
            break
            case 'nekosearch':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isPremium) return await bocchi.reply(from, ind.notPremium(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        const res = await nekobocc.search(q)
                        let text = '-----[ *NEKOPOI RESULT* ]-----'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, text, id)
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        const res = await nekobocc.search(q)
                        let text = '-----[ *NEKOPOI RESULT* ]-----'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, text, id)
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                }
            break
            case 'waifu18':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    weeaboo.waifu(true)
                        .then(async ({ url }) => {
                            await bocchi.sendFileFromUrl(from, url, 'waifu.png', '', id)
                                .then(() => console.log('Success sending waifu!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    weeaboo.waifu(true)
                        .then(async ({ url }) => {
                            await bocchi.sendFileFromUrl(from, url, 'waifu.png', '', id)
                                .then(() => console.log('Success sending waifu!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                }
            break
            case 'phdl':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    if (!isUrl(url) && !url.includes('pornhub.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        nsfw.phDl(url)
                            .then(async ({ title, download_urls, thumbnail_url }) => {
                                const count = Object.keys(download_urls).length
                                if (count !== 2) {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    const shortsMid = await misc.shortener(download_urls['480P'])
                                    const shortsHigh = await misc.shortener(download_urls['720P'])
                                    await bocchi.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                } else {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    await bocchi.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                }
                            })
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                } else {
                    if (!isUrl(url) && !url.includes('pornhub.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    try {
                        nsfw.phDl(url)
                            .then(async ({ title, download_urls, thumbnail_url }) => {
                                const count = Object.keys(download_urls).length
                                if (count !== 2) {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    const shortsMid = await misc.shortener(download_urls['480P'])
                                    const shortsHigh = await misc.shortener(download_urls['720P'])
                                    await bocchi.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                } else {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    await bocchi.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                }
                            })
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                }
            break
            case 'yuri':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '', id)
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '', id)
                }
            break
            case 'lewdavatar':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.avatar()).url, 'avatar.jpg', '', id)
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.avatar()).url, 'avatar.jpg', '', id)
                }
            break
            case 'lewdholo':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    const ggr = await axios.get(`https://lolhuman.herokuapp.com/api/random/nsfw/hololewd?apikey=${config.lolhuman}`)
                    await bocchi.sendFileFromUrl(from, ggr.data.result, 'avatar.jpg', '', id)
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    const ggr = await axios.get(`https://lolhuman.herokuapp.com/api/random/nsfw/hololewd?apikey=${config.lolhuman}`)
                    await bocchi.sendFileFromUrl(from, ggr.data.result, 'avatar.jpg', '', id)
                }
            break
            case 'ecchi':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    const gggr = await axios.get(`https://lolhuman.herokuapp.com/api/random/nsfw/ecchi?apikey=${config.lolhuman}`)
                    await bocchi.sendFileFromUrl(from, gggr.data.result, 'avatar.jpg', '', id)
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    const gggr = await axios.get(`https://lolhuman.herokuapp.com/api/random/nsfw/ecchi?apikey=${config.lolhuman}`)
                    await bocchi.sendFileFromUrl(from, gggr.data.result, 'avatar.jpg', '', id)
                }
            break
            case 'femdom':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, ind.notNsfw(), id)
                    await bocchi.reply(from, ind.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.femdom()).url, 'femdom.jpg', '', id)
                } else {
                    await bocchi.reply(from, ind.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.femdom()).url, 'femdom.jpg', '', id)
                }
            break

            // Moderation command
            case 'group':
            case 'grup': 
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return bocchi.reply(from, ind.botNotAdmin(), id)
                if (ar[0] === 'disable') {
                    await bocchi.setGroupToAdminsOnly(groupId, true)
                    await bocchi.sendText(from, ind.gcMute())
                } else if (ar[0] === 'enable') {
                    await bocchi.setGroupToAdminsOnly(groupId, false)
                    await bocchi.sendText(from, ind.gcUnmute())
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'add':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, ind.botNotAdmin(), id)
                if (args.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                try {
                    await bocchi.addParticipant(from, `${args[0]}@c.us`)
                    await bocchi.sendText(from, '🎉 Welcome! 🎉')
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'kick':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, ind.botNotAdmin(), id)
                if (mentionedJidList.length === 0) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.sendTextWithMentions(from, `Good bye~\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i of mentionedJidList) {
                    if (groupAdmins.includes(i)) return await bocchi.sendText(from, ind.wrongFormat())
                    await bocchi.removeParticipant(groupId, i)
                }
            break
            case 'promote':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, ind.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (groupAdmins.includes(mentionedJidList[0])) return await bocchi.reply(from, ind.adminAlready(), id)
                await bocchi.promoteParticipant(groupId, mentionedJidList[0])
                await bocchi.reply(from, ind.ok(), id)
            break
            case 'demote':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, ind.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await bocchi.reply(from, ind.notAdmin(), id)
                await bocchi.demoteParticipant(groupId, mentionedJidList[0])
                await bocchi.reply(from, ind.ok(), id)
            break
            case 'leave':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                await bocchi.sendText(from, 'Sayounara~ 👋')
                await bocchi.leaveGroup(groupId)
            break
            case 'everyone': // Thanks to ArugaZ
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                const groupMem = await bocchi.getGroupMembers(groupId)
                const lastEveryone = limit.getLimit(sender.id, _limit)
                const alasanmes = q ? q : 'Nothing.'
                if (lastEveryone !== undefined && cd - (Date.now() - lastEveryone) > 0) {
                    const time = ms(cd - (Date.now() - lastEveryone))
                    await bocchi.reply(from, ind.limit(time), id)
                } else if (isOwner) {
                    let txt = `╔══✪〘 *Mention All* 〙✪══\n╠ *Message : ${alasanmes}*\n║\n`
                        for (let i = 0; i < groupMem.length; i++) {
                            txt += '╠➥'
                            txt += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                        }
                    txt += '╚═〘 *C H I K A  B O T* 〙'
                    await bocchi.sendTextWithMentions(from, txt)
                } else {
                    let txt = `╔══✪〘 *Mention All* 〙✪══\n╠*Message : ${alasanmes}*\n║\n`
                        for (let i = 0; i < groupMem.length; i++) {
                            txt += '╠➥'
                            txt += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                        }
                    txt += '╚═〘 *C H I K A  B O T* 〙'
                    await bocchi.sendTextWithMentions(from, txt)
                    limit.addLimit(sender.id, _limit)
                }
            break
            case 'groupicon':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return bocchi.reply(from, ind.botNotAdmin(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await bocchi.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await bocchi.setGroupIcon(groupId, imageBase64)
                    await bocchi.sendText(from, ind.ok())
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'antilink':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, ind.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (isDetectorOn) return await bocchi.reply(from, ind.detectorOnAlready(), id)
                    _antilink.push(groupId)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await bocchi.reply(from, ind.detectorOn(name, formattedTitle), id)
                } else if (ar[0] === 'disable') {
                    _antilink.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await bocchi.reply(from, ind.detectorOff(), id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'leveling':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isLevelingOn) return await bocchi.reply(from, ind.levelingOnAlready(), id)
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await bocchi.reply(from, ind.levelingOn(), id)
                } else if (ar[0] === 'disable') {
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await bocchi.reply(from, ind.levelingOff(), id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'welcome':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isWelcomeOn) return await bocchi.reply(from, ind.welcomeOnAlready(), id)
                    _welcome.push(groupId)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await bocchi.reply(from, ind.welcomeOn(), id)
                } else if (ar[0] === 'disable') {
                    _welcome.splice(groupId, 1)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await bocchi.reply(from, ind.welcomeOff(), id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'autosticker':
            case 'autostiker':
            case 'autostik':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isAutoStickerOn) return await bocchi.reply(from, ind.autoStikOnAlready(), id)
                    _autosticker.push(groupId)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await bocchi.reply(from, ind.autoStikOn(), id)
                } else if (ar[0] === 'disable') {
                    _autosticker.splice(groupId, 1)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await bocchi.reply(from, ind.autoStikOff(), id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'antinsfw':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, ind.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (isDetectorOn) return await bocchi.reply(from, ind.antiNsfwOnAlready(), id)
                    _antinsfw.push(groupId)
                    fs.writeFileSync('./database/group/antinsfw.json', JSON.stringify(_antinsfw))
                    await bocchi.reply(from, ind.antiNsfwOn(name, formattedTitle), id)
                } else if (ar[0] === 'disable') {
                    _antinsfw.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antinsfw.json', JSON.stringify(_antinsfw))
                    await bocchi.reply(from, ind.antiNsfwOff(), id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break

            // Owner command
            case 'bc':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (!q) return await bocchi.reply(from, ind.emptyMess(), id)
                const chats = await bocchi.getAllChatIds()
                for (let bcs of chats) {
                    let cvk = await bocchi.getChatById(bcs)
                    if (!cvk.isReadOnly) await bocchi.sendText(bcs, `${q}\n\n\n_Broadcasted message_`)
                }
                await bocchi.reply(from, ind.doneOwner(), id)
            break
            case 'clearall':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                const allChats = await bocchi.getAllChats()
                for (let delChats of allChats) {
                    await bocchi.deleteChat(delChats.id)
                }
                await bocchi.reply(from, ind.doneOwner(), id)
            break
            case 'leaveall':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (!q) return await bocchi.reply(from, ind.emptyMess(), id)
                const allGroup = await bocchi.getAllGroups()
                for (let gclist of allGroup) {
                    await bocchi.sendText(gclist.contact.id, q)
                    await bocchi.leaveGroup(gclist.contact.id)
                }
                await bocchi.reply(from, ind.doneOwner())
            break
            case 'getses':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                const ses = await bocchi.getSnapshot()
                await bocchi.sendFile(from, ses, 'session.png', ind.doneOwner())
            break
            case 'ban':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                            if (benet === botNumber) return await bocchi.reply(from, ind.wrongFormat(), id)
                            _ban.push(benet)
                            fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        }
                        await bocchi.reply(from, ind.doneOwner(), id)
                    } else {
                        _ban.push(args[1] + '@c.us')
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await bocchi.reply(from, ind.doneOwner(), id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, ind.wrongFormat(), id)
                        _ban.splice(mentionedJidList[0], 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await bocchi.reply(from, ind.doneOwner(), id)
                    } else{
                        _ban.splice(args[1] + '@c.us', 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await bocchi.reply(from, ind.doneOwner(), id)
                    }
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'eval':
            case 'ev':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                try {
                    let evaled = await eval(q)
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await bocchi.sendText(from, evaled)
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case 'shutdown':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                await bocchi.sendText(from, 'Otsukaresama deshita~ 👋')
                    .then(async () => await bocchi.kill())
                    .catch(() => new Error('Target closed.'))
            break
            case 'premium':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                            if (benet === botNumber) return await bocchi.reply(from, ind.wrongFormat(), id)
                            premium.addPremiumUser(benet, args[2], _premium)
                            await bocchi.reply(from, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${benet}\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                        }
                    } else {
                        premium.addPremiumUser(args[1] + '@c.us', args[2], _premium)
                        await bocchi.reply(from, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${args[1]}@c.us\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, ind.wrongFormat(), id)
                        _premium.splice(premium.getPremiumPosition(mentionedJidList[0], _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await bocchi.reply(from, ind.doneOwner(), id)
                    } else {
                        _premium.splice(premium.getPremiumPosition(args[1] + '@c.us', _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await bocchi.reply(from, ind.doneOwner(), id)
                    }
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'setstatus':
            case 'setstats':
            case 'setstat':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (!q) return await bocchi.reply(from, ind.emptyMess(), id)
                await bocchi.setMyStatus(q)
                await bocchi.sendText(from, ind.doneOwner())
            break
            case 'exif':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (!q.includes('|')) return await bocchi.reply(from, ind.wrongFormat(), id)
                const namaPack = q.substring(0, q.indexOf('|') - 1)
                const authorPack = q.substring(q.lastIndexOf('|') + 2)
                exif.create(namaPack, authorPack)
                await bocchi.reply(from, ind.doneOwner(), id)
            break
            case 'mute':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins, !isOwner, !isPremium) return await bocchi.reply(from, `anda siapa`, id)
                if (ar[0] === 'on') {
                    if (isMute) return await bocchi.reply(from, `Sudah mute pak`, id)
                    _mute.push(groupId)
                    fs.writeFileSync('./database/group/mute.json', JSON.stringify(_mute))
                    await bocchi.reply(from, `bot telah dimute di group ${(name || formattedTitle)}`, id)
                } else if (ar[0] === 'off') {
                    _mute.splice(groupId, 1)
                    fs.writeFileSync('./database/group/mute.json', JSON.stringify(_mute))
                    await bocchi.reply(from, `bot telah di unmute di group ${(name || formattedTitle)}`, id)
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case 'setname':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (!q || q.length > 25) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.setMyName(q)
                await bocchi.reply(from, `Done!\n\nUsername changed to: ${q}`, id)
            break
            case 'give':
                if (!isOwner) return await bocchi.reply(from, ind.ownerOnly(), id)
                if (args.length !== 2) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (mentionedJidList.length !== 0) {
                    for (let give of mentionedJidList) {
                        level.addLevelingXp(give, Number(args[1]), _level)
                        await bocchi.reply(from, `Sukses menambah XP kepada: ${give}\nJumlah ditambahkan: ${args[1]}`, id)
                    }
                } else {
                    level.addLevelingXp(args[0] + '@c.us', Number(args[1]), _level)
                    await bocchi.reply(from, `Sukses menambah XP kepada: ${args[0]}\nJumlah ditambahkan: ${args[1]}`, id)
                }
            break
            default:
                if (isCmd) {
                    await bocchi.reply(from, ind.cmdNotFound(command), id)
                }
            break
        }
    } catch (err) {
        console.error(color('[ERROR]', 'red'), err)
    }
}
/********** END OF MESSAGE HANDLER **********/
