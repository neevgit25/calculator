const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input="";

for(let key of keys)
{
    const value = key.dataset.key;

    key.addEventListener('click', () => {
     if(value == "clear"){
        input ="";
        display_input.innerHTML = "";
        display_output.innerHTML ="";
     } 
     else if (value == "backspace"){
        input = input.slice(0,-1);
        display_input.innerHTML =CleanInput(input);
     } 
     else if(value == "=")
        {
            let result = eval(InputPrep(input));//evaluate javascript code and execute it

            display_output.innerHTML = OutputClean(result);

        }else if(value == "brackets"){
            if(
                input.indexOf("(") == -1 ||
                input.indexOf("(") != -1 && 
                input.indexOf(")") != -1 && input.lastIndexOf("(") < input.lastIndexOf(")")
            )
            {
                input += "(";
            }
            else if(
                   input.indexOf("(") !=-1 &&                 
                   input.indexOf(")") == -1 || 
                   input.indexOf("(") != -1 &&
                   input.indexOf(")") != -1 &&
                   input.lastIndexOf("(") >input.lastIndexOf(")")
                   )
                   {
                    input += ")";
                   }
                   display_input.innerHTML=CleanInput(input);
        }
        else {
           if(Inputvalid(value)){
            input += value;
            display_input.innerHTML = CleanInput(input);
        }}

    })
}
function CleanInput(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for(let i=0; i< input_array_length; i++)
    {
       if(input_array[i] == "*")
       {
        input_array[i] = '<span class="operators">x</span>'  ;
       } 
       else if(input_array[i] == "/")
       {
        input_array[i] = '<span class="operators">÷</span>'  ;
       } 
       else if(input_array[i] == "-")
       {
        input_array[i] = '<span class="operators">-</span>'  ;
       } 
       else if(input_array[i] == "+")
       {
        input_array[i] = '<span class="operators">+</span>'  ;
       } 
       else if(input_array[i] == "(")
       {
        input_array[i] = '<span class="operators">(</span>'  ;
       } 
       else if(input_array[i] == ")")
       {
        input_array[i] = '<span class="operators">)</span>'  ;
       } 
       else if(input_array[i] == "%")
       {
        input_array[i] = '<span class="operators">%</span>'  ;
       }
    }
    return input_array.join("");
}
function OutputClean(output){
    let output_string = output.toString();//1111.765
    let decimal = output_string.split(".")[1];//after decimal 765
    output_string = output_string.split(".")[0];//before decimal 1111

    let output_array = output_string.split("");

    if(output_array.length > 3){
        for(let i=output_array.length -3 ;i > 0; i -= 3)
        {
            output_array.splice(i,0,",");
        }
    }
    if(decimal)
    {
        output_array.push(".");
        output_array.push(decimal);

    }
  return output_array.join("");

}
function Inputvalid(value){
    let last_input = input.slice(-1);
    let operators = ["+","-","*","/"] ;

    if(value == "."  && last_input == ".")
    {
        return false;// we cannot write 8... means point is not allowed more than 1 times
    }

    if(operators.includes(value)){
        if(operators.includes(last_input)){
          return false ;
        }
        else {
            return true ;
        }
    }
    return true;
}

function InputPrep(input){

    let input_array = input.split("");

    for(let i=0; i< input_array.length; i++){
        if(input_array[i] == "%")
        {
            input_array[i] ="/100";
        }
    }
    return input_array.join("");
}
