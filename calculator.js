


let lastOperate = false;
let lastEqual = false;
let lastOperator = null;
var a = null;
var b = null;


// Typing numbers and updating screen
document.querySelectorAll(".number")
        .forEach((element) =>{
            element.addEventListener("click", (event)=>{                
                let node = event.target;

                if (node.tagName == "P") {node.parentNode.classList.add("playing");}
                else {node.classList.add("playing");}

                if (node.tagName == "DIV") {node = node.firstElementChild;}

                let digit = node.innerHTML;
                let display_node = document.querySelector("#display-value");
                let display_value = display_node.innerHTML;

                // do nothing if:
                if (display_value.includes(".") && digit == '.'){ return;}
                if (parseFloat(display_value) == 0 && digit == '0'){ return;}
                if (display_value == "" && digit == '.'){display_value = '0';}

                if (lastOperate || lastEqual){
                    display_node.innerHTML = digit;
                }else{
                    display_node.innerHTML = display_value + digit;
                }                
                
                lastOperate = false;
                lastEqual = true;
            });

            element.addEventListener('transitionend',(event) =>{
                event.target.classList.remove("playing");
            });
        });

document.querySelector("#clear")
        .addEventListener("click", (e)=>{            
            clear();
        })


document.querySelectorAll(".operator")
        .forEach((element)=>{
            element.addEventListener("click",(e) =>{
                let node = e.target;

                if (node.tagName == "P") {node.parentNode.classList.add("playing");}
                else {node.classList.add("playing");}

                if (node.tagName == "DIV") {node = node.firstElementChild;}

                let operator = node.innerHTML;
                let display_node = document.querySelector("#display-value");
                let display_value = display_node.innerHTML;

                if (lastOperate){return;}
                else{lastOperate = true;}
                            
                a = b;
                b = parseFloat(display_value);

                console.log(a, b, operator, lastOperator);

                let result = null;
                if (a!=null && b!=null){
                    if(operator == "Enter"){
                        if(lastOperator != null){
                            result = operate(lastOperator);
                            lastOperator = null;    
                        }
                    }else{
                        result = operate(operator);
                        lastOperator = operator;
                    }                    
                }else{
                    result = b;
                }

                display_node.innerHTML = result;                
            });

            element.addEventListener('transitionend',(event) =>{
                event.target.classList.remove("playing");
            });
        });


function operate(operator){
    switch(operator){
        case "+": return a+b;
        case "-": return a-b;
        case "*": return a*b;
        case "/": return a/b;
    }
}

        
function clear(){
    document.querySelector("#display-value").innerHTML = "";
    a = null;
    b = null;
    lastOperate = false;
    lastEqual = false;
    lastOperator = null;
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

