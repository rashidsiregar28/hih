const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('config.json'))

exports.wait = () => {
    return `Mohon tunggu sebentar~`
}

exports.ok = () => {
    return `Ok desu~`
}

exports.wrongFormat = () => {
    return `Format salah! Silakan cek cara penggunaan di *${prefix}menu*.`
}

exports.emptyMess = () => {
    return `Harap masukkan pesan yang ingin disampaikan!`
}

exports.cmdNotFound = (cmd) => {
    return `Command *${prefix}${cmd}* tidak ditemukan!`
}

exports.blocked = (ownerNumber) => {
    return `Bot tidak menerima panggilan. Karena kamu telah melanggar rules, maka kamu telah diblok!\n\nHarap hubungi owner: wa.me/${ownerNumber.replace('@c.us', '')}`
}

exports.ownerOnly = () => {
    return `Command ini khusus Owner-sama!`
}

exports.doneOwner = () => {
    return `Sudah selesai, Owner-sama~`
}

exports.groupOnly = () => {
    return `Command ini hanya bisa digunakan di dalam grup!`
}

exports.adminOnly = () => {
    return `Command ini hanya bisa digunakan oleh admin grup!`
}

exports.notNsfw = () => {
    return `Command NSFW belum diaktifkan!`
}

exports.nsfwOn = () => {
    return `Command NSFW berhasil *diaktifkan*!`
}

exports.nsfwOff = () => {
    return `Command NSFW berhasil *dinonaktifkan*!`
}

exports.nsfwAlready = () => {
    return `Command NSFW sudah diaktifkan sebelumnya.`
}

exports.addedGroup = (chat) => {
    return `Terima kasih telah mengundangku, para member *${chat.contact.name}*!\n\nSilakan register dengan cara ketik:\n*${prefix}register* nama | umur`
}

exports.nhFalse = () => {
    return `Kode tidak valid!`
}

exports.listBlock = (blockNumber) => {
    return `------[ HALL OF SHAME ]------
    
Total diblokir: *${blockNumber.length}* user\n`
}

exports.notPremium = () => {
    return `Maaf! Command ini khusus untuk user premium saja.`
}

exports.notAdmin = () => {
    return `User bukan seorang admin!`
}

exports.adminAlready = () => {
    return `Tidak dapat mem-promote user yang merupakan admin!`
}

exports.botNotPremium = () => {
    return `Bot ini tidak mendukung command premium. Silakan hubungi pemilik bot ini.`
}

exports.botNotAdmin = () => {
    return `Jadikan bot sebagai admin terlebih dahulu!`
}

exports.ytFound = (res) => {
    return `*Media ditemukan!*\n\n➸ *Judul*: ${res.title}\n➸ *Size*:\n${res.filesize}\n➸ *Description*: ${res.desc}\n\nMedia sedang dikirim, mohon tunggu...`
}

exports.notRegistered = () => {
    return `Kamu belum terdaftar di database!\n\nSilakan register dengan format:\n*${prefix}register* nama | umur\n\nNote:\nHarap save nomor ku agar bisa mendapatkan serial!!`
}

exports.registered = (name, age, userId, time, serial) => {
    return `*「 REGISTRATION 」*\n\nAkun kamu telah terdaftar dengan data:\n\n➸ *Nama*: ${name}\n➸ *Umur*: ${age}\n➸ *ID*: ${userId}\n➸ *Waktu pendaftaran*: ${time}\n➸ *Serial*: ${serial}\n\nCatatan:\nHarap simpan data *serial* anda ,karena dibutuhkan suatu saat!\n\nKetik *${prefix}rules* terlebih dahulu ya~`
}

exports.registeredAlready = () => {
    return `Kamu sudah mendaftar sebelumnya.`
}

exports.received = (pushname) => {
    return `Halo ${pushname}!\nTerima kasih telah melapor, laporanmu akan kami segera terima.`
}

exports.limit = (time) => {
    return `Maaf, tetapi kamu telah mencapai limit menggunakan command ini.\nSilakan tunggu *${time.hours}* jam *${time.minutes}* menit *${time.seconds}* detik lagi.`
}

exports.videoLimit = () => {
    return `Ukuran video terlalu besar!`
}

exports.joox = (result) => {
    return `*Lagu ditemukan!*\n\n➸ *Penyanyi*: ${result[0].penyanyi}\n➸ *Judul*: ${result[0].judul}\n➸ *Album*: ${result[0].album}\n➸ *Ext*: ${result[0].ext}\n➸ *Size*: ${result[0].filesize}\n➸ *Durasi*: ${result[0].duration}\n\nMedia sedang dikirim, mohon tunggu...`
}

exports.gsm = (result) => {
    return `➸ *Model HP*: ${result.title}\n➸ *Spesifikasi*: ${result.spec}`
}

exports.receipt = (result) => {
    return `${result.title}\n\n${result.desc}\n\n*Bahan*: ${result.bahan}\n\n*Cara membuat*:\n${result.cara}`
}

exports.ytResult = (urlyt, title, channel, duration, views) => {
    return `➸ *Judul*: ${title}\n➸ *Channel*: ${channel}\n➸ *Durasi*: ${duration}\n➸ *Views*: ${views}\n➸ *Link*: ${urlyt}`
}

exports.profile = (username, status, premi, benet, adm, level, requiredXp, xp) => {
    return `-----[ *USER INFO* ]-----\n\n➸ *Username*: ${username}\n➸ *Status*: ${status}\n➸ *Premium*: ${premi}\n➸ *Banned*: ${benet}\n➸ *Admin*: ${adm}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=\n\nYour progress:\n➸ *Level*: ${level}\n➸ *XP*: ${xp} / ${requiredXp}`
}

exports.detectorOn = (name, formattedTitle) => {
    return `*「 ANTI GROUP LINK 」*\n\nPerhatian untuk penghuni grup ${(name || formattedTitle)}\nGrup ini memiliki anti-group link detector, apabila ada salah satu member mengirim group link di sini maka dia akan ter-kick secara otomatis.\n\nSekian terima kasih.\n- Admin ${(name || formattedTitle)}`
}

exports.detectorOff = () => {
    return `Fitur anti-group link berhasil *dinonaktifkan*!`
}

exports.detectorOnAlready = () => {
    return `Fitur anti-group link telah diaktifkan sebelumnya.`
}

exports.antiNsfwOn = (name, formattedTitle) => {
    return `*「 ANTI NSFW LINK 」*\n\nPerhatian untuk penghuni grup ${(name || formattedTitle)}\nGrup ini memiliki anti-NSFW link detector, apabila ada salah satu member mengirim link NSFW/porn di sini maka dia akan ter-kick secara otomatis.\n\nSekian terima kasih.\n- Admin ${(name || formattedTitle)}`
}

exports.antiNsfwOff = () => {
    return `Fitur anti-NSFW link berhasil *dinonaktifkan*!`
}

exports.antiNsfwOnAlready = () => {
    return `Fitur anti-NSFW link telah diaktifkan sebelumnya.`
}

exports.linkDetected = () => {
    return `*「 ANTI GROUP LINK 」*\n\nKamu mengirim link group chat!\nMaaf tapi kami harus mengeluarkan mu...\nSelamat tinggal~`
}

exports.levelingOn = () => {
    return `Fitur leveling berhasil *diaktifkan*!`
}

exports.levelingOff = () => {
    return `Fitur leveling berhasil *dinonaktifkan*!`
}

exports.levelingOnAlready = () => {
    return `Fitur leveling telah diaktifkan sebelumnya.`
}

exports.levelingNotOn = () => {
    return `Fitur leveling belum diaktifkan!`
}

exports.levelNull = () => {
    return `Kamu belum memiliki level!`
}

exports.welcome = (event) => {
    return `Selamat datang @${event.who.replace('@c.us', '')}!\n\nSemoga betah terus di grup kami ya~`
}

exports.welcomeOn = () => {
    return `Fitur welcome berhasil *diaktifkan*!`
}

exports.welcomeOff = () => {
    return `Fitur welcome berhasil *dinonaktifkan*!`
}

exports.welcomeOnAlready = () => {
    return `Fitur welcome telah diaktifkan sebelumnya.`
}

exports.minimalDb = () => {
    return `Perlu setidaknya *10* user yang memiliki level di database!`
}

