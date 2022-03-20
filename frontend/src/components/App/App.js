import './App.css';
import Card from '../Card/Card';
import Form from '../Form/Form';
import React from 'react';
import mainApi from '../../utils/api';
import turtle from '../../img/111.png';

function App() {
  const [cardValues, setCardValues] = React.useState([]); // значение, которые мы получаем из input number формы
  const [resBack, setResBack] = React.useState([]); // ответ сервера
  const [resStatus, setResStatus] = React.useState(false); // состояние ответа от сервера для отображения


  // Получаем значение номера карты и записываем в стейт
  const getCardValues = (data) => {
    setCardValues(data)
  }

  // Сабмит формы и отправка значений на сервер
  const createCard = (data) => {
    mainApi.createCard(data)
      .then((res) => {
        setResBack([res._id, res.Amount])
        setResStatus(true)
      })
  }

  return (
    <div className='app'>
      <h1 className='app__title'>Пожертвование в фонд морских черепах</h1>
      <div className='app__container'>
        <Form getCardValues={getCardValues} createCard={createCard} />
        <div>
          <Card cardValues={cardValues} />
          {
            resStatus ?
              <div className='app__res'>
                <p className='app__subtitle'>Ответ от сервера:</p>
                <div>
                  <p>id: {resBack[0]}</p>
                  <p>Amount: {resBack[1]}</p>
                </div>
              </div> :
              null
          }
          <img className={resStatus ? 'app__turtle' : 'app__turtle_hide'} src={turtle} />
        </div>
      </div>
    </div>
  );
}

export default App;
