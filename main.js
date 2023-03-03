document.querySelector(".control-buttons span").onclick = function () {

    // Prompt Window To Ask For Name
    let yourName = prompt("Whats Your Name?");
    if (yourName  == null || yourName == ""){

        document.querySelector(".name span").innerHTML = 'Unkown';
    } else {

        document.querySelector(".name span").innerHTML = yourName;
    }

    document.querySelector(".control-buttons").remove();

};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);


// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

//console.log(orderRange);
shuffle(orderRange);
//console.log(orderRange);
// shuffle(orderRange);

// add order css property to Game Blocks

blocks.forEach((block, index) =>{


    block.style.order = orderRange[index] ;

    //add click event
    block.addEventListener('click', function(){
        //trigger the flib block function
        flipBlock(block);
    });

});

//flip block function
function flipBlock(selectedBlock){

    //add class is flibbed
    selectedBlock.classList.add('is-flipped');

    //collect all flibbed cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    //if theres two selected blocks
    if (allFlippedBlocks.length === 2){

        //console.log('two flipped blocks selected');

        //stop clicking function
        stopClicking();

        //check matched block function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }
  

}

//stop clicking function
function stopClicking(){

    //addclass no clicking on main container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() =>{

      //remove class no clicking  after the duratiion
      blocksContainer.classList.remove('no-clicking');
    
    },duration);

}

// check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock){
    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology){

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

    } else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML)+1;

        setTimeout(()=>{
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        },duration );

    }
}

//shuffle function
function shuffle(array){
    //setting vars
    let current = array.length,
    temp,
    random;

    while(current > 0 ) {

       //Get random number 
        random = Math.floor(Math.random() * current);
        //decrease length by one
        current--;
         // [1]save current element in stash
         temp = array[current]; 
        //  [2] current element = random element
        array[current] = array[random];
        //  [3]Random elememt = Get element from stash
        array[random] = temp;

    }
     return array;
  }

  //CURRENT Array [1 ,2,3,4,5,6,7,8,9,0]
  //New Array [1,2,3,4,5,6,7,,8,0]
  /* [1]save current element in stash
  [2] current element = random element
  [3]Random elememt = Get element from stash

  */  