exports.autoStikOn = () => {
    return `Fitur auto-stiker berhasil *diaktifkan*!`
}

exports.autoStikOff = () => {
    return `Fitur auto-stiker berhasil *dinonaktifkan*!`
}

exports.autoStikOnAlready = () => {
    return `Fitur auto-stiker telah diaktifkan sebelumnya.`
}

exports.afkOn = (pushname, reason) => {
    return `Fitur AFK berhasil *diaktifkan*!\n\n➸ *Username*: ${pushname}\n➸ *Alasan*: ${reason}`
}

exports.afkOnAlready = () => {
    return `Fitur AFK telah diaktifkan sebelumnya.`
}

exports.afkMentioned = (getReason, getTime) => {
    return `*「 AFK MODE 」*\n\nSssttt! Orangnya lagi AFK, jangan diganggu!\n➸ *Alasan*: ${getReason}\n➸ *Sejak*: ${getTime}`
}

exports.afkDone = (pushname) => {
    return `*${pushname}* telah kembali dari AFK! Selamat datang kembali~`
}

exports.gcMute = () => {
    return `*「 MUTED 」*\n\nHanya admin yang dapat mengirim pesan ke grup ini.`
}

exports.gcUnmute = () => {
    return `*「 UNMUTED 」*\n\nSekarang semua anggota dapat mengirim chat di grup ini.`
}

exports.notNum = (q) => {
    return `"${q}", bukan angka!`
}

exports.playstore = (app_id, title, developer, description, price, free) => {
    return `➸ *Nama*: ${title}\n➸ *ID*: ${app_id}\n➸ *Developer*: ${developer}\n➸ *Gratis*: ${free}\n➸ *Harga*: ${price}\n➸ *Deskripsi*: ${description}`
}

exports.shopee = (nama, harga, terjual, shop_location, description, link_product) => {
    return `➸ *Nama*: ${nama}\n➸ *Harga*: ${harga}\n➸ *Terjual*: ${terjual}\n➸ *Lokasi*: ${shop_location}\n➸ *Link produk*: ${link_product}\n➸ *Deskripsi*: ${description}`
}

exports.pc = (pushname) => {
    return `*「 REGISTRATION 」*\n\nAkun kamu berhasil terdaftar! Silakan cek pesan ku di private chat mu ya ${pushname}~ :3\n\nNote:\nJika kamu tidak menerima pesan, artinya kamu belum save nomor bot.`
}

exports.registeredFound = (name, age, time, serial, userId) => {
    return `*「 REGISTERED 」*\n\nAkun ditemukan!\n\n➸ *Nama*: ${name}\n➸ *Umur*: ${age}\n➸ *ID*: ${userId}\n➸ *Waktu pendaftaran*: ${time}\n➸ *Serial*: ${serial}`
}

exports.registeredNotFound = (serial) => {
    return `Akun dengan serial: *${serial}* tidak ditemukan!`
}

exports.ytPlay = (result) => {
    return `*「 PLAY 」*\n\n➸ *Judul*: ${result.title}\n➸ *Durasi*: ${result.duration}\n➸ *Link*: ${result.url}\n\nMedia sedang dikirim, mohon tunggu...`
}
exports.pcOnly = () => {
    return `Command ini hanya bisa digunakan di dalam private chat saja!`
}

exports.linkNsfw = () => {
    return `*「 ANTI NSFW LINK 」*\n\nKamu telah mengirim link NSFW!\nMaaf, tapi aku harus mengeluarkan mu...`
}

exports.ageOld = () => {
    return `Kamu terlalu tua untuk menggunakan fitur ini! Mohon kembali ke masa muda anda agar bisa menggunakannya.`
}

exports.menu = (jumlahUser, level, xp, role, pushname, requiredXp, premium) => {
    return `
------[ WELCOME ]-----

======================
➸ *Nama*: ${pushname}
➸ *Level*: ${level}
➸ *XP*: ${xp} / ${requiredXp}
➸ *Role*: ${role}
➸ *Premium*: ${premium}
======================

Total pendaftar: *${jumlahUser}*

Berikut adalah menu yang tersedia:

*[1]* Downloader 
*[2]* TextMaker
*[3]* Premium Command
*[4]* Sticker Command
*[5]* Weeaboo
*[6]* Fun 
*[7]* Image Effect
*[8]* Kerang Menu
*[9]* Group Moderation
*[10]* NSFW (18+)
*[11]* Owner Command
*[12]* Leveling
*[13]* Pray
*[14]* Media Command
*[15]* Bot Information
*[16]* Price List

Ketik *${prefix}menu* angka_index untuk membuka menu page yang dipilih.
Contoh : ${prefix}menu 1

Catatan:
Perlakukan bot secara baik, dev akan bertindak tegas apabila user melanggar rules.
Bot ini terdapat anti-spam yang berupa cooldown command selama *5 detik* setiap kali pemakaian.

*Join ke grup Official ChikaBot di https://chat.whatsapp.com/HLU6B1Mw34QBMUoXAyhec0*
    `
}

exports.menuDownloader = () => {
    return `
-----[ DOWNLOADER ]-----

1. *${prefix}facebook*
Download Facebook video.
Aliases: *fb*
Usage: *${prefix}facebook* link_video

2. *${prefix}ytmp3*
Download YouTube audio.
Aliases: -
Usage: *${prefix}ytmp3* link

3. *${prefix}ytmp4*
Download YouTube video.
Aliases: -
Usage: *${prefix}ytmp4* link

4. *${prefix}joox*
Mencari dan men-download lagu dari Joox.
Aliases: -
Usage: *${prefix}joox* judul_lagu

5. *${prefix}tiktok*
Mendownload video TikTok.
Aliases: -
Usage: *${prefix}tiktok* link_video

6. *${prefix}twitter*
Download Twitter media.
Aliases: *twt*
Usage: *${prefix}twiter* link

7. *${prefix}tiktokmusic*
Download source music dari tiktokvideo.
Aliases: -
Usage: *${prefix}tiktokmusic* link_video

8. *${prefix}igdl*
Download video dari Source Instagram.
Aliases: *instagramdl*, *ig*
Usage: *${prefix}ig* link_video

9. *${prefix}igstory*
Download video Story user di Instagram
Aliases: *storyig*
Usage: *${prefix}igstory* username

10. *${prefix}mediafire*
Info dan direct link mediafire.
Aliases: -
Usage: *${prefix}mediafire* link

11. *${prefix}gdrive*
Info dan direct link google drive.
Aliases: googledrive
Usage: *${prefix}gdrive* link

12. *${prefix}soundcloud*
Download soundcloud music.
Aliases: -
Usage: *${prefix}souncloud* link_music

13. *${prefix}linedl*
Download sticker line via link.
Aliases: -
Usage: *${prefix}linedl* link_sticker

14. *${prefix}cocofun*
Download video cocofun.
Aliases: -
Usage: *${prefix}cocofun* link


_Index of [1]_
    `
}

