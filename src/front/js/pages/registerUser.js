import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

const intitialValue = {
    email: "",
    password: ""
}
export const Register = () => {
    const { store, actions } = useContext(Context);
    const [dataUser, setDataUser] = useState(intitialValue)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const status_register = actions.registerUser(dataUser);
        navigate("/login");
        return;

    };
    return (

        <div className="container mt-3 ">
            <div className=" card col-sm-9 col-md-7 col-lg-5 mx-auto">
                <h5 className="card-header">Registro de Usuario</h5>
                <div className="card-body">
                    <div className="card-title ">
                        <label for="staticEmail">Ingrese su Email:</label>
                        <input type="text" name="email" className="form-control" onChange={handleChange} />
                    </div>
                    <div className="card-title ">
                        <label for="inputPassword" >Ingrese un Password</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className=" btn btn-primary " onClick={handleSubmit}>Registrar Usuario</button>
                    </div>

                </div>
            </div>
        </div>

    );
};
