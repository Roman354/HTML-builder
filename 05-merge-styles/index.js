const fs = require('fs');
const path = require('path');

const project__dist = path.join(__dirname, 'project-dist');
const stylesDir = path.join(__dirname, 'styles');

const bundle__css = fs.createWriteStream(path.join(project__dist, 'bundle.css'));


fs.writeFile(project__dist,'bundle.css', '', function(){})

//console.log(project__dist);
//console.log(stylesDir);



fs.readdir(stylesDir, {withFileTypes:true} ,(err, files) => {
    if (err) throw err;

   for (let i=0; i<files.length; i++){
     if(path.extname(files[i].name) == '.css' && files[i].isFile()  ){
      
      
          let pathCss = `${stylesDir}\\${files[i].name}`;
          let input = fs.createReadStream(pathCss, 'utf-8');
          input.on('data', chunk => bundle__css.write(chunk));
          input.on('error', error => console.log('Error', error.message));
 
    }
    }
  });