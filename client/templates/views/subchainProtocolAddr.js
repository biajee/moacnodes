import {Template} from 'meteor/templating';
import { HTTP } from 'meteor/http';
import { Session } from 'meteor/session'

import './subchainProtocolAddr.html';

Template.SubChainProtocolAddrPool.onCreated(function (){
        Session.set('isSubChainProtocolAddrPoolReady', false);
        HTTP.call('GET', '/SubChainProtocolPool', {}, 
            function(error, response){
                if (!error) {
                    Session.set('isSubChainProtocolAddrPoolReady', true);
                    Session.set('SubChainProtocolAddrPoolResult', response.data);
                }
            });
});

Template.SubChainProtocolAddrPool.helpers({
    subChainProtocolAddrCollection() {
        while(Session.get('isSubChainProtocolAddrPoolReady')===false){ window.setTimeout(subChainProtocolAddrCollection, 100); }
        return Session.get('SubChainProtocolAddrPoolResult');
    },
    settings: function () {
        return {
            rowsPerPage: 15,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                { key: 'SubChainProtocolAddr', label: 'Sub Chain Protocol Address' },
            ],
            useFontAwesome: true,
            group: 'client'
        };
    }
});