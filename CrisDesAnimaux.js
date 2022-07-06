
exports.timeoutCallbackEnd = function(clientFrom, clientTo) {
	return Config.modules['CrisDesAnimaux'].timeout_start * 1000;
}

exports.action = function(data, callback){

	var tblCommand = {
	animal : function() {animal (data, client);
},
    stopanimal : function() {stopanimal (data, client);
}
};

	let client = setClient(data);
	info("CrisDesAnimaux:", data.action.command, "From:", data.client, "To:", client);
	tblCommand[data.action.command]();

function animal (data, client) {
	Avatar.askme("Quel cris animal souhaite tu écouter ?", data.client,
	{
	"*": "generic",
	"terminer": "done"
}, 0, function (answer, end) {
	
	if (!answer) {
	end(client);
	return Avatar.speak("Recommence je n'ai rien entendue", data.client, function(){
	animal (data, client);
	});
}
	
	if (answer.indexOf('generic') != -1) {
	end(client);
	let found;
	answer = answer.split(':')[1].toLowerCase();
	for (let cris in Config.modules['CrisDesAnimaux'].animaux) {
	if (answer.toLowerCase().indexOf(cris) != -1) {
	found = cris;
	break;
}
}
	
	if (found) {
	Avatar.speak("voici le cris d\'e :" + found, data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.play('%URL%'+Config.modules['CrisDesAnimaux'].animaux[found], client);
	});
	});
} else {
	return Avatar.speak("Recommence je n'ai pas compris", data.client, function(){
	animal (data, client);
	});
}
    return;
}
	// Grammaire fixe
    switch(answer) {
	case "done":
	default:
	Avatar.speak("Terminé, je quitte les cris d'animaux", data.client, function(){
	end(data.client, true);
	});
}
    })
}


/*function askanimal (data, client) {
	Avatar.askme("un autre cris animal souhaite tu encore écouter ?", data.client,
{
	"*": "generic",
	"oui": "yes",
	"oui s'il te plait": "yes",
	"non": "done",
	"non , merci": "done",
	"terminer": "done"
}, 0, function (answer, end) {
	if (!answer) {
	end(client);
	return Avatar.speak("Recommence je n'ai pas compris", data.client, function(){
	animal (data, client);
	});
}
	switch(answer) {
	case "yes":	
	end(client);
	animal(data, client);
	case "done":
	default:
	Avatar.speak("Terminé, je quitte les cris d'animaux", data.client, function(){
	end(data.client, true);
	});
}
    });
}
*/

function stopanimal (data, client) {
    Avatar.speak("J'arète le cris des animaux", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	});
	});
	Avatar.stop(null, client, function() {
    });
}

    callback();
}

function setClient (data) {
	var client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
	if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}