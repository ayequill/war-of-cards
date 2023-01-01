let deckId
let str
function fetchApi() {
    fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(data => {
        return deckId = data.deck_id
    })
}

function drawCard() {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
.then(res => res.json())
.then(deck => {
    console.log(deck.cards);
    /* TODO Render each image in its own div */

    document.getElementById('cards').innerHTML =`<img src='${deck.cards[0].image}'>
                                                 <img src='${deck.cards[1].image}
                                                 '>
                                                 <p>Computer:</p>
                                                 <p>Me:</p>`
    })
}


function renderCards() {

    document.getElementById('cards').innerHTML = str
    
}


document.getElementById('btn').addEventListener('click', fetchApi)

document.getElementById('drawBtn').addEventListener('click', ()=>{

    if(deckId){
        drawCard()
    }else {
        fetchApi ()
        drawCard ()
    }

})

