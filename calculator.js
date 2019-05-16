function subtract(){return a-b;}
function divide(){return a/b;}
function multiply(){return a*b;}
function sum(){return a + b;}


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

                display_node.innerHTML = display_value + digit;                
            });

            element.addEventListener('transitionend',(event) =>{
                event.target.classList.remove("playing");
            });
        });

document.querySelector("#clear")
        .addEventListener("click", (e)=>{            
            clear();
        })


function clear(){
    document.querySelector("#display-value").innerHTML = "";
    //TODO Clear cache
}

function updateScreen(){
    // select element
    // text <-- buffer
}

// When a number is typed:
function addToBuffer(c){
    buffer += String(c);
    updateScreen();
}

// When am operator is typed
function debuff(){
    number = parseFloat(buffer);
    buffer = String();
    updateScreen();
    return number;
}

function result(){

}


// Every number typed goes to buffer until +-/*= is typed
var buffer = String();

// Then it goes to memory
var memmory = "";
var a = null;
var b = null;
var result = 0;
var lastFunc = null;

const OP = 0;
const DIGIT = 1;
const RESULT = 2;

const init_calculator = ()=>{
    let last = RESULT;

    //call calculate with parameters
    // or...
  
    // call to buff a number 
    // 3333
}


const calculate = (func) => {

    if (last == RESULT){ // a number is shown in the screen                        
        
    }else{
        if (func == EQUAL){
            if (a != null && b != null){
                result = lastFunc(a, b);
                b = result;
            }
        }
    
        a = b;
        b = debuff();
    
        if (a != null && b != null){
            result = func(a, b);
            b = result;
            lastFunc = func;
        }        
    }
    // first time, showing 0, user type a number or user type operator (nothing happens)

    // user type a number, an operator and a number .... operator, number

    // user breaks the sequence typing a number after a result    
}

// buff
// 4 + 5 + 8 + 7 / 2 = ...

// a = 0, b = 0
// 1 2 3 -> buff buff buff
// + : debuf->number b   

// 3 3 4 7 7 4 11   3
// 3 + 4 = + 4 +(=) 3 