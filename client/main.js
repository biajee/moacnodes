import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './templates/views/vnodeIP.js'
import './templates/views/subchainProtocolAddr.js'
import './templates/views/vnodeProtocolBaseAddr.js'

Router.route('/', function () {
  this.render('home');
});

Template.home.helpers({
  'getNetworkName': function(){
    var networkName = Meteor.absoluteUrl();
    if(networkName.indexOf("54.202.180.164")>0 || networkName.indexOf("nodes101")>0){
      return "TestNet";
    }
    else if(networkName.indexOf("52.88.19.78")>0 || networkName.indexOf("nodes")>0){
      return "MainNet";
    }
    else{
      return "Dev";
    }
  }
});