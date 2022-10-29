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

modelInfo = `# -*- coding: utf-8 -*-
from odoo import api, fields, models, _, tools

class ${omb_name}(models.Model):
    _name = '${omb_p_name}'
    _description = '${omb_name}'
    _order = 'id desc'

    name = fields.Char('Reference', required=True, default='New')
    partner_id = fields.Many2one('res.partner', 'Patient', tracking=True)
    user_id = fields.Many2one('res.users', string='Responsible', tracking=True, default=lambda self: self.env.user)

    @api.model_create_multi
    def create(self, vals_list):
        seq_obj = self.env['ir.sequence']
        for vals in vals_list:
            if vals.get('name', 'New') == 'New':
                vals['name'] = seq_obj.next_by_code('${omb_p_name}') or 'New'
        return super().create(vals_list)`

ViewInfo = `
<?xml version="1.0" encoding="UTF-8"?>
<odoo>
    <record id="view_form_partner_sis_medical_imagen" model="ir.ui.view">
        <field name="name">view.form.sis.medical.imagen</field>
        <field name="model">medical.image</field>
        <field name="arch" type="xml">
            <form string="Medical Image">
                <header>
                </header>
                <sheet>
                    <div class="oe_title">
                        <h1>
                            <field name="code" readonly="1"/>
                        </h1>
                    </div>
                    <group>
                        <group>
                            <field name="partner_id" options='{"no_create": 1, "no_open": 1}' required="1" domain="[('patient_ok', '=', 'True')]"/>
                            <field name="treatment_id" options='{"no_create": 1, "no_open": 1}'/>
                        </group>
                        <group>
                            <field name="name"/>
                            <field name="user_id" readonly="1"/>
                            <field name="create_date" readonly="1"/>
                        </group>
                    </group>
                    <notebook>
                        <page string="Attachments">
                                <field name="list_attachment_ids" nolabel="1">
                                    <tree editable="bottom">
                                        <field name="file_name" invisible="1"/>
                                        <field name="file" filename="file_name"/>
                                        <field name="date" readonly="1"/>
                                        <field name="user_id" readonly="1" sum="T"/>
                                    </tree>
                                </field>
                        </page>
                    </notebook>
                </sheet>
                <div class="oe_chatter">
                    <field name="message_follower_ids" widget="mail_followers" groups="base.group_user"/>
                    <field name="message_ids" widget="mail_thread"/>
                </div>
            </form>
        </field>
    </record>

    <record id="view_tree_sis_medical_imagen" model="ir.ui.view">
        <field name="name">view.tree.sis.medical.imagen</field>
        <field name="model">medical.image</field>
        <field name="arch" type="xml">
            <tree>
                <field name="code"/>
                <field name="name"/>
                <field name="partner_id"/>
                <field name="treatment_id"/>
            </tree>
        </field>
    </record>

    <record id="action_sis_medical_image" model="ir.actions.act_window">
        <field name="name">Medical Images</field>
        <field name="res_model">medical.image</field>
        <field name="view_mode">tree,form</field>
    </record>


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