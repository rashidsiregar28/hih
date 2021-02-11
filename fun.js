const { fetchText, fetchJson } = require('../tools/fetcher')
const config = require('../config.json')

/**
 * Fortune-telling about you and your partner.
 * @param {String} name
 * @param {String} partner
 * @returns {Object}
 */
const pasangan = (name, partner) => new Promise((resolve, reject) => {
    console.log(`Checking fortune for ${name} and ${partner}...`)
    fetchJson(`https://api.vhtear.com/primbonjodoh?nama=${name}&pasangan=${partner}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get weekly zodiac fortune.
 * @param {String} zodiac
 * @returns {Object}
 */
const zodiak = (zodiac) => new Promise((resolve, reject) => {
    console.log(`Get weekly zodiac fortune for ${zodiac}...`)
    fetchJson(`https://api.vhtear.com/zodiak?query=${zodiac}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Chat with SimiSimi.
 * @param {String} chat
 * @returns {Object}
 */
const simi = (chat) => new Promise((resolve, reject) => {
    console.log('Get response from SimSumi...')
    fetchJson(`https://lolhuman.herokuapp.com/api/simi/${chat}?apikey=${config.lolhuman}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get truth.
 * @returns {String}
 */
const truth = () => new Promise((resolve, reject) => {
    console.log('Get random truth...')
    fetchText('https://raw.githubusercontent.com/AlvioAdjiJanuar/random/main/truth.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get dare.
 * @returns {String}
 */
const dare = () => new Promise((resolve, reject) => {
    console.log('Get random dare...')
    fetchText('https://raw.githubusercontent.com/AlvioAdjiJanuar/random/main/dare.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get weton fortune.
 * @param {String} date
 * @param {String} month
 * @param {String} year
 * @returns {Object}
 */
const weton = (date, month, year) => new Promise((resolve, reject) => {
    console.log('Get weton data...')
    fetchJson(`https://api.vhtear.com/ramalweton?tgl=${date}&bln=${month}&thn=${year}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) =>  reject(err))
})

/**
 * Get weton fortune.
 * @param {String} date
 * @param {String} month
 * @param {String} year
 * @returns {Object}
 */
const rml = (date, month, year) => new Promise((resolve, reject) => {
    console.log('Get weton data...')
    fetchJson(`http://lolhuman.herokuapp.com/api/jadian/${date}/${month}/${year}?apikey=${config.lolhuman}`)
        .then((result) => resolve(result))
        .catch((err) =>  reject(err))
})


/**
 * Get fresh videos from TikTok.
 * @returns {String}
 */
const asupan = () => new Promise((resolve, reject) => {
    console.log('Fetching video...')
    fetchText('http://sansekai.my.id/sansekai.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Random dadu for group game xD
 * @returns {String}
 */
const dadu = () => new Promise((resolve, reject) => {
    console.log('Get sticker....')
    fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/Dadu')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})


/**
 * Get Random doge sticker
 * @returns {String}
 */
const doge = () => new Promise((resolve, reject) => {
    console.log('Get sticker....')
    fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/anjing')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Random patrik sticker
 * @returns {String}
 */
const bucin = () => new Promise((resolve, reject) => {
    console.log('Get sticker....')
    fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/bucin')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Random doge sticker
 * @returns {String}
 */
const patr = () => new Promise((resolve, reject) => {
    console.log('Get sticker....')
    fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/patrik')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Random anime sticker
 * @returns {String}
 */
const wife = () => new Promise((resolve, reject) => {
    console.log('Get sticker....')
    fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/animestick')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get random cita-cita meme.
 * @returns {String}
 */
const cita = () => new Promise((resolve, reject) => {
    console.log('Get random cita-cita...')
    fetchText('https://raw.githubusercontent.com/AlvioAdjiJanuar/citacita/main/citacita.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Getting caklontong quiz.
 */
const caklontong = () => new Promise((resolve, reject) => {
    console.log('Getting caklontong quiz...')
    fetchJson(`https://api.vhtear.com/funkuis&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Getting tebakgbar quiz.
 */
const tebakgambar = () => new Promise((resolve, reject) => {
    console.log('Getting tebakgbar quiz...')
    fetchJson('https://videfikri.com/api/tebakgambar/')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Getting family 100 quiz.
 */
const family = () => new Promise((resolve, reject) => {
    console.log('Getting tebakgbar quiz...')
    fetchJson(`https://api.vhtear.com/family100&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get hilih text.
 */
const hilihteks = (query) => new Promise((resolve, reject) => {
    console.log(`Getting Hilih teks from: ${query}...`)
    fetchJson(`https://videfikri.com/api/hilih?query=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get alay text.
 */
const alayteks = (query) => new Promise((resolve, reject) => {
    console.log(`Getting alay teks from: ${query}...`)
    fetchJson(`https://api.zeks.xyz/api/alaymaker?kata=${query}&apikey=${config.zeks}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get bapak text.
 */
const bapakteks = (query) => new Promise((resolve, reject) => {
    console.log(`Getting bapak teks from: ${query}...`)
    fetchJson(`https://lolhuman.herokuapp.com/api/upperlower/${query}?apikey=${config.lolhuman}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Weton artinama
 */
const arti = (query) => new Promise((resolve, reject) => {
    console.log(`Getting artinama from: ${query}...`)
    fetchJson(`https://lolhuman.herokuapp.com/api/artinama/${query}?apikey=${config.lolhuman}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})


/**
 * Get bucin text.
 */
const bucinx = () => new Promise((resolve, reject) => {
    console.log('Getting random bucin text...')
    fetchJson(`https://lolhuman.herokuapp.com/api/random/bucin?apikey=${config.lolhuman}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

module.exports = {
    pasangan,
    zodiak,
    simi,
    family,
    truth,
    caklontong,
    dare,
    alayteks,
    hilihteks,
    weton,
    asupan,
    bucinx,
    tebakgambar,
    cita,
    dadu,
    doge,
    wife,
    bapakteks,
    arti,
    rml,
    bucin,
    patr
}
