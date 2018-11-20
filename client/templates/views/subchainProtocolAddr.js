import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';
import '../../collections';
import './subchainProtocolAddr.html';
import './scsModal.html'

Template.SubChainProtocolAddrPool.onCreated(function (){
    Meteor.subscribe('SubChainProtocolProp');
});

Template.SubChainProtocolAddrPool.helpers({
    props() {
        //alert(SubChainProtocolProp.find().fetch());
        return SubChainProtocolProp.find().fetch();
    }
    
});

Template['SubChainProtocolAddrPool'].events({

    'click button'(){
        Session.set('query',this.SubChainProtocolAddr);
        Modal.show('SCSs');
        //console.log(this.SubChainProtocolAddr);
    }

})

Template['SCSs'].helpers({
    SCSs(){
    var query = Session.get('query');
    Meteor.call('showSCS',query,(e,r)=>{
        Session.set('all_pages',r);
        Session.set('pageNum',r.length);
    })
    all_pages = Session.get('all_pages');
    pageNum = Session.get('pageNum');
    var pageIdx =[];
    for(var i = 1; i <=pageNum; i++){
        pageIdx.push(i);
    }
    var currPage = Session.get('currPage');
    return {singlePage: all_pages[currPage], pageIdx: pageIdx};
},
    checkActive(idx){
        var currPage = Session.get('currPage');
        //console.log(idx);
        return (currPage == (idx-1)) && 'active';
    }
})

Template['SCSs'].events({
    'click li.idx'(event){
        var currPage = event.target.text;
        Session.set('currPage',currPage-1);
    },
    'click li#prev'(event){
        var currPage = Session.get('currPage');
        if (currPage !=0)
        Session.set('currPage',currPage-1);
    },
    'click li#next'(event){
        var currPage = Session.get('currPage');
        pageNum = Session.get('pageNum');
        if (currPage < pageNum - 1)
        Session.set('currPage',currPage+1);
    },

})

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