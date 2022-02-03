import React, { useState, useEffect } from 'react';
import './App.css';


// get the localStorage data back

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
}

const Todo = () => {

    const [state, setstate] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setisEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // Add the Items Function
    const addItem = () => {
        if (!state) {
            alert("Please fill the data")
        } else if (state && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: state };
                    }
                    return curElem;
                })
            )
            setstate("");
            setisEditItem("");
            setToggleButton(false);
        } else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: state,
            }
            setItems([...items, myNewInputData]);
            setstate("");
        }
    }

    // edit the items

    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setstate(item_todo_edited.name);
        setisEditItem(index);
        setToggleButton(true);
    }

    // How to delete items section 

    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        })
        setItems(updatedItems);
    }

    // Remove all the Elements

    const removeAll = () => {
        setItems([]);
    }

    // Adding Local Storage

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo"></img>
                        <figcaption>Add Your List Here 👇</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="Add Items" className="form-control" value={state} onChange={(event) => setstate(event.target.value)}></input>
                        {toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i>}

                    </div>

                    {/* Show our Items */}

                    <div className="showItems">

                        {items.map((curElem, index) => {
                            return (
                                <div className="eachItem" key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn"
                                            onClick={() => editItem(curElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn"
                                            onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    {/* remove all button */}

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;

