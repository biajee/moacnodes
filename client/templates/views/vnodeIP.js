import {Template} from 'meteor/templating';
import { HTTP } from 'meteor/http';
import { Session } from 'meteor/session'

import './vnodeIP.html';

Template.VnodeIPAddrPool.onCreated(function (){
    Session.set('isVnodeIPAddrPoolReady', false);
    HTTP.call('GET', 'http://nodes.moac.io:3000/VnodePool', {}, 
        function(error, response){
            if (!error) {
                Session.set('isVnodeIPAddrPoolReady', true);
                Session.set('VnodeIPAddrPoolResult', response.data);
            }
        });
});

Template.VnodeIPAddrPool.helpers({
    vnodeIPAddrCollection() {
        while(Session.get('isVnodeIPAddrPoolReady')===false){ window.setTimeout(vnodeIPAddrCollection, 100); }
        return Session.get('VnodeIPAddrPoolResult');
    },
    settings: function () {
        return {
            rowsPerPage: 15,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'ip', label: 'Vnode Proxy IP Address' },
                { key: 'serviceCfgPort', label: 'Vnode Proxy Port' },
                { key: 'beneficialAddress', label: 'Beneficial Address' }
            ],
            useFontAwesome: true,
            group: 'client'
        };
    }
});