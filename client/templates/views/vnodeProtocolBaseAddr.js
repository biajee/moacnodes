import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';
import '../../collections';
import './vnodeProtocolBaseAddr.html';
import './vnodeModal.html';


function pagination(addr){
        // console.log(SubChainProtocolSCS.find({SubChainProtocolAddr:'0x0dd387651DaAbd603Bd8d2B53270b5C37CD54623'}).fetch());
        var Vnodes = VnodeProtocolVnode.find({'VnodeProtocolBaseAddr':addr}).fetch();
        var pagination = [];
        var num_per_page = 10;
        var pagers = parseInt(Vnodes.length/10) + (Vnodes.length%10 !=0);
        //console.log(pagers);
        start = 0;
        end = 10;
        for (let i = 0; i < pagers; i ++){
            pagination.push(Vnodes.slice(start,end));
            start +=10;
            end +=10;
        }
       // console.log(pagination.length);
        return pagination;
    }


Template.VnodeProtocolBaseAddrPool.onCreated(function (){
     Meteor.subscribe('VnodeProtocolProp');
     Meteor.subscribe('VnodeProtocolVnode');
});

Template.VnodeProtocolBaseAddrPool.helpers({
    VnodeProps() {
        return VnodeProtocolProp.find().fetch();
    }
    
});

Template['VnodeProtocolBaseAddrPool'].events({

    'click button'(){
        Session.set('query',this.VnodeProtocolBaseAddr);
        Modal.show('Vnodes');
        //console.log(this.VnodeProtocolBaseAddr);
    }

})

Template['Vnodes'].onCreated(function (){
   Session.set('currPage',0);

});

Template['Vnodes'].helpers({
    Vnodes(){
    var query = Session.get('query');
    all_pages = pagination(query);
        //console.log(r);
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
    }
})

Template['Vnodes'].events({
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

