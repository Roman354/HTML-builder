const fs = require('fs');
const path = require('path');
//+const mkdir = require('fs');
const output = path.join(__dirname, 'files');
const outputTwo = path.join(__dirname, 'files-copy');

fileDelete();
function fileDelete(){
    fs.mkdir(outputTwo, { recursive: true }, err =>{
        if(err) throw err;});
    fs.readdir(outputTwo,(err, delFiles) => {
        if (err) throw err;
        for (let i=0; i<delFiles.length; i++){
          let FileToDelete = `${outputTwo}\\${delFiles[i]}`;

           fs.unlink(FileToDelete, (err) => {});

}});
   };



function callback(err) {
  }


    fs.readdir(output ,(err, files) => {
        if (err) throw err;
        for (let i=0; i<files.length; i++){
            let FileCopyFrom = `${output}\\${files[i]}`;
            let FileCopy = `${outputTwo}\\${files[i]}`;
            fs.open(FileCopy, 'a+', (err) => {
                if(err) throw err; });

            fs.copyFile(FileCopyFrom, FileCopy, callback);
        }
    }

    )
    



