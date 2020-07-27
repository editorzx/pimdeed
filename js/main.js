
	//var test = document.getElementById("saitarn").getElementsByTagName('img');
	var character = 0;
	var chaselect = document.getElementById("chaselect");
	var chaname = document.getElementById("name");
	var modename = document.getElementById("mode");
	var easyt = document.getElementById("easyt");
	var normalt = document.getElementById("normalt");
	var hardt = document.getElementById("hardt");
	var playeff = document.getElementById("playeff");
	var playaudio = document.getElementById("playaudio");
	var mode = 0;
	
	var temp = document.querySelector('.time');
 	var button = document.querySelector("button");
	var modeselect = document.querySelector(".modeselect");
 	var words = document.querySelector(".words");
 	var timerDiv = document.querySelector(".time");
 	var scoreDiv = document.querySelector(".score");
	var wrapper = document.querySelector(".wrapper");
 	var points = 0;
 	var spans;
 	var typed;
 	var seconds = 1;
	var highscoreeasyZ = localStorage.getItem("highscoreeasy");
	var highscoreeasyName = localStorage.getItem("highscoreeasyName");
	var highscorenormalZ = localStorage.getItem("highscorenormal");
	var highscorenormalName = localStorage.getItem("highscorenormalName");
	var highscorehardZ = localStorage.getItem("highscorehard");
	var highscorehardName = localStorage.getItem("highscorehardName");
	var endgame = 0;
	mainfunc();
	function mainfunc()
	{
		playaudio.innerHTML = "<audio id=\"player\" autoplay loop><source src=\"background.mp3\" type=\"audio/mp3\"></audio>";
		if(document.getElementById("butst").disabled == true)
		{
			document.getElementById("butst").style.background='#000000';
			document.getElementById("butst").innerText= "Not Start";
		}
		else
		{
			document.getElementById("butst").style.background='#4CAF50';
			document.getElementById("butst").innerText= "Start Game";
		}
		if(highscoreeasyName != null || highscoreeasyZ != null)
			easyt.innerText = highscoreeasyName + " " + highscoreeasyZ;
		else
			easyt.innerHTML = "<font size=\"2\">ยังไม่มีคะแนนสูงสุด</font>";
		if(highscorenormalName != null || highscorenormalZ != null)
			normalt.innerText = highscorenormalName + " " + highscorenormalZ;
		else
			normalt.innerHTML = "<font size=\"2\">ยังไม่มีคะแนนสูงสุด</font>";
		if(highscorehardName != null || highscorehardZ != null)
			hardt.innerText = highscorehardName + " " + highscorehardZ;
		else
			hardt.innerHTML = "<font size=\"2\">ยังไม่มีคะแนนสูงสุด</font>";
		wrapper.style.display = "none";
	}
	function resethightscore()
	{
		localStorage.clear();
		alert("คะแนนสูงสุดถูกรีเซ็ต ");
		window.location.reload(true); 
	}
	function saitarn()
	{
		//document.getElementById("saitarnpic").src = "img/max.jpg";
		character = 1;
		chaselect.innerText =  character + " ภาษาไทย";
		chaname.disabled = false;
		document.getElementById("checkname").disabled = false;
	}
	function maxcha()
	{
		character = 2;
		chaselect.innerText =  character + " English ";
		chaname.disabled = false;
		document.getElementById("checkname").disabled = false;
	}
	function easy()
	{
		modename.innerHTML = "<font color=\"green\"> Easy </font>";
		mode = 1;
	}
	function normal()
	{
		modename.innerHTML = "<font color=\"orange\"> Normal </font>";
		mode = 2;
	}
	function hard()
	{
		modename.innerHTML = "<font color=\"red\"> Hard </font>";
		mode = 3;
	}
	function checkname()
	{
		if(chaname.value.length < 4)
			alert("ชื่อตัวละครของคุณสั้นเกินไป ");
		else
		{
			alert("สวัสดี " + chaname.value);
			document.getElementById("butst").disabled = false;
			
		}
		mainfunc();
	}
	
	function startGame() 
	{
		if(mode == 0)
		{
			alert("กรุณาเลือกระดับความยากที่ต้องการเล่น ");
			return;
		}
		document.getElementById("content").innerHTML = "";
		wrapper.style.display = "block";
		var div = document.getElementById("wrapper"); 
		var width = div.clientWidth;
		wrapper.style.width = width;
		
		/*var canvas = document.createElement('canvas');
		var div = document.getElementById("content"); 
		var width = div.offsetWidth;
		canvas.id = "canvasza";
		canvas.width = width;
		canvas.height = 460;
		canvas.style.position = "absolute";
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "#efefef";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.font="15px Kanit";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		ctx.fillText("Welcome : "+ chaname.value, 1200, 70);

		div.appendChild(canvas);
		*/
		
		countdown();
  		random();
		points = 0;
		if(mode == 1)
		{
		 modeselect.innerHTML = "MODE : EASY";
		 seconds = 90;
		}
		else if(mode == 2)
		{
		 modeselect.innerHTML = "MODE : NORMAL";
		 seconds = 60;
		}
		else
		{
		 modeselect.innerHTML = "MODE : HARD";
		 seconds = 30;
		}
		document.addEventListener("keypress", typing, true);
		
		
	}
	
	function countdown() 
	{
 		var timer = setInterval(function()
		{
    		seconds--;
    		temp.innerHTML = seconds;
    		if (seconds === 0) 
			{
    			scoreDiv.innerHTML = points;
    			clearInterval(timer);
    			//seconds = 60;
    			timerDiv.innerHTML = "0";
				endgame = 1;
				playaudio.innerHTML = "";
				playaudio.innerHTML = "<audio id=\"player\" autoplay><source src=\"timeout.mp3\" type=\"audio/mp3\"></audio>";
				if(mode == 1)
				{
					if(highscoreeasyZ !== null)
					{
						if (highscoreeasyZ < points) 
						{
							words.innerHTML = "Got Cha! Hight Score " + points + " <br> Please Space Bar To continue";
							localStorage.setItem("highscoreeasy", points);
							localStorage.setItem("highscoreeasyName", chaname.value);							
						}
					}
					else
					{
						words.innerHTML = "Time out! Your score is " + points + " <br> Please \"Space Bar To continue\"";
						localStorage.setItem("highscoreeasy", points);
						localStorage.setItem("highscoreeasyName", chaname.value);	
					}
				}
				else if(mode == 2)
				{
					if(highscorenormalZ !== null)
					{
						if (highscorenormalZ < points) 
						{
							words.innerHTML = "Got Cha! Hight Score " + points + " <br> Please Space Bar To continue";
							localStorage.setItem("highscorenormal", points);
							localStorage.setItem("highscorenormalName", chaname.value);							
						}
					}
					else
					{
						words.innerHTML = "Time out! Your score is " + points + " <br> Please \"Space Bar To continue\"";
						localStorage.setItem("highscorenormal", points);
						localStorage.setItem("highscorenormalName", chaname.value);	
					}
				}
				else
				{
					if(highscorehardZ !== null)
					{
						if (highscorehardZ < points) 
						{
							words.innerHTML = "Got Cha! Hight Score " + points + " <br> Please Space Bar To continue";
							localStorage.setItem("highscorehard", points);
							localStorage.setItem("highscorehardName", chaname.value);							
						}
					}
					else
					{
						words.innerHTML = "Time out! Your score is " + points + " <br> Please \"Space Bar To continue\"";
						localStorage.setItem("highscorehard", points);
						localStorage.setItem("highscorehardName", chaname.value);	
					}
				}
				
				document.body.onkeyup = function(e)
				{
					if(e.keyCode == 32)
					{
						window.location.reload(true); 
					}
				}
    		}
 		}, 1000);
  	}
	
  	function random() {
  		words.innerHTML = "";
  		var random = Math.floor(Math.random() * (10));
  		var wordArray;
		
		if(mode == 1 || mode == 2)
		{
			if(character == 1)
				wordArray = listth[random].split("");
			else
				wordArray = list[random].split("");
		}
		else
		{
			var checkthen = Math.floor(Math.random() * (2)-1);
			if(checkthen == 0)
			{
				wordArray = listth[random].split("");
				checkthen = 1;
			}
			else
			{
				wordArray = list[random].split("");
				checkthen = 0;
			}
		}
  		for (var i = 0; i < wordArray.length; i++) 
		{
  			var span = document.createElement("span");
  			span.classList.add("span");
  			span.innerHTML = wordArray[i];
  			words.appendChild(span);
  		}
  		spans = document.querySelectorAll(".span");
  	}

	const listth = ['ไก่','สายธาร','อนาคต','คอมพิวเตอร์','ปวดคอ','เจ็บหู','ทำงาน','มีแก้ว','จ่ายเงิน','คิดเงิน','ลำโพง','สายธาร'];
  	const list = ['HELLO','SAWASDEE','THAILAND','COMPUTER','SOLO','BLACKPINK','NOTEBOOK','PETER','TIMEDATE','ASUS','DELL','SOYBAD'];
	
	function typing(e) 
	{
		if(endgame != 1)
		{
  			typed = String.fromCharCode(e.which);
  			for (var i = 0; i < spans.length; i++) 
			{				
  				if (spans[i].innerHTML === typed) 
				{ 
  					if (spans[i].classList.contains("bg")) 
					{
						
  						continue;
  					} 
					else if (spans[i].classList.contains("bg") === false && spans[i-1] === undefined || spans[i-1].classList.contains("bg") !== false ) 
					{ 
						//playeff.innerHTML = "<audio id=\"player\" autoplay><source src=\"complete.mp3\" type=\"audio/mp3\"></audio>"; //พิมแล้วมีเสียง
						spans[i].classList.add("bg");
  						break;
  					}
  				}
  			}
  			var checker = 0;
  			for (var j = 0; j < spans.length; j++) 
			{
  				if (spans[j].className === "span bg") 
				{
  					checker++;
  				}
  				if (checker === spans.length) 
				{
					playeff.innerHTML = "";
					playeff.innerHTML = "<audio id=\"player\" autoplay><source src=\"complete.mp3\" type=\"audio/mp3\"></audio>";
					points++;
					scoreDiv.innerHTML = points;
					document.removeEventListener("keypress", typing, true);
					setTimeout(function()
					{
						words.className = "words";
						random();
						document.addEventListener("keypress", typing, true);
					}, 400);
  				}
  			}
		}
  	}

  	
