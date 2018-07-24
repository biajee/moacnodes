import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './templates/views/vnodeIP.js'
import './templates/views/subchainProtocolAddr.js'
import './templates/views/vnodeProtocolBaseAddr.js'

Router.route('/', function () {
  this.render('home');
});

Meteor.startup(() => {
  // code to run on client at startup
  Vnode = new Meteor.Collection('vnode');
  SubChainProtocol = new Meteor.Collection('subchainprotocol');
  VnodeProtocolBase = new Meteor.Collection('vnodeprotocolbase');
});