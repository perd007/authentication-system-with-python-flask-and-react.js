import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        if (store.token === "" || !store.token) {
            navigate("/login");
            return;
        }
        actions.getUserData();
    }, [store.token]);

    return (

        <div className="container mt-3 ">
            <div className=" card col-sm-9 col-md-7 col-lg-5 mx-auto">
                <h5 className="card-header">Mi sesion</h5>
                <div className="card-title ">
                    <h4>Email:  {store.userData.email}</h4>
                </div>
                <div className="card-title ">
                    <h4>Id:  {store.userData.id}</h4>
                </div>

                <div className="d-flex justify-content-center">
                    <button className=" btn btn-primary " onClick={actions.logout} >Cerrar sesion</button>
                </div>

            </div>
        </div>


    );
};
