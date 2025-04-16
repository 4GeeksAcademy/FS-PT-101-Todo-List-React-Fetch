import React from "react";
import { useEffect,useState } from "react";


//create your first component
const Home = () => {

	
	const [data, setData] = useState("");
	const [id, setId] = useState("");
	const [store, setStore] = useState([]);

	const getDataFunction = async () => {
		try{
			const getFectch = await fetch("https://playground.4geeks.com/todo/users/j_arevalo");
			const getData = await getFectch.json();
					setStore(getData.todos)

			if (getFectch.status == 404){

				const postFectch = await fetch("https://playground.4geeks.com/todo/users/j_arevalo",{
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: {}
			});
			const postData = await postFectch.json();
			const getFectch = await fetch("https://playground.4geeks.com/todo/users/j_arevalo");
			const getData = await getFectch.json();
					setStore(getData.todos)
				}

		}catch(error){
		}
	}



	useEffect(() => {
		getDataFunction();
	}, []);


	// form=> onSubmit={handleSubmit}
	// inputtext=>  value={task} onChange={handleChange}
	// i=> onClick={e=>handleDelete(i)}
	return (
		<div>
			<h1 className="text-center p-3">My Todolist with React</h1>
			<form className="justificado">
				<input className="formato justificado" type="text" placeholder="What needs to be done?"/>
				<input type="submit" hidden/>
			</form>
			<ul className="lista justificado">
				{store.map((el,i) => <li className="formato justificado" key={i}>{el.label} <i className={el.is_done ? "fa-solid fa-check okay" : "fa-solid fa-xmark cruz"}></i><button>Modify</button><button>Delete</button></li>)}
			</ul>
			<div className="formatoParrafo justificado">
			<p className="parrafo">Left {store.length} items</p>
			</div>
		</div>
	);
};

export default Home;