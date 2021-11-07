const fs = require('fs');
const path = require('path');
const project__dist = path.join(__dirname, 'project-dist'); // path to folder project-dist
const project__assets = path.join(project__dist, 'assets');


fs.mkdir(project__dist, { recursive: true }, err =>{if(err) throw err;}); //create folder 

const bundle__html = path.join(project__dist, 'index.html'); // path to  html 
const bundle__css = path.join(project__dist, 'style.css'); // path to  css
const assets_path__css = path.join(__dirname, 'styles');
const assets_path__html = path.join(__dirname, 'components');
const template = path.join(__dirname, 'template.html');

const bundle__html__create = fs.createWriteStream(bundle__html); //create html
const bundle__css__create = fs.createWriteStream(bundle__css); //create css

fs.mkdir(project__assets, { recursive: true }, err =>{if(err) throw err;}); //create folder 
const assets_path = path.join(__dirname, 'assets');

/*папки для копирования из */ 
const assets_path__fonts = path.join(assets_path, 'fonts');
const assets_path__img = path.join(assets_path, 'img');
const assets_path__svg = path.join(assets_path, 'svg');
/* папки для копирования в  */ 
const project__assets_path__fonts = path.join(project__assets, 'fonts');
const project__assets_path__img = path.join(project__assets, 'img');
const project__assets_path__svg = path.join(project__assets, 'svg');
/* создаем сами папки В */ 
fs.mkdir(project__assets_path__fonts, { recursive: true }, err =>{if(err) throw err;});
fs.mkdir(project__assets_path__img, { recursive: true }, err =>{if(err) throw err;});
fs.mkdir(project__assets_path__svg, { recursive: true }, err =>{if(err) throw err;});
//копируем temlate в наш html
/*
let input = fs.createReadStream(template, 'utf-8');
input.on('data', chunk => bundle__html__create.write(chunk));
input.on('error', error => console.log('Error', error.message));*/
fs.writeFile(bundle__html, '', (err)=>{} ) ;



/* очищаем папки ассетс проекта (на всякий) */
function fileDelete(pathToDelete){
    fs.readdir(pathToDelete,(err, delFiles) => {
        if (err) throw err;
        for (let i=0; i<delFiles.length; i++){

          let FileToDelete = `${pathToDelete}\\${delFiles[i]}`;

           fs.unlink(FileToDelete, (err) => {});

}});
   };
   fileDelete(project__assets_path__fonts);
   fileDelete(project__assets_path__img);
   fileDelete(project__assets_path__svg);


/* создаем функцию для копирования файлов ассетс */ 
function copyFileTo( copyFrom , copy){
function callback(err) {}
fs.readdir(copyFrom ,(err, files) => {
      if (err) throw err;

      for (let i=0; i<files.length; i++){
          let FileCopyFrom = `${copyFrom}\\${files[i]}`;
          let FileCopy = `${copy}\\${files[i]}`;
  

         fs.open(FileCopy, 'a+', (err) => {
             /* if(err) throw err; */});

          fs.copyFile(FileCopyFrom, FileCopy, callback);
      }
  }

)
}

/* копируем файлы из ассетсов в проект*/ 

copyFileTo( assets_path__fonts , project__assets_path__fonts);
copyFileTo( assets_path__img , project__assets_path__img);
copyFileTo( assets_path__svg , project__assets_path__svg);




function copyContent(pathToFileFrom, pathToFileFor){
fs.readdir(pathToFileFrom, {withFileTypes:true} ,(err, files) => {
    if (err) throw err;

   for (let i=0; i<files.length; i++){
     if(path.extname(files[i].name) == '.css' && files[i].isFile()  ){

        let pathCss = `${pathToFileFrom}\\${files[i].name}`;
        let input = fs.createReadStream(pathCss, 'utf-8');
        input.on('data', chunk => pathToFileFor.write(chunk));
        input.on('error', error => console.log('Error', error.message));
     // console.log(pathCss);
    }
    }
  });
}

/* переносим стили из  assets_path__css в bundle__css__create*/ 
copyContent(assets_path__css, bundle__css__create);


  
// вот 
const header__html = path.join(assets_path__html, 'header.html');
const footer__html = path.join(assets_path__html, 'footer.html');
const articles__html = path.join(assets_path__html, 'articles.html');
const about__html = path.join(assets_path__html, 'about.html');


function processFile(content, flag) {

  if (flag == 'articles'){
  fs.readFile( template, "utf8", function(error, data){ 
  var newArticles = data.replace("{{articles}}",  content);
  fs.writeFile(bundle__html, newArticles, (err)=>{} ) ;
  processFile(newArticles, 'head');
  }
  
)};
if (flag == 'head'){
fs.readFile( header__html, "utf8", function(error, contents){
var headerNew = content.replace("{{header}}",  contents);
fs.writeFile(bundle__html, headerNew, (err)=>{} ) ;
processFile(headerNew, 'footer');
});
};
if (flag =='footer'){
fs.readFile( footer__html, "utf8", function(error, contents){
var footerNew = content.replace("{{footer}}",  contents);
fs.writeFile(bundle__html, footerNew, (err)=>{} ) ;
processFile(footerNew , 'about');
  });
};
if (flag =='about'){
fs.readFile( about__html, "utf8", function(error, contents){
var aboutNew = content.replace("{{about}}",  contents);
fs.writeFile(bundle__html, aboutNew, (err)=>{} ) ;
});
};
}

fs.readFile( articles__html, "utf8", function(error, contents){

  processFile(contents, 'articles');  
 });