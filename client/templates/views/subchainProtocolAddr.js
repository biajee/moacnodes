import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';
import '../../collections';
import './subchainProtocolAddr.html';
import './scsModal.html'

function pagination(addr){
        // console.log(SubChainProtocolSCS.find({SubChainProtocolAddr:'0x0dd387651DaAbd603Bd8d2B53270b5C37CD54623'}).fetch());
        var SCSs = SubChainProtocolSCS.find({'SubChainProtocolAddr':addr}).fetch();
        var pagination = [];
        var num_per_page = 10;
        var pagers = parseInt(SCSs.length/10) + (SCSs.length%10 !=0);
        //console.log(pagers);
        start = 0;
        end = 10;
        for (let i = 0; i < pagers; i ++){
            pagination.push(SCSs.slice(start,end));
            start +=10;
            end +=10;
        }
       // console.log(pagination.length);
        return pagination;
    }

Template.SubChainProtocolAddrPool.onCreated(function (){
    Meteor.subscribe('SubChainProtocolProp');
    Meteor.subscribe('SubChainProtocolSCS');

});

Template.SubChainProtocolAddrPool.helpers({
    props() {
        //console.log(SubChainProtocolProp.find().fetch());
        //console.log(SubChainProtocolProp.find());
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

Template['SCSs'].onCreated(function (){
   Session.set('currPage',0);
});

Template['SCSs'].helpers({
    SCSs(){
    var query = Session.get('query');
    all_pages = pagination(query);
    console.log(all_pages);
    //Session.set('all_pages', pagination);
    Session.set('pageNum',all_pages.length);
    //var allSCS = SubChainProtocolSCS.find({'SubChainProtocolAddr':addr}).fetch();
    //all_pages = Session.get('all_pages');
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
    },

    checkPerform(status){
        return (status == true) && true;
    }
})

Template['SCSs'].events({
    'click li.idx'(event){
        var currPage = event.target.text;
        Session.set('currPage',currPage-1);
    },
    'click li#prev'(){
        var currPage = Session.get('currPage');
        if (currPage !=0)
        Session.set('currPage',currPage-1);
    },
    'click li#next'(){
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