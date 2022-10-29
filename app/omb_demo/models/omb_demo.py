# -*- coding: utf-8 -*-
from odoo import api, fields, models, _, tools

class omb_demo(models.Model):
    _name = 'omb.demo'
    _description = 'omb_demo'
    _order = 'id desc'

    name = fields.Char(string="Name")
    code = fields.Char(string="code")
    description = fields.Text(string="description")
    amount = fields.Float(string="amount")
    

    @api.model_create_multi
    def create(self, vals_list):
        seq_obj = self.env['ir.sequence']
        for vals in vals_list:
            if vals.get('name', 'New') == 'New':
                vals['name'] = seq_obj.next_by_code('omb.demo') or 'New'
        return super().create(vals_list)