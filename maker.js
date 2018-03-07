const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');
const pug  = require('pug');

try {
    
    const doc =
        yaml.safeLoad(
            fs.readFileSync(
                path.join(__dirname, 'cv.yml'), 'utf8'));
    
    const rendered = pug.renderFile('main.pug', doc);
    
    fs.writeFileSync(path.join(__dirname, 'rendered.htm'), rendered, 'utf8');

    // console.log(doc);
    console.log('noooice~');

} catch (e) {

    console.log(e);
}
