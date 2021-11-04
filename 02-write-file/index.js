const process = require('process');
const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 't.txt'));
const exitData = 'exit';

stdout.write('Напишите текст, он будет добавлен в текстовый файл! \n\r')
stdin.on('data', data => {
    const dataStringified = data.toString().split('\r\n');
    if (dataStringified[0] === exitData){
        process.exit();    
    }
    output.write(data);

});
process.on('SIGINT', () => {
    process.exit();    
});
process.on('exit', () => stdout.write('Желаем вам удачного пути с сердечным прощанием.'));

