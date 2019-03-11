const BDDRoles = require("./bddroles/BDDroles");


function RolesManager(botClient, roleChannel) {
    this.botClient = botClient;
    this.roleChannel = roleChannel;
}

RolesManager.prototype.isConcernedByMessage = function(message) {
    return message.channel.name.indexOf(this.roleChannel) != -1;
};

RolesManager.prototype.onMessage = function(message) {
    this.botClient.users
        .find(u => u.username == BDDRoles.advertisedUser)
        .send(message.author.tag + " : " + message.content);

    let roles = this.extractRoles(message);

    for (let role of roles) {
        this.modifRole(message, role);
    }

    message.delete();

    return true;
};

RolesManager.prototype.extractRoles = function(message) {
    let messageContent = message.content.toLowerCase();

    let roles = [];

    for (let {keywords, roleName} of BDDRoles.roles) {
        if (messageContent.indexOf(roleName) != -1) {
            let role = message.guild.roles.find(r => r.name == roleName);
            roles.push(role);
        }
    }

    return roles;
};

RolesManager.prototype.modifRole = function(message, role) {
    if (!message.member.roles.has(role.id)) {
        message.member.addRole(role.id);
        message.author.send("Tu as maintenant le role : " + role.name);
        client.users
            .find(u => u.username == BDDRoles.advertisedUser)
            .send(message.author.tag + " as maintenant le role : " + role.name);
    } else {
        message.member.removeRole(role.id);
        message.author.send("Tu n'as plus le role : " + role.name);
        client.users
            .find(u => u.username == BDDRoles.advertisedUser)
            .send(message.author.tag + " n'as plus le role : " + role.name);
    }
};

module.exports = RolesManager;