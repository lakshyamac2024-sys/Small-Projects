let input = document.getElementById('input-box');
let button = document.querySelectorAll('button');

let string = "";
let arr = Array.from(button);

const operators = ['+' , '-', '*', '/']

let clickAudio = new Audio('click.mp3');
function playClickSound() {
clickAudio.currentTime = 0;
clickAudio.play().catch(e => {

})
}
arr.forEach(button => {
    button.addEventListener('click', (e) =>{
        animateButton(e.target.innerHTML)
        playClickSound();
        if(e.target.innerHTML == '='){

            try{
                let expression = string.replace(/%/g, '/100')
                string = eval(expression).toString();
                input.value = string;
            }

            catch {
                input.value = "Error";
                string = "";
            }
            
        }

        else if(e.target.innerHTML == 'AC') {
            string = "";
            input.value = string;
        }

        else if(e.target.innerHTML == 'C') {
            string = string.substring(0,string.length-1);
            input.value = string;
        }

        else if(e.target.innerHTML == '%') {
            let lastChar = string.slice(-1);
            if ( string !== "" && !operators.includes(lastChar) && lastChar !== '%') {
                string += '%';
                input.value = string;
            }
        }

        else{
            let lastChar = string.slice(-1);
            let currentChar = e.target.innerHTML;
            if (operators.includes(lastChar) && operators.includes(currentChar)){
                string = string.slice(0, -1) + currentChar;
            }

            else if (string === "" && operators.includes(currentChar) && currentChar !== '-') {
                return;
            }
            else{
                string += currentChar;
            }
            
            input.value = string;
        }
        
    })
})

document.addEventListener('keydown', (e) => {
    let key = e.key;

    if (key === 'Enter' || key === '=') {
        e.preventDefault();
        animateButton('=');
        playClickSound();
        try{
            let expression = string.replace(/%/g , '/100');
            string = eval(expression).toString();
            input.value = string;
        }

        catch {
            input.value = "Error";
            string = "";
        }
    }
    else if (key === 'Escape') {
        animateButton('AC');
        playClickSound();
        string = "";
        input.value = string;
    }
    else if (key === 'Backspace') {
        animateButton('C');
        playClickSound();
        string = string.substring(0 , string.length - 1);
        input.value = string;
    }
    else if (key === '%') {
        e.preventDefault();
        animateButton('%');
        playClickSound();
        let lastChar = string.slice(-1);
        if (string !== "" && !operators.includes(lastChar) && lastChar !== '%') {
            string += '%';
            input.value = string;
        }
    }
    else if ((key >= '0' && key <= '9') || key === '.' || operators.includes(key)) {
        animateButton(key);
        playClickSound();
        let lastChar = string.slice(-1)
        let currentChar = key;
        if (operators.includes(lastChar) && operators.includes(currentChar)){
                string = string.slice(0, -1) + currentChar;
            }

            else if (string === "" && operators.includes(currentChar) && currentChar !== '-') {
                return;
            }
            else{
                string += currentChar;
            }
            
            input.value = string;
    }
})

function animateButton(targetText) {
    arr.forEach(btn => {
        if (btn.innerText.trim() === targetText) {
            btn.classList.add('active');
            setTimeout(() => {
                btn.classList.remove('active');
            }, 120); // 120ms baad normal state mein le aayega
        }
    });
}
