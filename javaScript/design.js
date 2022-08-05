let paperHeight = 8419;
let paperWidth = 5953;
let paperColor = "#ffff";

let cardHeight = 2466;
let cardWidth = 1587;
let cardBorderSize = 15;
let cardBorderColor = "#000000";
let cardEdgeRound = 50;
let cardBackgroundColor = "#faba66";
let isCardRounded = true;

let fontName = "Vazir";
let textColor = "#000000";
let fontSize = 120;

function show(prev) {
    for (let q = 0; q < 10; q++) {$(".backPageNumber"+q).remove();}
    for (let q = 0; q < 10; q++) {$(".frontPageNumber"+q).remove();}
    for (let q = 0; q < 10; q++) {$(".paper").remove();}
    $(".pages").append('<canvas id="paper"class="paper" style="border:1px solid black;"></canvas>');
    if (prev) {
        var scl = Math.max($(".pages").width() / paperWidth, $(".pages").height() / paperHeight);

        paperHeight = paperHeight*scl;
        paperWidth = paperWidth*scl;

        cardWidth = cardWidth*scl;
        cardHeight = cardHeight*scl;
        cardBorderSize = cardBorderSize*scl;
        cardEdgeRound = cardEdgeRound*scl;
        fontSize = fontSize*scl;
    }



var paperElement = document.getElementById("paper");
var paper = paperElement.getContext("2d");

paper.canvas.height = paperHeight;
paper.canvas.width = paperWidth;
paper.fillStyle = paperColor;
paper.fillRect(0, 0, paper.canvas.width, paper.canvas.height);

function checkHowManyCardInWidth(cardW,paperW) {
    var sizeForCheck = cardW + (paperW/90) ; 
    var numberOfCards = 0;
    while (numberOfCards*sizeForCheck < paperW) {
        numberOfCards++;
    }
    return numberOfCards-1;
}
function checkHowManyCardInHeight(cardH,paperH) {
    var sizeForCheck = cardH + (paperH/90) ; 
    var numberOfCards = 0;
    while (numberOfCards*sizeForCheck < paperH) {
        numberOfCards++;
    }
    return numberOfCards-1;
}
function roundRect(x, y, w, h, radius)
{
  var context = paper;
  var r = x + w;
  var b = y + h;
  context.moveTo(x+radius, y);
  context.lineTo(r-radius, y);
  context.quadraticCurveTo(r, y, r, y+radius);
  context.lineTo(r, y+h-radius);
  context.quadraticCurveTo(r, b, r-radius, b);
  context.lineTo(x+radius, b);
  context.quadraticCurveTo(x, b, x, b-radius);
  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x, y, x+radius, y);
  context.fill();
}
function wrapText(context, text, x, y, maxWidth, lineHeight,fontSize) {

    
    let words = text.split(' ');
    let line = '';
    context.font = fontSize+"px "+fontName;

    let firstY = y;
    let finalY = 0;
    let numOfLines = 1;
    
    for(let nnk = 0; nnk < words.length; nnk++) {
      let testLine = line + words[nnk] + ' ';
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && nnk > 0) {
        numOfLines++;
        y += lineHeight;
      }
      else 
      {line = testLine;}
      
    }
    while ((numOfLines*lineHeight)>(firstY-(finalY+lineHeight))) {
        lineHeight--;
        fontSize--;
    }
    context.font = fontSize+"px "+fontName;

    y = firstY;
    if (numOfLines!=1) {
        y = firstY - (fontSize);
    }
    line = '';
    for(let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        }
        else {
          line = testLine;
        }
      }

    context.fillText(line, x, y);
}
  
