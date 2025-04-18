import React from "react";
import { useEffect,useState } from "react";


//create your first component
const Home = () => {

	const [task, setTask] = useState("");
	const [is_done, setIs_done] = useState(false)
	const [txtMod, setTxtmod] = useState("");
	const [bolMod, setBolmod] = useState(false)
	const [ids,setIds] = useState(0);
	const [store, setStore] = useState([]);
	const [visible, setVisible] = useState(0);

	const getDataFunction = async () => {
		try{
			const getFectch = await fetch("https://playground.4geeks.com/todo/users/j_arevalo");
			const getData = await getFectch.json();
			setStore(getData.todos)
		}catch(error){
			console.log(error)
			try{const postFetch = await fetch("https://playground.4geeks.com/todo/users/j_arevalo",{
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: {}
			});
			const postData = await postFetch.json();}
			catch(error){
				console.log(error)

			}
			try{
			const getFetch = await fetch("https://playground.4geeks.com/todo/users/j_arevalo");
			const getData = await getFetch.json();
					setStore(getData.todos)
				}
			catch(error){
				
				console.log(error)
			}

		}

			

				
				

		
	}



	useEffect(() => {
		getDataFunction();

	}, []);

	const handleChange = e => {

		setTask(e.target.value)
		

	}
	const handleChange2 = e => {

		setTxtmod(e.target.value)
		

	}

	const handleSubmit = async (e) => {

		e.preventDefault();
		const tempObj = {
			label: task,
			is_done: is_done,
		}
		
		try {
		const submitFetch = await fetch("https://playground.4geeks.com/todo/todos/j_arevalo",{
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			user_name: "j_arevalo",
			body: JSON.stringify(tempObj)
		});
		const submitData = await submitFetch.json();}
		catch(error){
            console.log(error)

		}
		setTask("");
		getDataFunction();



	}
	const handleDelete = async (id) => {
        try {
            const deleteFetch = await fetch('https://playground.4geeks.com/todo/todos/' + id, {
                method: 'DELETE'
            });

        } catch (error) {
            console.log(error)
        }
		getDataFunction();
    }

	const handleModify = async (e) =>{
		e.preventDefault();
		try {
			const tempObj = {
				label: txtMod,
				is_done: bolMod,
			}
            const modifyFetch = await fetch('https://playground.4geeks.com/todo/todos/' + ids, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tempObj)
            });
            const modifyData = await modifyFetch.json();
			setTxtmod("");
			setBolmod(false);
			setIds(null);
			setTask("");
			getDataFunction();
        } catch (error) {
            console.log(error)
        }
	}

	function showModify(id){
		
		if(visible===id){
			setVisible(null)
		}
		else{
			setVisible(id)
		}
	}

	


	return (
		<div>
			<h1 className="text-center p-3" >My Todolist with React</h1>
			<form className="justificado" onSubmit={handleSubmit}>
			<h1 className="text-center p-3 formato justificado m-0">Create</h1>
				<input className="formato justificado" value={task} onChange={handleChange} type="text" placeholder="What needs to be done?" required/>
				<div className="formato justificado">
					<p>It is done?</p>
					<fieldset>
							<label className="text-center">
								<input type="radio" name="boolean" onChange={() => setIs_done(true)}/>Yes
							</label>
							<label className="text-center px-3">
							<input type="radio" name="boolean" onChange={() => setIs_done(false)}/>No
							</label>
					</fieldset>
				</div>
				<div className="justificado formato">
					<input className="botonSend rounded" type="submit"/>
				</div>
			</form>
			<h1 className="text-center p-3 formato justificado m-0">Tasks</h1>
			<ul className="lista justificado">
				{store.map((el,i) => 
				<li className="formato justificado" key={i}>
					<p>{el.label} <i className={el.is_done ? "fa-solid fa-check okay" : "fa-solid fa-xmark cruz"}></i></p>
					<button className="rounded botonWarning" onClick={()=>showModify(el.id)}>Modify</button>
					<button className="rounded mx-2 botonDelete" onClick={()=>{handleDelete(el.id)}}>Delete</button>
					{visible === el.id && (
					<form className="mt-4" onSubmit={handleModify} >
						<input className="rounded p-3 mt-4" value={txtMod} onChange={handleChange2} type="text" placeholder="Task" required/>
					<fieldset className="mt-4">
							<label className="text-center">
								<input type="radio" name="boolean" onChange={() => setBolmod(true)}/>Yes
							</label>
							<label className="text-center px-3">
							<input type="radio" name="boolean" onChange={() => setBolmod(false)}/>No
							</label>
					</fieldset>
					
				<input className="botonSend rounded mt-4" type="submit"/>
			</form>)}
				</li>)}
			</ul>
			
			<div className="formatoParrafo justificado">
			<p className="parrafo">Left {store.length} items</p>
			</div>
		</div>
	);
};

export default Home;