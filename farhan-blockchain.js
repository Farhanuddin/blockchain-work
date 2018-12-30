const SHA256 = require('crypto-js/sha256');

//Single Blockchain Object CLass :: Blocl
class Block {

  constructor(index, timestamp, data, previousHash=''){
  	this.index = index;
  	this.timestamp = timestamp;
  	this.data = data;
  	this.previousHash = previousHash;
  	this.hash = this.calculateHashForBlock();
  }

  calculateHashForBlock(){
  	//console.log("--SHA256--");
  	//console.log( (this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) ).toString() );
    //console.log('--/SHA256--');
  	return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) ).toString();
  }
}

class BlockChain {

   constructor(){
      this.chain = [this.createGenisisBlockChainBlock()];
   }

   createGenisisBlockChainBlock(){
   	  return new Block(0, '29-12-2018', {name:'Genisis Block', occupation:'being awesome block!'});
   }

   getPreviousBlockOnBlockChain(){
   	//console.log("this chain");
   	//console.log(this.chain[0]);

      return this.chain[this.chain.length-1]; 
   }

   //For making new blocks in blockChain I am required to store hash of previous block in this new Block
   addBlock(newBlock){

   	   newBlock.previousHash = this.getPreviousBlockOnBlockChain().hash;
       newBlock.hash= newBlock.calculateHashForBlock(); 
       //Add new block to the chain
       this.chain.push(newBlock);
   }

  //Validate BlockChain
  validateBlockChain(){
  	 for(let i=1; i< this.chain.length; i++){
           const currentBlock = this.chain[i];
           const previousBlock = this.chain[i-1];

           //For chain integreity, the previous hash of the currentBlock should be same as hash of its previousBlock
             
           //To check integrity the hash would come same, as hash is made from same data, not altered
           if( currentBlock.hash !== currentBlock.calculateHashForBlock() ){
               return {'currentBlock':currentBlock, 'result':false};
           }

           if( currentBlock.previousHash !== previousBlock.hash){
               //return false;
               return {'previousBlock':previousBlock, 'currentBlock':currentBlock, 'result':false};
           }
  	 }

     return true;
  }

}

let farhanBlockChain = new BlockChain();
farhanBlockChain.addBlock( new Block(1, '29-12-2018', {name:'Block 1', occupation:'being awesome block 1!'}) );
farhanBlockChain.addBlock( new Block(2, '29-12-2018', {name:'Block 2', occupation:'being awesome block 2!'}) );

//console.log( JSON.stringify(farhanBlockChain, "", 4) );

console.log("-- validate Block chain--");

console.log(JSON.stringify( farhanBlockChain.validateBlockChain(), null, 2 ) );

console.log("changing data..");
farhanBlockChain.chain[1].data = {name:'Block one', occupation:'being awesome block 1!'};
//farhanBlockChain.chain[1].hash = farhanBlockChain.chain[1].calculateHashForBlock(); 

console.log(JSON.stringify( farhanBlockChain.validateBlockChain(), null, 2 ) );
