const kitchen  = ["colher", "garfo", "faca", "fogão", "geladeira", "panela", "pia",
"lâmpada", "botijão", "armário"];
const food = ["maçã", "manga", "uva", "laranja", "banana", "melancia", "chocolate",
"pimenta", "sorvete", "pão", "hambúrguer", "refrigerante", "batata frita", "ovo",
"bala", "pipoca", "cachorro quente", "pizza", "cenoura", "coxinha"];
const place = ["rio", "mar", "floresta", "praia", "parque", "prédio", "casa", 
"padaria", "ponte", "escola", "igreja", "academia", "loja de roupas", "cozinha",
"banheiro", "quarto", "sala", "cidade", "fazenda", "mansão"];
const superHeroes = ["super man", "homen aranha", "wolverine", "batman", 
"capitão america", "homen de ferro", "goku", "luffy", "naruto", "mulher maravilha", 
"flash", "hulk", "thor", "picolo", "sonic", "super mario", "ben 10", "aquaman", 
"thanos"];
const animal = ["gato", "cachorro", "cavalo", "formiga", "abelha", "joaninha", 
"urso", "canguru", "coelho", "macaco", "passarinho", "baleia", "porco", "galinha",
"morcego", "vaca", "minhoca", "penguin", "leão", "tigre"];
const clothes = ["óculos", "camisa", "short", "cueca", "calçinha", "sutiã", 
"camiseta", "relógio", "brinco", "corrente", "calça"];

function randomName() {
  const name = [...kitchen, ...food, ...place, ...superHeroes, ...animal,
  ...clothes];  
  const length = name.length;
  const index = Math.floor(Math.random() * length - 1);
  return name[index];
}

export default randomName;