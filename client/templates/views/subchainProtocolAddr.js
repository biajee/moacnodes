import {Template} from 'meteor/templating';
import './subchainProtocolAddr.html';

Template.SubChainProtocolAddrPool.helpers({
    subChainProtocolAddrCollection: function(){
        var test;
        //var test = new Meteor.Collection('subChainProtocolAddrCollection');
        //https://www.moac.io/nodes/SubChainProtocolPool
        var test = HTTP.call('GET', 'http://127.0.0.1:3000/SubChainProtocolPool', {}, 
            function(error, response){
                if (!error) {
                    console.log(response.content);
                    //var test = [{"SubChainProtocolAddr":"0x0000000002"},{"SubChainProtocolAddr":"0x0000000003"},{"SubChainProtocolAddr":"0x0000000004"},{"SubChainProtocolAddr":"0x0000000005"},{"SubChainProtocolAddr":"0x0000000006"},{"SubChainProtocolAddr":"0x0000000007"},{"SubChainProtocolAddr":"0x0000000007"},{"SubChainProtocolAddr":"0x0000000009"},{"SubChainProtocolAddr":"0x00000000010"},{"SubChainProtocolAddr":"0x110000000017"},{"SubChainProtocolAddr":"0xd0a6e6c54dbc68db5db3a091b171a77407ff7ccf"}];
                    return response.content;
                }
            });

            console.log(test);
        // var test = [{"SubChainProtocolAddr":"0x0000000002"},{"SubChainProtocolAddr":"0x0000000003"},{"SubChainProtocolAddr":"0x0000000004"},{"SubChainProtocolAddr":"0x0000000005"},{"SubChainProtocolAddr":"0x0000000006"},{"SubChainProtocolAddr":"0x0000000007"},{"SubChainProtocolAddr":"0x0000000007"},{"SubChainProtocolAddr":"0x0000000009"},{"SubChainProtocolAddr":"0x00000000010"},{"SubChainProtocolAddr":"0x110000000017"},{"SubChainProtocolAddr":"0xd0a6e6c54dbc68db5db3a091b171a77407ff7ccf"}];
        return test;
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