function imageScalToFit(img,x,y,w,h,ctx){
    // get the scale
    var scale =Math.max((w/2) / (img.width), (h/2) / (img.height));
    // get the top left position of the image
    // var x = (w / 2) - (img.width / 2) * scale;
    // var y = (h / 2) - (img.height / 2) * scale;
    // ctx.fillRect(x, y, img.width * scale, img.height * scale);


    ctx.drawImage(img, x-((img.width* scale)/2), y-((img.height* scale)/4), img.width * scale, img.height * scale);
}
function fullBackImage(img,x,y,w,h,ctx) {
    var scale =Math.max((w/2) / (img.width), (h/2) / (img.height));
    ctx.drawImage(img, (x+(w/2))-((img.width * scale)/2), (y+(h/2))-((img.height * scale)/2), img.width * scale, img.height * scale);
}
function columnAndRowFinder(number) {
    var objOnEachColumn=4;
    var checkingNumber = number;
    if (number % 2 == 1) {checkingNumber = number + 1;}
    var columnNumber = Math.round(checkingNumber/objOnEachColumn);
    return [columnNumber,objOnEachColumn];
}
function cardCreatorTop(topOrBot) {
    for (let i = 0; i < checkHowManyCardInHeight(cardHeight,paperHeight); i++) {
        for (let k = 0; k < checkHowManyCardInWidth(cardWidth,paperWidth); k++) {
            if (cardNumber >= howManyCardIncluded) {break;}
            cardNumber++;
            
            var x = ((((paperWidth-(cardWidth*checkHowManyCardInWidth(cardWidth,paperWidth)))/checkHowManyCardInWidth(cardWidth,paperWidth))+cardWidth)*k)+((paperWidth-(cardWidth*checkHowManyCardInWidth(cardWidth,paperWidth)))/checkHowManyCardInWidth(cardWidth,paperWidth))/2;
            var y = ((((paperHeight-(cardHeight*checkHowManyCardInHeight(cardHeight,paperHeight)))/checkHowManyCardInHeight(cardHeight,paperHeight))+cardHeight)*i)+((paperHeight-(cardHeight*checkHowManyCardInHeight(cardHeight,paperHeight)))/checkHowManyCardInHeight(cardHeight,paperHeight))/2;
            paper.beginPath();
            
            paper.lineWidth = cardBorderSize;
            paper.strokeStyle = cardBorderColor;
            paper.fillStyle = cardBackgroundColor;
            if (isCardRounded) {roundRect(x, y, cardWidth, cardHeight, cardEdgeRound);}
            else{paper.rect(x, y, cardWidth, cardHeight);paper.fill();}
            
            paper.stroke();
    
            let currentCardData = data[0][cardNumber-1];
            if (topOrBot==1) {
                 currentCardData = data[1][cardNumber-1];
            }
            let colAndRom = columnAndRowFinder(currentCardData.length);
            
            let lastIndex = 0 ;
            for (let col =0 ; col < colAndRom[0]; col++) {
                 
                for (var row =0; row < colAndRom[1]; row++) {
                    let crText = currentCardData[lastIndex+ row];
                    if (typeof crText === "undefined") {break;}
                    
                    let textX = (x + (cardWidth/colAndRom[0])*col + (cardWidth/colAndRom[0])/2)  ;
                    let textY = (y + (cardHeight/colAndRom[1])*row + (cardHeight/colAndRom[1])/2);
    
                    let availableAreaWidth = cardWidth/colAndRom[0];
                    let availableAreaHeight = cardHeight/colAndRom[1];
                    
                    paper.fillStyle = textColor;
                    paper.textAlign = "center";
    
                    if (crText.includes("data:image/")) {
                        var image = new Image();
                        image.src = crText;
                        
                        imageScalToFit(image,textX,textY,availableAreaWidth-(((cardWidth/colAndRom[0])/15)*3),availableAreaHeight,paper);
                    }else{
                        wrapText(paper,crText,textX,textY,availableAreaWidth-(((cardWidth/colAndRom[0])/15)*3),(fontSize+(fontSize/5)),fontSize);
                    }
    
                }
                lastIndex = row;    
            }
      
        }
    }
}
function cardCreatorBot(topOrBot) {
    for (let i = 0; i < checkHowManyCardInHeight(cardHeight,paperHeight); i++) {
        for (let k = checkHowManyCardInWidth(cardWidth,paperWidth)-1; k >= 0; k--) {
            if (cardNumber >= howManyCardIncluded) {break;}
            cardNumber++;
            
            var x = ((((paperWidth-(cardWidth*checkHowManyCardInWidth(cardWidth,paperWidth)))/checkHowManyCardInWidth(cardWidth,paperWidth))+cardWidth)*k)+((paperWidth-(cardWidth*checkHowManyCardInWidth(cardWidth,paperWidth)))/checkHowManyCardInWidth(cardWidth,paperWidth))/2;
            var y = ((((paperHeight-(cardHeight*checkHowManyCardInHeight(cardHeight,paperHeight)))/checkHowManyCardInHeight(cardHeight,paperHeight))+cardHeight)*i)+((paperHeight-(cardHeight*checkHowManyCardInHeight(cardHeight,paperHeight)))/checkHowManyCardInHeight(cardHeight,paperHeight))/2;
            paper.beginPath();
            
            paper.lineWidth = cardBorderSize;
            paper.strokeStyle = cardBorderColor;
            paper.fillStyle = cardBackgroundColor;
            if (isCardRounded) {roundRect(x, y, cardWidth, cardHeight, cardEdgeRound);}
            else{paper.rect(x, y, cardWidth, cardHeight);paper.fill();}
            
            paper.stroke();
    
            let currentCardData = data[0][cardNumber-1];
            if (topOrBot==1) {
                 currentCardData = data[1][cardNumber-1];
            }
            let colAndRom = columnAndRowFinder(currentCardData.length);
            
            let lastIndex = 0 ;
            
            for (let col =colAndRom[0] ; col >0 ; col--) {
                 
                for (var row =0; row < colAndRom[1]; row++) {
                    let crText = currentCardData[lastIndex+ row];
                    if (typeof crText === "undefined") {break;}
                    
                    let textX = (x + (cardWidth/colAndRom[0])*col + (cardWidth/colAndRom[0])/2) -((cardWidth/colAndRom[0]));
                    let textY = (y + (cardHeight/colAndRom[1])*row + (cardHeight/colAndRom[1])/2);
    
                    let availableAreaWidth = cardWidth/colAndRom[0];
                    let availableAreaHeight = cardHeight/colAndRom[1];
                    
                    paper.fillStyle = textColor;
                    paper.textAlign = "center";
    
                    if (crText.includes("data:image/")) {

                        if (finalData.mode =="oneSidedPicture") {
                            console.log("OneSidedPicture");
                            var image = new Image();
                            image.src = crText;
                            fullBackImage(image,x,y,cardWidth,cardHeight,paper);
                        }else{
                            var image = new Image();
                            image.src = crText;
                            imageScalToFit(image,textX,textY,availableAreaWidth-(((cardWidth/colAndRom[0])/15)*3),availableAreaHeight,paper);
                        }
                        
                    }else{
                        wrapText(paper,crText,textX,textY,availableAreaWidth-(((cardWidth/colAndRom[0])/15)*3),(fontSize+(fontSize/5)),fontSize);
                    }
    
                }
                lastIndex = row;    
            }
      
        }
    }
}

