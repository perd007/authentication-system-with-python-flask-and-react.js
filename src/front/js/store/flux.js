const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			backendUrl: process.env.BACKEND_URL,
			token: "",
			userData: {},
		},
		actions: {

			login: async (user) => {
				try {
					const store = getStore()
					const response = await fetch(`${store.backendUrl}/api/login`, {
						method: "POST",
						headers: {
							"content-type": "application/json",
						},
						body: JSON.stringify(user),
					});
					const data = await response.json();
					if (!data.token) return false;
					console.log(data); //vemos si existe el token 
					setStore({ token: data.token });
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			registerUser: async (dataUser) => {
				//console.log(dataUser)
				try {
					const store = getStore()
					const response = await fetch(`${store.backendUrl}/api/register`, {
						body: JSON.stringify(dataUser),
						method: "POST",
						headers: {
							"content-type": "application/json",
						},
					})//fin del fetch

					const data = await response.json();
					if (response.status !== 201) {
						return false;
					} else {
						return true;
					}
				} catch (error) {
					console.log(error)
				}

			},
			getUserData: async () => {
				try {
					const store = getStore()
					const response = await fetch(`${store.backendUrl}/api/private`, {
						headers: {
							Authorization: `Bearer ${store.token}`,
						},
					});
					const data = await response.json();
					if (response.status === 401) {
						alert("No autorizado");
						return;
					}
					console.log(data);
					setStore({ userData: data.data });

				} catch (error) {
					console.log(error)
				}
			},
			logout: () => {

				setStore({ token: "" });
			}

		}
	};
};

export default getState;
