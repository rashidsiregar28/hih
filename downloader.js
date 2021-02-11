const { fetchJson, toBuffer } = require('../tools/fetcher')
const { twitter } = require('video-url-link')
const { promisify } = require('util')
const config = require('../config.json')
const twtGetInfo = promisify(twitter.getInfo)

/**
 * Get Instagram media from URL.
 * @param {String} url
 * @returns {Object}
 */
const insta = (url) => new Promise((resolve, reject) => {
    console.log(`Get Instagram media from ${url}`)
    fetchJson(`https://api.vhtear.com/instadl?link=${url}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get TikTok video from URL.
 * @param {String} url 
 * @returns {Object}
 */
const tik = (url) => new Promise((resolve, reject) => {
    console.log(`Get TikTok media from ${url}`)
    fetchJson(`https://api.vhtear.com/tiktokdl?link=${url}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Search for Result Mediafire link.
 * @param {String} query 
 * @returns {Object}
 */
const mfire = (url) => new Promise((resolve, reject) => {
    console.log('Result...')
    fetchJson(`http://tobz-api.herokuapp.com/api/mediafire?url=${url}&apikey=${config.tobz}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get mod apk from modroid
 * @param {String} query 
 * @returns {Object}
 */
const modroid = (query) => new Promise((resolve, reject) => {
    console.log('Result...')
    fetchJson(`https://tobz-api.herokuapp.com/api/moddroid?q=${query}&apikey=${config.tobz}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get mod apk from happymod
 * @param {String} query 
 * @returns {Object}
 */
const happymod = (query) => new Promise((resolve, reject) => {
    console.log('Result...')
    fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${query}&apikey=${config.tobz}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get media from Facebook.
 * @param {String} query
 * @returns {Object}
 */
const fba = (url) => new Promise((resolve, reject) => {
    console.log(`Downloading FB Video from ${url}`)
    fetchJson(`https://lolhuman.herokuapp.com/api/facebook?url=${url}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get media from Cocofun.
 * @param {String} query
 * @returns {Object}
 */
const coco = (url) => new Promise((resolve, reject) => {
    console.log(`Downloading Cocofun Video from ${url}`)
    fetchJson(`https://api.vhtear.com/cocodownload?link=${url}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})


/**
 * Get YouTube media from URL.
 * @param {String} url
 * @returns {Object}
 */
const ytmpb = (url) => new Promise((resolve, reject) => {
    console.log(`Get YouTube media from ${url}`)
    fetchJson(`https://st4rz.herokuapp.com/api/yta2?url=${url}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get YouTube media from URL.
 * @param {String} url
 * @returns {Object}
 */
const ytdlb = (url) => new Promise((resolve, reject) => {
    console.log(`Get YouTube media from ${url}`)
    fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${url}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Joox music metadata from title.
 * @param {String} title
 * @returns {Object}
 */
const joox = (title) => new Promise((resolve, reject) => {
    console.log(`Get Joox music from ${title}...`)
    fetchJson(`https://api.vhtear.com/music?query=${title}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Twitter media from URL.
 * @param {String} url 
 * @returns {Object}
 */
const tweet = (url) => new Promise((resolve, reject) => {
    console.log(`Get Twitter media from ${url}`)
    fetchJson(`https://lolhuman.herokuapp.com/api/twitter?url=${url}&apikey=${config.lolhuman}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get TikTok video with no WM.
 * @param {String} url 
 * @returns {Object}
 */
const tikNoWm = (url) => new Promise((resolve, reject) => {
    console.log(`Get TikTok with no WM from ${url}`)
    fetchJson(`https://lolhuman.herokuapp.com/api/tiktok?url=${url}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Line sticker from URL.
 * @param {String} url 
 * @returns {Object}
 */
const line = (url) => new Promise((resolve, reject) => {
    console.log(`Get Line sticker from ${url}`)
    fetchJson(`http://enznoire.herokuapp.com/line?url=${url}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

module.exports = {
    ytmpb,
    ytdlb,
    tik,
    modroid,
    happymod,
    joox,
    mfire,
    insta,
    tweet,
    tikNoWm,
    line,
    fba,
    coco
}
