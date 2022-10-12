const {exec} = require('child_process');
const { stdout, stderr } = require('process');

function removingstuff(item,index,arr)
{
    arr[index] = item.substring(5,item.indexOf("ms"))
}

exec('ping -n 100 -l 64000 10.195.0.1', (err,stdout,stderr)=>{
    if(err){
        console.error(stderr);
        return;
    }
      
    let sepatext = stdout.split(' ');
    sepatext.sort();
    sepatext.slice("time=","ms");
    let findstats = sepatext.indexOf("statistics");
  
    let slicedtext = sepatext.slice(findstats+1);
    
    for(let x=0;x<3;x++)
    {
        slicedtext.pop()
    }
    slicedtext.forEach(removingstuff);
    
    console.log(slicedtext);  
});