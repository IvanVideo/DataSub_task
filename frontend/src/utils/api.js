class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(new Error(`Ошибка ${res.status} : ${res.statusText}`))
    }

    createCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "CardNumber": data.number,
                "ExpDate": `${data.dateM}/${data.dateY}`,
                "Cvv": data.CVV,
                "Amount": data.amount,
            })
        }).then((res) => this._checkResponse(res));
    }

}

const config = {
    baseUrl: "http://localhost:4000",
    headers: { "Content-Type": "application/json" },
};
const mainApi = new MainApi(config);
export default mainApi;