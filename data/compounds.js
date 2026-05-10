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
  },

  // ── Halogeni spojevi ─────────────────────────────────────────────────────
  {
    formula:"NaBr", name:"Natrijev bromid", ingredients:{Na:1, Br:1},
    atoms:[{el:"Na", pos:[-1.29,0,0]},{el:"Br", pos:[1.29,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristal (FCC)",
    description:"Bijela sol slična kuhinjskoj soli.",
    uses:"Sedativi, fotografija, bušotine"
  },
  {
    formula:"NaI", name:"Natrijev jodid", ingredients:{Na:1, I:1},
    atoms:[{el:"Na", pos:[-1.47,0,0]},{el:"I", pos:[1.47,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristal (FCC)",
    description:"Sol koja se dodaje u jodirani namjenski.",
    uses:"Jodirani sol, štitnjača, medicina"
  },
  {
    formula:"KBr", name:"Kalijev bromid", ingredients:{K:1, Br:1},
    atoms:[{el:"K", pos:[-1.54,0,0]},{el:"Br", pos:[1.54,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristal (FCC)",
    description:"Bijela sol, nekad korišten kao sedativ.",
    uses:"Antiepileptik u veterini, fotografija"
  },
  {
    formula:"KI", name:"Kalijev jodid", ingredients:{K:1, I:1},
    atoms:[{el:"K", pos:[-1.67,0,0]},{el:"I", pos:[1.67,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristal (FCC)",
    description:"Sol joda, važna u medicini i prehrani.",
    uses:"Zaštita od radioaktivnog joda, hrana"
  },
  {
    formula:"KF", name:"Kalijev fluorid", ingredients:{K:1, F:1},
    atoms:[{el:"K", pos:[-1.27,0,0]},{el:"F", pos:[1.27,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristal (FCC)",
    description:"Bijela kristalna sol, jako korozivna.",
    uses:"Zavarivanje, kemijska sinteza"
  },
  {
    formula:"LiCl", name:"Litijev klorid", ingredients:{Li:1, Cl:1},
    atoms:[{el:"Li", pos:[-1.02,0,0]},{el:"Cl", pos:[1.02,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristal",
    description:"Bijela sol, koristi se u litijevim baterijama.",
    uses:"Baterije, kemijska sinteza, klima"
  },
  {
    formula:"CaF₂", name:"Kalcijev fluorid (fluorit)", ingredients:{Ca:1, F:2},
    atoms:[
      {el:"F", pos:[-2.0,0,0]},
      {el:"Ca", pos:[0,0,0]},
      {el:"F", pos:[2.0,0,0]}
    ],
    bonds:[{from:1,to:0,type:1},{from:1,to:2,type:1}],
    bondType:"Ionska", geometry:"Kubna (fluorit)",
    description:"Mineral fluorit, osnova za fluoridaciju.",
    uses:"Optika, HF sinteza, metalurgija"
  },
  {
    formula:"BaCl₂", name:"Barijev klorid", ingredients:{Ba:1, Cl:2},
    atoms:[
      {el:"Cl", pos:[-2.68,0,0]},
      {el:"Ba", pos:[0,0,0]},
      {el:"Cl", pos:[2.68,0,0]}
    ],
    bonds:[{from:1,to:0,type:1},{from:1,to:2,type:1}],
    bondType:"Ionska", geometry:"Linearna",
    description:"Otrovana sol barija, bijeli kristali.",
    uses:"Pirotehnika (zelena boja), analitika"
  },
  {
    formula:"FeCl₂", name:"Željezo(II) klorid", ingredients:{Fe:1, Cl:2},
    atoms:[
      {el:"Cl", pos:[-2.32,0,0]},
      {el:"Fe", pos:[0,0,0]},
      {el:"Cl", pos:[2.32,0,0]}
    ],
    bonds:[{from:1,to:0,type:1},{from:1,to:2,type:1}],
    bondType:"Ionska", geometry:"Oktaedarska (kristal)",
    description:"Zelena sol željeza, reducens.",
    uses:"Obrada otpadnih voda, sinteza"
  },
  {
    formula:"FeCl₃", name:"Željezo(III) klorid", ingredients:{Fe:1, Cl:3},
    atoms:[
      {el:"Fe", pos:[0,0,0]},
      {el:"Cl", pos:[2.06,0,0]},
      {el:"Cl", pos:[-1.03,1.78,0]},
      {el:"Cl", pos:[-1.03,-1.78,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Ionska/kovalentna", geometry:"Trigonska planarna",
    description:"Žuta/smeđa sol, jaki oksidans.",
    uses:"Jetkanje bakra, obrada vode, boje"
  },
  {
    formula:"ZnCl₂", name:"Cinkov klorid", ingredients:{Zn:1, Cl:2},
    atoms:[
      {el:"Cl", pos:[-2.06,0,0]},
      {el:"Zn", pos:[0,0,0]},
      {el:"Cl", pos:[2.06,0,0]}
    ],
    bonds:[{from:1,to:0,type:1},{from:1,to:2,type:1}],
    bondType:"Ionska", geometry:"Linearna",
    description:"Bijela sol, higroskopna.",
    uses:"Lemljenje, impregnacija drva"
  },
  {
    formula:"NH₄Cl", name:"Amonijev klorid (sal amonijak)", ingredients:{N:1, H:4, Cl:1},
    atoms:[
      {el:"N", pos:[0,0,0]},
      {el:"H", pos:[0.63,0.63,0.63]},
      {el:"H", pos:[-0.63,-0.63,0.63]},
      {el:"H", pos:[-0.63,0.63,-0.63]},
      {el:"H", pos:[0.63,-0.63,-0.63]},
      {el:"Cl", pos:[3.0,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1}],
    bondType:"Ionska (NH₄⁺ Cl⁻)", geometry:"Tetraedar (NH₄⁺)",
    description:"Sol amonijaka, bijeli prašak oštrog mirisa.",
    uses:"Gnojivo, lemljenje, baterije"
  },
  {
    formula:"PCl₃", name:"Fosforov triklorid", ingredients:{P:1, Cl:3},
    atoms:[
      {el:"P", pos:[0,0.4,0]},
      {el:"Cl", pos:[2.0,-0.3,0]},
      {el:"Cl", pos:[-1.0,-0.3,1.73]},
      {el:"Cl", pos:[-1.0,-0.3,-1.73]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Polarna kovalentna", geometry:"Trigonska piramida",
    description:"Bezbojna tekućina, reagira s vodom.",
    uses:"Sinteza organofosfornih spojeva"
  },
  {
    formula:"PCl₅", name:"Fosforov pentaklorid", ingredients:{P:1, Cl:5},
    atoms:[
      {el:"P", pos:[0,0,0]},
      {el:"Cl", pos:[2.02,0,0]},
      {el:"Cl", pos:[-2.02,0,0]},
      {el:"Cl", pos:[0,2.1,0]},
      {el:"Cl", pos:[1.01,0,1.75]},
      {el:"Cl", pos:[-1.01,0,-1.75]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1},{from:0,to:5,type:1}],
    bondType:"Kovalentna", geometry:"Trigonska bipiramida",
    description:"Bijela kristalna tvar, hidrolizira u HCl.",
    uses:"Sinteza farmaceutika i pesticida"
  },

  // ── Oksidi ───────────────────────────────────────────────────────────────
  {
    formula:"TiO₂", name:"Titanijev dioksid (rutil)", ingredients:{Ti:1, O:2},
    atoms:[
      {el:"O", pos:[-1.0,0,0]},
      {el:"Ti", pos:[0,0,0]},
      {el:"O", pos:[1.0,0,0]}
    ],
    bonds:[{from:1,to:0,type:1},{from:1,to:2,type:1}],
    bondType:"Ionska", geometry:"Rutilna kristalna rešetka",
    description:"Bijeli pigment, fotokatalizator.",
    uses:"Bijela boja, sunčane ćelije, kozmetika"
  },
  {
    formula:"MnO₂", name:"Manganove(IV) oksid", ingredients:{Mn:1, O:2},
    atoms:[
      {el:"O", pos:[-1.0,0,0]},
      {el:"Mn", pos:[0,0,0]},
      {el:"O", pos:[1.0,0,0]}
    ],
    bonds:[{from:1,to:0,type:2},{from:1,to:2,type:2}],
    bondType:"Ionska", geometry:"Rutilna kristalna rešetka",
    description:"Crni mineralni prah, oksidans.",
    uses:"Baterije, oksidacija u sintezi"
  },
  {
    formula:"Cr₂O₃", name:"Kromov(III) oksid (krokit)", ingredients:{Cr:2, O:3},
    atoms:[
      {el:"Cr", pos:[-1.5,0,0]},
      {el:"Cr", pos:[1.5,0,0]},
      {el:"O", pos:[0,1.2,0]},
      {el:"O", pos:[0,-1.2,0]},
      {el:"O", pos:[0,0,1.2]}
    ],
    bonds:[{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1},{from:1,to:2,type:1},{from:1,to:3,type:1},{from:1,to:4,type:1}],
    bondType:"Ionska", geometry:"Heksagonska",
    description:"Zeleni pigment, iznimno tvrd.",
    uses:"Zelena boja, abrazivi, krom galvanizacija"
  },
  {
    formula:"Cu₂O", name:"Bakrov(I) oksid (kuprit)", ingredients:{Cu:2, O:1},
    atoms:[
      {el:"Cu", pos:[-1.84,0,0]},
      {el:"O", pos:[0,0,0]},
      {el:"Cu", pos:[1.84,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1}],
    bondType:"Ionska", geometry:"Kubna",
    description:"Crveni mineral kuprit.",
    uses:"Fungicid, boje, poluvodič"
  },
  {
    formula:"Na₂O", name:"Natrijev oksid", ingredients:{Na:2, O:1},
    atoms:[
      {el:"Na", pos:[-2.0,0,0]},
      {el:"O", pos:[0,0,0]},
      {el:"Na", pos:[2.0,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1}],
    bondType:"Ionska", geometry:"Antifluoritna kristalna",
    description:"Bijela kruta tvar, nastaje izgaranjem Na.",
    uses:"Staklo, kemijska sinteza"
  },
  {
    formula:"PbO", name:"Olovo(II) oksid (galenit)", ingredients:{Pb:1, O:1},
    atoms:[{el:"Pb", pos:[-1.2,0,0]},{el:"O", pos:[1.2,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristalna",
    description:"Žuti pigment, korišten u staklarstvu.",
    uses:"Kristalno staklo, akumulatori, boje"
  },
  {
    formula:"SnO₂", name:"Kositrov(IV) oksid (kasiterit)", ingredients:{Sn:1, O:2},
    atoms:[
      {el:"O", pos:[-1.0,0,0]},
      {el:"Sn", pos:[0,0,0]},
      {el:"O", pos:[1.0,0,0]}
    ],
    bonds:[{from:1,to:0,type:1},{from:1,to:2,type:1}],
    bondType:"Ionska", geometry:"Rutilna",
    description:"Bijeli oksid kositra, mineral kasiterit.",
    uses:"Poluvodič, boje za keramiku, optika"
  },
  {
    formula:"P₂O₅", name:"Fosforov pentoksid", ingredients:{P:2, O:5},
    atoms:[
      {el:"P", pos:[-1.5,0,0]},
      {el:"P", pos:[1.5,0,0]},
      {el:"O", pos:[0,0,0]},
      {el:"O", pos:[-2.5,1.0,0]},
      {el:"O", pos:[-2.5,-1.0,0]},
      {el:"O", pos:[2.5,1.0,0]},
      {el:"O", pos:[2.5,-1.0,0]}
    ],
    bonds:[{from:0,to:2,type:1},{from:1,to:2,type:1},{from:0,to:3,type:2},{from:0,to:4,type:1},{from:1,to:5,type:2},{from:1,to:6,type:1}],
    bondType:"Kovalentna", geometry:"Tetaedarska oko P",
    description:"Moćan dehidracijski agens.",
    uses:"Sušenje plinova, sinteza fosforne kiseline"
  },

  // ── Hidroksidi ───────────────────────────────────────────────────────────
  {
    formula:"Mg(OH)₂", name:"Magnezijev hidroksid (magnezijevo mlijeko)", ingredients:{Mg:1, O:2, H:2},
    atoms:[
      {el:"Mg", pos:[0,0,0]},
      {el:"O", pos:[2.0,0,0]},
      {el:"O", pos:[-2.0,0,0]},
      {el:"H", pos:[2.96,0,0]},
      {el:"H", pos:[-2.96,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:1,to:3,type:1},{from:2,to:4,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Linearna",
    description:"Blaga baza, koristi se kao antacid.",
    uses:"Antacid, leksativ, usporivač gorenja"
  },
  {
    formula:"Fe(OH)₂", name:"Željezo(II) hidroksid", ingredients:{Fe:1, O:2, H:2},
    atoms:[
      {el:"Fe", pos:[0,0,0]},
      {el:"O", pos:[2.0,0,0]},
      {el:"O", pos:[-2.0,0,0]},
      {el:"H", pos:[2.96,0,0]},
      {el:"H", pos:[-2.96,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:1,to:3,type:1},{from:2,to:4,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Oktaedarska",
    description:"Zeleni talog, oksidira na zraku u Fe(OH)₃.",
    uses:"Pigmenti, analitička kemija"
  },
  {
    formula:"Fe(OH)₃", name:"Željezo(III) hidroksid", ingredients:{Fe:1, O:3, H:3},
    atoms:[
      {el:"Fe", pos:[0,0,0]},
      {el:"O", pos:[1.8,0,0]},
      {el:"O", pos:[-0.9,1.56,0]},
      {el:"O", pos:[-0.9,-1.56,0]},
      {el:"H", pos:[2.76,0,0]},
      {el:"H", pos:[-1.86,1.56,0]},
      {el:"H", pos:[-1.86,-1.56,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:1,to:4,type:1},{from:2,to:5,type:1},{from:3,to:6,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Oktaedarska",
    description:"Crveno-smeđi talog, hrđa u vlažnoj sredini.",
    uses:"Pigmenti (Venecijansko crvena), analitika"
  },
  {
    formula:"Al(OH)₃", name:"Aluminijev hidroksid", ingredients:{Al:1, O:3, H:3},
    atoms:[
      {el:"Al", pos:[0,0,0]},
      {el:"O", pos:[1.7,0,0]},
      {el:"O", pos:[-0.85,1.47,0]},
      {el:"O", pos:[-0.85,-1.47,0]},
      {el:"H", pos:[2.66,0,0]},
      {el:"H", pos:[-1.81,1.47,0]},
      {el:"H", pos:[-1.81,-1.47,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:1,to:4,type:1},{from:2,to:5,type:1},{from:3,to:6,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Oktaedarska",
    description:"Amfoterna baza, neutralizira i kiseline i luge.",
    uses:"Antacid, prečišćavanje vode, keramika"
  },
  {
    formula:"Cu(OH)₂", name:"Bakrov(II) hidroksid", ingredients:{Cu:1, O:2, H:2},
    atoms:[
      {el:"Cu", pos:[0,0,0]},
      {el:"O", pos:[2.0,0,0]},
      {el:"O", pos:[-2.0,0,0]},
      {el:"H", pos:[2.96,0,0]},
      {el:"H", pos:[-2.96,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:1,to:3,type:1},{from:2,to:4,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Kvadratno planarna",
    description:"Plavi talog, koristi se u fungicidima.",
    uses:"Fungicidi, katalizator"
  },
  {
    formula:"Zn(OH)₂", name:"Cinkov hidroksid", ingredients:{Zn:1, O:2, H:2},
    atoms:[
      {el:"Zn", pos:[0,0,0]},
      {el:"O", pos:[2.0,0,0]},
      {el:"O", pos:[-2.0,0,0]},
      {el:"H", pos:[2.96,0,0]},
      {el:"H", pos:[-2.96,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:1,to:3,type:1},{from:2,to:4,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Tetraedarska",
    description:"Bijeli talog, amfotern poput Al(OH)₃.",
    uses:"Kozmetika, farmaceutika"
  },

  // ── Sulfati ──────────────────────────────────────────────────────────────
  {
    formula:"Na₂SO₄", name:"Natrijev sulfat (Glauberova sol)", ingredients:{Na:2, S:1, O:4},
    atoms:[
      {el:"Na", pos:[-3.0,0,0]},
      {el:"Na", pos:[3.0,0,0]},
      {el:"S", pos:[0,0,0]},
      {el:"O", pos:[0,1.43,0]},
      {el:"O", pos:[0,-1.43,0]},
      {el:"O", pos:[1.4,0,0.7]},
      {el:"O", pos:[-1.4,0,0.7]}
    ],
    bonds:[{from:2,to:3,type:2},{from:2,to:4,type:2},{from:2,to:5,type:1},{from:2,to:6,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Tetraedarska oko S",
    description:"Glauberova sol, laksativ i industrijska kemikalija.",
    uses:"Papir, staklo, deterdženti"
  },
  {
    formula:"K₂SO₄", name:"Kalijev sulfat", ingredients:{K:2, S:1, O:4},
    atoms:[
      {el:"K", pos:[-3.2,0,0]},
      {el:"K", pos:[3.2,0,0]},
      {el:"S", pos:[0,0,0]},
      {el:"O", pos:[0,1.43,0]},
      {el:"O", pos:[0,-1.43,0]},
      {el:"O", pos:[1.4,0,0.7]},
      {el:"O", pos:[-1.4,0,0.7]}
    ],
    bonds:[{from:2,to:3,type:2},{from:2,to:4,type:2},{from:2,to:5,type:1},{from:2,to:6,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Tetraedarska oko S",
    description:"Bijela sol, bezklorna kalijeva sol za gnojiva.",
    uses:"Gnojivo, staklarstvo, prehrambena industrija"
  },
  {
    formula:"MgSO₄", name:"Magnezijev sulfat (gorka sol)", ingredients:{Mg:1, S:1, O:4},
    atoms:[
      {el:"Mg", pos:[-2.5,0,0]},
      {el:"S", pos:[0,0,0]},
      {el:"O", pos:[0,1.43,0]},
      {el:"O", pos:[0,-1.43,0]},
      {el:"O", pos:[1.4,0,0.7]},
      {el:"O", pos:[-1.4,0,0.7]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:2},{from:1,to:4,type:1},{from:1,to:5,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Tetraedarska oko S",
    description:"Epsomova sol, opušta mišiće u kupkama.",
    uses:"Medicina, gnojivo, beton"
  },
  {
    formula:"CaSO₄", name:"Kalcijev sulfat (gips)", ingredients:{Ca:1, S:1, O:4},
    atoms:[
      {el:"Ca", pos:[-2.7,0,0]},
      {el:"S", pos:[0,0,0]},
      {el:"O", pos:[0,1.43,0]},
      {el:"O", pos:[0,-1.43,0]},
      {el:"O", pos:[1.4,0,0.7]},
      {el:"O", pos:[-1.4,0,0.7]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:2},{from:1,to:4,type:1},{from:1,to:5,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Tetraedarska oko S",
    description:"Gips, anhidrit. Pečeni gips stvrdnjuje s vodom.",
    uses:"Gips za lomove, žbuka, tofu"
  },
  {
    formula:"FeSO₄", name:"Željezo(II) sulfat (zelena galica)", ingredients:{Fe:1, S:1, O:4},
    atoms:[
      {el:"Fe", pos:[-2.5,0,0]},
      {el:"S", pos:[0,0,0]},
      {el:"O", pos:[0,1.43,0]},
      {el:"O", pos:[0,-1.43,0]},
      {el:"O", pos:[1.4,0,0.7]},
      {el:"O", pos:[-1.4,0,0.7]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:2},{from:1,to:4,type:1},{from:1,to:5,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Tetraedarska oko S",
    description:"Zelena galica, suplement željeza.",
    uses:"Gnojivo, tinta, obrada voda"
  },
  {
    formula:"ZnSO₄", name:"Cinkov sulfat (bijela galica)", ingredients:{Zn:1, S:1, O:4},
    atoms:[
      {el:"Zn", pos:[-2.5,0,0]},
      {el:"S", pos:[0,0,0]},
      {el:"O", pos:[0,1.43,0]},
      {el:"O", pos:[0,-1.43,0]},
      {el:"O", pos:[1.4,0,0.7]},
      {el:"O", pos:[-1.4,0,0.7]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:2},{from:1,to:4,type:1},{from:1,to:5,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Tetraedarska oko S",
    description:"Bijela galica, suplement cinka.",
    uses:"Gnojivo, medicine, tiskanje tkanina"
  },
  {
    formula:"Al₂(SO₄)₃", name:"Aluminijev sulfat", ingredients:{Al:2, S:3, O:12},
    atoms:[
      {el:"Al", pos:[-3.0,0,0]},
      {el:"Al", pos:[3.0,0,0]},
      {el:"S", pos:[0,1.5,0]},
      {el:"S", pos:[-1.5,-1.0,0]},
      {el:"S", pos:[1.5,-1.0,0]},
      {el:"O", pos:[0,2.93,0]},
      {el:"O", pos:[-1.5,-2.43,0]},
      {el:"O", pos:[1.5,-2.43,0]}
    ],
    bonds:[{from:2,to:5,type:2},{from:3,to:6,type:2},{from:4,to:7,type:2}],
    bondType:"Ionska + kovalentna", geometry:"Oktaedarska oko Al",
    description:"Stipsa, flokulant za pročišćavanje vode.",
    uses:"Pročišćavanje vode, kožarstvo, papir"
  },

  // ── Sulfidi ──────────────────────────────────────────────────────────────
  {
    formula:"Na₂S", name:"Natrijev sulfid", ingredients:{Na:2, S:1},
    atoms:[
      {el:"Na", pos:[-2.0,0,0]},
      {el:"S", pos:[0,0,0]},
      {el:"Na", pos:[2.0,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1}],
    bondType:"Ionska", geometry:"Antifluoritna kristalna",
    description:"Žuta do crvena sol, miris H₂S.",
    uses:"Kožarstvo, tekstil, fotograf. emulzije"
  },
  {
    formula:"FeS", name:"Željezo(II) sulfid", ingredients:{Fe:1, S:1},
    atoms:[{el:"Fe", pos:[-1.0,0,0]},{el:"S", pos:[1.0,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska/kovalentna", geometry:"Nikelin (heksagonska)",
    description:"Crni mineral troilit.",
    uses:"Sinteza, vatromet, lubrikansi"
  },
  {
    formula:"FeS₂", name:"Željezni disulfid (pirit)", ingredients:{Fe:1, S:2},
    atoms:[
      {el:"S", pos:[0,-1.18,0]},
      {el:"Fe", pos:[0,0,0]},
      {el:"S", pos:[0,1.18,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1}],
    bondType:"Ionska/kovalentna", geometry:"Kubna (pirit)",
    description:"Zlatni pirit, 'zlato budala'. Kuban kristal.",
    uses:"Sinteza H₂SO₄, elektronika"
  },
  {
    formula:"ZnS", name:"Cinkov sulfid (sfalerit)", ingredients:{Zn:1, S:1},
    atoms:[{el:"Zn", pos:[-1.0,0,0]},{el:"S", pos:[1.0,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Kovalentna/ionska", geometry:"Sfaleritna (kubna)",
    description:"Mineral sfalerit, najvažnija ruda cinka.",
    uses:"Ekstrakcija cinka, luminofori, poluvodiči"
  },
  {
    formula:"CuS", name:"Bakrov(II) sulfid (kovelin)", ingredients:{Cu:1, S:1},
    atoms:[{el:"Cu", pos:[-1.0,0,0]},{el:"S", pos:[1.0,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Kovalentna/ionska", geometry:"Heksagonska",
    description:"Mineral kovelin, indigo-plav.",
    uses:"Bakarna ruda, poluvodič"
  },
  {
    formula:"PbS", name:"Olovo(II) sulfid (galenit)", ingredients:{Pb:1, S:1},
    atoms:[{el:"Pb", pos:[-1.5,0,0]},{el:"S", pos:[1.5,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristalna (FCC)",
    description:"Mineral galenit, najvažnija ruda olova.",
    uses:"Ekstrakcija olova, poluvodič"
  },

  // ── Nitrati ──────────────────────────────────────────────────────────────
  {
    formula:"NaNO₃", name:"Natrijev nitrat (čilska šalitra)", ingredients:{Na:1, N:1, O:3},
    atoms:[
      {el:"Na", pos:[-2.7,0,0]},
      {el:"N", pos:[0,0,0]},
      {el:"O", pos:[1.21,0.42,0]},
      {el:"O", pos:[-1.21,0.42,0]},
      {el:"O", pos:[0,-1.27,0]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:1},{from:1,to:4,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Trigonska planarna (NO₃⁻)",
    description:"Čilska šalitra, topivo gnojivo.",
    uses:"Gnojivo, hrana (konzervans E251), pirotehnija"
  },
  {
    formula:"KNO₃", name:"Kalijev nitrat (kalijev šalitra)", ingredients:{K:1, N:1, O:3},
    atoms:[
      {el:"K", pos:[-2.9,0,0]},
      {el:"N", pos:[0,0,0]},
      {el:"O", pos:[1.21,0.42,0]},
      {el:"O", pos:[-1.21,0.42,0]},
      {el:"O", pos:[0,-1.27,0]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:1},{from:1,to:4,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Trigonska planarna (NO₃⁻)",
    description:"Salitre, sastavnica baruta.",
    uses:"Barut, gnojivo, konzervans mesa"
  },
  {
    formula:"NH₄NO₃", name:"Amonijev nitrat", ingredients:{N:2, H:4, O:3},
    atoms:[
      {el:"N", pos:[-2.0,0,0]},
      {el:"H", pos:[-2.63,0.63,0.63]},
      {el:"H", pos:[-2.63,-0.63,-0.63]},
      {el:"H", pos:[-2.63,0.63,-0.63]},
      {el:"H", pos:[-2.63,-0.63,0.63]},
      {el:"N", pos:[0.5,0,0]},
      {el:"O", pos:[1.71,0.42,0]},
      {el:"O", pos:[-0.71,0.42,0]},
      {el:"O", pos:[0.5,-1.27,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1},{from:5,to:6,type:2},{from:5,to:7,type:1},{from:5,to:8,type:1}],
    bondType:"Ionska (NH₄⁺ NO₃⁻)", geometry:"Tetraedar + trigonska planarna",
    description:"Bijela sol, jako gnojivo i oksidans.",
    uses:"Gnojivo ANFO, eksplozivi"
  },
  {
    formula:"NaNO₂", name:"Natrijev nitrit", ingredients:{Na:1, N:1, O:2},
    atoms:[
      {el:"Na", pos:[-2.5,0,0]},
      {el:"N", pos:[0,0.2,0]},
      {el:"O", pos:[1.1,-0.5,0]},
      {el:"O", pos:[-1.1,-0.5,0]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Savijena (NO₂⁻)",
    description:"Sol nitrozne kiseline, oksidans.",
    uses:"Konzervans mesa (E250), bojenje"
  },

  // ── Karbonati ────────────────────────────────────────────────────────────
  {
    formula:"MgCO₃", name:"Magnezijev karbonat (magnezit)", ingredients:{Mg:1, C:1, O:3},
    atoms:[
      {el:"Mg", pos:[-2.5,0,0]},
      {el:"C", pos:[0,0,0]},
      {el:"O", pos:[0,1.27,0]},
      {el:"O", pos:[1.16,-0.66,0]},
      {el:"O", pos:[-1.16,-0.66,0]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:1},{from:1,to:4,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Trigonska planarna",
    description:"Mineral magnezit, bijela kruta tvar.",
    uses:"Vatrostalni materijal, antacid, gimnastika"
  },
  {
    formula:"K₂CO₃", name:"Kalijev karbonat (potaša)", ingredients:{K:2, C:1, O:3},
    atoms:[
      {el:"K", pos:[-2.7,0.5,0]},
      {el:"K", pos:[2.7,0.5,0]},
      {el:"C", pos:[0,0,0]},
      {el:"O", pos:[0,1.27,0]},
      {el:"O", pos:[1.16,-0.66,0]},
      {el:"O", pos:[-1.16,-0.66,0]}
    ],
    bonds:[{from:2,to:3,type:2},{from:2,to:4,type:1},{from:2,to:5,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Trigonska planarna",
    description:"Potaša, dobivena iz pepela drva.",
    uses:"Staklarstvo, sapun, kakao"
  },
  {
    formula:"FeCO₃", name:"Željezov(II) karbonat (siderit)", ingredients:{Fe:1, C:1, O:3},
    atoms:[
      {el:"Fe", pos:[-2.5,0,0]},
      {el:"C", pos:[0,0,0]},
      {el:"O", pos:[0,1.27,0]},
      {el:"O", pos:[1.16,-0.66,0]},
      {el:"O", pos:[-1.16,-0.66,0]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:1},{from:1,to:4,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Trigonska planarna",
    description:"Mineral siderit, ruda željeza.",
    uses:"Ruda željeza, gemolog"
  },

  // ── Fosfati ──────────────────────────────────────────────────────────────
  {
    formula:"Na₃PO₄", name:"Trinatrijev fosfat (TSP)", ingredients:{Na:3, P:1, O:4},
    atoms:[
      {el:"Na", pos:[-3.0,0,0]},
      {el:"Na", pos:[3.0,0,0]},
      {el:"Na", pos:[0,3.0,0]},
      {el:"P", pos:[0,0,0]},
      {el:"O", pos:[0,1.5,0]},
      {el:"O", pos:[1.4,-0.5,0]},
      {el:"O", pos:[-0.7,-0.5,1.21]},
      {el:"O", pos:[-0.7,-0.5,-1.21]}
    ],
    bonds:[{from:3,to:4,type:2},{from:3,to:5,type:1},{from:3,to:6,type:1},{from:3,to:7,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Tetraedarska oko P",
    description:"Trinatrijev fosfat, jako alkalna sol.",
    uses:"Čišćenje, deterdženti, obrада metala"
  },
  {
    formula:"Ca₃(PO₄)₂", name:"Kalcijev fosfat (apatit)", ingredients:{Ca:3, P:2, O:8},
    atoms:[
      {el:"Ca", pos:[-3.0,0,0]},
      {el:"Ca", pos:[0,2.5,0]},
      {el:"Ca", pos:[3.0,0,0]},
      {el:"P", pos:[-1.2,-1.0,0]},
      {el:"P", pos:[1.2,-1.0,0]},
      {el:"O", pos:[-1.2,-2.5,0]},
      {el:"O", pos:[1.2,-2.5,0]},
      {el:"O", pos:[0,-0.5,0]}
    ],
    bonds:[{from:3,to:5,type:2},{from:3,to:7,type:1},{from:4,to:6,type:2},{from:4,to:7,type:1}],
    bondType:"Ionska + kovalentna", geometry:"Kompleksna kristalna",
    description:"Mineral apatit, gradivni dio kosti i zubi.",
    uses:"Gnojivo, keramika, zubna pasta"
  },

  // ── Kiseline ─────────────────────────────────────────────────────────────
  {
    formula:"H₂SO₃", name:"Sumporna kiselina (IV)", ingredients:{H:2, S:1, O:3},
    atoms:[
      {el:"S", pos:[0,0,0]},
      {el:"O", pos:[0,1.43,0]},
      {el:"O", pos:[1.3,-0.7,0]},
      {el:"O", pos:[-1.3,-0.7,0]},
      {el:"H", pos:[2.0,-0.7,0]},
      {el:"H", pos:[-2.0,-0.7,0]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:2,to:4,type:1},{from:3,to:5,type:1}],
    bondType:"Polarna kovalentna", geometry:"Piramidalna",
    description:"Slaba kiselina, nastaje otapanjem SO₂ u vodi.",
    uses:"Konzerviranje vina, industrija papira"
  },
  {
    formula:"H₃BO₃", name:"Borna kiselina", ingredients:{H:3, B:1, O:3},
    atoms:[
      {el:"B", pos:[0,0,0]},
      {el:"O", pos:[1.37,0,0]},
      {el:"O", pos:[-0.69,1.19,0]},
      {el:"O", pos:[-0.69,-1.19,0]},
      {el:"H", pos:[2.33,0,0]},
      {el:"H", pos:[-1.65,1.19,0]},
      {el:"H", pos:[-1.65,-1.19,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:1,to:4,type:1},{from:2,to:5,type:1},{from:3,to:6,type:1}],
    bondType:"Kovalentna", geometry:"Trigonska planarna",
    description:"Antiseptična kiselina, nalazi se u morskoj vodi.",
    uses:"Antiseptik, staklo, nuklearna tehnika"
  },
  {
    formula:"HClO", name:"Klorovodična kiselina (HOCl)", ingredients:{H:1, Cl:1, O:1},
    atoms:[
      {el:"H", pos:[-1.7,0,0]},
      {el:"O", pos:[-0.69,0,0]},
      {el:"Cl", pos:[1.0,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1}],
    bondType:"Polarna kovalentna", geometry:"Savijena",
    description:"Hipoklorozna kiselina, snažni dezinficijens.",
    uses:"Dezinfekcija vode, izbjeljivanje, antiseptici"
  },

  // ── Organski spojevi ─────────────────────────────────────────────────────
  {
    formula:"HCOOH", name:"Mravlja kiselina (metanska kiselina)", ingredients:{H:2, C:1, O:2},
    atoms:[
      {el:"H", pos:[-1.1,0,0]},
      {el:"C", pos:[0,0,0]},
      {el:"O", pos:[0.6,1.2,0]},
      {el:"O", pos:[0.6,-1.0,0]},
      {el:"H", pos:[1.56,-1.0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:2},{from:1,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Polarna kovalentna", geometry:"Planarna",
    description:"Najjednostavnija karboksilna kiselina, u ubodu mrava.",
    uses:"Konzervans hrane, kožarstvo, tekstil"
  },
  {
    formula:"CH₂O", name:"Formaldehid (metanal)", ingredients:{C:1, H:2, O:1},
    atoms:[
      {el:"C", pos:[0,0,0]},
      {el:"O", pos:[0,1.2,0]},
      {el:"H", pos:[0.94,-0.54,0]},
      {el:"H", pos:[-0.94,-0.54,0]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Polarna kovalentna", geometry:"Trigonska planarna",
    description:"Plin oštrog mirisa, antiseptik i konzervans.",
    uses:"Plastika (fenol-formaldehid), dezinfekcija"
  },
  {
    formula:"C₃H₈", name:"Propan", ingredients:{C:3, H:8},
    atoms:[
      {el:"C", pos:[-1.54,0,0]},
      {el:"C", pos:[0,0,0]},
      {el:"C", pos:[1.54,0,0]},
      {el:"H", pos:[-1.95,1.03,0]},
      {el:"H", pos:[-1.95,-0.51,0.89]},
      {el:"H", pos:[-1.95,-0.51,-0.89]},
      {el:"H", pos:[0,1.09,0]},
      {el:"H", pos:[0,-1.09,0]},
      {el:"H", pos:[1.95,1.03,0]},
      {el:"H", pos:[1.95,-0.51,0.89]},
      {el:"H", pos:[1.95,-0.51,-0.89]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1},{from:0,to:5,type:1},{from:1,to:6,type:1},{from:1,to:7,type:1},{from:2,to:8,type:1},{from:2,to:9,type:1},{from:2,to:10,type:1}],
    bondType:"Nepolarna kovalentna", geometry:"Tetraedarska",
    description:"Treći alkan, UNP plin u bocama.",
    uses:"Plin u bocama za kuhanje, gorivo"
  },
  {
    formula:"(CH₃)₂CO", name:"Aceton (propan-2-on)", ingredients:{C:3, H:6, O:1},
    atoms:[
      {el:"C", pos:[-1.5,0,0]},
      {el:"C", pos:[0,0,0]},
      {el:"C", pos:[1.5,0,0]},
      {el:"O", pos:[0,1.22,0]},
      {el:"H", pos:[-1.9,1.03,0]},
      {el:"H", pos:[-1.9,-0.5,0.89]},
      {el:"H", pos:[-1.9,-0.5,-0.89]},
      {el:"H", pos:[1.9,1.03,0]},
      {el:"H", pos:[1.9,-0.5,0.89]},
      {el:"H", pos:[1.9,-0.5,-0.89]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:1,to:3,type:2},{from:0,to:4,type:1},{from:0,to:5,type:1},{from:0,to:6,type:1},{from:2,to:7,type:1},{from:2,to:8,type:1},{from:2,to:9,type:1}],
    bondType:"Polarna kovalentna", geometry:"Trigonska planarna oko C=O",
    description:"Najjednostavniji keton, hlapivo otapalo.",
    uses:"Otapalo, lak za nokte, plastika"
  },
  {
    formula:"C₆H₅OH", name:"Fenol", ingredients:{C:6, H:6, O:1},
    atoms:[
      {el:"C", pos:[1.4,0,0]},
      {el:"C", pos:[0.7,1.21,0]},
      {el:"C", pos:[-0.7,1.21,0]},
      {el:"C", pos:[-1.4,0,0]},
      {el:"C", pos:[-0.7,-1.21,0]},
      {el:"C", pos:[0.7,-1.21,0]},
      {el:"O", pos:[2.53,0,0]},
      {el:"H", pos:[3.43,0,0]},
      {el:"H", pos:[1.24,2.16,0]},
      {el:"H", pos:[-1.24,2.16,0]},
      {el:"H", pos:[-2.49,0,0]},
      {el:"H", pos:[-1.24,-2.16,0]},
      {el:"H", pos:[1.24,-2.16,0]}
    ],
    bonds:[
      {from:0,to:1,type:2},{from:1,to:2,type:1},{from:2,to:3,type:2},
      {from:3,to:4,type:1},{from:4,to:5,type:2},{from:5,to:0,type:1},
      {from:0,to:6,type:1},{from:6,to:7,type:1},
      {from:1,to:8,type:1},{from:2,to:9,type:1},{from:3,to:10,type:1},
      {from:4,to:11,type:1},{from:5,to:12,type:1}
    ],
    bondType:"Aromatska + kovalentna", geometry:"Planarna (benzenski prsten)",
    description:"Aromatski spoj s OH grupom, karbonska kiselina.",
    uses:"Antiseptik, plastika (Bakelit), lijekovi"
  },

  // ── Dušični spojevi ──────────────────────────────────────────────────────
  {
    formula:"(NH₄)₂SO₄", name:"Amonijev sulfat", ingredients:{N:2, H:8, S:1, O:4},
    atoms:[
      {el:"N", pos:[-3.0,0,0]},
      {el:"H", pos:[-3.63,0.63,0.63]},
      {el:"H", pos:[-3.63,-0.63,-0.63]},
      {el:"H", pos:[-3.63,0.63,-0.63]},
      {el:"H", pos:[-3.63,-0.63,0.63]},
      {el:"N", pos:[3.0,0,0]},
      {el:"H", pos:[3.63,0.63,0.63]},
      {el:"H", pos:[3.63,-0.63,-0.63]},
      {el:"H", pos:[3.63,0.63,-0.63]},
      {el:"H", pos:[3.63,-0.63,0.63]},
      {el:"S", pos:[0,0,0]},
      {el:"O", pos:[0,1.43,0]},
      {el:"O", pos:[0,-1.43,0]},
      {el:"O", pos:[1.4,0,0.7]},
      {el:"O", pos:[-1.4,0,0.7]}
    ],
    bonds:[
      {from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1},
      {from:5,to:6,type:1},{from:5,to:7,type:1},{from:5,to:8,type:1},{from:5,to:9,type:1},
      {from:10,to:11,type:2},{from:10,to:12,type:2},{from:10,to:13,type:1},{from:10,to:14,type:1}
    ],
    bondType:"Ionska (2×NH₄⁺ SO₄²⁻)", geometry:"Dva tetraedra + SO₄",
    description:"Bijela sol, jedno od najvažnijih gnojiva.",
    uses:"Gnojivo (21% N), vatrostalni materijali"
  },

  // ── Plemeniti plinovi (egzotični/teorijski spojevi) ───────────────────────
  {
    formula:"HeH⁺", name:"Helijev hidrid (ion)", ingredients:{He:1, H:1},
    atoms:[{el:"He", pos:[-0.5,0,0]},{el:"H", pos:[0.5,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Kovalentna (kation)", geometry:"Linearna",
    description:"Prva molekula u svemiru, otkrivena u svemirskim maglicama 2019.",
    uses:"Astrokemija, istraživanja"
  },
  {
    formula:"NeH⁺", name:"Neonov hidrid (ion)", ingredients:{Ne:1, H:1},
    atoms:[{el:"Ne", pos:[-0.5,0,0]},{el:"H", pos:[0.5,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Slaba kovalentna (kation)", geometry:"Linearna",
    description:"Vrlo nestabilan ion, opažen u masenoj spektrometriji.",
    uses:"Znanstvena istraživanja"
  },
  {
    formula:"HArF", name:"Argonov fluorohidrid", ingredients:{H:1, Ar:1, F:1},
    atoms:[{el:"H", pos:[-1.4,0,0]},{el:"Ar", pos:[0,0,0]},{el:"F", pos:[1.4,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1}],
    bondType:"Kovalentna", geometry:"Linearna",
    description:"Prvi neutralni argonov spoj, sintetiziran 2000. (Helsinki).",
    uses:"Istraživanja kemije plemenitih plinova"
  },
  {
    formula:"KrF₂", name:"Kriptonov difluorid", ingredients:{Kr:1, F:2},
    atoms:[{el:"Kr", pos:[0,0,0]},{el:"F", pos:[1.88,0,0]},{el:"F", pos:[-1.88,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Kovalentna", geometry:"Linearna",
    description:"Bijela krutina, jako oksidacijsko sredstvo, raspada se na zraku.",
    uses:"Sinteza viših oksidacijskih stanja"
  },
  {
    formula:"XeF₂", name:"Ksenonov difluorid", ingredients:{Xe:1, F:2},
    atoms:[{el:"Xe", pos:[0,0,0]},{el:"F", pos:[2.0,0,0]},{el:"F", pos:[-2.0,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Kovalentna", geometry:"Linearna",
    description:"Stabilan kristalan spoj, klasičan primjer da plemeniti plinovi mogu reagirati.",
    uses:"Fluoriranje u organskoj sintezi"
  },
  {
    formula:"XeO₃", name:"Ksenonov trioksid", ingredients:{Xe:1, O:3},
    atoms:[
      {el:"Xe", pos:[0,0,0]},
      {el:"O", pos:[1.4,0.6,0]},
      {el:"O", pos:[-1.4,0.6,0]},
      {el:"O", pos:[0,-0.9,1.2]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2},{from:0,to:3,type:2}],
    bondType:"Kovalentna", geometry:"Trigonalno piramidalna",
    description:"Eksplozivan u krutom stanju, vrlo jako oksidacijsko sredstvo.",
    uses:"Laboratorijsko oksidacijsko sredstvo"
  },
  {
    formula:"RnF₂", name:"Radonov difluorid", ingredients:{Rn:1, F:2},
    atoms:[{el:"Rn", pos:[0,0,0]},{el:"F", pos:[2.1,0,0]},{el:"F", pos:[-2.1,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Kovalentna/ionska", geometry:"Linearna",
    description:"Jedini poznati radonov spoj, nastaje pri sobnoj temperaturi.",
    uses:"Istraživanja"
  },
  {
    formula:"OgF₄", name:"Oganesonov tetrafluorid (predviđen)", ingredients:{Og:1, F:4},
    atoms:[
      {el:"Og", pos:[0,0,0]},
      {el:"F", pos:[1.4,1.4,1.4]},{el:"F", pos:[-1.4,-1.4,1.4]},
      {el:"F", pos:[-1.4,1.4,-1.4]},{el:"F", pos:[1.4,-1.4,-1.4]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1}],
    bondType:"Kovalentna (predviđena)", geometry:"Tetraedarska",
    description:"Teorijski predviđen spoj — Og bi trebao biti kemijski reaktivan.",
    uses:"Teorijska istraživanja"
  },

  // ── Alkalijski metali (Rb, Cs, Fr) ────────────────────────────────────────
  {
    formula:"RbCl", name:"Rubidijev klorid", ingredients:{Rb:1, Cl:1},
    atoms:[{el:"Rb", pos:[-1.5,0,0]},{el:"Cl", pos:[1.5,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristal (FCC)",
    description:"Bezbojna sol, slična NaCl, dobro topljiva u vodi.",
    uses:"Biokemijska istraživanja, elektrolit"
  },
  {
    formula:"Rb₂O", name:"Rubidijev oksid", ingredients:{Rb:2, O:1},
    atoms:[{el:"Rb", pos:[-1.7,0,0]},{el:"O", pos:[0,0,0]},{el:"Rb", pos:[1.7,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1}],
    bondType:"Ionska", geometry:"Linearna (idealizirano)",
    description:"Žućkasta krutina koja burno reagira s vodom.",
    uses:"Reagens"
  },
  {
    formula:"CsCl", name:"Cezijev klorid", ingredients:{Cs:1, Cl:1},
    atoms:[{el:"Cs", pos:[-1.6,0,0]},{el:"Cl", pos:[1.6,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristal (CsCl tip)",
    description:"Klasični primjer kristalne strukture s koordinacijom 8.",
    uses:"Centrifugiranje DNA, optika"
  },
  {
    formula:"CsOH", name:"Cezijev hidroksid", ingredients:{Cs:1, O:1, H:1},
    atoms:[{el:"Cs", pos:[-1.7,0,0]},{el:"O", pos:[0,0,0]},{el:"H", pos:[1.0,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1}],
    bondType:"Ionska/kovalentna", geometry:"Linearna",
    description:"Najjača poznata baza, izrazito jeziva.",
    uses:"Snažni laboratorijski reagens"
  },
  {
    formula:"FrCl", name:"Francijev klorid", ingredients:{Fr:1, Cl:1},
    atoms:[{el:"Fr", pos:[-1.7,0,0]},{el:"Cl", pos:[1.7,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristal",
    description:"Vrlo rijedak i radioaktivan spoj, znamo ga samo iz ultramalih količina.",
    uses:"Znanstvena istraživanja"
  },

  // ── Zemnoalkalijski (Be, Sr, Ra) ──────────────────────────────────────────
  {
    formula:"BeO", name:"Berilijev oksid", ingredients:{Be:1, O:1},
    atoms:[{el:"Be", pos:[-0.7,0,0]},{el:"O", pos:[0.7,0,0]}],
    bonds:[{from:0,to:1,type:2}],
    bondType:"Kovalentna/ionska", geometry:"Heksagonalni kristal",
    description:"Visoko vatrostalna keramika s izvrsnom toplinskom vodljivošću.",
    uses:"Elektronika, vatrostalni materijali (otrovan!)"
  },
  {
    formula:"BeF₂", name:"Berilijev fluorid", ingredients:{Be:1, F:2},
    atoms:[{el:"Be", pos:[0,0,0]},{el:"F", pos:[1.55,0,0]},{el:"F", pos:[-1.55,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Polarna kovalentna", geometry:"Linearna",
    description:"Staklasta krutina, koristi se u nuklearnim reaktorima na rastaljene soli.",
    uses:"Nuklearna tehnologija"
  },
  {
    formula:"SrCl₂", name:"Stroncijev klorid", ingredients:{Sr:1, Cl:2},
    atoms:[{el:"Sr", pos:[0,0,0]},{el:"Cl", pos:[2.0,0.6,0]},{el:"Cl", pos:[-2.0,0.6,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Ionska", geometry:"Savijena (u plinu)",
    description:"Bezbojna sol, daje crvenu boju plamenu.",
    uses:"Vatromet, paste za osjetljive zube"
  },
  {
    formula:"SrCO₃", name:"Stroncijev karbonat", ingredients:{Sr:1, C:1, O:3},
    atoms:[
      {el:"Sr", pos:[-2.5,0,0]},
      {el:"C", pos:[0.5,0,0]},
      {el:"O", pos:[1.7,0.7,0]},{el:"O", pos:[1.7,-0.7,0]},{el:"O", pos:[-0.6,0,0]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:1},{from:1,to:4,type:1}],
    bondType:"Ionska (Sr²⁺ CO₃²⁻)", geometry:"Trigonalno planarni anion",
    description:"Bijela krutina iz mineralostroncijanita.",
    uses:"Vatromet (crvena), keramika, magneti"
  },
  {
    formula:"RaCl₂", name:"Radijev klorid", ingredients:{Ra:1, Cl:2},
    atoms:[{el:"Ra", pos:[0,0,0]},{el:"Cl", pos:[2.1,0.6,0]},{el:"Cl", pos:[-2.1,0.6,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Ionska", geometry:"Savijena (u plinu)",
    description:"Prvi izolirani radijev spoj (Curiejevi, 1902.). Svijetli u mraku.",
    uses:"Povijesna upotreba u medicini, danas istraživanja"
  },
  {
    formula:"RaSO₄", name:"Radijev sulfat", ingredients:{Ra:1, S:1, O:4},
    atoms:[
      {el:"Ra", pos:[-3.0,0,0]},
      {el:"S", pos:[0.5,0,0]},
      {el:"O", pos:[0.5,1.5,0]},{el:"O", pos:[0.5,-1.5,0]},
      {el:"O", pos:[2.0,0,0]},{el:"O", pos:[-1.0,0,0.5]}
    ],
    bonds:[{from:1,to:2,type:2},{from:1,to:3,type:2},{from:1,to:4,type:1},{from:1,to:5,type:1}],
    bondType:"Ionska (Ra²⁺ SO₄²⁻)", geometry:"Tetraedarski anion",
    description:"Najnetopljiviji sulfat, izrazito radioaktivan.",
    uses:"Povijesno: izvor radija"
  },

  // ── Polumetali i nemetali ─────────────────────────────────────────────────
  {
    formula:"SeO₂", name:"Selenov dioksid", ingredients:{Se:1, O:2},
    atoms:[{el:"Se", pos:[0,0,0]},{el:"O", pos:[1.6,0.5,0]},{el:"O", pos:[-1.6,0.5,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Polarna kovalentna", geometry:"Savijena (~125°)",
    description:"Bijela krutina koja sublimira; oksidacijsko sredstvo.",
    uses:"Sinteze, pigment, analiza"
  },
  {
    formula:"H₂Se", name:"Vodikov selenid", ingredients:{H:2, Se:1},
    atoms:[{el:"Se", pos:[0,0,0]},{el:"H", pos:[1.2,0.7,0]},{el:"H", pos:[-1.2,0.7,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Polarna kovalentna", geometry:"Savijena (~91°)",
    description:"Otrovan, smrdljiv plin (gore od H₂S).",
    uses:"Doping poluvodiča"
  },
  {
    formula:"GeO₂", name:"Germanijev dioksid", ingredients:{Ge:1, O:2},
    atoms:[{el:"Ge", pos:[0,0,0]},{el:"O", pos:[1.7,0,0]},{el:"O", pos:[-1.7,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Polarna kovalentna", geometry:"Linearna (u plinu)",
    description:"Bijeli prah, glavna ruda germanija.",
    uses:"Optička vlakna, IR leće, katalizator"
  },
  {
    formula:"GeH₄", name:"German (germanijev hidrid)", ingredients:{Ge:1, H:4},
    atoms:[
      {el:"Ge", pos:[0,0,0]},
      {el:"H", pos:[1,1,1]},{el:"H", pos:[-1,-1,1]},
      {el:"H", pos:[-1,1,-1]},{el:"H", pos:[1,-1,-1]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1}],
    bondType:"Kovalentna", geometry:"Tetraedarska",
    description:"Bezbojan otrovan plin, analog metana.",
    uses:"CVD postupak za poluvodiče"
  },
  {
    formula:"As₂O₃", name:"Arsen(III) oksid", ingredients:{As:2, O:3},
    atoms:[
      {el:"O", pos:[-3,0,0]},{el:"As", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},
      {el:"As", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Kovalentna", geometry:"Klasterska (As₄O₆)",
    description:"Bijeli arsen — otrovan, povijesno je 'kralj otrova'.",
    uses:"Liječenje leukemije, povijesno: pesticid"
  },
  {
    formula:"AsH₃", name:"Arsin", ingredients:{As:1, H:3},
    atoms:[
      {el:"As", pos:[0,0,0]},
      {el:"H", pos:[1.2,-0.4,0]},{el:"H", pos:[-0.6,-0.4,1.04]},{el:"H", pos:[-0.6,-0.4,-1.04]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Kovalentna", geometry:"Trigonalno piramidalna",
    description:"Smrtonosan plin, povijesno detektiran Marshovim testom.",
    uses:"Industrija poluvodiča"
  },
  {
    formula:"Sb₂O₃", name:"Antimon(III) oksid", ingredients:{Sb:2, O:3},
    atoms:[
      {el:"O", pos:[-3,0,0]},{el:"Sb", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},
      {el:"Sb", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Kovalentna/ionska", geometry:"Klasterska (Sb₄O₆)",
    description:"Bijeli prah, najvažniji antimonov spoj.",
    uses:"Usporivač gorenja u plastici, staklarstvo"
  },
  {
    formula:"SbH₃", name:"Stibin", ingredients:{Sb:1, H:3},
    atoms:[
      {el:"Sb", pos:[0,0,0]},
      {el:"H", pos:[1.2,-0.4,0]},{el:"H", pos:[-0.6,-0.4,1.04]},{el:"H", pos:[-0.6,-0.4,-1.04]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Kovalentna", geometry:"Trigonalno piramidalna",
    description:"Otrovan plin neugodna mirisa.",
    uses:"Industrija poluvodiča"
  },
  {
    formula:"TeO₂", name:"Telurov dioksid", ingredients:{Te:1, O:2},
    atoms:[{el:"Te", pos:[0,0,0]},{el:"O", pos:[1.8,0.6,0]},{el:"O", pos:[-1.8,0.6,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Kovalentna", geometry:"Savijena",
    description:"Bijela krutina, osnova za telurova stakla.",
    uses:"Akustooptika, infracrvena optika"
  },
  {
    formula:"H₂Te", name:"Vodikov telurid", ingredients:{H:2, Te:1},
    atoms:[{el:"Te", pos:[0,0,0]},{el:"H", pos:[1.3,0.7,0]},{el:"H", pos:[-1.3,0.7,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Polarna kovalentna", geometry:"Savijena (~90°)",
    description:"Vrlo nestabilan, otrovan plin neugodnog mirisa.",
    uses:"Sinteza poluvodiča"
  },
  {
    formula:"PoO₂", name:"Polonijev dioksid", ingredients:{Po:1, O:2},
    atoms:[{el:"Po", pos:[0,0,0]},{el:"O", pos:[1.9,0,0]},{el:"O", pos:[-1.9,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Ionska/kovalentna", geometry:"Linearna (idealizirano)",
    description:"Žuto-crvena radioaktivna krutina, najstabilniji oksid Po.",
    uses:"Istraživanja"
  },
  {
    formula:"HAt", name:"Vodikov astatid", ingredients:{H:1, At:1},
    atoms:[{el:"H", pos:[-0.85,0,0]},{el:"At", pos:[0.85,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Slabo polarna kovalentna", geometry:"Linearna",
    description:"Najslabija halogenidna kiselina, vrlo nestabilna.",
    uses:"Istraživanja (At-211 u terapiji raka)"
  },
  {
    formula:"TsF", name:"Tenesinov fluorid (predviđen)", ingredients:{Ts:1, F:1},
    atoms:[{el:"Ts", pos:[-1.1,0,0]},{el:"F", pos:[1.1,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Kovalentna (predviđena)", geometry:"Linearna",
    description:"Teorijski spoj — Ts je sintetski element s vrlo kratkim životom.",
    uses:"Teorijska istraživanja"
  },

  // ── Prijelazni metali (Sc, Ti grupa, V, Co, Ni, Y, Zr, Nb…) ───────────────
  {
    formula:"Sc₂O₃", name:"Skandijev oksid", ingredients:{Sc:2, O:3},
    atoms:[
      {el:"O", pos:[-3,0,0]},{el:"Sc", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},
      {el:"Sc", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Kubična (bixbyit)",
    description:"Bijeli prah, najvažniji skandijev spoj.",
    uses:"Visokokvalitetna keramika, rasvjeta"
  },
  {
    formula:"ScCl₃", name:"Skandijev klorid", ingredients:{Sc:1, Cl:3},
    atoms:[
      {el:"Sc", pos:[0,0,0]},
      {el:"Cl", pos:[2.3,0,0]},{el:"Cl", pos:[-1.15,2.0,0]},{el:"Cl", pos:[-1.15,-2.0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Ionska", geometry:"Trigonalno planarna (u plinu)",
    description:"Bijela higroskopna krutina.",
    uses:"Sinteza Sc spojeva, katalizator"
  },
  {
    formula:"V₂O₅", name:"Vanadijev pentoksid", ingredients:{V:2, O:5},
    atoms:[
      {el:"V", pos:[-1.8,0,0]},{el:"V", pos:[1.8,0,0]},
      {el:"O", pos:[0,0,0]},
      {el:"O", pos:[-3.4,0,0]},{el:"O", pos:[3.4,0,0]},
      {el:"O", pos:[-1.8,1.6,0]},{el:"O", pos:[1.8,1.6,0]}
    ],
    bonds:[
      {from:0,to:2,type:1},{from:1,to:2,type:1},
      {from:0,to:3,type:2},{from:1,to:4,type:2},
      {from:0,to:5,type:1},{from:1,to:6,type:1}
    ],
    bondType:"Kovalentna/ionska", geometry:"Slojevita kristalna",
    description:"Narančasti prah, ključ industrijske proizvodnje sumporne kiseline.",
    uses:"Katalizator (kontaktni proces), V baterije"
  },
  {
    formula:"VOCl₃", name:"Vanadijev oksiklorid", ingredients:{V:1, O:1, Cl:3},
    atoms:[
      {el:"V", pos:[0,0,0]},
      {el:"O", pos:[0,1.6,0]},
      {el:"Cl", pos:[2.0,-0.6,0]},{el:"Cl", pos:[-1.0,-0.6,1.7]},{el:"Cl", pos:[-1.0,-0.6,-1.7]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1}],
    bondType:"Kovalentna", geometry:"Tetraedarska",
    description:"Žuta tekućina, snažno hidrolizira.",
    uses:"Katalizator za polimerizaciju"
  },
  {
    formula:"CoO", name:"Kobaltov(II) oksid", ingredients:{Co:1, O:1},
    atoms:[{el:"Co", pos:[-0.9,0,0]},{el:"O", pos:[0.9,0,0]}],
    bonds:[{from:0,to:1,type:2}],
    bondType:"Ionska", geometry:"Kristal (NaCl tip)",
    description:"Maslinasto-zelena krutina koja u staklu daje plavu boju.",
    uses:"Plavi pigment u staklu i keramici"
  },
  {
    formula:"CoCl₂", name:"Kobaltov(II) klorid", ingredients:{Co:1, Cl:2},
    atoms:[{el:"Co", pos:[0,0,0]},{el:"Cl", pos:[2.1,0,0]},{el:"Cl", pos:[-2.1,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Ionska", geometry:"Linearna (u plinu)",
    description:"Plava krutina, ružičasta kao hidrat — indikator vlage.",
    uses:"Indikator vlage, simpatičke tinte"
  },
  {
    formula:"NiO", name:"Niklov(II) oksid", ingredients:{Ni:1, O:1},
    atoms:[{el:"Ni", pos:[-0.9,0,0]},{el:"O", pos:[0.9,0,0]}],
    bonds:[{from:0,to:1,type:2}],
    bondType:"Ionska", geometry:"Kristal (NaCl tip)",
    description:"Zelena krutina, glavni nikloy oksid.",
    uses:"NiMH baterije, zeleni pigment, keramika"
  },
  {
    formula:"NiCl₂", name:"Niklov(II) klorid", ingredients:{Ni:1, Cl:2},
    atoms:[{el:"Ni", pos:[0,0,0]},{el:"Cl", pos:[2.1,0,0]},{el:"Cl", pos:[-2.1,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Ionska", geometry:"Linearna (u plinu)",
    description:"Žuta krutina, zelena kao heksahidrat.",
    uses:"Galvanizacija nikla, katalizator"
  },
  {
    formula:"Y₂O₃", name:"Itrijev oksid", ingredients:{Y:2, O:3},
    atoms:[
      {el:"O", pos:[-3,0,0]},{el:"Y", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},
      {el:"Y", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Kubična (bixbyit)",
    description:"Bijela krutina, podloga za fosfore (s Eu daje crveni TV fosfor).",
    uses:"Crveni fosfori, YAG laseri, supravodiči"
  },
  {
    formula:"YCl₃", name:"Itrijev klorid", ingredients:{Y:1, Cl:3},
    atoms:[
      {el:"Y", pos:[0,0,0]},
      {el:"Cl", pos:[2.4,0,0]},{el:"Cl", pos:[-1.2,2.1,0]},{el:"Cl", pos:[-1.2,-2.1,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Ionska", geometry:"Trigonalno planarna (u plinu)",
    description:"Bijela higroskopna krutina.",
    uses:"Sinteza itrijevih spojeva"
  },
  {
    formula:"ZrO₂", name:"Cirkonijev oksid (cirkonija)", ingredients:{Zr:1, O:2},
    atoms:[{el:"Zr", pos:[0,0,0]},{el:"O", pos:[1.8,0,0]},{el:"O", pos:[-1.8,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Ionska/kovalentna", geometry:"Linearna (idealizirano)",
    description:"Bijela vatrostalna keramika, kubična cirkonija imitira dijamant.",
    uses:"Zubni implantati, keramička oštrica, lažni dijamanti"
  },
  {
    formula:"ZrCl₄", name:"Cirkonijev tetraklorid", ingredients:{Zr:1, Cl:4},
    atoms:[
      {el:"Zr", pos:[0,0,0]},
      {el:"Cl", pos:[1.5,1.5,1.5]},{el:"Cl", pos:[-1.5,-1.5,1.5]},
      {el:"Cl", pos:[-1.5,1.5,-1.5]},{el:"Cl", pos:[1.5,-1.5,-1.5]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1}],
    bondType:"Kovalentna", geometry:"Tetraedarska",
    description:"Bijela krutina, koristi se u proizvodnji čistog Zr.",
    uses:"Proizvodnja cirkonijevog metala (Krollov proces)"
  },
  {
    formula:"Nb₂O₅", name:"Niobijev pentoksid", ingredients:{Nb:2, O:5},
    atoms:[
      {el:"Nb", pos:[-1.8,0,0]},{el:"Nb", pos:[1.8,0,0]},
      {el:"O", pos:[0,0,0]},{el:"O", pos:[-3.4,0,0]},{el:"O", pos:[3.4,0,0]},
      {el:"O", pos:[-1.8,1.6,0]},{el:"O", pos:[1.8,1.6,0]}
    ],
    bonds:[{from:0,to:2,type:1},{from:1,to:2,type:1},{from:0,to:3,type:2},{from:1,to:4,type:2},{from:0,to:5,type:1},{from:1,to:6,type:1}],
    bondType:"Kovalentna/ionska", geometry:"Slojevita kristalna",
    description:"Bezbojna krutina, podloga za niobate i kondenzatore.",
    uses:"Optičko staklo, kondenzatori, supravodiči"
  },
  {
    formula:"MoO₃", name:"Molibdenov trioksid", ingredients:{Mo:1, O:3},
    atoms:[
      {el:"Mo", pos:[0,0,0]},
      {el:"O", pos:[1.7,0,0]},{el:"O", pos:[-1.7,0,0]},{el:"O", pos:[0,1.7,0]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2},{from:0,to:3,type:2}],
    bondType:"Kovalentna", geometry:"Slojevita kristalna",
    description:"Žuto-zelena krutina, glavni izvor Mo metala.",
    uses:"Katalizator, čelične legure"
  },
  {
    formula:"MoS₂", name:"Molibdenov disulfid", ingredients:{Mo:1, S:2},
    atoms:[{el:"Mo", pos:[0,0,0]},{el:"S", pos:[1.5,1.0,0]},{el:"S", pos:[-1.5,1.0,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Kovalentna", geometry:"Slojevita (kao grafit)",
    description:"Crna mineralna molibdenita, klizav kao grafit.",
    uses:"Suho mazivo, katalizator hidroobrade nafte"
  },
  {
    formula:"Tc₂O₇", name:"Tehnecijev heptoksid", ingredients:{Tc:2, O:7},
    atoms:[
      {el:"Tc", pos:[-2.0,0,0]},{el:"Tc", pos:[2.0,0,0]},
      {el:"O", pos:[0,0,0]},
      {el:"O", pos:[-3.6,0,0]},{el:"O", pos:[3.6,0,0]},
      {el:"O", pos:[-2.0,1.6,0]},{el:"O", pos:[2.0,1.6,0]},
      {el:"O", pos:[-2.0,-1.6,0]},{el:"O", pos:[2.0,-1.6,0]}
    ],
    bonds:[
      {from:0,to:2,type:1},{from:1,to:2,type:1},
      {from:0,to:3,type:2},{from:1,to:4,type:2},
      {from:0,to:5,type:2},{from:1,to:6,type:2},
      {from:0,to:7,type:2},{from:1,to:8,type:2}
    ],
    bondType:"Kovalentna", geometry:"Mostni di-tetraedar",
    description:"Žuta krutina, jedini molekularni heptoksid prijelaznog metala.",
    uses:"Istraživanja (Tc-99m je glavni medicinski radioizotop)"
  },
  {
    formula:"RuO₄", name:"Rutenijev tetroksid", ingredients:{Ru:1, O:4},
    atoms:[
      {el:"Ru", pos:[0,0,0]},
      {el:"O", pos:[1.1,1.1,1.1]},{el:"O", pos:[-1.1,-1.1,1.1]},
      {el:"O", pos:[-1.1,1.1,-1.1]},{el:"O", pos:[1.1,-1.1,-1.1]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2},{from:0,to:3,type:2},{from:0,to:4,type:2}],
    bondType:"Kovalentna", geometry:"Tetraedarska",
    description:"Žuta hlapljiva krutina, vrlo otrovna i jako oksidacijsko sredstvo.",
    uses:"Bojenje uzoraka u elektronskoj mikroskopiji"
  },
  {
    formula:"Rh₂O₃", name:"Rodijev(III) oksid", ingredients:{Rh:2, O:3},
    atoms:[
      {el:"O", pos:[-3,0,0]},{el:"Rh", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},
      {el:"Rh", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska/kovalentna", geometry:"Korund",
    description:"Sivi prah, jedini stabilni rodijev oksid.",
    uses:"Katalizator, premazi"
  },
  {
    formula:"PdCl₂", name:"Paladijev(II) klorid", ingredients:{Pd:1, Cl:2},
    atoms:[{el:"Pd", pos:[0,0,0]},{el:"Cl", pos:[2.3,0,0]},{el:"Cl", pos:[-2.3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Kovalentna/ionska", geometry:"Kvadratno planarna (polimer)",
    description:"Crvenosmeđa krutina, polazna točka za mnoge Pd katalizatore.",
    uses:"Detekcija CO, katalizatori (Wackerov proces)"
  },
  {
    formula:"CdO", name:"Kadmijev oksid", ingredients:{Cd:1, O:1},
    atoms:[{el:"Cd", pos:[-0.9,0,0]},{el:"O", pos:[0.9,0,0]}],
    bonds:[{from:0,to:1,type:2}],
    bondType:"Ionska", geometry:"Kristal (NaCl tip)",
    description:"Smeđa krutina, otrovna.",
    uses:"Pigmenti (povijesno), elektrolize"
  },
  {
    formula:"CdS", name:"Kadmijev sulfid", ingredients:{Cd:1, S:1},
    atoms:[{el:"Cd", pos:[-1.1,0,0]},{el:"S", pos:[1.1,0,0]}],
    bonds:[{from:0,to:1,type:2}],
    bondType:"Kovalentna/ionska", geometry:"Würtzit/sfalerit",
    description:"Žuti do narančasti pigment, poluvodič.",
    uses:"Solarne ćelije, pigment 'kadmij žuta'"
  },
  {
    formula:"HfO₂", name:"Hafnijev oksid", ingredients:{Hf:1, O:2},
    atoms:[{el:"Hf", pos:[0,0,0]},{el:"O", pos:[1.9,0,0]},{el:"O", pos:[-1.9,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Ionska/kovalentna", geometry:"Linearna (idealizirano)",
    description:"Bijela vatrostalna keramika.",
    uses:"High-k dielektrici u procesorima, optički premazi"
  },
  {
    formula:"Ta₂O₅", name:"Tantalov pentoksid", ingredients:{Ta:2, O:5},
    atoms:[
      {el:"Ta", pos:[-1.8,0,0]},{el:"Ta", pos:[1.8,0,0]},
      {el:"O", pos:[0,0,0]},{el:"O", pos:[-3.4,0,0]},{el:"O", pos:[3.4,0,0]},
      {el:"O", pos:[-1.8,1.6,0]},{el:"O", pos:[1.8,1.6,0]}
    ],
    bonds:[{from:0,to:2,type:1},{from:1,to:2,type:1},{from:0,to:3,type:2},{from:1,to:4,type:2},{from:0,to:5,type:1},{from:1,to:6,type:1}],
    bondType:"Kovalentna/ionska", geometry:"Slojevita kristalna",
    description:"Bijela krutina, izuzetan dielektrik.",
    uses:"Tantalski kondenzatori, optička stakla"
  },
  {
    formula:"WO₃", name:"Volframov trioksid", ingredients:{W:1, O:3},
    atoms:[
      {el:"W", pos:[0,0,0]},
      {el:"O", pos:[1.8,0,0]},{el:"O", pos:[-1.8,0,0]},{el:"O", pos:[0,1.8,0]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2},{from:0,to:3,type:2}],
    bondType:"Kovalentna/ionska", geometry:"Perovskitna varijanta",
    description:"Žuti prah, glavni izvor W metala.",
    uses:"Elektrokromatska stakla, katalizator"
  },
  {
    formula:"WC", name:"Volframov karbid", ingredients:{W:1, C:1},
    atoms:[{el:"W", pos:[-0.9,0,0]},{el:"C", pos:[0.9,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Metalna/kovalentna", geometry:"Heksagonalni kristal",
    description:"Iznimno tvrd materijal, gotovo poput dijamanta.",
    uses:"Svrdla, alati, projektili, nakit"
  },
  {
    formula:"Re₂O₇", name:"Renijev heptoksid", ingredients:{Re:2, O:7},
    atoms:[
      {el:"Re", pos:[-2.0,0,0]},{el:"Re", pos:[2.0,0,0]},
      {el:"O", pos:[0,0,0]},
      {el:"O", pos:[-3.6,0,0]},{el:"O", pos:[3.6,0,0]},
      {el:"O", pos:[-2.0,1.6,0]},{el:"O", pos:[2.0,1.6,0]},
      {el:"O", pos:[-2.0,-1.6,0]},{el:"O", pos:[2.0,-1.6,0]}
    ],
    bonds:[
      {from:0,to:2,type:1},{from:1,to:2,type:1},
      {from:0,to:3,type:2},{from:1,to:4,type:2},
      {from:0,to:5,type:2},{from:1,to:6,type:2},
      {from:0,to:7,type:2},{from:1,to:8,type:2}
    ],
    bondType:"Kovalentna", geometry:"Mostni di-tetraedar",
    description:"Žuta krutina, izvor renija u industriji.",
    uses:"Katalizatori (rafinerije, metateza alkena)"
  },
  {
    formula:"OsO₄", name:"Osmijev tetroksid", ingredients:{Os:1, O:4},
    atoms:[
      {el:"Os", pos:[0,0,0]},
      {el:"O", pos:[1.1,1.1,1.1]},{el:"O", pos:[-1.1,-1.1,1.1]},
      {el:"O", pos:[-1.1,1.1,-1.1]},{el:"O", pos:[1.1,-1.1,-1.1]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2},{from:0,to:3,type:2},{from:0,to:4,type:2}],
    bondType:"Kovalentna", geometry:"Tetraedarska",
    description:"Blijedo žuta hlapljiva krutina, vrlo otrovna.",
    uses:"Bojenje bioloških uzoraka, organska sinteza"
  },
  {
    formula:"IrO₂", name:"Iridijev dioksid", ingredients:{Ir:1, O:2},
    atoms:[{el:"Ir", pos:[0,0,0]},{el:"O", pos:[1.8,0,0]},{el:"O", pos:[-1.8,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Kovalentna", geometry:"Rutilna struktura",
    description:"Crna krutina, jedan od rijetkih stabilnih iridijevih oksida.",
    uses:"Elektrode za elektrolizu vode, katalizatori"
  },
  {
    formula:"PtCl₂", name:"Platinin(II) klorid", ingredients:{Pt:1, Cl:2},
    atoms:[{el:"Pt", pos:[0,0,0]},{el:"Cl", pos:[2.3,0,0]},{el:"Cl", pos:[-2.3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Kovalentna", geometry:"Klasterska (Pt₆Cl₁₂)",
    description:"Maslinasto-zelena krutina.",
    uses:"Sinteza Pt katalizatora i lijekova (npr. cisplatin)"
  },
  {
    formula:"PtO₂", name:"Platinin dioksid (Adamsov katalizator)", ingredients:{Pt:1, O:2},
    atoms:[{el:"Pt", pos:[0,0,0]},{el:"O", pos:[1.8,0,0]},{el:"O", pos:[-1.8,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Kovalentna", geometry:"Rutilna struktura",
    description:"Smeđi prah, klasični hidrogenacijski katalizator.",
    uses:"Hidrogenacija u organskoj sintezi"
  },
  {
    formula:"AuCl₃", name:"Zlatov(III) klorid", ingredients:{Au:1, Cl:3},
    atoms:[
      {el:"Au", pos:[0,0,0]},
      {el:"Cl", pos:[2.3,0,0]},{el:"Cl", pos:[-2.3,0,0]},{el:"Cl", pos:[0,2.3,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Kovalentna", geometry:"Kvadratno planarna (dimer)",
    description:"Tamnocrveni kristali, polazni materijal za zlatne spojeve.",
    uses:"Sinteza Au katalizatora i Au koloida"
  },
  {
    formula:"Au₂O₃", name:"Zlatov(III) oksid", ingredients:{Au:2, O:3},
    atoms:[
      {el:"O", pos:[-3,0,0]},{el:"Au", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},
      {el:"Au", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Kovalentna", geometry:"Lančana struktura",
    description:"Smeđa krutina, jedini stabilni zlatni oksid.",
    uses:"Bojenje stakla i porculana"
  },
  {
    formula:"HgO", name:"Živin(II) oksid", ingredients:{Hg:1, O:1},
    atoms:[{el:"Hg", pos:[-1.0,0,0]},{el:"O", pos:[1.0,0,0]}],
    bonds:[{from:0,to:1,type:2}],
    bondType:"Kovalentna/ionska", geometry:"Lančana kristalna",
    description:"Crveno-žuta krutina, povijesno korištena za pripravu kisika (Priestley).",
    uses:"Sinteza, povijesno: lijekovi (otrovan!)"
  },
  {
    formula:"HgCl₂", name:"Živin(II) klorid (sublimat)", ingredients:{Hg:1, Cl:2},
    atoms:[{el:"Hg", pos:[0,0,0]},{el:"Cl", pos:[2.3,0,0]},{el:"Cl", pos:[-2.3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Kovalentna", geometry:"Linearna",
    description:"Bijela krutina, vrlo otrovna; povijesni 'sublimat'.",
    uses:"Sinteza (otrovan!)"
  },

  // ── Posprijelazni metali ──────────────────────────────────────────────────
  {
    formula:"Ga₂O₃", name:"Galijev oksid", ingredients:{Ga:2, O:3},
    atoms:[
      {el:"O", pos:[-3,0,0]},{el:"Ga", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},
      {el:"Ga", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska/kovalentna", geometry:"Monoklinska kristalna",
    description:"Bijeli prah, poluvodič širokog raspora.",
    uses:"Snažni poluvodički uređaji nove generacije"
  },
  {
    formula:"GaAs", name:"Galijev arsenid", ingredients:{Ga:1, As:1},
    atoms:[{el:"Ga", pos:[-1.2,0,0]},{el:"As", pos:[1.2,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Kovalentna", geometry:"Sfalerit",
    description:"Tamnosivi poluvodič, brži od silicija pri visokim frekvencijama.",
    uses:"Mobilna elektronika, LED, solarne ćelije"
  },
  {
    formula:"In₂O₃", name:"Indijev oksid", ingredients:{In:2, O:3},
    atoms:[
      {el:"O", pos:[-3,0,0]},{el:"In", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},
      {el:"In", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Bixbyit",
    description:"Žućkasti prah; s kositrom daje ITO za prozirne elektrode.",
    uses:"ITO premazi za zaslone na dodir"
  },
  {
    formula:"InCl₃", name:"Indijev klorid", ingredients:{In:1, Cl:3},
    atoms:[
      {el:"In", pos:[0,0,0]},
      {el:"Cl", pos:[2.4,0,0]},{el:"Cl", pos:[-1.2,2.1,0]},{el:"Cl", pos:[-1.2,-2.1,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Kovalentna/ionska", geometry:"Trigonalno planarna (u plinu)",
    description:"Bijela higroskopna krutina.",
    uses:"Sinteza, katalizator"
  },
  {
    formula:"Tl₂O₃", name:"Talijev(III) oksid", ingredients:{Tl:2, O:3},
    atoms:[
      {el:"O", pos:[-3,0,0]},{el:"Tl", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},
      {el:"Tl", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska/kovalentna", geometry:"Bixbyit",
    description:"Smeđa krutina, otrovan oksid.",
    uses:"Poluvodički materijali"
  },
  {
    formula:"TlCl", name:"Talijev(I) klorid", ingredients:{Tl:1, Cl:1},
    atoms:[{el:"Tl", pos:[-1.6,0,0]},{el:"Cl", pos:[1.6,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Ionska", geometry:"Kristal (CsCl tip)",
    description:"Bijela krutina, slična AgCl.",
    uses:"Optika, istraživanja (otrovan!)"
  },
  {
    formula:"Bi₂O₃", name:"Bizmutov oksid", ingredients:{Bi:2, O:3},
    atoms:[
      {el:"O", pos:[-3,0,0]},{el:"Bi", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},
      {el:"Bi", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska/kovalentna", geometry:"Monoklinska",
    description:"Žuti prah, glavni komercijalni bizmutov spoj.",
    uses:"Kozmetika, vatromet, gorivne ćelije"
  },
  {
    formula:"BiCl₃", name:"Bizmutov klorid", ingredients:{Bi:1, Cl:3},
    atoms:[
      {el:"Bi", pos:[0,0,0]},
      {el:"Cl", pos:[2.4,-0.6,0]},{el:"Cl", pos:[-1.2,-0.6,2.1]},{el:"Cl", pos:[-1.2,-0.6,-2.1]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Kovalentna/ionska", geometry:"Trigonalno piramidalna",
    description:"Bijela krutina, hidrolizira u BiOCl.",
    uses:"Kozmetika ('biserni sjaj'), katalizator"
  },
  {
    formula:"NhCl", name:"Nihonijev klorid (predviđen)", ingredients:{Nh:1, Cl:1},
    atoms:[{el:"Nh", pos:[-1.4,0,0]},{el:"Cl", pos:[1.4,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Kovalentna (predviđena)", geometry:"Linearna",
    description:"Teorijski spoj — Nh je sintetski element.",
    uses:"Teorijska istraživanja"
  },
  {
    formula:"FlO", name:"Flerovijev oksid (predviđen)", ingredients:{Fl:1, O:1},
    atoms:[{el:"Fl", pos:[-1.0,0,0]},{el:"O", pos:[1.0,0,0]}],
    bonds:[{from:0,to:1,type:2}],
    bondType:"Kovalentna (predviđena)", geometry:"Linearna",
    description:"Teorijski spoj — predviđa se da Fl ima neka plemenita svojstva.",
    uses:"Teorijska istraživanja"
  },
  {
    formula:"McH", name:"Moskovijev hidrid (predviđen)", ingredients:{Mc:1, H:1},
    atoms:[{el:"Mc", pos:[-1.0,0,0]},{el:"H", pos:[1.0,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Kovalentna (predviđena)", geometry:"Linearna",
    description:"Teorijski spoj — Mc je sintetski element kratka života.",
    uses:"Teorijska istraživanja"
  },
  {
    formula:"LvO₂", name:"Livermorijev dioksid (predviđen)", ingredients:{Lv:1, O:2},
    atoms:[{el:"Lv", pos:[0,0,0]},{el:"O", pos:[1.9,0,0]},{el:"O", pos:[-1.9,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Kovalentna (predviđena)", geometry:"Linearna (idealizirano)",
    description:"Teorijski spoj — predviđen analogno PoO₂.",
    uses:"Teorijska istraživanja"
  },

  // ── Lantanoidi (svi M₂O₃) ─────────────────────────────────────────────────
  {
    formula:"La₂O₃", name:"Lantanov oksid", ingredients:{La:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"La", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"La", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Heksagonska (A-tip)",
    description:"Bijeli prah, glavna komponenta optičkog stakla velikog indeksa loma.",
    uses:"Optička stakla, katalizatori, fosfori"
  },
  {
    formula:"CeO₂", name:"Cerijev(IV) oksid (cerija)", ingredients:{Ce:1, O:2},
    atoms:[{el:"Ce", pos:[0,0,0]},{el:"O", pos:[1.7,0,0]},{el:"O", pos:[-1.7,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Ionska", geometry:"Fluoritna struktura",
    description:"Blijedo žuti prah, redoks između Ce³⁺ i Ce⁴⁺ čini ga moćnim katalizatorom.",
    uses:"Katalitički pretvarači, prah za poliranje"
  },
  {
    formula:"Pr₂O₃", name:"Prazeodimijev oksid", ingredients:{Pr:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"Pr", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"Pr", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Heksagonska",
    description:"Zelenkasta krutina, daje žuto-zelene boje u staklu.",
    uses:"Pigmenti, zaštitne naočale za zavarivanje"
  },
  {
    formula:"Nd₂O₃", name:"Neodimijev oksid", ingredients:{Nd:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"Nd", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"Nd", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Heksagonska",
    description:"Plavkasti prah, daje karakterističnu ljubičastu boju u staklu.",
    uses:"Bojenje stakla, dopiranje YAG laserskih kristala"
  },
  {
    formula:"Pm₂O₃", name:"Prometijev oksid", ingredients:{Pm:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"Pm", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"Pm", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Monoklinska",
    description:"Ružičasti radioaktivni prah — Pm nema stabilnih izotopa.",
    uses:"Svjetleća boja, beta-baterije"
  },
  {
    formula:"Sm₂O₃", name:"Samarijev oksid", ingredients:{Sm:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"Sm", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"Sm", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Kubična",
    description:"Blijedo žuti prah, apsorbira neutrone.",
    uses:"Nuklearni reaktori, optika"
  },
  {
    formula:"Eu₂O₃", name:"Europijev oksid", ingredients:{Eu:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"Eu", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"Eu", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Kubična",
    description:"Bijelo-ružičasti prah, daje crveni i plavi fosfor u TV/LED zaslonima.",
    uses:"Fosfori (crveni TV), euro-novčanice (UV oznake)"
  },
  {
    formula:"Gd₂O₃", name:"Gadolinijev oksid", ingredients:{Gd:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"Gd", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"Gd", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Kubična",
    description:"Bijeli prah; Gd³⁺ snažno utječe na MR signal.",
    uses:"MR kontrastna sredstva, neutronska zaštita"
  },
  {
    formula:"Tb₂O₃", name:"Terbijev oksid", ingredients:{Tb:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"Tb", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"Tb", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Kubična",
    description:"Bijeli prah, prekursor zelenih fosfora.",
    uses:"Zeleni fosfori (TV/LED), magnetostriktivne legure"
  },
  {
    formula:"Dy₂O₃", name:"Disprozijev oksid", ingredients:{Dy:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"Dy", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"Dy", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Kubična",
    description:"Bijeli prah s blagim zelenkastim odsjajem.",
    uses:"Magneti (NdFeB s Dy), dozimetri"
  },
  {
    formula:"Ho₂O₃", name:"Holmijev oksid", ingredients:{Ho:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"Ho", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"Ho", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Kubična",
    description:"Žuto-narančasti prah; pod fluorescentnim svjetlom mijenja boju.",
    uses:"Standardi za optičke spektrofotometre, laseri"
  },
  {
    formula:"Er₂O₃", name:"Erbijev oksid", ingredients:{Er:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"Er", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"Er", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Kubična",
    description:"Ružičasti prah, ključan za pojačala u optičkim vlaknima.",
    uses:"EDFA pojačala (1550 nm), bojenje stakla"
  },
  {
    formula:"Tm₂O₃", name:"Tulijev oksid", ingredients:{Tm:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"Tm", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"Tm", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Kubična",
    description:"Blijedo zelenkasti prah, najrjeđi nealuminoidni lantanoid.",
    uses:"Tm laseri, prijenosni rendgenski uređaji"
  },
  {
    formula:"Yb₂O₃", name:"Iterbijev oksid", ingredients:{Yb:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"Yb", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"Yb", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Kubična",
    description:"Bijeli prah, dopant za vrlo precizne atomske satove.",
    uses:"Yb optički atomski satovi, laseri"
  },
  {
    formula:"Lu₂O₃", name:"Lutecijev oksid", ingredients:{Lu:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"Lu", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"Lu", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Kubična",
    description:"Bijeli prah, posljednji lantanoid; rijedak i skup.",
    uses:"PET scintilatori (LSO/LYSO kristali), katalizatori"
  },

  // ── Aktinoidi ─────────────────────────────────────────────────────────────
  {
    formula:"Ac₂O₃", name:"Aktinijev oksid", ingredients:{Ac:2, O:3},
    atoms:[{el:"O", pos:[-3,0,0]},{el:"Ac", pos:[-1.5,0,0]},{el:"O", pos:[0,0,0]},{el:"Ac", pos:[1.5,0,0]},{el:"O", pos:[3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:1,to:2,type:1},{from:2,to:3,type:1},{from:3,to:4,type:1}],
    bondType:"Ionska", geometry:"Heksagonska",
    description:"Bijeli radioaktivni prah; Ac svijetli plavičasto u mraku.",
    uses:"Ac-225 ciljana terapija raka"
  },
  {
    formula:"ThO₂", name:"Torijev dioksid (torija)", ingredients:{Th:1, O:2},
    atoms:[{el:"Th", pos:[0,0,0]},{el:"O", pos:[1.8,0,0]},{el:"O", pos:[-1.8,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Ionska", geometry:"Fluorit",
    description:"Bijeli prah, ima najviše talište od svih oksida (~3300 °C).",
    uses:"Vatrostalna keramika, potencijalno nukl. gorivo"
  },
  {
    formula:"PaO₂", name:"Protaktinijev dioksid", ingredients:{Pa:1, O:2},
    atoms:[{el:"Pa", pos:[0,0,0]},{el:"O", pos:[1.8,0,0]},{el:"O", pos:[-1.8,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Ionska", geometry:"Fluorit",
    description:"Crna radioaktivna krutina.",
    uses:"Znanstvena istraživanja"
  },
  {
    formula:"UO₂", name:"Uranov(IV) oksid", ingredients:{U:1, O:2},
    atoms:[{el:"U", pos:[0,0,0]},{el:"O", pos:[1.8,0,0]},{el:"O", pos:[-1.8,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Ionska", geometry:"Fluorit",
    description:"Crna keramika, glavni oblik nuklearnog goriva.",
    uses:"Gorivne pelete u nuklearnim reaktorima"
  },
  {
    formula:"UF₆", name:"Uranov heksafluorid", ingredients:{U:1, F:6},
    atoms:[
      {el:"U", pos:[0,0,0]},
      {el:"F", pos:[2.0,0,0]},{el:"F", pos:[-2.0,0,0]},
      {el:"F", pos:[0,2.0,0]},{el:"F", pos:[0,-2.0,0]},
      {el:"F", pos:[0,0,2.0]},{el:"F", pos:[0,0,-2.0]}
    ],
    bonds:[
      {from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},
      {from:0,to:4,type:1},{from:0,to:5,type:1},{from:0,to:6,type:1}
    ],
    bondType:"Kovalentna", geometry:"Oktaedarska",
    description:"Bijela krutina koja sublimira; ključ za odvajanje izotopa urana.",
    uses:"Obogaćivanje urana (centrifuge)"
  },
  {
    formula:"NpO₂", name:"Neptunijev dioksid", ingredients:{Np:1, O:2},
    atoms:[{el:"Np", pos:[0,0,0]},{el:"O", pos:[1.8,0,0]},{el:"O", pos:[-1.8,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Ionska", geometry:"Fluorit",
    description:"Zelenkasta radioaktivna krutina.",
    uses:"Detektori neutrona, istraživanja"
  },
  {
    formula:"PuO₂", name:"Plutonijev dioksid", ingredients:{Pu:1, O:2},
    atoms:[{el:"Pu", pos:[0,0,0]},{el:"O", pos:[1.8,0,0]},{el:"O", pos:[-1.8,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Ionska", geometry:"Fluorit",
    description:"Žuto-smeđa keramika, oblik plutonija u MOX-gorivu i RTG-ovima.",
    uses:"Nuklearno gorivo (MOX), RTG za svemirske sonde"
  },
  {
    formula:"AmO₂", name:"Americijev dioksid", ingredients:{Am:1, O:2},
    atoms:[{el:"Am", pos:[0,0,0]},{el:"O", pos:[1.8,0,0]},{el:"O", pos:[-1.8,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Ionska", geometry:"Fluorit",
    description:"Crna krutina; Am-241 emitira alfa-čestice.",
    uses:"Detektori dima"
  },
  {
    formula:"CmO₂", name:"Kirijev dioksid", ingredients:{Cm:1, O:2},
    atoms:[{el:"Cm", pos:[0,0,0]},{el:"O", pos:[1.8,0,0]},{el:"O", pos:[-1.8,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Ionska", geometry:"Fluorit",
    description:"Crna krutina, jako radioaktivna.",
    uses:"RTG za svemirske misije"
  },
  {
    formula:"BkO₂", name:"Berkelijev dioksid", ingredients:{Bk:1, O:2},
    atoms:[{el:"Bk", pos:[0,0,0]},{el:"O", pos:[1.8,0,0]},{el:"O", pos:[-1.8,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Ionska", geometry:"Fluorit",
    description:"Smeđkasta krutina, korištena za sintezu Ts-117.",
    uses:"Sinteza superteških elemenata"
  },
  {
    formula:"CfO₂", name:"Kalifornijev dioksid", ingredients:{Cf:1, O:2},
    atoms:[{el:"Cf", pos:[0,0,0]},{el:"O", pos:[1.8,0,0]},{el:"O", pos:[-1.8,0,0]}],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2}],
    bondType:"Ionska", geometry:"Fluorit",
    description:"Crna krutina, snažan izvor neutrona.",
    uses:"Pokretanje nuklearnih reaktora, neutronska radiografija"
  },
  {
    formula:"EsCl₃", name:"Ajnštajnijev klorid", ingredients:{Es:1, Cl:3},
    atoms:[
      {el:"Es", pos:[0,0,0]},
      {el:"Cl", pos:[2.4,0,0]},{el:"Cl", pos:[-1.2,2.1,0]},{el:"Cl", pos:[-1.2,-2.1,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Ionska", geometry:"Trigonalno planarna (u plinu)",
    description:"Bjelkasta jako radioaktivna krutina; samosvjetli zbog raspada.",
    uses:"Istraživanja"
  },
  {
    formula:"FmCl₃", name:"Fermijev klorid", ingredients:{Fm:1, Cl:3},
    atoms:[
      {el:"Fm", pos:[0,0,0]},
      {el:"Cl", pos:[2.4,0,0]},{el:"Cl", pos:[-1.2,2.1,0]},{el:"Cl", pos:[-1.2,-2.1,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Ionska", geometry:"Trigonalno planarna",
    description:"Hipotetski opažen u tragovima — pripremaju se ultramale količine.",
    uses:"Istraživanja"
  },
  {
    formula:"MdCl₃", name:"Mendelevijev klorid", ingredients:{Md:1, Cl:3},
    atoms:[
      {el:"Md", pos:[0,0,0]},
      {el:"Cl", pos:[2.4,0,0]},{el:"Cl", pos:[-1.2,2.1,0]},{el:"Cl", pos:[-1.2,-2.1,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Ionska", geometry:"Trigonalno planarna",
    description:"Pretpostavljen iz ionsko-izmjenjivačke kemije pojedinačnih atoma.",
    uses:"Znanstvena istraživanja"
  },
  {
    formula:"NoCl₂", name:"Nobelijev klorid", ingredients:{No:1, Cl:2},
    atoms:[{el:"No", pos:[0,0,0]},{el:"Cl", pos:[2.3,0,0]},{el:"Cl", pos:[-2.3,0,0]}],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1}],
    bondType:"Ionska", geometry:"Linearna",
    description:"No je jedini aktinoid stabilan u +2 stanju u vodi.",
    uses:"Istraživanja"
  },
  {
    formula:"LrCl₃", name:"Lavrencijev klorid", ingredients:{Lr:1, Cl:3},
    atoms:[
      {el:"Lr", pos:[0,0,0]},
      {el:"Cl", pos:[2.4,0,0]},{el:"Cl", pos:[-1.2,2.1,0]},{el:"Cl", pos:[-1.2,-2.1,0]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1}],
    bondType:"Ionska", geometry:"Trigonalno planarna",
    description:"Posljednji aktinoid; ponaša se kao trovalentni kation.",
    uses:"Znanstvena istraživanja"
  },

  // ── Sintetski superteški (Rf–Cn) ──────────────────────────────────────────
  {
    formula:"RfCl₄", name:"Rutherfordijev tetraklorid", ingredients:{Rf:1, Cl:4},
    atoms:[
      {el:"Rf", pos:[0,0,0]},
      {el:"Cl", pos:[1.5,1.5,1.5]},{el:"Cl", pos:[-1.5,-1.5,1.5]},
      {el:"Cl", pos:[-1.5,1.5,-1.5]},{el:"Cl", pos:[1.5,-1.5,-1.5]}
    ],
    bonds:[{from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},{from:0,to:4,type:1}],
    bondType:"Kovalentna", geometry:"Tetraedarska",
    description:"Eksperimentalno opažen — pokazao da se Rf ponaša kao Hf, ne kao aktinoid.",
    uses:"Istraživanja kemije superteških elemenata"
  },
  {
    formula:"DbCl₅", name:"Dubnijev pentaklorid", ingredients:{Db:1, Cl:5},
    atoms:[
      {el:"Db", pos:[0,0,0]},
      {el:"Cl", pos:[2.3,0,0]},{el:"Cl", pos:[-2.3,0,0]},
      {el:"Cl", pos:[0,2.3,0]},{el:"Cl", pos:[0,-2.3,0]},
      {el:"Cl", pos:[0,0,2.3]}
    ],
    bonds:[
      {from:0,to:1,type:1},{from:0,to:2,type:1},{from:0,to:3,type:1},
      {from:0,to:4,type:1},{from:0,to:5,type:1}
    ],
    bondType:"Kovalentna", geometry:"Trigonalno bipiramidalna",
    description:"Eksperimentalno opažen u plinskim kromatografijama atom-po-atom.",
    uses:"Istraživanja"
  },
  {
    formula:"SgO₃", name:"Seaborgijev trioksid", ingredients:{Sg:1, O:3},
    atoms:[
      {el:"Sg", pos:[0,0,0]},
      {el:"O", pos:[1.8,0,0]},{el:"O", pos:[-1.8,0,0]},{el:"O", pos:[0,1.8,0]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2},{from:0,to:3,type:2}],
    bondType:"Kovalentna", geometry:"Trigonalno planarna",
    description:"Sg(O)₂(OH)₂ i SgO₃ opaženi 2014. — Sg se ponaša poput W i Mo.",
    uses:"Istraživanja"
  },
  {
    formula:"BhO₃Cl", name:"Borijev oksiklorid", ingredients:{Bh:1, O:3, Cl:1},
    atoms:[
      {el:"Bh", pos:[0,0,0]},
      {el:"O", pos:[1.6,0,0]},{el:"O", pos:[-0.8,1.4,0]},{el:"O", pos:[-0.8,-1.4,0]},
      {el:"Cl", pos:[0,0,2.0]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2},{from:0,to:3,type:2},{from:0,to:4,type:1}],
    bondType:"Kovalentna", geometry:"Pseudo-tetraedarska",
    description:"Opažen 2000. — pokazao da je Bh teški analog tehnecija/renija.",
    uses:"Istraživanja"
  },
  {
    formula:"HsO₄", name:"Hasijev tetroksid", ingredients:{Hs:1, O:4},
    atoms:[
      {el:"Hs", pos:[0,0,0]},
      {el:"O", pos:[1.1,1.1,1.1]},{el:"O", pos:[-1.1,-1.1,1.1]},
      {el:"O", pos:[-1.1,1.1,-1.1]},{el:"O", pos:[1.1,-1.1,-1.1]}
    ],
    bonds:[{from:0,to:1,type:2},{from:0,to:2,type:2},{from:0,to:3,type:2},{from:0,to:4,type:2}],
    bondType:"Kovalentna", geometry:"Tetraedarska",
    description:"Opažen 2002. — hlapljiv poput OsO₄, što potvrđuje srodnost s Os.",
    uses:"Istraživanja"
  },
  {
    formula:"MtCl", name:"Majtnerijev klorid (predviđen)", ingredients:{Mt:1, Cl:1},
    atoms:[{el:"Mt", pos:[-1.4,0,0]},{el:"Cl", pos:[1.4,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Kovalentna (predviđena)", geometry:"Linearna",
    description:"Teorijski spoj — kemija Mt nije eksperimentalno provjerena.",
    uses:"Teorijska istraživanja"
  },
  {
    formula:"DsCl", name:"Darmštatijev klorid (predviđen)", ingredients:{Ds:1, Cl:1},
    atoms:[{el:"Ds", pos:[-1.4,0,0]},{el:"Cl", pos:[1.4,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Kovalentna (predviđena)", geometry:"Linearna",
    description:"Teorijski spoj — Ds bi trebao biti analog platini.",
    uses:"Teorijska istraživanja"
  },
  {
    formula:"RgCl", name:"Rendgenijev klorid (predviđen)", ingredients:{Rg:1, Cl:1},
    atoms:[{el:"Rg", pos:[-1.4,0,0]},{el:"Cl", pos:[1.4,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Kovalentna (predviđena)", geometry:"Linearna",
    description:"Teorijski spoj — Rg bi trebao biti analog zlatu.",
    uses:"Teorijska istraživanja"
  },
  {
    formula:"CnHg", name:"Kopernicij-živin spoj (opažen)", ingredients:{Cn:1, Hg:1},
    atoms:[{el:"Cn", pos:[-1.5,0,0]},{el:"Hg", pos:[1.5,0,0]}],
    bonds:[{from:0,to:1,type:1}],
    bondType:"Metalna", geometry:"Linearna",
    description:"Eksperimentalno opažena adsorpcija Cn na Au i Hg — Cn je nalik živi.",
    uses:"Istraživanja"
  }
];
