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

{
    'name': 'SIS 20 MFH',
    'version': '16.0.1.0.0',
    'author': 'Ynext SpA',
    'maintainer': 'Ynext SpA',
    'website': 'http://www.ynext.cl',
    'license': 'AGPL-3',
    'category': 'Extra Tools',
    'summary': 'SIS 20. Medical System.',
    'depends': ['base','mail','stock','calendar','crm'],
    'data': [
        'security/ir.model.access.csv',
        'security/sis_base_security.xml',
        'data/ir_sequence.xml',
        'views/res_partner_view.xml',
    ],
    'images': ['static/description/banner.jpg'],
}`
        ir_sequence = `<?xml version="1.0" encoding="utf-8"?>
    <odoo noupdate="1">
    <record id="seq_partner_out" model="ir.sequence">
        <field name="name">Partner Out</field>
        <field name="code">partner.out</field>
        <field name="prefix">POU/%(range_year)s/</field>
        <field name="padding">7</field>
        <field name="company_id" eval="False"/>
    </record>
</odoo>`

        security = `id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_medical_consultation,medical.consultation,model_medical_consultation,,1,1,1,1`

        fse.outputFileSync(omb_name+'/__manifest__.py', manifest)
        fse.outputFileSync(omb_name+'/__init__.py', 'from . import models')
        fse.outputFileSync(omb_name+'/models/__init__.py', 'from . import '+omb_name)
        fse.outputFileSync(omb_name+'/security/ir.model.access.csv', security)
        fse.outputFileSync(omb_name+'/data/ir_sequence.xml', ir_sequence)
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