var pageWidth = window.innerWidth || document.body.clientWidth
console.log("Page width is "+pageWidth.toString())
var body = document.getElementById('main')
body.width = pageWidth - 200
console.log("Body width (and table and image widths) set as "+(pageWidth-200).toString())
var infographicsTable = document.getElementById('Infographics')
var visualizationWheel = document.getElementById('VisualizationWheel')
var wheelDimensionTable = document.getElementById('WheelDimensionDescription')
var unicefInfographic = document.getElementById("UNICEFInfographic")
var hpInfographic = document.getElementById("HPInfographic")
infographicsTable.style.width = body.width
visualizationWheel.style.width = body.width
wheelDimensionTable.style.width = body.width
unicefInfographic.style.width = 0.65*body.width
hpInfographic.style.width = 0.35*body.width