const chanIm = "images_videos_trop_lentes"
const chanCh = "cest_ta_vie"
const nombot = "Le Chat Botté"
var nomdon = "🐱Chats de qualité supérieure"
var nomsub = "💕PUTAIN DE CHATONS"
var nommodo = "🐾Chats sous chef"
var nomadmin = "🦄Le Chat en chef"
var tagS = "²"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////PUISSANCE 4/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//const Discord = require("discord.js")
//const client = new Discord.Client()

const fleche = "⬇️       "
const bleu = "🔵"
const rouge = "🔴"
const blanc = "⚪️"
const L = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬"]
var MSG, MSGa, MSGreact
var jeu = [[blanc, blanc, blanc, blanc, blanc, blanc, blanc], [blanc, blanc, blanc, blanc, blanc, blanc, blanc], [blanc, blanc, blanc, blanc, blanc, blanc, blanc], [blanc, blanc, blanc, blanc, blanc, blanc, blanc], [blanc, blanc, blanc, blanc, blanc, blanc, blanc], [blanc, blanc, blanc, blanc, blanc, blanc, blanc]]
var j1 = true
var user1, user2
var areact = false
var IG = false
var remov = false
var joue = false
var msgb = false
var acceptr = false
var accept = false

var client

//client.on('messageReactionAdd', (reaction, user) => {
var messageReactionAdd = function(reaction, user){
    if (user.bot) { return }
    if (remov) {
        if (reaction.message.id == MSG.id) { reaction.remove(user); return }
        if (reaction.message.id == MSGr.id) { } else { return }
        reaction.remove(user)
        if (!joue) { return }
        x = L.indexOf(reaction.emoji.toString())
        y = 5
        while (y >= 0 && jeu[y][x] != blanc) { y -= 1 }
        if (y == -1) {
        } else {
            if (j1 && user == user1) {
                jeu[y][x] = bleu
                j1 = false
                MSG.edit({ embed: { color: 3447003, description: affiche() + "\nTour de " + rouge + " : " + user2 } })
                chackwin()
            } else if (!j1 && user == user2) {
                jeu[y][x] = rouge
                j1 = true
                MSG.edit({ embed: { color: 3447003, description: affiche() + "\nTour de " + bleu + " : " + user1 } })
                chackwin()
            }
        }
    }
    if (accept && MSGa.id == reaction.message.id) {
        if (user == user2) {
            if (reaction.emoji.name == "yea") {
                accept = false
                MSGa.channel.send({ embed: { description: fleche.repeat(7) } })
                areact = true
                IG = true
            }
            if (reaction.emoji.name == "nay") {
                MSGa.delete()
                reset()
            }
        }
    }
}//)

//client.on('message', msg => {
 var message = function(msg){
    let modo = msg.member.roles.has(msg.guild.roles.find("name", nommodo).id);
    let admin = msg.member.roles.has(msg.guild.roles.find("name", nomadmin).id);

    //let modo = msg.member.roles.find("name", nommodo)
    //let admin = msg.member.roles.find("name", nomadmin)

    if (remov && msg.author.bot && !msgb) {
        msgb = true
        MSG = msg
    }

    if (areact && msg.author.bot) {
        MSGr = msg
        areact = false
        var n = 0
        A()
        function A() {
            if (n < 7) {
                msg.react(L[n])
                n++
                setTimeout(A, 1000)
            }
        }
        remov = true
        msg.channel.send({ embed: { color: 3447003, description: affiche() } })
        setTimeout(() => {
            joue = true
            MSG.edit({ embed: { color: 3447003, description: affiche() + "\nTour de " + bleu + " : " + user1 } })

        }, 7000);
    }

    if (acceptr && msg.author.bot) {
        acceptr = false
        MSGa = msg
        var h = client.emojis.find("name", "yea");
        msg.react(h)
        setTimeout(() => {
            var h = client.emojis.find("name", "nay");
            msg.react(h)
        }, 500);

        accept = true
    }

    if (!msg.author.bot) {
        if (msg.content.toLowerCase() == "*stop") {
            if (IG && (msg.author == user1 || msg.author == user2 || admin || modo)) {
                MSG.edit({ embed: { color: 3447003, description: affiche() + "\nPartie annulée" } })
                reset()
            }
            msg.delete()
        }

        if (msg.content.toLowerCase().startsWith("*c4")) {
            if (IG || (msg.channel.name.indexOf("jeux") == -1 && !admin && !modo)) { msg.delete(); return }
            var pls = Array.from(msg.mentions.users.values())
            if (pls.length == 0) { msg.delete(); return }
            user1 = msg.author
            user2 = pls[0]
            msg.channel.send(pls[0] + ", une game contre " + msg.author + "?")
            acceptr = true
        }
    }
}//)

function affiche() {
    tab = ""
    for (var x of jeu) {
        for (var y of x) {
            tab += y + "       "
        }
        tab += "\n\n"
    }
    return (tab)
}

function reset() {
    jeu = [[blanc, blanc, blanc, blanc, blanc, blanc, blanc], [blanc, blanc, blanc, blanc, blanc, blanc, blanc], [blanc, blanc, blanc, blanc, blanc, blanc, blanc], [blanc, blanc, blanc, blanc, blanc, blanc, blanc], [blanc, blanc, blanc, blanc, blanc, blanc, blanc], [blanc, blanc, blanc, blanc, blanc, blanc, blanc]]
    j1 = true
    areact = false
    IG = false
    remov = false
    joue = false
    msgb = false
}

function chackwin() {
    for (const [i, x] of jeu.entries()) {
        for (var [j, y] of x.entries()) {
            if (j < 4 && x[j] == x[j + 1] && x[j + 1] == x[j + 2] && x[j + 2] == x[j + 3]) { win(y) }
            if (i < 3 && jeu[i][j] == jeu[i + 1][j] && jeu[i + 1][j] == jeu[i + 2][j] && jeu[i + 2][j] == jeu[i + 3][j]) { win(y) }
            if (j < 4 && i < 3 && jeu[i][j] == jeu[i + 1][j + 1] && jeu[i + 1][j + 1] == jeu[i + 2][j + 2] && jeu[i + 2][j + 2] == jeu[i + 3][j + 3]) { win(y) }
            if (j < 4 && i > 2 && jeu[i][j] == jeu[i - 1][j + 1] && jeu[i - 1][j + 1] == jeu[i - 2][j + 2] && jeu[i - 2][j + 2] == jeu[i - 3][j + 3]) { win(y) }
        }
    }
}

function win(e) {
    if (e == bleu) {
        MSG.edit({ embed: { color: 3447003, description: affiche() + "\n" + bleu + " " + user1 + " a gagné !" } })
        setTimeout(reset, 500)
    } else if (e == rouge) {
        MSG.edit({ embed: { color: 3447003, description: affiche() + "\n" +rouge + " " + user2 + " a gagné !" } })
        setTimeout(reset, 500)
    }
}

function setClient(cl){
    client = cl
  }
  
exports.message=message
exports.setClient=setClient
exports.messageReactionAdd = messageReactionAdd
