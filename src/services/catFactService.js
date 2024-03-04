const axios = require('axios'); 

function catFactService(){
    function getRandomFact(){
        return new Promise((resolve,reject)=>{
            axios.get('https://cat-fact.herokuapp.com/facts')
                .then((response)=>{
                    const data = response.data;
                    const output = data[Math.floor(Math.random() * data.length)].text;
                    resolve(output);
                })
                .catch((error)=>{
                    reject(error);
                })
        })
    }

    return {getRandomFact};
}

module.exports = catFactService();