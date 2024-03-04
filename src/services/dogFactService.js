const axios = require('axios'); 

function dogFactService(){
    function getRandomFact(){
        return new Promise((resolve,reject)=>{
            axios.get('https://dog-api.kinduff.com/api/facts')
                .then((response)=>{
                    const data = response.data;
                    const output = data.facts[Math.floor(Math.random() * data.facts.length)];;
                    resolve(output);
                })
                .catch((error)=>{
                    reject(error);
                })
        })
    }

    return {getRandomFact};
}

module.exports = dogFactService();