exports.menuText = () => {
    return `
-----[ TEXT MAKER ]-----

1. *${prefix}retro*
Membuat gambar retro teks.
Aliases: *retrotext*
Usage: *${prefix}retrotext* teks_atas | teks_tengah | teks_bawah

2. *${prefix}firemaker*
Membuat gambar teks fire.
Aliases: -
Usage: *${prefix}firemaker* teks

3. *${prefix}mlmaker*
Membuat gambar karakter hero ML dengan teks.
Aliases: -
Usage: *${prefix}mlmaker* nama_hero | teks

4. *${prefix}balloonmaker*
Membuat gambar couple balloon.
Aliases: *blmaker*
Usage: *${prefix}balloonmaker* nama1 | nama2

5. *${prefix}sliding*
Membuat GIF sliding text.
Aliases: -
Usage: *${prefix}sliding* teks

6. *${prefix}ffbanner*
Membuat banner Free Fire.
Aliases: -
Usage: *${prefix}ffbanner* teks1 | teks2

7. *${prefix}fflogo*
Membuat logo karakter Free Fire.
Aliases: -
Usage: *${prefix}fflogo* nama_karakter | teks

8. *${prefix}hartatahta*
Membuat gambar Harta Tahta Nama.
Aliases: -
Usage: *${prefix}hartatahta* nama

9. *${prefix}glitchtext*
Membuat gambar teks glitch.
Aliases: *glitext*
Usage: *${prefix}glitchtext* teks1 | teks2

10. *${prefix}blackpink*
Membuat teks dengan style logo Blackpink.
Aliases: -
Usage: *${prefix}blackpink* teks

11. *${prefix}phmaker*
Membuat teks dengan style logo Pornhub.
Aliases: -
Usage: *${prefix}phmaker* teks_kiri | teks_kanan

12. *${prefix}galaxy*
Membuat gambar teks galaxy.
Aliases: -
Usage: *${prefix}galaxy* teks

13. *${prefix}pubgbanner*
Membuat banner PUBG.
Aliases: -
Usage: *${prefix}pubgbanner* teks1 | teks2

14. *${prefix}csgobanner*
Membuat banner CSGO.
Aliases: -
Usage: *${prefix}csgobanner* teks

15. *${prefix}narutobanner*
Membuat banner Naruto.
Aliases: -
Usage: *${prefix}narutobanner* teks

16. *${prefix}kanna*
Membuat gambar teks kanna.
Aliases: -
Usage: *${prefix}kanna* teks

17. *${prefix}changemymind*
Membuat gambar teks changemy mind.
Aliases: mymind
Usage: *${prefix}mymind* teks

18. *${prefix}trumptweet*
Membuat gambar teks caption trump.
Aliases: -
Usage: *${prefix}trumptweet* teks

19. *${prefix}lovetext*
Membuat gambar teks love.
Aliases: -
Usage: *${prefix}lovetext* teks

20. *${prefix}shadow*
Membuat gambar teks shadow.
Aliases: -
Usage: *${prefix}shadow* teks

21. *${prefix}sarah*
Membuat gambar teks fandom sarah.
Aliases: -
Usage: *${prefix}sarah* teks

22. *${prefix}cosplay*
Membuat gambar yg anu lo( ͡° ͜ʖ ͡°).
Aliases: -
Usage: *${prefix}cosplay* teks

23. *${prefix}glow*
Membuat text glow.
Aliases: glowtext
Usage: *${prefix}glow* teks

24. *${prefix}thunder*
Membuat text efek thunder/petir :v.
Aliases: thundertext
Usage: *${prefix}thunder* teks

25. *${prefix}carbon*
Membuat text efek carbon.
Aliases: -
Usage: *${prefix}carbon* teks

26. *${prefix}metal*
Membuat text bergaya metal.
Aliases: -
Usage: *${prefix}metal* teks

27. *${prefix}gmlogo*
Membuat text logo.
Aliases: gaminglogo
Usage: *${prefix}gmlogo* teks

28. *${prefix}water*
Membuat text efek water.
Aliases: watertext
Usage: *${prefix}water* teks

29. *${prefix}silk*
Membuat text efek silk.
Aliases: -
Usage: *${prefix}silk* teks

30. *${prefix}smoke*
Membuat text efek smoke.
Aliases: -
Usage: *${prefix}smoke* teks

31. *${prefix}goglemaker*
Membuat gambar efek google search.
Aliases: -
Usage: *${prefix}googlemaker* teks_utama | teks_1 | teks_2

32. *${prefix}burnpaper*
Membuat text efek kertas terbakar :v.
Aliases: -
Usage: *${prefix}burnpaper* text

33. *${prefix}metalic*
Membuat text metalic.
Aliases: -
Usage: *${prefix}metalic* text

34. *${prefix}flowertext*
Membuat teks efek bunga.
Aliases: -
Usage: *${prefix}bunga* teks

35. *${prefix}8bit*
Membuat teks format 8bit.
Aliases: -
Usage: *${prefix}8bit* text1 | text2

36. *${prefix}harrypotter*
Membuat teks efek film harrypotter.
Aliases: -
Usage: *${prefix}harrypotter* teks

37. *${prefix}crossfire*
Teks dengan efek game crossfire.
Aliases: -
Usage: *${prefix}crossfire* teks

38. *${prefix}overwatch*
Teks dengan efek overwatch.
Aliases: -
Usage: *${prefix}overwatch* teks

39. *${prefix}warface*
Teks dengan efek game warface.
Aliases: -
Usage: *${prefix}warface* teks

40. *${prefix}quotemaker*
Buat quotemaker text.
Aliases: -
Usage: *${prefix}quotemaker* teks

41. *${prefix}quotemaker2*
Buat quotemaker text.
Aliases: -
Usage: *${prefix}quotemaker2* teks | wm | theme
Catatan: *Theme bisa kalian isi random.*

42. *${prefix}goldbutton*
Teks dengan fake goldplay button.
Aliases: -
Usage: *${prefix}playbutton* teks

43. *${prefix}silverbutton*
Teks dengan fake silverplay button.
Aliases: -
Usage: *${prefix}silverbutton* teks

44. *${prefix}lighttext*
Teks dengan efek light.
Aliases: -
Usage: *${prefix}lighttext* teks

45. *${prefix}colourtext*
Teks maker effect.
Aliases: -
Usage: *${prefix}colourtext* teks

46. *${prefix}flamingtext*
Teks flaming.
Aliases: -
Usage: *${prefix}flamingtext* teks

47. *${prefix}spacetext*
Teks maker space stone.
Aliases: -
Usage: *${prefix}spacetext* teks1 | text2

48. *${prefix}marvel*
Teks dengan efek marvel logo.
Aliases: -
Usage: *${prefix}marvel* teks1 | teks2

49. *${prefix}ninjalogo*
Teks dengan logo ninja
Aliases: -
Usage: *${prefix}ninjalogo* teks1 | teks2

50. *${prefix}lionlogo*
Teks dengan efek lion logo.
Aliases: -
Usage: *${prefix}lionlogo* teks1 | teks2

51. *${prefix}wolflogo*
Teks dengan logo wolf.
Aliases: -
Usage: *${prefix}wolflogo* teks1 | teks2

52. *${prefix}steel3d*
Teks dengan efek 3d steel.
Aliases: -
Usage: *${prefix}steel3d teks1 | teks2

53. *${prefix}labtext*
Teks dengan efek laboratorium.
Aliases: *lab*
Usage: *${prefix}lab* teks

54. *${prefix}sandwriting*
Teks dengan efek pantai.
Aliases: -
Usage: *${prefix}sandwriting* teks

55. *${prefix}sandengraved*
Teks dengan efek pantai.
Aliases: -
Usage: *${prefix}sandengraved* teks

56. *${prefix}metaldark*
Teks dengan efek metal.
Aliases: -
Usage: *${prefix}metaldark* teks

57. *${prefix}miniontext*
Teks dengan efek minion.
Aliases: -
Usage: *${prefix}miniontext* teks

58. *${prefix}deluxesilver*
Teks dengan efek deluxe.
Aliases: -
Usage: *${prefix}deluxesilver* teks

59. *${prefix}neon*
Teks dengan efek neon.
Aliases: -
Usage: *${prefix}neon* teks

60. *${prefix}greenneon*
Teks dengan efek neon hijau.
Aliases: -
Usage: *${prefix}greenneon* teks

61. *${prefix}newyear*
Teks dengan efek tahunbaru.
Aliases: -
Usage: *${prefix}newyear* teks

62. *${prefix}bloodtext*
Teks dengan efek blood.
Aliases: -
Usage: *${prefix}bloodtext* teks

63. *${prefix}halloweentext*
Teks dengan efek halloween.
Aliases: -
Usage: *${prefix}halloweentext* teks

64. *${prefix}jokerlogo*
Teks dengan jokerlogo.
Aliases: -
Usage: *${prefix}jokerlogo* teks

65. *${prefix}firework*
Teks dengan efek kembangapi.
Aliases: -
Usage: *${prefix}firework* teks

66. *${prefix}leavestext*
Teks maker effect.
Aliases: -
Usage: *${prefix}leavestext* teks

67. *${prefix}bokeh*
Teks dengan efek bokeh.
Aliases: -
Usage: *${prefix}bokeh* teks

68. *${prefix}toxictext*
Teks dengan efek toxic.
Aliases: -
Usage: *${prefix}toxictext* teks

69. *${prefix}strawberrytext*
Teks dengan efek buah strawberry.
Aliases: -
Usage: *${prefix}strawberrytext* teks

70. *${prefix}3dtext*
Teks dengan 3d effect.
Aliases: -
Usage: *${prefix}3dtext* teks

71. *${prefix}roadtext*
Teks dengan efek road jalanan.
Aliases: -
Usage: *${prefix}roadtext* teks

72. *${prefix}breakwall*
Teks effect.
Aliases: -
Usage: *${prefix}breakwall* teks

73. *${prefix}icetext*
Teks dengan efek ice.
Aliases: -
Usage: *${prefix}icetext* teks

74. *${prefix}summersand*
Teks dengan efek pantai.
Aliases: -
Usage: *${prefix}summersand* teks

75. *${prefix}horrortext*
Teks dengan efek darah.
Aliases: -
Usage: *${prefix}horrortext* teks

76. *${prefix}skytext*
Teks dengan efek awan sky.
Aliases: -
Usage: *${prefix}skytext* teks

77. *${prefix}luxury*
Teks dengan efek luxury.
Aliases: -
Usage: *${prefix}luxury* teks

78. *${prefix}christmastext*
Teks dengan efek natal.
Aliases: -
Usage: *${prefix}christmastext* teks


_Index of [2]_
    `
}

