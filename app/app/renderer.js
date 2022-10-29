let fs = require('fs');
const fse = require('fs-extra');
let txtName = document.querySelector('#name');
let txtFields = document.querySelector('#fields');
let selectVersion = document.querySelector('#selectVersion');
let btnCreate = document.querySelector('#btnCreate');

fversion = ''

btnCreate.addEventListener('click', () => {
    if (!(txtName.value == '' || txtFields.value == '' || selectVersion.value == '')) {
        console.log(selectVersion.value)
        if ( selectVersion.value == '15.0'  ) {
            fversion = '15.0.1.0.0'
        } else {
            fversion = '16.0.1.0.0'
        }

        let name = txtName.value;
        let omb_name = 'omb_' + txtName.value;
        let omb_p_name = 'omb.' + txtName.value;
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
    'name': '${name} OMB',
    'version': '${fversion}',
    'author': 'OMB',
    'maintainer': 'OMB',
    'website': 'https://falconsoft3d.github.io/odoo-module-builder/',
    'license': 'AGPL-3',
    'category': 'Extra Tools',
    'summary': 'Other module of the OMB',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'data/ir_sequence.xml',
        'views/${omb_name}_views.xml',
    ],
}`


ir_sequence = `<?xml version="1.0" encoding="utf-8"?>
    <odoo noupdate="1">
    <record id="seq_${omb_name}" model="ir.sequence">
        <field name="name">${omb_name}</field>
        <field name="code">${omb_p_name}</field>
        <field name="prefix">OBM/%(range_year)s/</field>
        <field name="padding">7</field>
        <field name="company_id" eval="False"/>
    </record>
</odoo>`

security = `id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_${omb_name},${omb_p_name},model_${omb_name},,1,1,1,1`

fields_model = ''
fields_view = ''

fields.forEach(function(field) {
    if (field != 'name' &&  field != '') {

        type_field = 'Char'

        if (field == 'age') { 
            type_field = 'Integer'
        }
        else if (field == 'description') { 
            type_field = 'Text'
        }
        else if (field == 'amount') { 
            type_field = 'Float'
        }

        console.log(field);
        console.log(type_field);

        fields_model += `${field} = fields.${type_field}(string="${field}")\n    `
        fields_view += `   `
        fields_view += `<field name="${field}"/>\n                            `
    }
});

modelInfo = `# -*- coding: utf-8 -*-
from odoo import api, fields, models, _, tools

class ${omb_name}(models.Model):
    _name = '${omb_p_name}'
    _description = '${omb_name}'
    _order = 'id desc'

    name = fields.Char(string="Name")
    ${fields_model}

    @api.model_create_multi
    def create(self, vals_list):
        seq_obj = self.env['ir.sequence']
        for vals in vals_list:
            if vals.get('name', 'New') == 'New':
                vals['name'] = seq_obj.next_by_code('${omb_p_name}') or 'New'
        return super().create(vals_list)`

ViewInfo = `<?xml version="1.0" encoding="UTF-8"?>
<odoo>
    <record id="view_form_${omb_name}" model="ir.ui.view">
        <field name="name">${omb_p_name}</field>
        <field name="model">${omb_p_name}</field>
        <field name="arch" type="xml">
            <form string="Medical Image">
                <header>
                </header>
                <sheet>
                    <div class="oe_title">
                        <h1>
                            <field name="name" readonly="1"/>
                        </h1>
                    </div>
                    <group>
                        <group>
                            ${fields_view}
                        </group>
                    </group>
                </sheet>
            </form>
        </field>
    </record>

    <record id="view_tree_${omb_name}" model="ir.ui.view">
        <field name="name">view.tree.${omb_p_name}</field>
        <field name="model">${omb_p_name}</field>
        <field name="arch" type="xml">
                    <tree>
                            <field name="name"/>
                            ${fields_view}
                    </tree>
        </field>
    </record>

    <record id="action_${omb_name}" model="ir.actions.act_window">
        <field name="name">${omb_name}</field>
        <field name="res_model">${omb_p_name}</field>
        <field name="view_mode">tree,form</field>
    </record>

    <menuitem id="root_menu_${omb_name}"
            name="${name}"
            web_icon="board,static/description/icon.png"
            sequence="10"
        />

    <menuitem id="root_menu_${omb_name}_son"
        name="${name}"
        parent="root_menu_${omb_name}"
        action="action_${omb_name}"
        sequence="10"
    />


</odoo>
`;
        fse.outputFileSync(omb_name+'/__manifest__.py', manifest)
        fse.outputFileSync(omb_name+'/__init__.py', 'from . import models')
        fse.outputFileSync(omb_name+'/models/__init__.py', 'from . import '+omb_name)
        fse.outputFileSync(omb_name+'/models/'+omb_name+'.py', modelInfo)
        fse.outputFileSync(omb_name+'/views/'+omb_name+'_views.xml', ViewInfo)
        fse.outputFileSync(omb_name+'/security/ir.model.access.csv', security)
        fse.outputFileSync(omb_name+'/data/ir_sequence.xml', ir_sequence)
        alert('Module created successfully');
        }
        catch (err) { 
            console.error(err) 
        }

        
    }
});