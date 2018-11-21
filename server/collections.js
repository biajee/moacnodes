SubChainProtocol = new Meteor.Collection('subchainprotocol');
VnodeProtocolBase = new Meteor.Collection('vnodeprotocolbase');

SubChainProtocolProp = new Meteor.Collection('SubChainProtocolProp');
SubChainProtocolSCS = new Meteor.Collection('SubChainProtocolSCS');

VnodeProtocolProp = new Meteor.Collection('VnodeProtocolProp');
VnodeProtocolVnode = new Meteor.Collection('VnodeProtocolVnode');

// Meteor.methods({

// 	showSCS(addr){
// 		// console.log(SubChainProtocolSCS.find({SubChainProtocolAddr:'0x0dd387651DaAbd603Bd8d2B53270b5C37CD54623'}).fetch());
// 		var SCSs = SubChainProtocolSCS.find({'SubChainProtocolAddr':addr}).fetch();
// 		var pagination = [];
// 		var num_per_page = 10;
// 		var pagers = parseInt(SCSs.length/10) + (SCSs.length%10	!=0);
// 		//console.log(pagers);
// 		start = 0;
// 		end = 10;
//         for (let i = 0; i < pagers; i ++){
//         	pagination.push(SCSs.slice(start,end));
//         	start +=10;
//         	end +=10;
//         }
//        // console.log(pagination.length);
// 		return pagination;
// 	}

//  })