exports.menuPremi = () => {
    return `
-----[ PREMIUM ]-----

1. *${prefix}tiktoknowm*
Download Tiktok video tanpa WM.
Aliases: *tktoknowm*
Usage: *${prefix}tiktoknowm* link_video

2. *${prefix}stickerwm*
Buat stiker dengan WM.
Aliases: *stcwm*
Usage: Kirim gambar dengan caption *${prefix}stickerwm* pack_name | author_name atau reply gambar dengan caption *${prefix}stickerwm* pack_name | author_name.

3. *${prefix}takestick*
Merubah watermark sticker.
Aliases: -
Usage: Reply stiker dengan caption *${prefix}takestick* pack_name | author_name

4. *${prefix}asupan*
Asupan video cewek-cewek.
Aliases: -
Usage: *${prefix}asupan*

5. *${prefix}multilewds*
Mengirim up to 5 anime lewd pics.
Aliases: *multilewds multilewd mlewd mlewds*
Usage: *${prefix}multilewds*

6. *${prefix}nhdl*
Mendownload doujin dari nHentai sebagai file PDF.
Aliases: -
Usage: *${prefix}nhdl* kode

7. *${prefix}nekosearch*
Nekopoi search.
Aliases: -
Usage: *${prefix}nekosearch* query

8. *${prefix}multifetish*
Mengirim up to 5 fetish pics.
Aliases: *mfetish*
Usage: *${prefix}multifetish* <armpits/feets/thighs/ass/boobs/belly/sideboobs/ahegao>

9. *${prefix}brainly*
Mencari Jawaban dari Source Brainly
Aliases: -
Usage: *${prefix}brainly* pertanyaan

10. *${prefix}brainlysearch*
Mencari result brainly.
Aliases: -
Usage: *${prefix}brainlysearch* pertanyaan

11. *${prefix}spamcall*
Spam call.
Aliases: -
Usage: *${prefix}spamcall* 812xxxxxxxx

12. *${prefix}bokep*
Mengirim random bokep.
Aliases: randombokep
Usage: *${prefix}bokep*

13. *${prefix}pinterest*
Mengirim gambar source pinterest.
Aliases: -
Usage: *${prefix}pinterest* query

_Index of [3]_
    `
}

exports.menuSticker = () => {
    return `
-----[ STICKER ]-----

1. *${prefix}sticker*
Membuat stiker dari gambar yang dikirim atau di-reply.
Aliases: *stiker*
Usage: Kirim gambar dengan caption *${prefix}sticker* atau reply gambar dengan caption *${prefix}sticker*.

2. *${prefix}stickergif*
Membuat stiker dari video MP4 atau GIF yang dikirim atau di-reply.
Aliases: *stikergif*, *sgif*
Usage: Kirim video/GIF dengan caption *${prefix}stickergif* atau reply video/GIF dengan caption *${prefix}stickergif*.

3. *${prefix}ttg*
Membuat stiker text to GIF.
Aliases: -
Usage: *${prefix}ttg* teks

4. *${prefix}stickertoimg*
Konversi stiker ke foto.
Aliases: *stikertoimg toimg*
Usage: Reply sticker dengan caption *${prefix}stickertoimg*.

5. *${prefix}emojisticker*
Konversi emoji ke stiker.
Aliases: *emojistiker*
Usage: *${prefix}emojisticker* emoji

6. *${prefix}findsticker*
Untuk mencari sticker yang kamu cari
Aliases: *findstiker*
Usage: *${prefix}findsticker* teks

7. *${prefix}stickermeme*
Buat sticker meme.
Aliases: *stcmeme*
Usage: Kirim gambar dengan caption *${prefix}stickermeme* teks_atas | teks_bawah atau reply gambar dengan caption *${prefix}stickermeme* teks_atas | teks_bawah.

8. *${prefix}ttp*
Membuat stiker text.
Aliases: -
Usage: *${prefix}ttp* teks

9. *${prefix}nimesticker*
Mengirim stiker anime dengan random.
Aliases: -
Usage: *${prefix}ttp* teks.

10. *${prefix}stickerp*
Membuat stiker tanpa crop.
Aliases: -
Usage: Kirim atau reply gambar dengan caption *${prefix}stickerp*

11. *${prefix}stickernobg*
Membuat stiker dengan menghapus background.
Aliases: -
Usage: Kirim atau reply gambar dengan caption *${prefix}stickernobg*

12. *${prefix}patrik*
Random patrick sticker.
Aliases: -
Usage: *${prefix}patrick*

13. *${prefix}doge*
Random doge sticker.
Aliases: -
Usage: *${prefix}doge*

14. *${prefix}bucinstick*
Random sticker kebucinan.
Aliases: -
Usage: *${prefix}bucinstick*


_Index of [4]_
    `
}

exports.menuWeeaboo = () => {
    return `
-----[ WEEABOO ]-----

1. *${prefix}neko*
Mengirim foto neko girl.
Aliases: -
Usage: *${prefix}neko*

2. *${prefix}wallpaper*
Mengirim wallpaper anime.
Aliases: *wp*
Usage: *${prefix}wallpaper*

3. *${prefix}kemono*
Mengirim foto kemonomimi girl.
Aliases: -
Usage: *${prefix}kemono*

4. *${prefix}kusonime*
Mencari info anime dan link download batch di Kusonime.
Aliases: -
Usage: *${prefix}kusonime* judul_anime

5. *${prefix}komiku*
Mencari info manga dan link download di Komiku.
Aliases: -
Usage: *${prefix}komiku* judul_manga

6. *${prefix}wait*
Mencari source anime dari screenshot scene.
Aliases: -
Usage: Kirim screenshot dengan caption *${prefix}wait* atau reply screenshot dengan caption *${prefix}wait*.

7. *${prefix}source*
Mencari source dari panel doujin, ilustrasi, dan gambar yang berhubungan dengan anime.
Aliases: *sauce*
Usage: Kirim gambar dengan caption *${prefix}source* atau reply gambar dengan caption *${prefix}source*.

8. *${prefix}waifu*
Mengirim random foto waifu.
Aliases: -
Usage: *${prefix}waifu*

9. *${prefix}anitoki*
Cek update terbaru Anitoki.
Aliases: -
Usage: *${prefix}anitoki*

10. *${prefix}neonime*
Cek update terbaru Neonime.
Aliases: -
Usage: *${prefix}neonime*

11. *${prefix}anoboyongoing*
Cek on-going anime dari Anoboy.
Aliases: -
Usage: *${prefix}anoboyongoing*

12. *${prefix}husbu*
Mengirim random pict husbu.
Aliases: -
Usage: *${prefix}husbu*

13. *${prefix}avatar*
Mengirim random pict avatar.
Aliases: -
Usage: *${prefix}avatar*

14. *${prefix}loli*
Mengirim random pict loli.
Aliases: -
Usage: *${prefix}loli*

15. *${prefix}elf*
Mengirim random pict elf.
Aliases: -
Usage: *${prefix}elf*

12. *${prefix}shota*
Mengirim random pict shota.
Aliases: -
Usage: *${prefix}shota*

13. *${prefix}fanart*
Mengirim random pict fanart.
Aliases: -
Usage: *${prefix}fanart*

14. *${prefix}pixivsearch*
Mencari pict from pixiv.
Aliases: -
Usage: *${prefix}pixivsearch* query

15. *${prefix}genshininfo*
Mencari informasi karakter genshin.
Aliases: -
Usage: *${prefix}genshininfo* nama_chara

16. *${prefix}neonimesearch*
Cari anime di Neonime.
Aliases: -
Usage: *${prefix}neonimesearch* query

17. *${prefix}quotesnime*
Random quotes anime.
Aliases: -
Usage: *${prefix}quotesnime*

18. *${prefix}quotesnime2*
Cek update terbaru Neonime bahasa inggris.
Aliases: -
Usage: *${prefix}quotesnime2*

19. *${prefix}bacakomik*
Cari komik source bacakomik.
Aliases: -
Usage: *${prefix}bacakomik* query

20. *${prefix}anoboylatest*
Cek update terbaru anoboy.
Aliases: -
Usage: *${prefix}anoboylatest*

21. *${prefix}anoboysearch*
Cari anime di anoboy.
Aliases: -
Usage: *${prefix}anoboysearch* query


_Index of [5]_
    `
}

