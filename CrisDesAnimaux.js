exports.action = function(data, callback){

	let client = setClient(data);
	info("CrisDesAnimaux from:", data.client, "To:", client);
	crisAnimal (data, client);
	callback();
 
}


function crisAnimal (data, client) {

const fs = require('fs');

let animalName = data.action.rawSentence.toLowerCase().replace("le cri d'animal", "").replace("le cri de l'animal", "").replace("l'", "").replace("d'", "").replace("le", "").replace("animal", "").replace("de", "").replace("la", "").replace("du", "").replace("2", "").trim();

if (!animalName) {
    Avatar.speak(`Je n'ai pas compris le cri de l'animal que tu veux.`, data.client, () => {
        Avatar.Speech.end(data.client);
    });
    return;
}

if (animalName) {
	const animalFilePath = `${__dirname}/animaux/${animalName.replace("é", "e").replace("è", "e")}.mp3`;
    Avatar.speak(`Je mets le cri ${animalName}`, data.client, () => {
        Avatar.Speech.end(data.client, true, () => {
            Avatar.play(animalFilePath, data.client);
        });
    });
} else {
    Avatar.speak(`Le cri de l'animal ${animalName} n'est pas disponible.`, data.client, () => {
        Avatar.Speech.end(data.client);
    });
}
	
}

function setClient(data) {
    let client = data.client;
    if (data.action.room)
        client = (data.action.room !== 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
    if (data.action.setRoom)
        client = data.action.setRoom;
    return client;
}