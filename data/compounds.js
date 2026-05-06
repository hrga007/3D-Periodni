// Baza kemijskih spojeva s 3D koordinatama atoma i veza
// Format:
//   formula: kemijska formula
//   name: hrvatski naziv
//   ingredients: { simbol: broj atoma } - za prepoznavanje iz miksera
//   atoms: [ { el: simbol, pos: [x,y,z] } ] - položaj atoma u prostoru
//   bonds: [ { from: index, to: index, type: 1|2|3 } ] - veze
//   bondType: vrsta kemijske veze (kovalentna, ionska, metalna)
//   geometry: oblik molekule
//   description: opis
//   uses: primjena

window.COMPOUNDS = [
  {
    formula:"H₂O", name:"Voda", ingredients:{H:2, O:1},
    atoms:[
      {el:"O", pos:[0,0,0]},
      {el:"H", pos:[0.76, 0.59, 0]},
      {el:"H", pos:[-0.76, 0.59, 0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Polarna kovalentna", geometry:"Savijena (104.5°)",
    description:"Najvažniji spoj za život. Polarna molekula koja stvara vodikove veze.",
    uses:"Piće, otapalo, hlađenje, sve biološko"
  },
  {
    formula:"CO₂", name:"Ugljikov dioksid", ingredients:{C:1, O:2},
    atoms:[
      {el:"C", pos:[0,0,0]},
      {el:"O", pos:[1.16, 0, 0]},
      {el:"O", pos:[-1.16, 0, 0]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Polarna kovalentna", geometry:"Linearna (180°)",
    description:"Plin u zraku, produkt disanja i izgaranja. Staklenički plin.",
    uses:"Gazirana pića, gašenje vatre, fotosinteza"
  },
  {
    formula:"CO", name:"Ugljikov monoksid", ingredients:{C:1, O:1},
    atoms:[{el:"C", pos:[-0.56,0,0]},{el:"O", pos:[0.56,0,0]}],
    bonds:[{from:0,to:1,type:3}],
    bondType:"Polarna kovalentna", geometry:"Linearna",
    description:"Otrovan plin bez boje i mirisa, nastaje nepotpunim izgaranjem.",
    uses:"Industrijska redukcija, sinteze - inače opasan!"
  },
  {
    formula:"O₂", name:"Kisik (molekularni)", ingredients:{O:2},
    atoms:[{el:"O", pos:[-0.6,0,0]},{el:"O", pos:[0.6,0,0]}],
    bonds:[{from:0,to:1,type:2}],
    bondType:"Nepolarna kovalentna", geometry:"Linearna",
    description:"Dvoatomni plin, ~21% atmosfere. Nužan za disanje.",
    uses:"Disanje, izgaranje, čeličarstvo"
  },
  {
    formula:"O₃", name:"Ozon", ingredients:{O:3},
    atoms:[
      {el:"O", pos:[0,0.5,0]},
      {el:"O", pos:[1.1,-0.3,0]},
      {el:"O", pos:[-1.1,-0.3,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Polarna kovalentna", geometry:"Savijena (117°)",
    description:"Tri atoma kisika. Štiti Zemlju od UV zračenja u stratosferi.",
    uses:"UV zaštita, dezinfekcija, obrada vode"
  },
  {
    formula:"H₂", name:"Vodik (molekularni)", ingredients:{H:2},
    atoms:[{el:"H", pos:[-0.37,0,0]},{el:"H", pos:[0.37,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Nepolarna kovalentna", geometry:"Linearna",
    description:"Najmanja i najlakša molekula u svemiru.",
    uses:"Gorivo, sinteza amonijaka, raketni motori"
  },
  {
    formula:"N₂", name:"Dušik (molekularni)", ingredients:{N:2},
    atoms:[{el:"N", pos:[-0.55,0,0]},{el:"N", pos:[0.55,0,0]}],
    bonds:[{from:0,to:1,type:3}],
    bondType:"Nepolarna kovalentna", geometry:"Linearna",
    description:"Glavni sastojak atmosfere (~78%). Trostruka veza je vrlo jaka.",
    uses:"Pakiranje hrane, kriogenika, gnojiva (preko amonijaka)"
  },
  {
    formula:"Cl₂", name:"Klor (molekularni)", ingredients:{Cl:2},
    atoms:[{el:"Cl", pos:[-1,0,0]},{el:"Cl", pos:[1,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Nepolarna kovalentna", geometry:"Linearna",
    description:"Žutozeleni otrovni plin oštrog mirisa.",
    uses:"Dezinfekcija, PVC, izbjeljivači"
  },
  {
    formula:"F₂", name:"Fluor (molekularni)", ingredients:{F:2},
    atoms:[{el:"F", pos:[-0.7,0,0]},{el:"F", pos:[0.7,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Nepolarna kovalentna", geometry:"Linearna",
    description:"Najreaktivniji element, blijedožuti plin.",
    uses:"Teflon, lijekovi, obrada uranija"
  },
  {
    formula:"Br₂", name:"Brom (molekularni)", ingredients:{Br:2},
    atoms:[{el:"Br", pos:[-1.14,0,0]},{el:"Br", pos:[1.14,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Nepolarna kovalentna", geometry:"Linearna",
    description:"Tamnocrvena tekućina, jedini tekući nemetal.",
    uses:"Usporivači gorenja, fotografija"
  },
  {
    formula:"I₂", name:"Jod (molekularni)", ingredients:{I:2},
    atoms:[{el:"I", pos:[-1.33,0,0]},{el:"I", pos:[1.33,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Nepolarna kovalentna", geometry:"Linearna",
    description:"Tamnoljubičasta krutina, sublimira u ljubičasti plin.",
    uses:"Antiseptik, hormoni štitnjače"
  },
  {
    formula:"NaCl", name:"Natrijev klorid (sol)", ingredients:{Na:1, Cl:1},
    atoms:[{el:"Na", pos:[-1.18,0,0]},{el:"Cl", pos:[1.18,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristal (FCC)",
    description:"Kuhinjska sol. Klasični primjer ionske veze.",
    uses:"Hrana, konzerviranje, posipanje cesta"
  },
  {
    formula:"KCl", name:"Kalijev klorid", ingredients:{K:1, Cl:1},
    atoms:[{el:"K", pos:[-1.4,0,0]},{el:"Cl", pos:[1.4,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristal (FCC)",
    description:"Bijela kristalna sol slična kuhinjskoj.",
    uses:"Zamjena za sol, gnojiva, infuzije"
  },
  {
    formula:"NaF", name:"Natrijev fluorid", ingredients:{Na:1, F:1},
    atoms:[{el:"Na", pos:[-1.0,0,0]},{el:"F", pos:[1.0,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristal",
    description:"Sol koja se dodaje u pastu za zube i vodu.",
    uses:"Zaštita zubi, dezinfekcija, fluoridacija vode"
  },
  {
    formula:"LiF", name:"Litijev fluorid", ingredients:{Li:1, F:1},
    atoms:[{el:"Li", pos:[-0.8,0,0]},{el:"F", pos:[0.8,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristal",
    description:"Najmanja ionska sol, koristi se u optici.",
    uses:"UV optika, dozimetrija zračenja"
  },
  {
    formula:"HCl", name:"Klorovodična kiselina", ingredients:{H:1, Cl:1},
    atoms:[{el:"H", pos:[-0.64,0,0]},{el:"Cl", pos:[0.64,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Polarna kovalentna", geometry:"Linearna",
    description:"Jaka kiselina, u želučanom soku ljudi.",
    uses:"Industrija, čišćenje metala, probava"
  },
  {
    formula:"HF", name:"Fluorovodik", ingredients:{H:1, F:1},
    atoms:[{el:"H", pos:[-0.46,0,0]},{el:"F", pos:[0.46,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Polarna kovalentna", geometry:"Linearna",
    description:"Vrlo opasna kiselina koja nagriza staklo.",
    uses:"Jetkanje stakla, proizvodnja teflona"
  },
  {
    formula:"HBr", name:"Bromovodik", ingredients:{H:1, Br:1},
    atoms:[{el:"H", pos:[-0.71,0,0]},{el:"Br", pos:[0.71,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Polarna kovalentna", geometry:"Linearna",
    description:"Jaka kiselina, slična klorovodičnoj.",
    uses:"Sinteze, proizvodnja bromida"
  },
  {
    formula:"HI", name:"Jodovodik", ingredients:{H:1, I:1},
    atoms:[{el:"H", pos:[-0.81,0,0]},{el:"I", pos:[0.81,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Polarna kovalentna", geometry:"Linearna",
    description:"Najjača halogenovodična kiselina.",
    uses:"Reduktor u organskoj sintezi"
  },
  {
    formula:"NH₃", name:"Amonijak", ingredients:{N:1, H:3},
    atoms:[
      {el:"N", pos:[0,0.3,0]},
      {el:"H", pos:[0.94,-0.3,0]},
      {el:"H", pos:[-0.47,-0.3,0.81]},
      {el:"H", pos:[-0.47,-0.3,-0.81]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Polarna kovalentna", geometry:"Trigonska piramida (107°)",
    description:"Bazni plin oštrog mirisa. Osnova svih dušičnih gnojiva.",
    uses:"Gnojiva, sredstva za čišćenje, hlađenje"
  },
  {
    formula:"CH₄", name:"Metan", ingredients:{C:1, H:4},
    atoms:[
      {el:"C", pos:[0,0,0]},
      {el:"H", pos:[0.63,0.63,0.63]},
      {el:"H", pos:[-0.63,-0.63,0.63]},
      {el:"H", pos:[-0.63,0.63,-0.63]},
      {el:"H", pos:[0.63,-0.63,-0.63]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1}],
    bondType:"Nepolarna kovalentna", geometry:"Tetraedar (109.5°)",
    description:"Glavni sastojak prirodnog plina. Snažan staklenički plin.",
    uses:"Energetsko gorivo, kuhanje, grijanje"
  },
  {
    formula:"C₂H₂", name:"Acetilen (etin)", ingredients:{C:2, H:2},
    atoms:[
      {el:"C", pos:[-0.6,0,0]},
      {el:"C", pos:[0.6,0,0]},
      {el:"H", pos:[-1.66,0,0]},
      {el:"H", pos:[1.66,0,0]}
    ],
    bonds:[{from:0,to:1,type:3},{from:0,to:2,type:1},{from:1,to:3,type:1}],
    bondType:"Kovalentna", geometry:"Linearna",
    description:"Najjednostavniji alkin, gori vrlo vrućim plamenom.",
    uses:"Zavarivanje, sinteze polimera"
  },
  {
    formula:"C₂H₄", name:"Etilen (eten)", ingredients:{C:2, H:4},
    atoms:[
      {el:"C", pos:[-0.67,0,0]},
      {el:"C", pos:[0.67,0,0]},
      {el:"H", pos:[-1.24,0.94,0]},
      {el:"H", pos:[-1.24,-0.94,0]},
      {el:"H", pos:[1.24,0.94,0]},
      {el:"H", pos:[1.24,-0.94,0]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:1,to:4,type:1},{from:1,to:5,type:1}],
    bondType:"Kovalentna", geometry:"Planarno trigonska",
    description:"Sirovina za polietilen, biljni hormon zriobe.",
    uses:"Plastika, dozrijevanje voća"
  },
  {
    formula:"C₂H₆", name:"Etan", ingredients:{C:2, H:6},
    atoms:[
      {el:"C", pos:[-0.77,0,0]},
      {el:"C", pos:[0.77,0,0]},
      {el:"H", pos:[-1.16,1.03,0]},
      {el:"H", pos:[-1.16,-0.51,0.89]},
      {el:"H", pos:[-1.16,-0.51,-0.89]},
      {el:"H", pos:[1.16,1.03,0]},
      {el:"H", pos:[1.16,-0.51,0.89]},
      {el:"H", pos:[1.16,-0.51,-0.89]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1},{from:1,to:5,type:1},{from:1,to:6,type:1},{from:1,to:7,type:1}],
    bondType:"Nepolarna kovalentna", geometry:"Tetraedarska",
    description:"Drugi alkan, sastojak prirodnog plina.",
    uses:"Gorivo, sirovina za etilen"
  },
  {
    formula:"H₂O₂", name:"Vodikov peroksid", ingredients:{H:2, O:2},
    atoms:[
      {el:"O", pos:[-0.74,0,0]},
      {el:"O", pos:[0.74,0,0]},
      {el:"H", pos:[-1.0,0.85,0.4]},
      {el:"H", pos:[1.0,0.85,-0.4]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:1,to:3,type:1}],
    bondType:"Polarna kovalentna", geometry:"Iskrivljena",
    description:"Antiseptik i izbjeljivač, jaki oksidans.",
    uses:"Dezinfekcija, izbjeljivanje, raketno gorivo"
  },
  {
    formula:"NaOH", name:"Natrijev hidroksid (lužina)", ingredients:{Na:1, O:1, H:1},
    atoms:[
      {el:"Na", pos:[-1.5,0,0]},
      {el:"O", pos:[0.4,0,0]},
      {el:"H", pos:[1.36,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Linearna",
    description:"Vrlo jaka baza, kaustična soda.",
    uses:"Sapuni, papir, čišćenje cijevi"
  },
  {
    formula:"KOH", name:"Kalijev hidroksid", ingredients:{K:1, O:1, H:1},
    atoms:[
      {el:"K", pos:[-1.7,0,0]},
      {el:"O", pos:[0.4,0,0]},
      {el:"H", pos:[1.36,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Linearna",
    description:"Vrlo jaka baza, slična NaOH.",
    uses:"Tekući sapuni, baterije, gnojiva"
  },
  {
    formula:"H₂SO₄", name:"Sumporna kiselina", ingredients:{H:2, S:1, O:4},
    atoms:[
      {el:"S", pos:[0,0,0]},
      {el:"O", pos:[0,1.43,0]},
      {el:"O", pos:[0,-1.43,0]},
      {el:"O", pos:[1.4,0,0.7]},
      {el:"O", pos:[-1.4,0,0.7]},
      {el:"H", pos:[2.1,0,1.3]},
      {el:"H", pos:[-2.1,0,1.3]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2},{from:0,to:3,type:1},{from:0,to:4,type:1},{from:3,to:5,type:1},{from:4,to:6,type:1}],
    bondType:"Polarna kovalentna", geometry:"Tetraedarska oko S",
    description:"Najproizvođenija kemikalija, jaka diprotonska kiselina.",
    uses:"Akumulatori, gnojiva, industrija"
  },
  {
    formula:"HNO₃", name:"Dušična kiselina", ingredients:{H:1, N:1, O:3},
    atoms:[
      {el:"N", pos:[0,0,0]},
      {el:"O", pos:[1.21,0.42,0]},
      {el:"O", pos:[-1.21,0.42,0]},
      {el:"O", pos:[0,-1.27,0]},
      {el:"H", pos:[0.6,-1.95,0]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Polarna kovalentna", geometry:"Trigonska planarna",
    description:"Jaka kiselina, nagriza većinu metala.",
    uses:"Eksplozivi, gnojiva, čišćenje metala"
  },
  {
    formula:"H₂CO₃", name:"Ugljična kiselina", ingredients:{H:2, C:1, O:3},
    atoms:[
      {el:"C", pos:[0,0,0]},
      {el:"O", pos:[0,1.22,0]},
      {el:"O", pos:[1.18,-0.61,0]},
      {el:"O", pos:[-1.18,-0.61,0]},
      {el:"H", pos:[1.85,0.0,0]},
      {el:"H", pos:[-1.85,0.0,0]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:2,to:4,type:1},{from:3,to:5,type:1}],
    bondType:"Polarna kovalentna", geometry:"Trigonska planarna",
    description:"Slaba kiselina, nastaje otapanjem CO₂ u vodi.",
    uses:"Gazirana pića, biokemija, oceani"
  },
  {
    formula:"H₃PO₄", name:"Fosforna kiselina", ingredients:{H:3, P:1, O:4},
    atoms:[
      {el:"P", pos:[0,0,0]},
      {el:"O", pos:[0,1.5,0]},
      {el:"O", pos:[1.4,-0.5,0]},
      {el:"O", pos:[-0.7,-0.5,1.21]},
      {el:"O", pos:[-0.7,-0.5,-1.21]},
      {el:"H", pos:[2.1,-1.2,0]},
      {el:"H", pos:[-1.4,-1.2,1.81]},
      {el:"H", pos:[-1.4,-1.2,-1.81]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1},{from:2,to:5,type:1},{from:3,to:6,type:1},{from:4,to:7,type:1}],
    bondType:"Polarna kovalentna", geometry:"Tetraedarska",
    description:"Triprotonska kiselina, dodatak u Coca-Coli.",
    uses:"Gnojiva, dodatak hrani, deterdženti"
  },
  {
    formula:"NaHCO₃", name:"Natrijev bikarbonat (soda bikarbona)", ingredients:{Na:1, H:1, C:1, O:3},
    atoms:[
      {el:"Na", pos:[-2.5,0,0]},
      {el:"C", pos:[0,0,0]},
      {el:"O", pos:[0,1.27,0]},
      {el:"O", pos:[1.16,-0.66,0]},
      {el:"O", pos:[-1.16,-0.66,0]},
      {el:"H", pos:[1.85,0.0,0]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:1},{from:1,to:4,type:1},{from:3,to:5,type:1},{from:0,to:4,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Trigonska planarna",
    description:"Soda bikarbona, slaba baza za kuhanje i čišćenje.",
    uses:"Pekarstvo, čišćenje, antacid"
  },
  {
    formula:"Na₂CO₃", name:"Natrijev karbonat (soda)", ingredients:{Na:2, C:1, O:3},
    atoms:[
      {el:"Na", pos:[-2.5,0.5,0]},
      {el:"Na", pos:[2.5,0.5,0]},
      {el:"C", pos:[0,0,0]},
      {el:"O", pos:[0,1.27,0]},
      {el:"O", pos:[1.16,-0.66,0]},
      {el:"O", pos:[-1.16,-0.66,0]}
    ],
    bonds:[{from:2,to:3,type:2},{from:2,to:4,type:1},{from:2,to:5,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Trigonska",
    description:"Bezvodna soda, koristi se u staklarstvu i deterdžentima.",
    uses:"Staklo, deterdženti, omekšivač vode"
  },
  {
    formula:"CaCO₃", name:"Kalcijev karbonat (vapnenac)", ingredients:{Ca:1, C:1, O:3},
    atoms:[
      {el:"Ca", pos:[-2.5,0,0]},
      {el:"C", pos:[0,0,0]},
      {el:"O", pos:[0,1.27,0]},
      {el:"O", pos:[1.16,-0.66,0]},
      {el:"O", pos:[-1.16,-0.66,0]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:1},{from:1,to:4,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Trigonska",
    description:"Glavni sastojak vapnenca, mramora i ljuski morskih organizama.",
    uses:"Cement, papir, antacid, građevina"
  },
  {
    formula:"CaO", name:"Kalcijev oksid (živo vapno)", ingredients:{Ca:1, O:1},
    atoms:[{el:"Ca", pos:[-1.0,0,0]},{el:"O", pos:[1.0,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristalna rešetka",
    description:"Živo vapno, vrlo egzotermno reagira s vodom.",
    uses:"Cement, čeličarstvo, kemikalije"
  },
  {
    formula:"Ca(OH)₂", name:"Kalcijev hidroksid (gašeno vapno)", ingredients:{Ca:1, O:2, H:2},
    atoms:[
      {el:"Ca", pos:[0,0,0]},
      {el:"O", pos:[2.0,0,0]},
      {el:"O", pos:[-2.0,0,0]},
      {el:"H", pos:[2.96,0,0]},
      {el:"H", pos:[-2.96,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:1,to:3,type:1},{from:2,to:4,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Linearna",
    description:"Gašeno vapno, koristi se u građevinarstvu.",
    uses:"Žbuka, neutralizacija kiselina, voda"
  },
  {
    formula:"MgO", name:"Magnezijev oksid", ingredients:{Mg:1, O:1},
    atoms:[{el:"Mg", pos:[-1.0,0,0]},{el:"O", pos:[1.0,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristalna",
    description:"Vatrostalni materijal, antacid.",
    uses:"Vatrostalne cigle, lijekovi"
  },
  {
    formula:"Al₂O₃", name:"Aluminijev oksid (korund)", ingredients:{Al:2, O:3},
    atoms:[
      {el:"Al", pos:[-1.5,0,0]},
      {el:"Al", pos:[1.5,0,0]},
      {el:"O", pos:[0,1.2,0]},
      {el:"O", pos:[0,-1.2,0]},
      {el:"O", pos:[0,0,1.2]}
    ],
    bonds:[{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1},{from:1,to:2,type:1},{from:1,to:3,type:1},{from:1,to:4,type:1}],
    bondType:"Ionska", geometry:"Heksagonska",
    description:"Korund, rubin i safir su njegove varijante.",
    uses:"Brusni materijal, keramika, dragulji"
  },
  {
    formula:"Fe₂O₃", name:"Željezo(III) oksid (hrđa)", ingredients:{Fe:2, O:3},
    atoms:[
      {el:"Fe", pos:[-1.5,0,0]},
      {el:"Fe", pos:[1.5,0,0]},
      {el:"O", pos:[0,1.4,0]},
      {el:"O", pos:[0,-1.4,0]},
      {el:"O", pos:[0,0,1.4]}
    ],
    bonds:[{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1},{from:1,to:2,type:1},{from:1,to:3,type:1},{from:1,to:4,type:1}],
    bondType:"Ionska", geometry:"Heksagonska",
    description:"Glavni sastojak hrđe i hematitne rude.",
    uses:"Pigmenti, sirovina za željezo"
  },
  {
    formula:"FeO", name:"Željezo(II) oksid", ingredients:{Fe:1, O:1},
    atoms:[{el:"Fe", pos:[-1.0,0,0]},{el:"O", pos:[1.0,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristalna",
    description:"Crni prah, manje stabilan od Fe₂O₃.",
    uses:"Pigmenti, kataliza"
  },
  {
    formula:"CuO", name:"Bakrov(II) oksid", ingredients:{Cu:1, O:1},
    atoms:[{el:"Cu", pos:[-1.0,0,0]},{el:"O", pos:[1.0,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Monoklinska",
    description:"Crni prah, koristi se kao pigment i poluvodič.",
    uses:"Keramika, baterije, supravodiči"
  },
  {
    formula:"ZnO", name:"Cinkov oksid", ingredients:{Zn:1, O:1},
    atoms:[{el:"Zn", pos:[-1.0,0,0]},{el:"O", pos:[1.0,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Wurtzite",
    description:"Bijeli prah, nalazi se u kremama za sunce.",
    uses:"Krema, guma, boje, lijekovi"
  },
  {
    formula:"SiO₂", name:"Silicijev dioksid (kvarc)", ingredients:{Si:1, O:2},
    atoms:[
      {el:"Si", pos:[0,0,0]},
      {el:"O", pos:[1.2,0.5,0]},
      {el:"O", pos:[-1.2,0.5,0]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Kovalentna", geometry:"Tetraedarska mreža",
    description:"Glavni sastojak pijeska, kvarca i stakla.",
    uses:"Staklo, čipovi, optička vlakna"
  },
  {
    formula:"SO₂", name:"Sumporov dioksid", ingredients:{S:1, O:2},
    atoms:[
      {el:"S", pos:[0,0.3,0]},
      {el:"O", pos:[1.23,-0.3,0]},
      {el:"O", pos:[-1.23,-0.3,0]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Polarna kovalentna", geometry:"Savijena (119°)",
    description:"Plin oštrog mirisa, glavni uzrok kiselih kiša.",
    uses:"Konzervans (vino), izbjeljivanje"
  },
  {
    formula:"SO₃", name:"Sumporov trioksid", ingredients:{S:1, O:3},
    atoms:[
      {el:"S", pos:[0,0,0]},
      {el:"O", pos:[1.42,0,0]},
      {el:"O", pos:[-0.71,1.23,0]},
      {el:"O", pos:[-0.71,-1.23,0]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2},{from:0,to:3,type:2}],
    bondType:"Polarna kovalentna", geometry:"Trigonska planarna",
    description:"Anhidrid sumporne kiseline.",
    uses:"Proizvodnja H₂SO₄"
  },
  {
    formula:"NO", name:"Dušikov monoksid", ingredients:{N:1, O:1},
    atoms:[{el:"N", pos:[-0.58,0,0]},{el:"O", pos:[0.58,0,0]}],
    bonds:[{from:0,to:1,type:2}],
    bondType:"Polarna kovalentna", geometry:"Linearna",
    description:"Slobodni radikal, signalna molekula u tijelu.",
    uses:"Vazodilatator, signalna molekula"
  },
  {
    formula:"NO₂", name:"Dušikov dioksid", ingredients:{N:1, O:2},
    atoms:[
      {el:"N", pos:[0,0.3,0]},
      {el:"O", pos:[1.2,-0.3,0]},
      {el:"O", pos:[-1.2,-0.3,0]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:1}],
    bondType:"Polarna kovalentna", geometry:"Savijena (134°)",
    description:"Smeđi otrovni plin, smog u gradovima.",
    uses:"Onečišćivač - inače opasan"
  },
  {
    formula:"N₂O", name:"Dušikov(I) oksid (smijeh-plin)", ingredients:{N:2, O:1},
    atoms:[
      {el:"N", pos:[-1.13,0,0]},
      {el:"N", pos:[0,0,0]},
      {el:"O", pos:[1.19,0,0]}
    ],
    bonds:[{from:0,to:1,type:3},{from:1,to:2,type:1}],
    bondType:"Polarna kovalentna", geometry:"Linearna",
    description:"Plin za smijanje, blagi anestetik.",
    uses:"Anestezija, šlag, raketno gorivo"
  },
  {
    formula:"PH₃", name:"Fosfin", ingredients:{P:1, H:3},
    atoms:[
      {el:"P", pos:[0,0.4,0]},
      {el:"H", pos:[1.2,-0.3,0]},
      {el:"H", pos:[-0.6,-0.3,1.04]},
      {el:"H", pos:[-0.6,-0.3,-1.04]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Polarna kovalentna", geometry:"Trigonska piramida",
    description:"Otrovni plin, sličan amonijaku ali manje bazičan.",
    uses:"Pesticidi, dopiranje poluvodiča"
  },
  {
    formula:"H₂S", name:"Sumporovodik", ingredients:{H:2, S:1},
    atoms:[
      {el:"S", pos:[0,0,0]},
      {el:"H", pos:[0.97,0.97,0]},
      {el:"H", pos:[-0.97,0.97,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Polarna kovalentna", geometry:"Savijena (92°)",
    description:"Otrovni plin smrada na pokvarena jaja.",
    uses:"Sinteze, analitička kemija"
  },
  {
    formula:"CH₃OH", name:"Metanol", ingredients:{C:1, H:4, O:1},
    atoms:[
      {el:"C", pos:[0,0,0]},
      {el:"O", pos:[1.43,0,0]},
      {el:"H", pos:[-0.5,1.0,0]},
      {el:"H", pos:[-0.5,-0.5,0.87]},
      {el:"H", pos:[-0.5,-0.5,-0.87]},
      {el:"H", pos:[1.93,0.83,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1},{from:1,to:5,type:1}],
    bondType:"Kovalentna", geometry:"Tetraedar oko C",
    description:"Najjednostavniji alkohol, otrovan!",
    uses:"Otapalo, gorivo, sinteze"
  },
  {
    formula:"C₂H₅OH", name:"Etanol (alkohol)", ingredients:{C:2, H:6, O:1},
    atoms:[
      {el:"C", pos:[-0.77,0,0]},
      {el:"C", pos:[0.77,0,0]},
      {el:"O", pos:[1.4,1.3,0]},
      {el:"H", pos:[-1.16,1.03,0]},
      {el:"H", pos:[-1.16,-0.51,0.89]},
      {el:"H", pos:[-1.16,-0.51,-0.89]},
      {el:"H", pos:[1.16,-0.6,0.89]},
      {el:"H", pos:[1.16,-0.6,-0.89]},
      {el:"H", pos:[2.36,1.3,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1},{from:0,to:5,type:1},{from:1,to:6,type:1},{from:1,to:7,type:1},{from:2,to:8,type:1}],
    bondType:"Kovalentna", geometry:"Tetraedarska",
    description:"Pijaći alkohol, otapalo, biogorivo.",
    uses:"Pića, antiseptik, gorivo"
  },
  {
    formula:"CH₃COOH", name:"Octena kiselina", ingredients:{C:2, H:4, O:2},
    atoms:[
      {el:"C", pos:[-0.9,0,0]},
      {el:"C", pos:[0.6,0,0]},
      {el:"O", pos:[1.3,1.13,0]},
      {el:"O", pos:[1.2,-1.16,0]},
      {el:"H", pos:[-1.3,0.94,0.5]},
      {el:"H", pos:[-1.3,-0.5,0.87]},
      {el:"H", pos:[-1.3,-0.5,-0.87]},
      {el:"H", pos:[2.16,-1.16,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:2},{from:1,to:3,type:1},{from:0,to:4,type:1},{from:0,to:5,type:1},{from:0,to:6,type:1},{from:3,to:7,type:1}],
    bondType:"Polarna kovalentna", geometry:"Tetraedar oko C",
    description:"Aktivna komponenta octa.",
    uses:"Hrana, čišćenje, sinteze"
  },
  {
    formula:"C₆H₆", name:"Benzen", ingredients:{C:6, H:6},
    atoms:[
      {el:"C", pos:[1.4,0,0]},
      {el:"C", pos:[0.7,1.21,0]},
      {el:"C", pos:[-0.7,1.21,0]},
      {el:"C", pos:[-1.4,0,0]},
      {el:"C", pos:[-0.7,-1.21,0]},
      {el:"C", pos:[0.7,-1.21,0]},
      {el:"H", pos:[2.49,0,0]},
      {el:"H", pos:[1.24,2.16,0]},
      {el:"H", pos:[-1.24,2.16,0]},
      {el:"H", pos:[-2.49,0,0]},
      {el:"H", pos:[-1.24,-2.16,0]},
      {el:"H", pos:[1.24,-2.16,0]}
    ],
    bonds:[
      {from:0,to:1,type:2},{from:1,to:2,type:1},{from:2,to:3,type:2},
      {from:3,to:4,type:1},{from:4,to:5,type:2},{from:5,to:0,type:1},
      {from:0,to:6,type:1},{from:1,to:7,type:1},{from:2,to:8,type:1},
      {from:3,to:9,type:1},{from:4,to:10,type:1},{from:5,to:11,type:1}
    ],
    bondType:"Aromatska kovalentna", geometry:"Heksagonska planarna",
    description:"Aromatski ugljikovodik, kancerogen.",
    uses:"Sirovina za polimere, otapalo"
  },
  {
    formula:"C₆H₁₂O₆", name:"Glukoza", ingredients:{C:6, H:12, O:6},
    atoms:[
      {el:"C", pos:[0,1.5,0]},
      {el:"C", pos:[1.3,0.75,0]},
      {el:"C", pos:[1.3,-0.75,0]},
      {el:"C", pos:[0,-1.5,0]},
      {el:"C", pos:[-1.3,-0.75,0]},
      {el:"C", pos:[-1.3,0.75,0]},
      {el:"O", pos:[0,2.6,0]},
      {el:"O", pos:[2.4,1.4,0]},
      {el:"O", pos:[2.4,-1.4,0]},
      {el:"O", pos:[0,-2.6,0]},
      {el:"O", pos:[-2.4,-1.4,0]},
      {el:"O", pos:[-2.4,1.4,0]}
    ],
    bonds:[
      {from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},
      {from:3,to:4,type:1},{from:4,to:5,type:1},{from:5,to:0,type:1},
      {from:0,to:6,type:1},{from:1,to:7,type:1},{from:2,to:8,type:1},
      {from:3,to:9,type:1},{from:4,to:10,type:1},{from:5,to:11,type:1}
    ],
    bondType:"Polarna kovalentna", geometry:"Pirana (6-prsten)",
    description:"Najvažniji šećer, izvor energije za stanice. (H atomi nisu prikazani radi jasnoće)",
    uses:"Energija u tijelu, hrana, fermentacija"
  },
  {
    formula:"HCN", name:"Cijanovodik", ingredients:{H:1, C:1, N:1},
    atoms:[
      {el:"H", pos:[-1.66,0,0]},
      {el:"C", pos:[-0.6,0,0]},
      {el:"N", pos:[0.6,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:3}],
    bondType:"Polarna kovalentna", geometry:"Linearna",
    description:"Jako otrovan plin, miris gorkih badema.",
    uses:"Sinteze (akrilik), galvanizacija"
  },
  {
    formula:"BF₃", name:"Borov trifluorid", ingredients:{B:1, F:3},
    atoms:[
      {el:"B", pos:[0,0,0]},
      {el:"F", pos:[1.31,0,0]},
      {el:"F", pos:[-0.65,1.13,0]},
      {el:"F", pos:[-0.65,-1.13,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Polarna kovalentna", geometry:"Trigonska planarna (120°)",
    description:"Klasični primjer Lewisove kiseline.",
    uses:"Katalizator u organskoj sintezi"
  },
  {
    formula:"SF₆", name:"Sumporov heksafluorid", ingredients:{S:1, F:6},
    atoms:[
      {el:"S", pos:[0,0,0]},
      {el:"F", pos:[1.56,0,0]},
      {el:"F", pos:[-1.56,0,0]},
      {el:"F", pos:[0,1.56,0]},
      {el:"F", pos:[0,-1.56,0]},
      {el:"F", pos:[0,0,1.56]},
      {el:"F", pos:[0,0,-1.56]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1},{from:0,to:5,type:1},{from:0,to:6,type:1}],
    bondType:"Polarna kovalentna", geometry:"Oktaedarska",
    description:"Vrlo stabilan plin, izolator u elektrici.",
    uses:"Visokonaponska izolacija"
  },
  {
    formula:"CCl₄", name:"Ugljikov tetraklorid", ingredients:{C:1, Cl:4},
    atoms:[
      {el:"C", pos:[0,0,0]},
      {el:"Cl", pos:[1.02,1.02,1.02]},
      {el:"Cl", pos:[-1.02,-1.02,1.02]},
      {el:"Cl", pos:[-1.02,1.02,-1.02]},
      {el:"Cl", pos:[1.02,-1.02,-1.02]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1}],
    bondType:"Nepolarna kovalentna", geometry:"Tetraedar",
    description:"Otapalo, sada zabranjeno zbog ozona.",
    uses:"Povijesno: aparati za gašenje, otapalo"
  },
  {
    formula:"AlCl₃", name:"Aluminijev klorid", ingredients:{Al:1, Cl:3},
    atoms:[
      {el:"Al", pos:[0,0,0]},
      {el:"Cl", pos:[2.06,0,0]},
      {el:"Cl", pos:[-1.03,1.78,0]},
      {el:"Cl", pos:[-1.03,-1.78,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Kovalentna/ionska", geometry:"Trigonska planarna",
    description:"Friedel-Craftsov katalizator.",
    uses:"Katalizator u sintezi"
  },
  {
    formula:"MgCl₂", name:"Magnezijev klorid", ingredients:{Mg:1, Cl:2},
    atoms:[
      {el:"Mg", pos:[0,0,0]},
      {el:"Cl", pos:[2.18,0,0]},
      {el:"Cl", pos:[-2.18,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Ionska", geometry:"Linearna",
    description:"Sol, prirodni nalazi se u morskoj vodi.",
    uses:"Posipanje cesta, dodatak prehrani"
  },
  {
    formula:"CaCl₂", name:"Kalcijev klorid", ingredients:{Ca:1, Cl:2},
    atoms:[
      {el:"Ca", pos:[0,0,0]},
      {el:"Cl", pos:[2.42,0,0]},
      {el:"Cl", pos:[-2.42,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Ionska", geometry:"Linearna",
    description:"Higroskopna sol, koristi se za odmrzavanje.",
    uses:"Odmrzavanje cesta, sušilac"
  },
  {
    formula:"CuSO₄", name:"Bakrov sulfat", ingredients:{Cu:1, S:1, O:4},
    atoms:[
      {el:"Cu", pos:[-2.5,0,0]},
      {el:"S", pos:[0,0,0]},
      {el:"O", pos:[0,1.43,0]},
      {el:"O", pos:[0,-1.43,0]},
      {el:"O", pos:[1.4,0,0.7]},
      {el:"O", pos:[-1.4,0,0.7]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:2},{from:1,to:4,type:1},{from:1,to:5,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Tetraedarska oko S",
    description:"Modra galica, plavi kristal.",
    uses:"Vinogradarstvo, bojenje, galvanizacija"
  },
  {
    formula:"KMnO₄", name:"Kalijev permanganat", ingredients:{K:1, Mn:1, O:4},
    atoms:[
      {el:"K", pos:[-2.8,0,0]},
      {el:"Mn", pos:[0,0,0]},
      {el:"O", pos:[1.0,1.0,1.0]},
      {el:"O", pos:[-1.0,-1.0,1.0]},
      {el:"O", pos:[-1.0,1.0,-1.0]},
      {el:"O", pos:[1.0,-1.0,-1.0]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:2},{from:1,to:4,type:1},{from:1,to:5,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Tetraedarska",
    description:"Tamnoljubičasti jaki oksidans.",
    uses:"Dezinfekcija, analitička kemija"
  },
  {
    formula:"AgNO₃", name:"Srebrov nitrat", ingredients:{Ag:1, N:1, O:3},
    atoms:[
      {el:"Ag", pos:[-2.7,0,0]},
      {el:"N", pos:[0,0,0]},
      {el:"O", pos:[1.21,0.42,0]},
      {el:"O", pos:[-1.21,0.42,0]},
      {el:"O", pos:[0,-1.27,0]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:1},{from:1,to:4,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Trigonska planarna",
    description:"Pakleni kamen, koristio se u medicini.",
    uses:"Fotografija, medicina, analitika"
  }
];