exports.menuFun = () => {
    return `
-----[ FUN ]-----

1. *${prefix}partner*
Weton jodoh.
Aliases: *pasangan*
Usage: *${prefix}partner* nama | pasangan

3. *${prefix}zodiac*
Ramalan zodiak Mingguan.
Aliases: *zodiak*
Usage: *${prefix}zodiac* zodiak

4. *${prefix}write*
Membuat catatan tulisan di buku.
Aliases: *nulis*
Usage: *${prefix}write* teks

5. *${prefix}simi*
Chat SimiSimi.
Aliases: -
Usage: *${prefix}simi* teks

6. *${prefix}tod*
Bermain truth or dare.
Aliases: -
Usage: *${prefix}tod*

7. *${prefix}weton*
Kirim ramalan weton.
Aliases: -
Usage: *${prefix}weton* tanggal | bulan | tahun

8. *${prefix}citacita*
Meme cita-cita.
Aliases: -
Usage: *${prefix}citacita*

9. *${prefix}readmore*
Generate teks baca selengkapnya.
Aliases: -
Usage: *${prefix}readmore* teks1 | teks2

10. *${prefix}reminder*
Pengingat. 
*s* - detik
*m* - menit
*h* - jam
*d* - hari
Aliases: -
Usage: *${prefix}reminder* 10s | pesan_pengingat

11. *${prefix}spamsms*
Spam SMS.
Aliases: -
Usage: *${prefix}spamsms* 0812xxxxxxxx jumlah_pesan

12. *${prefix}toxic*
Random toxic.
Aliases: -
Usage: *${prefix}toxic*

13. *${prefix}motivasi*
Kata-kata motivasi.
Aliases: -
Usage: *${prefix}motivasi*

14. *${prefix}afk*
Set akun kamu ke mode AFK, aku akan mengirim pesan ke orang yang me-mention kamu.
Aliases: -
Usage: *${prefix}afk* alasan. Kirim pesan ke grup untuk menonaktifkan mode AFK.

15. *${prefix}kbbi*
Mengirim definisi kata dari KBBI.
Aliases: -
Usage: *${prefix}kbbi* teks

16. *${prefix}say*
Bot akan mengulang pesan mu.
Aliases: -
Usage: *${prefix}say* teks

17. *${prefix}meme*
Bot akan mengirim meme secara random.
Aliases: -
Usage: *${prefix}meme*

18. *${prefix}memeindo*
Bot akan mengirim meme indo secara random.
Aliases: -
Usage: *${prefix}meme*

19. *${prefix}darkjoke*
Bot akan mengirim dark joke alay versi tiktok secara random.
Aliases: darkjokes
Usage: *${prefix}darkjoke*

20. *${prefix}caklontong*
Random kuis caklontong.
Aliases: -
Usage: *${prefix}caklontong*

21. *${prefix}univ*
Mencari info universitas
Aliases: university, universitas
Usage: *${prefix}univ* query

22. *${prefix}ganteng*
Bot akan mentag random member grup.
Aliases: -
Usage: *${prefix}ganteng*

23. *${prefix}Sange*
Bot akan mentag random member grup.
Aliases: -
Usage: *${prefix}sange*

24. *${prefix}babi*
Bot akan mentag random member grup.
Aliases: -
Usage: *${prefix}babi*

25. *${prefix}cerpen*
Bot akan mengirim random cerpen.
Aliases: -
Usage: *${prefix}cerpen

26. *${prefix}puisi*
Bot akan mengirim random puisi.
Aliases: -
Usage: *${prefix}puisi

27. *${prefix}email*
Spam Email.
Aliases: -
Usage: *${prefix}email* rashidsixxxxx@gmail.com | subjek | pesan

28. *${prefix}dadu*
Bot akan mengirim dadu.
Aliases: -
Usage: *${prefix}dadu*

29. *${prefix}jamdunia*
Bot akan mengkonversi jam dunia sesuai query.
Aliases: -
Usage: *${prefix}jamdunia* kota

30. *${prefix}fckmylife*
Bot akan mengirim random fuckmylife.
Aliases: fml
Usage: *${prefix}fckmylife*

31. *${prefix}nickepep*
Bot akan mengirim random nickname game ff.
Aliases: nickff
Usage: *${prefix}nickepep*

32. *${prefix}tebakgambar*
Random kuis tebak gambar*
Aliases: -
Usage: *${prefix}tebakgambar*

33. *${prefix}family100
Random kuis family100
Aliases: -
Usage: *${prefix}family100

34. *${prefix}alay*
mengubah tulisan menjadi mock font.
Aliases: mock
Usage: *${prefix}alay* text

35. *${prefix}hilih*
Giti iji gi pihim.
Aliases: -
Usage: *${prefix}hilih* text

36. *${prefix}bucin*
Random kata kata bucin.
Aliases: -
Usage: *${prefix}bucin*

37. *${prefix}katabijak*
Kata-kata random.
Aliases: -
Usage: *${prefix}katabijak*

38. *${prefix}bapakfont*
Mengubah tulisan menjadi cirikhas bApack BaPacK.
Aliases: -
Usage: *${prefix}bapakfont* text

39. *${prefix}artinama*
Mencari artinama seseorang.
Aliases: -
Usage: *${prefix}artinama* nama

40. *${prefix}joke*
Random joke.
Aliases: -
Usage: *${prefix}joke*

41. *${prefix}creepyfact*
Mengambil random fakta creepy.
Aliases: -
Usage: *${prefix}creepyfact*

42. *${prefix}jumlahhuruf*
Menghitung huruf.
Aliases: -
Usage: *${prefix}jumlahhuruf* teks

43. *${prefix}balikhuruf*
Bot akan membalik huruf.
Aliases: -
Usage: *${prefix}balikhuruf* teks

44. *${prefix}howgay*
Rate gay member.
Aliases: -
Usage: *${prefix}howgay* nama

45. *${prefix}whipped*
Rate kebucinan seseorang
Aliases: -
Usage: *${prefix}whipped* nama

46. *${prefix}slot*
Game Slot.
Aliases: -
Usage: *${prefix}slot*

47. *${prefix}onecak*
Random onecak meme.
Aliases: -
Usage: *${prefix}onecak*

48. *${prefix}ramaljadian*
Kirim ramalan tanggal jadian.
Aliases: -
Usage: *${prefix}ramaljadian* tanggal | bulan | tahun

49. *${prefix}fakename*
Random nama palsu.
Aliases: -
Usage: *${prefix}fakename*

50. *${prefix}namaninja*
Random nama ninja.
Aliases: -
Usage: *${prefix}namaninja* nama


_Index of [6]_
    `
}

