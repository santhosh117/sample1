import React from 'react';
import {useState}from 'react' 

function SearchStock() {
    
    const [company,setCompany]=useState({id:''});
    const [stockstart,setstartdate]=useState({startDate:''});
    const [stockend,setenddate]=useState({endDate:''});
  
    const handleEventId=(event)=>{
        event.preventDefault();
        setCompany({id:event.target.value})
    }

    const handleEventStart=(event)=>{
        event.preventDefault();
        setstartdate({startDate:event.target.value})
    }

    const handleEventEnd=(event)=>{
        event.preventDefault();
        setenddate({endDate:event.target.value})
    }



    const [result,setResult]=useState({searchData:null});

    const search=(event)=>{
        fetch("http://Stockserviceawsrds-env.eba-psyhkg26.ap-south-1.elasticbeanstalk.com/api/v1.0/market/stock/get/"+company.id +"/"+ stockstart.startDate
                +"/"+ stockend.endDate , 
                {
                    method: 'GET',
                    headers: {
                    "Content-Type":"application/json"
                    }
              
                    }).then((data)=>{
                    data.json().then((resp)=>{
                        if(data.ok){
                            setResult({searchData:resp})
                        }
                        else{
                            setResult({searchData:null})
                            throw("could not fecth data for the input value");
                        }
                    })
                })
                .catch(err=>{
                    console.log(err.message)
                })
    }

        return(
            <div>
                   <h1> Company Stock Data</h1>
                   <label >Enter Company Id:</label>
                    <input type="text" onChange={handleEventId} name='id'   ></input><br/><br/>
                    <label >Enter Start Date:</label>
                    <input type="text" onChange={handleEventStart} name='startDate'  placeholder="enter in YYYY-MM-DD fromat" ></input><br/><br/>
                    <label >Enter End Date:</label>
                    <input type="text" onChange={handleEventEnd} name='endDate'   placeholder="enter in YYYY-MM-DD fromat"></input><br/><br/>
                    <input type="button"   onClick={search} value="Search" ></input>
                    <div>
                        {
                            result.searchData ?
                            <div>
                                <br></br>
                            <h1 className = "text-center"> Stock List</h1>
                            <table className = "table table-striped">
                                <thead>
                                    <tr>

                                        <td> Stock Price</td>
                                        <td> Date</td>
                                        <td> Time</td>
                                    
                                    </tr>

                                </thead>
                                <tbody>
                                {
                                    result.searchData.stockList.map(
                                        (stock) => 
                                        <tr key = {stock.id}>
                                            <td> {stock.price}</td>   
                                            <td> {stock.date}</td>   
                                            <td> {stock.time}</td>   
                                        </tr>
                                    )
                                }

                                </tbody>
                            </table>
                            <br></br>
                            MIN : {result.searchData.minStockPrice}<br></br>
                            MAX : {result.searchData.maxStockPrice}<br></br>
                            AVG : {result.searchData.avgStockPrice}<br></br>
                            </div>
                            :""
                        }
                </div>

            </div>
            
        )
    
}

export default SearchStock;