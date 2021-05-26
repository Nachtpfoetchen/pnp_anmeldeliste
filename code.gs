function doGet() {
  var doc = DocumentApp.openById('');
  var targetDoc = DocumentApp.openById('');
  var calendarId = '';


  var totalElements = doc.getNumChildren();

  for( var k = 0; k < totalElements; ++k ) {
    var body = targetDoc.getBody()
    var element = doc.getChild(k).copy();
    var type = element.getType();
    if( type == DocumentApp.ElementType.PARAGRAPH ){
      body.appendParagraph(element);
    }
   else if( type == DocumentApp.ElementType.TABLE){
    var row = element.getRow(0);
    var cell = row.getCell(0);
    
    if (cell.findText('Spieler')) {
        // Skip this table
        continue;
    }

    body.appendTable(element);
}
     
    else if( type == DocumentApp.ElementType.LIST_ITEM){
      body.appendListItem(element);
      }
    }
  targetDoc.saveAndClose();
  
  
  // Create a two-dimensional array containing the cell contents.
  var table = [
    ['Abenteuername', ''],
    ['System',''],
    ['Setting', ''],
    ['Anmerkungen',''],
    ['Beginn',''],
    ['Anzahl der Spieler*innen',''],
    ['Leiter*in',''],
  ];
  var playertable = [
    ['Spieler*in 1:', 'Spieler*in 2:','Spieler*in 3:','Spieler*in 4:','Spieler*in 5:','Spieler*in 6:'],
    ['', '','','','',''],
   ];
  var orgaarray = [
     ['Gebäude:','Raum:','Verfügbar ab:'],
     ['','',''],
     ];
  //Delete old document
  doc.clear();
  //Change page size
  doc.setPageHeight(4800);

  // Style for blank cells
  var blankcellstyle = {};
  blankcellstyle[DocumentApp.Attribute.FONT_FAMILY] = 'Arial';
  blankcellstyle[DocumentApp.Attribute.FONT_SIZE] = 11;
  blankcellstyle[DocumentApp.Attribute.BOLD] = false;
  
  // Style for headline
  var headingstyle = {};
  headingstyle[DocumentApp.Attribute.FONT_FAMILY] = 'Calibri';
  headingstyle[DocumentApp.Attribute.FONT_SIZE] = 20;
  headingstyle[DocumentApp.Attribute.BOLD] = true;

 // Style for premade text in arrays
  var boldstyle = {};
  boldstyle[DocumentApp.Attribute.FONT_FAMILY] = 'Arial';
  boldstyle[DocumentApp.Attribute.FONT_SIZE] = 11;
  boldstyle[DocumentApp.Attribute.BOLD] = true;
  
    var redboldstyle = {};
  redboldstyle[DocumentApp.Attribute.FONT_FAMILY] = 'Arial';
  redboldstyle[DocumentApp.Attribute.FONT_SIZE] = 11;
  redboldstyle[DocumentApp.Attribute.BOLD] = true;
  redboldstyle[DocumentApp.Attribute.FOREGROUND_COLOR] = '#b7075f';
  
  var title = doc.appendParagraph('Rundenanmeldung AK Pen & Paper').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  
  //Calendar
  var now = new Date();
  var events = Calendar.Events.list(calendarId, {
    timeMin: now.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 1
  });
  if (events.items && events.items.length > 0) {
    for (var i = 0; i < events.items.length; i++) {
      var event = events.items[i];
      if (event.start.date) {
        // All-day event.
        var start = new Date(event.start.date);
        Logger.log('%s (%s)', event.summary, start.toLocaleDateString());
        doc.appendParagraph('Nächstes ' + event.summary +' '+ start.toLocaleDateString()).setAttributes(blankcellstyle);

      } else {
        var start = new Date(event.start.dateTime);
        Logger.log('%s (%s)', event.summary, start.toLocaleString());
        doc.appendParagraph('Nächstes ' + event.summary + ' ' +  start.toLocaleString()).setAttributes(blankcellstyle);

      }
    }
  } else {
    Logger.log('No events found.');
  }
  
  doc.appendParagraph('Keine Rundenpräferenz').setHeading(DocumentApp.ParagraphHeading.HEADING2);
    var noroundpreferencearray = doc.getBody().appendTable(playertable);
    noroundpreferencearray.getRow(0).setAttributes(boldstyle);
  
  
   
  //Gamecounter
  for (var i = 1; i < 8; i++) {
    var printheading = doc.appendParagraph ('Runde '+i+':');
    printheading.setHeading(DocumentApp.ParagraphHeading.HEADING2);

    var printorgaarray = doc.getBody().appendTable(orgaarray);
    printorgaarray.getRow(0).setAttributes(redboldstyle);
    printorgaarray.getRow(1).setAttributes(blankcellstyle);    
    
    var printarray = doc.getBody().appendTable(table);
    var printarrayrow0 = printarray.getRow(0);
    var printarraycell0 = printarrayrow0.getCell(0);
    printarraycell0.setWidth(95.2441);
    for (var j = 0; j < 7; j++) {
      printarray.getRow(j).getCell(1).setAttributes(blankcellstyle);
      printarray.getRow(j).getCell(0).setAttributes(boldstyle);
    }

    var printplayertable = doc.getBody().appendTable(playertable);
    printplayertable.getRow(0).setAttributes(boldstyle);
    
    }
  
}
  
