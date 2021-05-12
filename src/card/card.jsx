import React, { useState, useEffect } from 'react'
import './card.css'

const Card = () => {
    const url = `https://serene-cove-98738.herokuapp.com/items`
    const [items, setItems] = useState([]);
    const [item, setItem] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isError,setIsError] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        const obj = { item: item };
        if (item) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            })
                .then(resp => {
                    return resp.json();
                })
                .then(data => {
                    setItems([...items, data]);
                    setIsLoading(false);
                    setItem('');
                })
                .catch(err => {
                    setIsError(true);
                })
        }
        setItem('');
    }
    
    const deleteItem = (e,_id)=>{
        // console.log(_id)
        setItems((items)=>{
            return items.filter(item=> item._id!=_id)
        })
        fetch(url+`/${_id}`,{method:'DELETE'});
    }

    useEffect(() => {
        fetch(url)
            .then(resp => {
                if (resp.status >= 200 && resp.status <= 399) {
                    return resp.json();
                } else {
                    throw new Error('Please retry')
                }
            })
            .then(record => {
                setItems(record);
                setIsLoading(false);
            })
            .catch(err => {
                setIsError(true);
            })
    }, [])

    if(isError){
        return <>
            Please Refresh
        </>;
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
                        onChange={(e) => setItem(e.target.value)}
                    />
                    <button type="submit" className='btn' onClick={submitHandler}>Add</button>
                </form>
                {!isLoading && <div className="items">
                    {
                        items.map(_item => {
                            const { _id, item } = _item
                            return <div key={_id} className="newItem">
                                {item}
                                <button className='btn2' onClick={(e)=>{deleteItem(e,_id)}}> Delete </button>
                            </div>;
                        })
                    }
                </div>}

            </div>
        </section>
    </>;
}

export default Card;