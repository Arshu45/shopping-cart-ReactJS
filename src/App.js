import { useState } from "react";

const cart = [];

export default function App() {
  return (
    <div>
      <Header />
      <ShoppingContainer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Shopping List</h1>
    </header>
  );
}

function ShoppingContainer() {
  const [addItem, setAddItem] = useState("");
  const [cartItems, setCartItems] = useState(cart);

  function handleCartItems(item) {
    setCartItems((curr) => [...curr, { id: crypto.randomUUID(), name: item }]);
    setAddItem("");
  }

  function handleDeleteItem(id) {
    setCartItems((curr) => curr.filter((el) => el.id !== id));
  }

  function handleEditItem(id) {
    const newName = prompt(`Edit Your Item`);
    const newCart = [...cartItems];
    const foundObj = newCart.find((el) => el.id === id);
    foundObj.name = newName;
    setCartItems(newCart);
  }

  return (
    <div className="container">
      <ShoppingList
        cartItems={cartItems}
        onDeleteItem={handleDeleteItem}
        onEditItem={handleEditItem}
      />
      <AddItem
        addItem={addItem}
        onAddItem={setAddItem}
        handleCartItems={handleCartItems}
      />
    </div>
  );
}

function ShoppingList({ cartItems, onDeleteItem, onEditItem }) {
  return (
    <div className="shopping-list">
      {cartItems.map((el) => (
        <ListItems
          key={el.id}
          id={el.id}
          name={el.name}
          onDeleteItem={onDeleteItem}
          onEditItem={onEditItem}
        />
      ))}
    </div>
  );
}

function ListItems({ name, id, onDeleteItem, onEditItem }) {
  return (
    <div className="list-item">
      <span className="item-name">{name}</span>
      <div className="item-actions">
        <button onClick={() => onEditItem(id)}>Edit</button>
        <button onClick={() => onDeleteItem(id)}>Delete</button>
      </div>
    </div>
  );
}

function AddItem({ addItem, onAddItem, handleCartItems }) {
  function handleSubmit(e) {
    e.preventDefault();
    handleCartItems(addItem);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-item">
        <input
          type="text"
          placeholder="Add a new item"
          value={addItem}
          onChange={(e) => onAddItem(e.target.value)}
        ></input>
        <button>Add Item</button>
      </div>
    </form>
  );
}
