

// .......

const EQUAL = 0;
const OPERATE = 1;
const NUMBER = 2;
let lastAction = null;
let lastOperator = null;
var a = null;
var b = null;

clear();
// remove press-button effect
document.querySelectorAll(".button")
    .forEach((element) =>{
        element.addEventListener('transitionend',(event) =>{
            event.target.classList.remove("playing");
        });
    });

// add press-button effect
document.querySelectorAll(".button")
    .forEach((element)=>{element.addEventListener('click',pressButton);});


// Typing numbers and updating screen
document.querySelectorAll(".number")
        .forEach((element) =>{
            element.addEventListener("click", (event)=>{                
                let node = getValueNode(event);

                let digit = node.innerHTML;
                let display_node = document.querySelector("#display-value");
                let display_value = display_node.innerHTML;

                // do nothing if:
                if (display_value.includes(".") && digit == '.'){ return;}
                if (parseFloat(display_value) == 0 && digit == '0'){ return;}
                if (display_value == "" && digit == '.'){display_value = '0';}

                if (lastAction != NUMBER){
                    display_node.innerHTML = digit;
                }else{
                    display_node.innerHTML = display_value + digit;
                }                            
                lastAction = NUMBER;                
            });
        });

document.querySelector("#clear")
        .addEventListener("click", (e)=>{            
            clear();
        })


document.querySelectorAll(".operator")
        .forEach((element)=>{
            element.addEventListener("click",(e) =>{
                let node = getValueNode(event);

                let operator = node.innerHTML;
                let display_node = document.querySelector("#display-value");
                let display_value = display_node.innerHTML;

                if (lastAction == OPERATE){return;}
                else{lastAction = OPERATE;}
                            
                a = b;
                b = parseFloat(display_value);

                //console.log(a, b, operator, lastOperator);                   

                let result = null;
                if (a!=null && b!=null){
                    if (lastAction == EQUAL){
                        return;
                    }else{
                        result = operate(lastOperator);
                        lastOperator = operator;
                        b = result;
                    }
                }else{
                    lastOperator = operator;                                        
                    return;
                }

                // if did not return but calculated the result, show it
                updateDisplay(result);                
            });
        });


let enter = document.querySelector("#enter");
enter.addEventListener("click",(e) =>{    

    if (lastAction == EQUAL) return;

    let display_node = document.querySelector("#display-value");
    let display_value = display_node.innerHTML;

    // compute
    a = b;
    b = parseFloat(display_value);
    let result = operate(lastOperator);

    //console.log(a, b, result);
    // update control vars
    lastAction = EQUAL;
    a = null;
    b = null;

    // show
    updateDisplay(result); 
});

function pressButton(event){
    // button action
    let node = event.target;
    if (node.tagName == "P") {node.parentNode.classList.add("playing");}
    else {node.classList.add("playing");}
}

function getValueNode(event){
    // return the p node
    let node = event.target;
    if (node.tagName == "DIV") {node = node.firstElementChild;}
    return node;
}


function operate(operator){
    switch(operator){
        case "+": return a+b;
        case "-": return a-b;
        case "*": return a*b;
        case "/": return a/b;
    }
}

function updateDisplay(value){    
    if (/\d*$/.exec(String(value))[0].length > 4){
        value = value.toFixed(4)
    }
    document.querySelector("#display-value").innerHTML = value;
}
        
function clear(){
    document.querySelector("#display-value").innerHTML = "";
    a = null;
    b = null;
    lastOperate = false;
    lastEqual = false;
    lastOperator = null;
    updateDisplay(0.0); 
}



// 44
// +       value, a<-b, b<-value
// 55      
// =       value, a<-b, b<-value, Operate(a,b), show
// +       value, a<-b, b<-value
// 44      
// =       value, a<-b, b<-value, operate(a,b), show
// 99 //a     
// +       value, a<-b, b<-value
// 11 //b     
// +       value, a<-b, b<-value, operate(a, b), show
// 14      
// =       

