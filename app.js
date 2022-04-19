const state = {
    index: 0,
    question : [
        {id: 1, question: "Quel est votre prénom ?", type: "string"},
        {id: 2, question: "Quel est votre nom ?", type: "string"},
        {id: 3, question: "Quel est votre age ?", type: "number"},
    ],
    answer: [],
}

let {index, question, answer} = state;

const validateInput = type => {
    process.stdin.once("data", (chunk)=>{
        if(type === "string"){
            if(/\d/.test(chunk)){
                process.stdout.write("Pas de chiffres !! \n");
                return form();
            }
            
            if(chunk.toString().trim().length < 2){
                process.stdout.write("2 lettres minimums !! \n");
                return form();
            }

            answer.push(chunk.toString().trim());
            index++;
            form();
        }

        if(type === "number"){
            if(isNaN(chunk)){
                process.stdout.write("Veuillez entrer un chiffre !\n");
                return form();
            }

            answer.push(parseInt(chunk));
            index++;
            form();
        }
    })    
}

const displayResult = () => {
    console.table({
        Prénom: answer[0],
        Nom: answer[1],
        Age: answer[2],
    })
}

const form = () => {
    if(index > question.length - 1){
        displayResult();
        process.exit(0);
    }

    process.stdout.write(`question n°${question[index].id} : ${question[index].question} \n`);
    validateInput(question[index].type);
}

form();