exports.menuImage = () => {
    return `
-----[ IMAGE EFFECT ]-----

1. *${prefix}phcomment*
Membuat capton ala PH comment., nantinya akan membutuhkan image profil whatsapp.
Aliases: -
Usage: *${prefix}phcomment* username | teks


2. *${prefix}triggered*
Membuat efek triggered dari gambar.
Aliases: -
Usage: Kirim gambar dengan caption *${prefix}triggered* atau reply pesan orang dengan *${prefix}triggered* atau bisa gunakan command *${prefix}triggered* langsung.

3. *${prefix}kiss*
Kiss someone ( ͡° ͜ʖ ͡°).
Aliases: -
Usage: Kirim gambar dengan caption *${prefix}kiss* atau reply gambar dengan *${prefix}kiss*.

4. *${prefix}wasted*
Membuat gambar Wasted GTA V.
Aliases: -
Usage: Upload foto dengan caption *${prefix}wasted*

5. *${prefix}gay*
Membuat gambar efek rainbow.
Aliases: -
Usage: Upload foto dengan caption *${prefix}gay*

6. *${prefix}wanted*
Membuat gambar efek wanted.
Aliases: -
Usage: Upload foto dengan caption *${prefix}wanted*

7. *${prefix}wasted*
Membuat gambar This is Beautiful.
Aliases: -
Usage: Upload foto dengan caption *${prefix}beautiful*

8. *${prefix}hitler*
Membuat gambar There was Hitler :3.
Aliases: -
Usage: Upload foto dengan caption *${prefix}hitler*

9. *${prefix}trash*
Membuat gambar Sampah/Trash.
Aliases: -
Usage: Upload foto dengan caption *${prefix}trash*

10. *${prefix}spank*
Spank Someone.
Aliases: -
Usage: Upload foto atau tag gambar dengan caption *${prefix}spank*

11. *${prefix}threats*
Memanipulasi gambar efek threats.
Aliases: -
Usage: Upload foto dengan caption *${prefix}threats*

12. *${prefix}glass*
Memanipulasi gambar efek glass.
Aliases: -
Usage: Upload foto dengan caption *${prefix}glass*

13. *${prefix}greyscale*
Filter gambar efek greyscale.
Aliases: -
Usage: Upload foto dengan caption *${prefix}greyscale*

14. *${prefix}invert*
Filter gambar efek invert.
Aliases: -
Usage: Upload foto dengan caption *${prefix}invert*

15. *${prefix}invertgrey*
Filter gambar efek kombinasi invert dan greyscale.
Aliases: -
Usage: Upload foto dengan caption *${prefix}invertgrey*

16. *${prefix}brightness*
Filter gambar efek brightness.
Aliases: -
Usage: Upload foto dengan caption *${prefix}brightness*

17. *${prefix}threshold*
Filter gambar.
Aliases: -
Usage: Upload foto dengan caption *${prefix}threshold*

18. *${prefix}sepia*
Filter gambar.
Aliases: -
Usage: Upload foto dengan caption *${prefix}sepia*

19. *${prefix}buriq*
Menurunkan kualitas gambar.
Aliases: -
Usage: Upload foto dengan caption *${prefix}buriq*

20. *${prefix}deepfry*
Memanipulasi Gambar deep.
Aliases: -
Usage: Upload foto dengan caption *${prefix}deepfry*

22. *${prefix}magik*
Filter Gambar effect.
Aliases: -
Usage: Upload foto dengan caption *${prefix}magik*

23. *${prefix}chaptcha*
Filter Gambar effect.
Aliases: -
Usage: Upload foto dengan caption *${prefix}chaptcha* text

24. *${prefix}ytcomment*
Membuat capton ala YT command , nantinya akan membutuhkan image profil whatsapp.
Aliases: -
Usage: *${prefix}ytcomment* username | teks


_Index of [7]_
    `
}

exports.menuKerang = () => {
    return `
-----[ KERANG ]-----

1. *${prefix}kapankah*
Mengambil jawaban random dari bot.
Aliases: -
Usage: *${prefix}kapankah* text

2. *${prefix}bisakah*
Mengambil jawaban random dari bot.
Aliases: -
Usage: *${prefix}bisakah* text

3. *${prefix}rate*
Mengambil jawaban random dari bot
Aliases: nilai
Usage: *${prefix}rate* pertanyaan


_Index of [8]_
    `
}

exports.menuModeration = () => {
    return `
-----[ MODERATION GROUP ]-----

1. *${prefix}add*
Menambah user ke dalam group.
Aliases: -
Usage: *${prefix}add* 628xxxxxxxxxx

2. *${prefix}kick*
Mengeluarkan member dari grup.
Aliases: -
Usage: *${prefix}kick* @member1

3. *${prefix}promote*
Promote member menjadi admin.
Aliases: -
Usage: *${prefix}promote* @member1

4. *${prefix}demote*
Demote member dari admin.
Aliases: -
Usage: *${prefix}demote* @member1

5. *${prefix}leave*
Bot akan meninggalkan grup.
Aliases: -
Usage: *${prefix}leave*

6. *${prefix}everyone*
Mention semua member group.
Aliases: -
Usage: *${prefix}everyone*

7. *${prefix}nsfw*
Mematikan/menyalakan mode NSFW.
Aliases: -
Usage: *${prefix}nsfw* enable/disable

8. *${prefix}groupicon*
Mengganti icon grup.
Aliases: -
Usage: Kirim gambar dengan caption *${prefix}groupicon* atau reply gambar dengan caption *${prefix}groupicon*.

9. *${prefix}antilink*
Mematikan/menyalakan fitur anti-group link.
Aliases: -
Usage: *${prefix}antilink* enable/disable

10. *${prefix}welcome*
Mematikan/menyalakan fitur welcome di grup agar menyambut setiap kedatangan member.
Aliases: -
Usage: *${prefix}welcome* enable/disable

11. *${prefix}autosticker*
Mematikan/menyalakan fitur auto-stiker. Setiap foto yang dikirim akan selalu diubah ke stiker.
Aliases: *autostiker autostik*
Usage: *${prefix}autostiker* enable/disable

12. *${prefix}antinsfw*
Mematikan/menyalakan fitur anti-NSFW link.
Aliases: -
Usage: *${prefix}antinsfw* enable/disable

13. *${prefix}group*
Mematikan/menyalakan group.
Aliases: -
Usage: *${prefix}group* enable/disable

14. *${prefix}linkgroup*
Cek link invite group.
Aliases: -
Usage: *${prefix}linkgroup*

15. *${prefix}ownergroup*
Memberikan/tag pembuat grup.
Aliases: -
Usage: *${prefix}ownergrup*

16. *${prefix}mute*
Membisukan bot di grup.
Aliases: -
Usage: *${prefix}mute* on/off

17. *${prefix}revoke*
Setel ulang link invite group.
Aliases: -
Usage: *${prefix}revoke*


_Index of [9]_
    `
}


exports.menuNsfw = () => {
    return `
-----[ NSFW ]-----

1. *${prefix}lewds*
Mengirim pict anime lewd.
Aliases: *lewd*
Usage: *${prefix}lewds*

2. *${prefix}nhentai*
Mengirim info doujinshi dari nHentai.
Aliases: *nh*
Usage: *${prefix}nhentai* kode

3. *${prefix}nekoinfo*
Mengirim info nekopoi via link.
Aliases: -
Usage: *${prefix}nekoinfo* link_nekopoi

4. *${prefix}waifu18*
Mengirim random foto waifu NSFW.
Aliases: -
Usage: *${prefix}waifu18*

5. *${prefix}fetish*
Mengirim fetish pics.
Aliases: -
Usage: *${prefix}fetish* armpits/feets/thighs/ass/boobs/belly/sideboobs/ahegao

6. *${prefix}phdl*
Download video dari Pornhub.
Aliases: -
Usage *${prefix}phdl* link

7. *${prefix}yuri*
Mengirim random foto lewd yuri.
Aliases: -
Usage: *${prefix}yuri*

8. *${prefix}lewdavatar*
Mengirim random avatar lewd.
Aliases: -
Usage: *${prefix}lewdavatar*

9. *${prefix}femdom*
Mengirim random foto ero femdom.
Aliases: -
Usage: *${prefix}femdom*

10. *${prefix}nhsearch*
nHentai search.
Aliases: -
Usage: *${prefix}nhsearch* query

11. *${prefix}cersex*
Random cersex.
Aliases: ceritasex
Usage: *${prefix}cersex*

12. *${prefix}lewdholo*
Mengirim random hololive lewd.
Aliases: -
Usage: *${prefix}lewdholo*

13. *${prefix}ecchi*
Mengirim random pict ecchi(-soft hentai).
Aliases: -
Usage: *${prefix}ecchi*

14. *${prefix}xnxxdl*
Download video xnxx.
Aliases: -
Usage: *${prefix}xnxxdl* link_nya

15. *${prefix}xvideosdl*
Download video xvideos.
Aliases: -
Usage: *${prefix}xvideosdl* link_nya

16. *${prefix}indohot*
Random link video bokep indonesia.
Aliases: -
Usage: *${prefix}indohot*


_Index of [10]_
    `
}

