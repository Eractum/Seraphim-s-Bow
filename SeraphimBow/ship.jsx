app.preferences.rulerUnits = Units.PIXELS;

//app.load(new File(scriptAdress.replace("SeraphimBow","SeraphimBow/dropshadow.atn")));

const fileref = $.fileName.toString().replace("SeraphimBow/ship.jsx","SeraphimBow/ship.png");
const doc = app.open(new File(fileref));
const scriptAdress = $.fileName.toString().replace("SeraphimBow/ship.jsx","SeraphimBow");

//Window Creation

var isDone;
isDone = false;

var win = new Window("dialog", "Ship 2 objects together!", undefined, {closeButton: true});
win.orientation = "column";
win.allignment = "left";
win.size = [400,300];

//Window: Object 1 Panel

win.obj1Panel = win.add("panel",[0,0,350,100],"Object 1:");
win.obj1Panel.orientation = "column";
win.obj1Panel.add("statictext", [20,20,85,32], "File Adress:");
win.obj1Panel.add("statictext", [20,50,85,62], "Object Name:");
var obj1Adress = win.obj1Panel.add("edittext",[90,20,330,32]);
var obj1Name = win.obj1Panel.add("edittext",[90,50,330,62]);

//Window: Object 2 Panel

win.obj2Panel = win.add("panel",[0,0,350,100],"Object 2:");
win.obj2Panel.orientation = "column";
win.obj2Panel.add("statictext", [20,20,85,32], "File Adress:");
win.obj2Panel.add("statictext", [20,50,85,62], "Object Name:");
var obj2Adress = win.obj2Panel.add("edittext",[90,20,330,32]);
var obj2Name = win.obj2Panel.add("edittext",[90,50,330,62]);

win.buttonGroup = win.add("group");
var closeButton = win.buttonGroup.add("button", undefined,"Close");
var applyButton = win.buttonGroup.add("button", undefined,"Apply");

closeButton.onClick = function() {
	win.close();
	app.activeDocument.close();
}

var object1, object2, object1Name, object2Name;

applyButton.onClick = function() {
	//object adresses reality check
	//set object1Adress and object2Adress
	//example: D:\Trash Content\some dudes\bcat3.png
	if (obj1Adress.text.match(/(.jpg|.png)$/g)!=null && obj2Adress.text.match(/(.jpg|.png) *$/g)!=null) {
		object1 = new File(obj1Adress.text);
		
		object2 = new File(obj2Adress.text);
		if (!object1.exists) {
			alert("File 1 does not exist");
			return;
		}
		if (!object2.exists) {
			alert("File 2 does not exist");
			return;
		}
		if (obj1Name.text == "") {
			alert("Name object 1");
			return;
		}
		if (obj2Name.text == "") {
			alert("Name object 2");
			return;
		}
		object1Name = obj1Name.text;
		object2Name = obj2Name.text;
	    win.close();
	}
	else {
		alert("Files must be a .jpg or .png");
	}
}

win.onClose = function() {
  return isDone = true;
};

win.show();

while (isDone === false) {
  app.refresh();
}

function placeFile(placeFile) {  

    var desc21 = new ActionDescriptor();  

    desc21.putPath( charIDToTypeID('null'), new File(placeFile) );  

    desc21.putEnumerated( charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa') );  

    var desc22 = new ActionDescriptor();  

    desc22.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.000000 );  

    desc22.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.000000 );  

    desc21.putObject( charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc22 );  

    executeAction( charIDToTypeID('Plc '), desc21, DialogModes.NO );  

}

var presetSize = 70;
/*var tempdoc, tempheight, tempwidth;
tempdoc = app.open(object1);
tempheight = tempdoc.height;
tempwidth = tempdoc.width;
tempdoc.resizeImage(presetSize, (tempheight*presetSize)/tempwidth, 72);
tempdoc.saveAs(new File(scriptAdress.replace("SeraphimBow","SeraphimBow/temp.png")),new PNGSaveOptions(),true);
tempdoc.close(SaveOptions.DONOTSAVECHANGES);
object1 = new File(scriptAdress.replace("SeraphimBow","SeraphimBow/temp.png")); */
doc.artLayers.add();
placeFile(object1);
var obj1Layer = doc.activeLayer; 
doc.activeLayer.rasterize(RasterizeType.ENTIRELAYER);
doc.activeLayer.name = "obj1";
var resizePersantage = presetSize/(obj1Layer.bounds[2]-obj1Layer.bounds[0])*100;
obj1Layer.resize (resizePersantage,resizePersantage,AnchorPosition.MIDDLECENTER);
//move obj1 into place -36w 135h
obj1Layer.translate(-36,135);

/*tempdoc = app.open(object2);
tempheight = tempdoc.height;
tempwidth = tempdoc.width;
tempdoc.resizeImage(presetSize, (tempheight*presetSize)/tempwidth, 72);
tempdoc.saveAs(new File(scriptAdress.replace("SeraphimBow","SeraphimBow/temp.png")),new PNGSaveOptions(),true);
tempdoc.close(SaveOptions.DONOTSAVECHANGES);
object2 = new File(scriptAdress.replace("SeraphimBow","SeraphimBow/temp.png"));*/
doc.artLayers.add();
placeFile(object2);
var obj2Layer = doc.activeLayer;
doc.activeLayer.rasterize(RasterizeType.ENTIRELAYER);
doc.activeLayer.name = "obj2";
resizePersantage = presetSize/(obj2Layer.bounds[2]-obj2Layer.bounds[0])*100;
obj2Layer.resize (resizePersantage,resizePersantage,AnchorPosition.MIDDLECENTER);
//move obj2 into place 70w 137h
obj2Layer.translate(70,137);

var color = new RGBColor();
color.red = 255;
color.green = 255;
color.blue = 255;
var color2 = new RGBColor();
color2.red = 0;
color2.green = 0;
color2.blue = 0;
var solidcolor;
solidcolor = new SolidColor();
solidcolor.rgb = color;



var text1layer = doc.artLayers.add();
text1layer.kind = LayerKind.TEXT;
text1layer.textItem.size = 36;
text1layer.textItem.font = "ArialMT";
text1layer.textItem.color = solidcolor;
text1layer.textItem.contents = object1Name;
var dx = 300 - text1layer.bounds[2];
var dy = 495 - text1layer.bounds[1];
text1layer.translate(-1*dx,-1*dy);
app.doAction("shadow","Set 1");

var text2layer = doc.artLayers.add();
text2layer.kind = LayerKind.TEXT;
text2layer.textItem.size = 36;
text2layer.textItem.font = "ArialMT";
text2layer.textItem.color = solidcolor;
text2layer.textItem.contents = object2Name;
var dx = 350 - text2layer.bounds[0];
var dy = 495 - text2layer.bounds[1];
text2layer.translate(-1*dx,-1*dy);
app.doAction("shadow","Set 1");

doc.saveAs(new File(scriptAdress.replace("SeraphimBow","SeraphimBow/result.png")),new PNGSaveOptions(),true);
doc.close(SaveOptions.DONOTSAVECHANGES);

//okay. here's the problem. You can't exactly measure the width\height and location of an artlayer content. What you CAN do is to open those objects as separate docs, scale them down and saveAs THEN paste them. Now you know general size and location of pasted content and can move it however you like
//app.activeDocument.close();

//set 2 object artlayers, fill them with objects (scale them to 60 width), also 2 textlayers (36px,300 margin right for 1 and 350 margin left for 2, white color, blending options: drop shadow, distance 0, 19%, 9px, black)
//saveAs and here ya go