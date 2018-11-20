import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';
import '../../collections';
import './subchainProtocolAddr.html';

Template.SubChainProtocolAddrPool.onCreated(function (){
    let template = this;

    Meteor.subscribe('SubChainProtocolProp',{
        onReady: function() {
            TemplateVar.set(template, 'SubChainProtocolProp',  SubChainProtocolProp);
        }
    });

    Meteor.subscribe('SubChainProtocolSCS',{
        onReady: function() {
            TemplateVar.set(template, 'SubChainProtocolSCS',  SubChainProtocolSCS);
        }
    });
});

Template.SubChainProtocolAddrPool.helpers({
    subChainProtocolAddrCollection() {
        return TemplateVar.get('SubChainProtocolProp');
    },
    settings: function () {
        return {
            rowsPerPage: 15,
            showFilter: false,
            sortable: false,
            showNavigation: 'auto',
            fields: [
                // { key: 'id', label: 'id', sortOrder: 0, sortDirection: 'ascending', hidden: true},
                { key: 'SubChainProtocolAddr', label: 'MicroChain Protocol Address', sortOrder: 1, sortDirection: 'descending' ,sortable: false},
                { key: 'subChainProtocol', label: 'Protocol Name', sortable: false },
                { key: 'bondMin', label: 'Min Bond', sortable: false },
                { key: 'scsCount', label: 'SCS Count', sortable: false },
                // { key: 'scsAddress', label: 'SCS Address', sortable: false },
                // { key: 'scsPool..scsAvailableFund', label: 'SCS Available Fund', sortable: false },
                // { key: 'scsPool..scsIsPerforming', label: 'Performing', sortable: false }
                // {key: 'scsPool', label: 'SCS', tmpl: Template.scsPool}
            ],
            useFontAwesome: true
        };
    }
    
});

// Template.scsPool.onCreated(function () {
//     var scsPool = this.data;
//     this.filter = new SubChainProtocolBasePublicProperties.Filter("scsPoolFilter_"+scsPool._id, ["scsPoolId"]);
//     this.filter.set(scsPool._id);
// });

  
// Template.scsPool.helpers({
//     settings: function() {
//         var scsPool = this;
//         return {
//         collection: "scs-pool",
//         filters: ["scsPoolFilter_"+scsPool._id],
//         field: [
//             { key: 'scsAvailableFund', label: 'SCS Available Fund'},
//             { key: 'scsIsPerforming', label: 'Performing'}
//         ]
//         };
//     }
// });