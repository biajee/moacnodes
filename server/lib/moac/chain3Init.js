import Chain3 from 'chain3';

global.Buffer = global.Buffer || require("buffer").Buffer;

// set providor
if(typeof chain3 !== 'undefined')
  chain3 = new Chain3(chain3.currentProvider);
else
  chain3 = new Chain3(new Chain3.providers.HttpProvider("http://gateway.moac.io/testnet"));