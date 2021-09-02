import React,{useState,useEffect} from 'react';
import './style.css';
const getLocalData =()=>{
    const lists = localStorage.getItem("myTodoListKey")
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return[];
    }
}
const Todo = () => {
    const[inputData,setData] = useState("");
    const[items,setItem] = useState(getLocalData());
    const[editListItem, setEditList] = useState("");
    const[toggleButton, setToggle] = useState(false);
    const addItem = ()=>{
        if(!inputData){
            alert("first add item");
        }
        else if(inputData && toggleButton){
            setItem(
                items.map((curElem)=>{
                    if(curElem.id === editListItem){
                        return{...curElem, name:inputData}
                    }
                    return curElem; 
                }

                )
            )
        }
        else{
            //for delete button
            const newInputData = {
                id : new Date().getTime().toString(),
                name : inputData,
            }
           
            setItem([...items,newInputData]);
            setData("");
        }

    }
    const deleteItem = (index)=>{
const udatedItems =  items.filter((curElem)=>{
return curElem.id !== index;

})
setItem(udatedItems);
    };
    useEffect(() => {
        localStorage.setItem("myTodoListKey", JSON.stringify(items));
    }, [items])


const removeAll = ()=>{
    setItem([]);
}


const editItem = (index)=>{
const editList = items.find((curElem)=>{
return curElem.id === index ;
});
setData(editList.name);
setEditList(index);
setToggle(true);
}


     return (
        <>
        <div className="main-div">
           <div className="child-div">
<figure>
    <img src="./image/todo.png" alt="todo" />
    <figcaption>Make your List</figcaption>
</figure>
<div className="addItem">
    <input type="text"
    placeholder="Add your activity 🕗"
    className="form-control"
    value={inputData}
    onChange={(event)=>setData(event.target.value)} />

{toggleButton?(
    <i className="fa fa-edit add-btn" onClick={addItem}></i>
    ):(
    <i className="fa fa-plus add-btn" onClick={addItem}></i>)}
   
</div>

<div className="showItems">
{items.map((curElem)=>{
    return (
        <div className="eachItem" key={curElem.id}>
<h3>{curElem.name}</h3>
<div className="todo-btn">
<i className="fa fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
<i className="fa fa-trash-alt add-btn" onClick= {()=>deleteItem(curElem.id)}></i>
</div>
</div>
    )

})}


</div>



<div className="showItems">
    <button className="btn effect04" data-sm-link-text="remove all" onClick={removeAll}>
<span>checklist</span>


    </button>
</div>
           </div> 
        </div>
        </>
    )
}

export default Todo;
