import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';
import '../../collections';
import './vnodeProtocolBaseAddr.html';

Template.VnodeProtocolBaseAddrPool.onCreated(function (){
    let template = this;

    Meteor.subscribe('VnodeProtocolProp',{
        onReady: function() {
            TemplateVar.set(template, 'VnodeProtocolProp',  VnodeProtocolProp);
        }
    });

    Meteor.subscribe('VnodeProtocolVnode',{
        onReady: function() {
            TemplateVar.set(template, 'VnodeProtocolVnode',  VnodeProtocolVnode);
        }
    });
});

Template.VnodeProtocolBaseAddrPool.helpers({
    vnodeProtocolBaseAddrCollection() {
        return TemplateVar.get('VnodeProtocolProp');
    },
    settings: function () {
        return {
            rowsPerPage: 15,
            showFilter: false,
            sortable: false,
            showNavigation: 'auto',
            fields: [
                { key: 'id', label: 'id', sortOrder: 0, sortDirection: 'ascending', hidden: true},
                { key: 'VnodeProtocolBaseAddr', label: 'Vnode Protocol Base Address', sortOrder: 1, sortDirection: 'descending' ,sortable: false },
                { key: 'bondMin', label: 'Min Bond', sortable: false},
                { key: 'vnodeCount', label: 'Vnode Count', sortable: false},
                // { key: 'vnodeAddresses', label: 'Vnode IP/Port', sortable: false}
            ],
            useFontAwesome: true,
            group: 'client'
        };
    }
});