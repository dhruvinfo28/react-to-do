import React,{useState,useEffect} from 'react'
import './card.css'

const Card = ()=>{
    const [items,setItems] = useState([]);
    const [item,setItem] = useState('');

    const submitHandler = (e)=>{
        e.preventDefault();
        if(item){
            setItems([...items, item]);
        }
        setItem('');
    }
    return <>
    <section className="container">
        <div className="todo">
            <form className="form-control">
                <input 
                    type="text" 
                    id="item" 
                    name="item" 
                    value={item} 
                    onChange={(e)=>setItem(e.target.value)} 
                />
                <button type="submit" className='btn' onClick={submitHandler}>Add</button>
            </form>
            <div className="items">
                {
                    items.map(item=>{
                        return <div className="newItem">
                            {item}
                        </div> ;
                    })
                }
            </div>
        </div>
    </section>
    </>;
}

export default Card;