exports.menuOwner = () => {
    return `
-----[ OWNER ]-----
Halo Owner-sama ヽ(・∀・)ﾉ!

1. *${prefix}bc*
Membuat broadcast.
Aliases: -
Usage: *${prefix}bc* <teks> 

2. *${prefix}clearall*
Menghapus semua chat di akun bot.
Aliases: -
Usage: *${prefix}clearall*

3. *${prefix}getses*
Mengambil screenshot sesi dari akun bot.
Aliases: -
Usage: *${prefix}getses*

4. *${prefix}ban*
Menambah/menghapus user yang diban.
Aliases: -
Usage: *${prefix}ban* add/del @user/62812xxxxxxxx

5. *${prefix}leaveall*
Keluar dari semua grup.
Aliases: -
Usage: *${prefix}leaveall*

6. *${prefix}eval*
Evaluate kode JavaScript.
Aliases: *ev*
Usage: *${prefix}eval*

7. *${prefix}shutdown*
Men-shutdown bot.
Aliases: -
Usage: *${prefix}shutdown*

8. *${prefix}premium*
Menambah/menghapus user premium.
*s* - detik
*m* - menit
*h* - jam
*d* - hari
Aliases: -
Usage: *${prefix}premium* add/del @user/62812xxxxxxxx 30d

9. *${prefix}setstatus*
Mengganti status about me.
Aliases: *setstats setstat*
Usage: *${prefix}status* teks

10. *${prefix}serial*
Cek pendaftaran akun via serial.
Aliases: -
Usage: *${prefix}serial* serial_user

11. *${prefix}exif*
Atur WM stiker bot.
Aliases: -
Usage: *${prefix}exif* pack_name | author_name


12. *${prefix}join*
Join grup via link.
Aliases: -
Usage: *${prefix}join* link_group

13. *${prefix}setname*
Mengganti status nama.
Aliases: *setnama*
Usage: *${prefix}setnama* teks

14. *${prefix}give*
Give Level ke member.
Aliases: -
Usage: *${prefix}give* @taguser jumlah_xp

15. *${prefix}oleave*
Perintah owner bot untuk keluar dari grup.
Aliases: -
Usage: *${prefix}oleave*


_Index of [11]_
    `
}

exports.menuLeveling = () => {
    return `
-----[ LEVELING ]-----

1. *${prefix}level*
Untuk melihat level kamu.
Aliases: -
Usage: *${prefix}level*

2. *${prefix}leaderboard*
Untuk melihat leaderboard.
Aliaases: -
Usage: *${prefix}leaderboard*

3. *${prefix}setbackground*
Set background level card.
Aliases: *setbg*
Usage: *${prefix}setbackground* link_foto

_Index of [12]_
    `
}

exports.menuPray = () => {
    return `
-----[ PRAY ]-----

1. *${prefix}listsurah*
Melihat list surah Al-Qur'an.
Aliases: -
Usage: *${prefix}listsurah*

2. *${prefix}surah*
Mengirim surah Al-Qur'an.
Aliases: -
Usage: *${prefix}surah* nomor_surah

3. *${prefix}js*
Mengetahui jadwal shalat di daerah kalian
Aliases: jadwalshalat
Usage: *${prefix}js* namadaerah

4. *${prefix}alkitab*
Al-Kitab search.
Aliases: -
Usage: *${prefix}alkitab* nama_injil

5. *${prefix}hadis*
Hadis search.
Aliases: -
Usage: *${prefix}hadis* nama no_hadis


_Index of [13]_
    `
}

exports.menuMisc = () => {
    return `
-----[ MEDIA AND RANDOM INFO ]-----

1. *${prefix}lirik*
Mencari lirik lagu.
Aliases: -
Usage: *${prefix}lirik* judul_lagu

2. *${prefix}shortlink*
Membuat shortlink.
Aliases: -
Usage: *${prefix}shortlink* link

3. *${prefix}wikipedia*
Mengirim Wikipedia dari teks yang diberikan.
Aliases: *wiki*
Usage: *${prefix}wikipedia* teks

4. *${prefix}igstalk*
Stalk akun Instagram.
Aliases: -
Usage: *${prefix}igstalk* username

5. *${prefix}gsmarena*
Mengirim info spesifikasi HP dari GSMArena.
Aliases: -
Usage: *${prefix}gsmarena* model_hp

6. *${prefix}receipt*
Mengirim resep makanan.
Aliases: *resep*
Usage: *${prefix}receipt* nama_makanan

7. *${prefix}ytsearch*
Mengirim hasil pencarian di YouTube.
Aliases: *yts*
Usage: *${prefix}ytsearch* query

8. *${prefix}tts*
Membuat Text to Speech. Kalian perlu kode bahasa setiap menggunakan, cek di sini https://id.wikipedia.org/wiki/Daftar_bahasa_menurut_ISO_639-2
Aliases: -
Usage: *${prefix}tts* kode_bahasa | teks


9. *${prefix}distance*
Untuk mengetahui jarak dari kotamu ke kota yang kamu tuju
Aliases: -
Usage: *${prefix}distance* kota_asal | kota_tujuan

10. *${prefix}math*
Kalkulator.
* = Perkalian
+ = Pertambahan
- = Pengurangan
/ = Pembagian
Aliases: -
Usage: *${prefix}math* 12*12

11. *${prefix}mutual*
Dapatkan kontak WA random.
Aliases: -
Usage: *${prefix}mutual*

12. *${prefix}whois*
IP look-up.
Aliases: -
Usage: *${prefix}whois* ip_address

13. *${prefix}play*
Play audio dari YouTube.
Aliases: - 
Usage: *${prefix}play* judul_video


14. *${prefix}linesticker*
Sticker Line terbaru.
Aliases: *linestiker*
Usage: *${prefix}linesticker*


15. *${prefix}cekongkir*
Cek ongkos kirim.
Aliases: -
Usage: *${prefix}ongkir* kurir | asal | tujuan

16. *${prefix}movie*
Cari film.
Aliases: -
Usage: *${prefix}movie* judul

17. *${prefix}imagetourl*
Image uploader.
Aliases: *imgtourl*
Usage: Kirim gambar dengan caption *${prefix}imagetourl* atau reply gambar dengan caption *${prefix}imagetourl*.

18. *${prefix}infohoax*
Cek update info hoax.
Aliases: -
Usage: *${prefix}infohoax*

19. *${prefix}trending*
Cek trending di Twitter suatu negara.
Aliases: -
Usage: *${prefix}trending* namanegara

20. *${prefix}jobseek*
Mencari info lowongan kerja.
Aliases: -
Usage: *${prefix}jobseek*

21. *${prefix}fakta*
Memberikan ranfom fakna unik.
Aliases: fact
Usage: *${prefix}fact*

22. *${prefix}quote*
Memberikan quotes random dari tokoh terkenal.
Aliases: quotes
Usage: *${prefix}quotes*

23. *${prefix}jadwalbola*
Memberikan Informasi Jadwal bola terbaru.
Aliases: jbola
Usage: *${prefix}jadwalbola*

23. *${prefix}berita*
Memberikan Info berita terbaru.
Aliases: news
Usage: *${prefix}berita*

24. *${prefix}pantun*
Memberikan pantun random .
Aliases: -
Usage: *${prefix}pantun*

25. *${prefix}catfact*
Memberikan gambar random kucing beserta facta.
Aliases: kucing
Usage: *${prefix}catfact*

26. *${prefix}kpop*
Memberikan gambar random kpoper.
Aliases: kucing
Usage: *${prefix}kpop*

31. *${prefix}cuaca*
Prediksi cuaca bersumber bmkg.
Aliases: weather
Usage: *${prefix}cuaca* namadaerah

32. *${prefix}tiktokhastag*
Mencari tiktok berdasarkan hastag.
Aliases: tiktoksearch
Usage: *${prefix}tiktokhastag* query

35. *${prefix}infoalamat*
Dapatkan info alamat.
Aliases: -
Usage: *${prefix}infoalamat* query

36. *${prefix}gitstalk*
Stalk akun Github.
Aliases: gitprofile
Usage: *${prefix}gitstalk* username

37. *${prefix}happymod*
Memberikan link download apk mod dari happymod.
Aliases: -
Usage: *${prefix}happymod* namaapk

38. *${prefix}moddroid*
Dapatkan aplikasi mod dari moddroid.
Aliases: -
Usage: *${prefix}moddroid* namaapk

39. *${prefix}corona*
Dapatkan info kasus corona suatu daerah.
Aliases: coronavirus
Usage: *${prefix}corona* negara

40. *${prefix}wikien*
Mengirim Wikipedia dari teks yang diberikan.
Aliases: *wikien*
Usage: *${prefix}wikien* teks

41. *${prefix}tiktokstalk*
Stalk akun Tiktok.
Aliases: -
Usage: *${prefix}tiktokstalk* username

42. *${prefix}shortlink2*
Membuat shortlink alternatif.
Aliases: -
Usage: *${prefix}shortlink2* link

43. *${prefix}shortlink3*
Membuat shortlink alternatif.
Aliases: -
Usage: *${prefix}shortlink3* link

44. *${prefix}kurs*
Info kurs update Indonesia.
Aliases: -
Usage: *${prefix}kurs* mata_uang_negara

45. *${prefix}readqr*
Membaca kode qr.
Aliases: -
Usage: Upload gambar qr yang akan dibaca dengan caption *${prefix}readqr*

46. *${prefix}wpsearch*
Mencari wallpaper berdasarkan query
Aliases: *wallpapersearch*
Usage: *${prefix}wpsearch* query

47. *${prefix}googleimg*
Search gambar source google.com.
Aliases: -
Usage: *${prefix}googleimg* query

48. *${prefix}wattpadsearch*
Mencari novel.
Aliases: -
Usage: *${prefix}wattpadsearch* judul

49. *${prefix}wattpadinfo*
Mengambil Informasi wattpad berdasarkan link.
Aliases: -
Usage: *${prefix}wattpadinfo* link

50. *${prefix}twtstalk*
Stalk akun Twitter.
Aliases: -
Usage: *${prefix}twtstalk* username

51. *${prefix}google*
Mencari query from google.
Aliases: -
Usage: *${prefix}google* query

52. *${prefix}freepik*
Mengirim gambar source freepik.
Aliases: -
Usage: *${prefix}freepik* query

53. *${prefix}translate*
Menerjemahkan teks.
Aliases: -
Usage: *${prefix}translate* teks_nya | kode_bahasa

54. *Animal Fact*
Mencari Fakta Hewan.
Tersedia: 
1.*${prefix}dogfact*
2.*${prefix}catfact*
3.*${prefix}pandafact*
4.*${prefix}foxfact*
5.*${prefix}birdfact*
6.*${prefix}koalafact*
7.*${prefix}racoonfact*
8.*${prefix}kangaroofact*

55. *${prefix}kelpersegi*
Menghitung keliling persegi.
Aliases: -
Usage: *${prefix}kelpersegi* angka

56. *${prefix}luaspersegi*
Menghitung Luas persegi.
Aliases: -
Usage: *${prefix}luaspersegi* angka

57. *${prefix}kuadrat*
Menghitung kuadrat.
Aliases: -
Usage: *${prefix}kuadrat* angka

58. *${prefix}kubik*
Menghitung kubik.
Aliases: -
Usage: *${prefix}kubik* angka

59. *${prefix}apkpure*
Mencari apk dari source apkpure.
Aliases: -
Usage: *${prefix}apkpure* teks

60. *${prefix}chord*
Mencari chord lagu.
Aliases: -
Usage: *${prefix}chord* judul_lagu

61. *${prefix}jadwaltv*
Mencari jadwal tv setempat.
Aliases: -
Usage: *${prefix}jadwaltv* nama_siaran

62. *${prefix}qrmaker*
Buat qr.
Aliases: -
Usage: *${prefix}qrmaker* text

63. *${prefix}colourviewer*
Mengirim warna sesuai kode hex 
Aliases: -
Usage: *${prefix}colourviewer* kode_hex

64. *${prefix}rgbtohex*
Mengubah rgb ke format hex.
Aliases: -
Usage: *${prefix}tgbtohex* kode_rgb

65. *${prefix}hextorgb*
Mengubah kode hex ke rgb.
Aliases: -
Usage: *${prefix}hextorgb* kode_hex

66. *${prefix}texttobinary*
Mengubah text ke format binary.
Aliases: -
Usage: *${prefix}texttobinary* teks

67. *${prefix}binarytotext*
Mengubah text format binnary ke text biasa.
Aliases: -
Usage: *${prefix}binarytotext* tes

68. *${prefix}base64totext*
Recode base64 ke teks.
Aliases: -
Usage: *${prefix}base64totext* base64_format

69. *${prefix}texttobase64*
Encode teks ke base64.
Aliases: -
Usage: *${prefix}texttobase64* teks


_Index of [14]_
    `
}

