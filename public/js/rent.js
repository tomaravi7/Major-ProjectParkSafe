// function button() {
//     $("circle-inner").css({float:right})
// }

function updateVal(price) {
    document.getElementById("price").innerText=`₹ ${price}`
}



function extraV(co) {
    if (co=="yes") {
        document.getElementById("typehidden").style.display='block'
        console.log("true")
    }
    else{
        document.getElementById("typehidden").style.display='none'
        console.log("fa;se") 
    }
}



