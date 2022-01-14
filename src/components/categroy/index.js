import { type } from "@testing-library/user-event/dist/type";
import React,{useState,useReducer} from "react";
const categoryValues=["Misc", "Programming", "Dark", "Pun", "Spooky", "Christmas"]
const reduce=(categoryType,action)=>{
    switch(action.value){
        case "Any":
            return action.value
        case "Custom":
            return action.value
        default:
            return ""
    }
}
export default function Category(){
    const initialValue=""
    const [categoryType,dispatch]=useReducer(reduce,initialValue)
    const [values,setValues]=useState([])

    const setCatValues=(event)=>{
        if(event.target.checked){
        setValues(prev=>[...prev,event.target.value])
        }else{
            const getValues=values 
            const index=getValues.indexOf(event.target.value)
            getValues.splice(index,1)
            console.log(getValues)
            setValues(getValues)
        }
    }
    const typeCategory=categoryType!=="Custom"
    console.log(values)
    return(
        <div>
            select <span>Category /</span><span>Categories</span>
            <div>
                <input type="radio" name="category" onChange={()=>dispatch({value:"Any"})}/><label>Any</label>
                <input type="radio" name="category" onChange={()=>dispatch({value:"Custom"})} /><label>Custom</label>
                {categoryValues.map(each=>{
                    return(
                        <li key={each}>

                            <input type="checkbox" value={each} onChange={setCatValues} disabled={typeCategory}/><label>{each}</label>
                        </li>
                    )
                })}
            </div>
        </div>
    )
}