//#region data
let data = finalData.dt;
            //#endregion
let howManyCardIncluded = data[0].length;
var cardNumber = 0;
var nameNumber = 1;
while (cardNumber< howManyCardIncluded) {
    cardCreatorTop(0);
    console.log("some lefted!");
    $(".paper").clone().appendTo(".pages");
    $(".paper").first().attr("id","frontPageNumber"+nameNumber.toString()).attr("class","frontPageNumber"+nameNumber.toString());
    nameNumber++;
    paperElement = document.getElementById("paper");
    paper = paperElement.getContext("2d");
    paper.canvas.height = paperHeight;
    paper.canvas.width = paperWidth;
    paper.fillStyle = paperColor;
    paper.fillRect(0, 0, paper.canvas.width, paper.canvas.height);
}
howManyCardIncluded = data[1].length;
cardNumber = 0;
nameNumber = 1;
while (cardNumber< howManyCardIncluded) {
    cardCreatorBot(1);
    if (cardNumber>= howManyCardIncluded) {break;}
    console.log("some lefted!");
    $(".paper").after("<br />").clone().appendTo(".pages");
    $(".paper").first().attr("id","backPageNumber"+nameNumber.toString()).attr("class","backPageNumber"+nameNumber.toString());
    nameNumber++;
    paperElement = document.getElementById("paper");
    paper = paperElement.getContext("2d");
    paper.canvas.height = paperHeight;
    paper.canvas.width = paperWidth;
    paper.fillStyle = paperColor;
    paper.fillRect(0, 0, paper.canvas.width, paper.canvas.height);
}
$(".paper").first().attr("id","backPageNumber"+nameNumber.toString()).attr("class","backPageNumber"+nameNumber.toString());

}

function doit() {
    $(".pages").css("max-height",($(".shower").height())*0.9);
    show(true);
}
