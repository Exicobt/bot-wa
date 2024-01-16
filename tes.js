const tes = "halo namamu adalah uggbonihm,nkhi;"
let kata = tes.substring(5)

const kata2 = kata.split(" ")
if (kata2.length > 1) {
    kata = kata2[0]
}

console.log(kata)