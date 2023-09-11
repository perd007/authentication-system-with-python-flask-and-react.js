import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
const initialValue = {
	email: "",
	password: "",
};

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [dataUser, setDataUser] = useState(initialValue)
	const navigate = useNavigate();

	const handleChange = (e) => {
		setDataUser({ ...dataUser, [e.target.name]: e.target.value });
	};
	const handleSubmit = async () => {
		const result = await actions.login(dataUser);
		if (result) return navigate("/private");
		alert("Usted no es Usuario nuestro");
	};

	return (

		<div className="container mt-3 ">
			<div className=" card col-sm-9 col-md-7 col-lg-5 mx-auto">
				<h5 className="card-header">Inicio de sesion</h5>
				<div className="card-body">
					<div className="card-title ">
						<label for="staticEmail">Email</label>
						<input type="text" name="email" className="form-control" onChange={handleChange} />
					</div>
					<div className="card-title ">
						<label for="inputPassword" >Password</label>
						<input type="password" name="password" className="form-control" onChange={handleChange} />
					</div>
					<div className="d-flex justify-content-center">
						<button className=" btn btn-primary " onClick={handleSubmit}>Iniciar Sesion</button>
						<button className=" btn btn-secondary " onClick={navigate("/signup")}>Registrese</button>
					</div>

				</div>
			</div>
		</div>


	);
};
