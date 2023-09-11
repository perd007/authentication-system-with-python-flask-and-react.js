"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash


api = Blueprint("api", __name__)


@api.route("/hello", methods=["POST", "GET"])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# endpoint para registar al usuario
@api.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    password = data.get("password", None)
    email = data.get("email", None)
    # validamos que el usrio exista
    user_exist = User.query.filter_by(email=email).first()
    if user_exist:
        return jsonify({"error": "User exist"}), 404

    hashed_password = generate_password_hash(password)
    user = User(email=email, password=hashed_password, is_active=True)

    try:
        db.session.add(user)
        db.session.commit()
        return jsonify("Usuario creado con exito"), 201

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": error}), 500


# creamos el endpoint de login
@api.route("/login", methods=["POST"])
def user_login():
    data = request.get_json()
    email = data.get("email", None)
    password = data.get("password", None)

    # validamos que el usrio exista
    user_exist = User.query.filter_by(email=email).first()
    if not user_exist:
        return jsonify({"error": "User not found"}), 404

    # obtenemos el password y lo comparamos
    password_check = check_password_hash(user_exist.password, password)
    if not password_check:
        return jsonify({"error": "Password incorrecto"}), 401

    # se crea el token
    token_data = {"id": user_exist.id, "email": user_exist.email}
    token = create_access_token(token_data)
    return jsonify({"token": token}), 200


@api.route("/private", methods=["GET"])
@jwt_required()
def get_private_data():
    user = get_jwt_identity()
    return jsonify({"data": user}), 200
