
const { stdout } = process;
const fs = require('fs');
const path = require('path');
const output = path.join(__dirname, 'secret-folder');


fs.readdir(output, {withFileTypes:true} ,(err, files) => {
  if (err) throw err;
 for (let i=0; i<files.length; i++){
    if(files[i].isFile()){

      let stringFile = files[i].name.split('.');  
    
   
      let pathStat = `${output}\\${files[i].name}`;
    fs.stat(pathStat, function(err, stats) {

    stdout.write( stringFile[0] + ' - ' + path.extname(files[i].name) + ' - ' + stats.size / 1024 +  ' kb' + '\n' );
    
      });
  }

  }

});
