const {request, response}=require('express');


const home=(req=request, res=response)=>{

    res.json('Working Fine');
    

}

const notFound=(req=request, res=response)=>{

    res.json('Page doesnt exist');
    

}


module.exports={
    home,
    notFound
}