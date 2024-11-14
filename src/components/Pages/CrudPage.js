import React, { useState, useEffect } from 'react';

const apiUrl = 'https://672c4dde1600dda5a9f7e1db.mockapi.io/items';


function CrudPage() {
    const [items, setItems] = useState([]);

    // Fetch data from API
    const fetchData = () => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    // Display data as a list
    const displayData = () => {
        return items.map(item => (
            <div key={item.id} id={`item-${item.id}`}>
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Price:</strong> ${item.price}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <button onClick={() => editItem(item.id)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
                <hr />
            </div>
        ));
    };

    // Add a new item
    const createItem = () => {
        const newItem = {
            name: prompt("Enter item name:"),
            description: prompt("Enter item description:"),
            price: parseFloat(prompt("Enter item price:")),
            quantity: parseInt(prompt("Enter item quantity:"))
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        })
            .then(response => response.json())
            .then(() => fetchData())
            .catch(error => console.error('Error adding item:', error));
    };

    // Edit an existing item
    const editItem = (id) => {
        const updatedItem = {
            name: prompt("Update item name:"),
            description: prompt("Update item description:"),
            price: parseFloat(prompt("Update item price:")),
            quantity: parseInt(prompt("Update item quantity:"))
        };

        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem)
        })
            .then(response => response.json())
            .then(() => fetchData())
            .catch(error => console.error('Error updating item:', error));
    };

    // Delete an item
    const deleteItem = (id) => {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
            .then(() => fetchData())
            .catch(error => console.error('Error deleting item:', error));
    };

    // Load data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Item List</h1>
            <button onClick={createItem}>Add Item</button>
            <div id="content">
                {displayData()}
            </div>
        </div>
    );
}

export default CrudPage;
