const form = document.getElementById('addForm')
const tb1List = document.getElementById('Table-1')
const tb2List = document.getElementById('Table-2')
const tb3List = document.getElementById('Table-3')
const crudLink = "https://crudcrud.com/api/3c181ee32bc74376b411d29e53125066"

form.addEventListener('submit', addOrder);
tb1List.addEventListener('click', removeItem)
tb2List.addEventListener('click', removeItem)
tb3List.addEventListener('click', removeItem)

// function addOrder(e){
//     e.preventDefault()
//     //form elements
//     let price = document.getElementById('price').value 
//     let dishType = document.getElementById('dishType').value
//     let tableNum = document.getElementById('chooseTable').value
//     //list item
//     let li= document.createElement('li');
//     li.className = 'list-group-item';

//     let itemsToAppend = document.createTextNode("Rs."+price+"  "+dishType)
//     li.appendChild(itemsToAppend)
//     //deleteBtn
//     var deleteBtn = document.createElement('button');
//     deleteBtn.className = 'btn btn-danger btn-sm float-right mr-3 delete';
//     deleteBtn.appendChild(document.createTextNode('Del Order'));
//     li.appendChild(deleteBtn);

//     //appending to table according to selection
//     if(tableNum==="Table_1"){
//         tb1List.appendChild(li)
//     }
//     else if(tableNum==="Table_2"){
//         tb2List.appendChild(li)
//     }
//     else if(tableNum==="Table_3"){
//         tb3List.appendChild(li)
//     }


//     //Axios Addition
//     let dishPrice = document.createTextNode(price)
//     let typeOfDish = document.createTextNode(dishType)
//     let tblNum = document.createTextNode(tableNum)

//     let Orders = {
//         "Price": dishPrice.textContent,
//         "Dish": typeOfDish.textContent,
//         "Table_Number": tblNum.textContent
//     }
//     axios
//     .post(`${crudLink}/restOrders`, Orders)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

//     document.getElementById('price').value =''
//     document.getElementById('dishType').value=''
//     document.getElementById('chooseTable').value=''
// }
async function addOrder(e){
    e.preventDefault()
    //form elements
    let price = document.getElementById('price').value 
    let dishType = document.getElementById('dishType').value
    let tableNum = document.getElementById('chooseTable').value
    //list item
    let li= document.createElement('li');
    li.className = 'list-group-item';

    let itemsToAppend = document.createTextNode("Rs."+price+"  "+dishType)
    li.appendChild(itemsToAppend)
    //deleteBtn
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right mr-3 delete';
    deleteBtn.appendChild(document.createTextNode('Del Order'));
    li.appendChild(deleteBtn);

    //appending to table according to selection
    if(tableNum==="Table_1"){
        tb1List.appendChild(li)
    }
    else if(tableNum==="Table_2"){
        tb2List.appendChild(li)
    }
    else if(tableNum==="Table_3"){
        tb3List.appendChild(li)
    }


    //Axios Addition
    let dishPrice = document.createTextNode(price)
    let typeOfDish = document.createTextNode(dishType)
    let tblNum = document.createTextNode(tableNum)

    let Orders = {
        "Price": dishPrice.textContent,
        "Dish": typeOfDish.textContent,
        "Table_Number": tblNum.textContent
    }
    try {
        const res = await axios.post(`${crudLink}/restOrders`, Orders)
        console.log(res)
    } catch (err) {
        console.log(err)
    }

    document.getElementById('price').value =''
    document.getElementById('dishType').value=''
    document.getElementById('chooseTable').value=''
}


// window.addEventListener('DOMContentLoaded', ()=>{
//     axios
//     .get(`${crudLink}/restOrders`)
//     .then((res)=>{
//         console.log(res)
//         for(var i=0; i<res.data.length;i++){
//             showAllOrders(res.data[i])
//         }
//     })
//     .catch((err)=> console.log(err))
// })
window.addEventListener('DOMContentLoaded', async ()=>{
    try {
        const res = await axios.get(`${crudLink}/restOrders`)
        console.log(res)
        for(var i=0; i<res.data.length;i++){
            showAllOrders(res.data[i])
        }
    } catch (err) {
        console.log(err)
    }
})


function showAllOrders(customers){
    let custID = customers._id
    let custPrice = customers.Price
    let custDish = customers.Dish
    let custTable = customers.Table_Number
    // Create new li element
    let li= document.createElement('li');
    // Add class
    li.className = 'list-group-item';
    li.id = `${custID}`
    // Add text node with input value
    let itemstoAppend = document.createTextNode ("Rs." + custPrice + "  " + custDish)
    
    li.appendChild(itemstoAppend)
        // Create del button element
        var deleteBtn = document.createElement('button');
        // Add classes to del button
        deleteBtn.className = 'btn btn-danger btn-sm float-right mr-3 delete';
        // Append text node
        deleteBtn.appendChild(document.createTextNode('Del Order'));
        // Append button to li
        li.appendChild(deleteBtn);
        

    if(custTable==="Table_1"){
        tb1List.appendChild(li);
    }
    else if(custTable==="Table_2"){
        tb2List.appendChild(li);
    }
    else if(custTable==="Table_3"){
        tb3List.appendChild(li);
    }
    
}

async function removeItem(e){
    if(e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')){
            var li = e.target.parentElement;
            try{
                const res = axios.delete(`${crudLink}/restOrders/${li.id}`)
            
                // console.log(res.data.Table_Number)
                if(tb1List.contains(li)){
                    tb1List.removeChild(li)
                }
                else if(tb2List.contains(li)){
                    tb2List.removeChild(li)
                }
                else if(tb3List.contains(li)){
                    tb3List.removeChild(li)
                }
                
                
                for(var i=0; i<res.data.length; i++){
                    showAllOrders(res.data[i])
                }
            } catch(err){
                 console.log(err)
            }
        }
    }
}