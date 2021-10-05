const express = require('express');

const app = express();

app.get('/api/v1',(req,res)=> {
    
    res.status(200)
    .json({message:'Hello From Server Side',app:'sampleapi'});
});

app.post('/api/v1/sample01', (req,res) => {
    res.status(200)
    .json({message:'Post Menthod - Hello From Server Side',app:'sampleapi'});

});

const port = 3000;

app.listen(port,() =>{
console.log(`sample Api app is running on port:${port}`);
});