exports.menuBot = () => {
    return `
-----[ BOT ]-----

1. *${prefix}rules*
Wajib baca.
Aliases: *rule*
Usage: *${prefix}rules*

2. *${prefix}menu*
Menampilkan commands yang tersedia.
Aliases: *help*
Usage: *${prefix}menu* angka_index

3. *${prefix}status*
Menampilkan status bot.
Aliases: *stats*
Usage: *${prefix}status*

4. *${prefix}listblock*
Cek nomor yang diblokir.
Aliases: -
Usage: *${prefix}listblock*

5. *${prefix}ping*
Cek speed bot.
Aliases: *p*
Usage: *${prefix}ping*

6. *${prefix}delete*
Hapus pesan dari bot.
Aliases: *del*
Usage: Reply pesan yang dihapus dengan caption *${prefix}delete*.

7. *${prefix}report*
Laporkan bug ke dev.
Aliases: -
Usage: *${prefix}report* pesan

8. *${prefix}tos*
Syarat dan ketentuan. (TOS)
Aliases: -
Usage: *${prefix}tos*

9. *${prefix}owner*
Mengirim kontak owner.
Aliases: -
Usage: *${prefix}owner*

10. *${prefix}getpic*
Mengirim foto profil user.
Aliases: -
Usage: *${prefix}getpic* @user/62812xxxxxxxx

11. *${prefix}premiumcheck*
Cek masa aktif premium.
Aliases: *cekpremium*
Usage: *${prefix}premiumcheck*

12. *${prefix}premiumlist*
Cek list user premium.
Aliases: *listpremium*
Usage: *${prefix}premiumlist*

13. *${prefix}runtime*
Memberikan berapa jam bot aktif.
Aliases: -
Usage: *${prefix}runtime*

14. *${prefix}listgroup*
Memberikan list group bot.
Aliases: -
Usage: *${prefix}listgroup*

_Index of [15]_
    `
}

exports.menuPrice = () => {
    return `
-----[ PRICE LIST ]-----

*HARGA SEWA BOT*
++ *15K PERGRUP SELAMA 1 BULAN*
++ *5K TO UNLOCK PREMIUM COMMAND ONLY*

PEMBAYARAN BISA MELALUI:
*OVO, DANA, GOPEY = 08127668234* (+5K PULSA)
*PAYPAL = rashidsiregar28@gmail.com*

_note_:
*Jika kalian ingin menjadi owner bot,bisa chat owner untuk price nya* :D

_Index of [16]_
    `
}

exports.rules = () => {
    return `
-----[ RULES ]-----

1. Jangan spam bot. 
Sanksi: *WARN/SOFT BLOCK*

2. Jangan telepon bot.
Sanksi: *SOFT BLOCK*

3. Jangan mengeksploitasi bot.
Sanksi: *PERMANENT BLOCK*

Jika sudah dipahami rules-nya, silakan ketik *${prefix}menu* untuk memulai!

    `
}

// Dimohon untuk owner/hoster jangan mengedit ini, terima kasih.
exports.tos = (ownerNumber) => {
    return `
-----[ TERMS OF SERVICE ]-----

Bot ini merupakan open-source bot dengan nama asli BocchiBot yang tersedia di GitHub secara gratis.
Apabila terjadi sebuah error, orang yang pertama yang harus kalian hubungi ialah owner/hoster.

Contact person:
wa.me/${ownerNumber.replace('@c.us', '')} (Owner)


Kalian juga bisa mendukung saya agar bot ini tetap up to date dengan:
08127668234 (OVO/Telkomsel/GoPay)

Terima kasih!

ThX developer
wa.me/6281294958473 (Developer)

Slavyan
    `
}
