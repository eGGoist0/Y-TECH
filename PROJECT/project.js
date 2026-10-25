function calculate(){
    let pH = parseFloat(document.getElementById("ph").value);
    if( isNaN(pH)){
        document.getElementById("ph").innerHTML = "Write something" ;
        return
    }
    else{
        if( pH > 7 ){
            var ans = "Water is acid" ;
            return ans;
        }
        else{
            var ans = "Water is normal" ;
            return ans;
        }
    }
}