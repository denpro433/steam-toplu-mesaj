const SteamUser = require('steam-user');
var SteamCommunity = require('steamcommunity');
const community = new SteamCommunity();
var client = new SteamUser();
var colors = require('colors');
const readline = require('readline');
const SteamTotp = require('steam-totp');
const fs = require('fs');
var steamuserinfo = require('steam-userinfo');
const config = require('./config.json');
 var isim;
 var inlist=false;
steamuserinfo.setup(config.api);
client.logOn({
    "accountName": config.account.username,
    "password": config.account.password,
	"twoFactorCode": SteamTotp.generateAuthCode(config.account.twofactorcode)
	
});
client.on('loggedOn', async function(details) {
	
	console.log("giriş başarili".green);
		  	
	
});
var blacklist=[];
var mesaj=[];

let rl = readline.createInterface({
    input: fs.createReadStream('blacklist.txt')
});

rl.on('line', function(line) {
	
	blacklist.push(line);
})


var mesajc;
fs.readFile('mesaj.txt', 'utf8', function(err, data) {
  if (err) throw err;
owo=data.split(']');
  mesaj.push(owo[0]);
  //console.log(data)
  //mesajc=data;
});

client.on("webSession", async function(sessionID, cookies,err)  {   

if(err)
{
	throw err;
}

var msg;





var date = new Date();

  // TODO: Log the answer in a database
  console.log(`Tüm kullanıcılara gönderilecek mesaj ${mesaj[0]}`.blue);



			
				console.log("toplam listeniz "+ Object.keys(client.myFriends).length);
				
		   for (let i = 0; i < Object.keys(client.myFriends).length; ) {
		


        	var idlen=Object.keys(client.myFriends)[i];
			
			var steam64id=idlen;
				steamuserinfo.getUserInfo(steam64id,async function(error, data){
			if (err) throw err;
			 isim=data.response.players[0].personaname;
			 var id=data.response.players[0].steamid;
			 
			 var ülkesi=data.response.players[0].loccountrycode;
			 inlist=false;
			 for(var a=0;a<=blacklist.length;a++)
			 {
			if(isim==blacklist[a])
			{
				inlist=true;
			// console.log(isim+' '+ülkesi);
			
			}
			 }
			 if(inlist==false)
			 {
			 
			  if(ülkesi=='TR'||ülkesi==undefined)
			 {
		client.chatMessage(id,mesaj[0]);
			var current_hour = date.getHours()+":"+date.getMinutes();
			 console.log(`Mesaj gönderilen kisi: ${isim} Mesaj: ${mesaj[0]} ${[current_hour]}`.green);
			 console.log("5 saniye sonra yeni mesaj atılacaktır".red)
		
		
			 }
			 else{
				
			 }
			 }
			 

		

		 });
		  await new Promise(r => setTimeout(r, 5000));
		  i++;
  
    }
	console.log("Tüm Mesaj gönderimleri tamamlandı 10 saniye sonra çıkış yapılacaktir".green);
	setTimeout(process.exit, 10000, 1).unref();
	
	
	
			
			
			
})
