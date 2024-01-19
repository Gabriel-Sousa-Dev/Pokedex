var pkm_area = document.querySelector('div.pkm-area')

//https: //pokeapi.co/api/v2/pokemon/{id or name}/

const colors = {
  bug:'#9cc31f',
  normal:'#adab8d',
  grass: '#3BCB01',
  water: '#717FFF',
  fire: '#FF7111',
  electric: '#FFD525',
  poison: '#AD00CA',
  fairy: '#F9A5D1',
  ground: '#E5BC61',
  psychic: '#FE448F',
  fighting: '#C80000',
  rock: '#C49100',
  dragon: '#6014EE',
  ghost: '#663993',
  ice: '#88DBEC',
  dark:'#494949',
  flying: '#A890FE',
  steel: '#A6A8C6'
}




async function getPkm(id){
  let resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  let data = await resp.json()
  return data
}

async function createCardPkm(id){
  let pkmData = await getPkm(id)
  
  let pkmCard = document.createElement('div')
  
  // corrigir as duas próximas linhas
  
  //let tipo = await pkmData.types[1] ? pkmData.types[1].type.name : pkmData.types[0].type.name
  
  //let typePkm = await String(tipo)
  
  
  pkmCard.classList.add('pkm-card')
  
  pkmCard.style.backgroundColor = eval(`colors.${pkmData.types[0].type.name}`)
  
  if(Number(pkmData.types.length) === 2){
    
    pkmCard.innerHTML = `
        <a href='poke.html?id=${pkmData.name}'>
        <div class="pkm-card-left">
        <p class="pkm-name">${pkmData.name}</p>
          <div class="pkm-types">
            <p>${pkmData.types[0].type.name}</p>
            <p>${pkmData.types[1].type.name}</p>
          </div>
      </div>
      <div class="pkm-card-right">
        <img src="${pkmData.sprites.front_default}" alt="${pkmData.name}">
        <p class='id'>#${pkmData.id}</p>
      </div>
      </a>
  `
  
  }else{
    
  pkmCard.innerHTML = `
        <a href='poke.html?id=${pkmData.name}'>
        <div class="pkm-card-left">
        <p class="pkm-name">${pkmData.name}</p>
          <div class="pkm-types">
            <p>${pkmData.types[0].type.name}</p>
          </div>
      </div>
      <div class="pkm-card-right">
        <img src="${pkmData.sprites.front_default}" alt="${pkmData.name}">
        <p class='id'>#${pkmData.id}</p>
      </div>
      </a>
  `
  
  }
  pkm_area.appendChild(pkmCard)
}

async function loadPkm() {
  let resp = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
  let data = await resp.json()
  
  for(let pos in data.results){
    await createCardPkm(data.results[pos].name)
  }
}

async function loadSinglePkm() {
  let urlParam = new URLSearchParams(window.location.search)
  let idParam = urlParam.get("id")
  
  let pkmData = await getPkm(String(idParam))
  
  document.title = pkmData.name
  
  let pkmInfo = document.querySelector("div.pkmInfo")
  let pkmT = document.querySelector("h1.pkmT")
  let pkmImg = document.querySelector("img.pkmImg")
  
  let pkmTable = document.createElement("table")
  
  let pkmTableData = `
    <tr>
      <th>${pkmData.stats[0].stat.name}</th>
      <th>${pkmData.stats[1].stat.name}</th>
      <th>${pkmData.stats[2].stat.name}</th>
      <th>${pkmData.stats[3].stat.name}</th>
      <th>${pkmData.stats[4].stat.name}</th>
      <th>${pkmData.stats[5].stat.name}</th>
    </tr>
    <tr>
      <td>${pkmData.stats[0].base_stat}</td>
      <td>${pkmData.stats[1].base_stat}</td>
      <td>${pkmData.stats[2].base_stat}</td>
      <td>${pkmData.stats[3].base_stat}</td>
      <td>${pkmData.stats[4].base_stat}</td>
      <td>${pkmData.stats[5].base_stat}</td>
    </tr>
    `
    
  pkmTable.innerHTML = pkmTableData
  pkmInfo.appendChild(pkmTable)
  
  pkmT.innerHTML = pkmData.name
  pkmImg.setAttribute("src", pkmData.sprites.other.home.front_default)
  pkmImg.setAttribute("alt", pkmData.name)
  
  
}

