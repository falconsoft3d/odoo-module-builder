let fs = require('fs');
const fse = require('fs-extra');
let txtName = document.querySelector('#name');
let txtFields = document.querySelector('#fields');
let selectVersion = document.querySelector('#selectVersion');
let btnCreate = document.querySelector('#btnCreate');

btnCreate.addEventListener('click', () => {
    if (!(txtName.value == '' || txtFields.value == '' || selectVersion.value == '')) {
        let name = txtName.value;
        let omb_name = 'omb_' + txtName.value;
        let fields = txtFields.value.split(',');
        console.log(txtName.value);
        console.log(txtFields.value);

        try {
            const fse = require('fs-extra')
            
            manifest = `##############################################################################
#
#    OpenERP, Open Source Management Solution
#    This module copyright (C) 2018 odoo-module-builder
#    (<https://falconsoft3d.github.io/odoo-module-builder/>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################




`

        fse.outputFileSync(omb_name+'/__manifest__.py', manifest)
        fse.outputFileSync(omb_name+'/__init__.py', 'from . import models')
        fse.outputFileSync(omb_name+'/models/__init__.py', 'from . import '+omb_name)
        alert('Module created successfully');
        }
        catch (err) { 
            console.error(err) 
        }

        
    }
});


// const marked = require('marked');
// const markdownView = document.querySelector('#markdown');
// const htmlView = document.querySelector('#html');

// const renderToMarkdown = (markdown) => { 
//     htmlView.innerHTML = marked.parse(markdown);
// }

// markdownView.addEventListener('keyup', e => {
//    const curentContent = e.target.value;
//    renderToMarkdown(curentContent);
// });