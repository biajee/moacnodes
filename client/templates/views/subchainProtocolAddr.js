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
                console.log(response.data);
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
            sortable: false,
            showNavigation: 'auto',
            fields: [
                { key: 'SubChainProtocolAddr', label: 'MicroChain Protocol Address', sortable: false },
                { key: 'subChainProtocol', label: 'Protocol Name', sortable: false },
                { key: 'bondMin', label: 'Min Bond', sortable: false },
                { key: 'scsCount', label: 'SCS Count', sortable: false },
                { key: 'scsAddress', label: 'SCS Address', sortable: false },
                { key: 'scsAvailableFund', label: 'SCS Available Fund', sortable: false }
            ],
            useFontAwesome: true,
            group: 'client'
        };
    }
    
});

