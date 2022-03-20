import './Card.css';
import logo from '../../img/logo.png';

function Card({ cardValues }) {

    return (
        <section className='card'>
            <img className='card1__logo' src={logo} />
            <div className='card__container first'>
                <label>Expiration Date</label>
                <label placeholder='Card Number' className='card__number'>{cardValues.number ? cardValues.number : 'XXXX XXXX XXXX XXXX'}</label>
            </div>
            <div className='card__container'>
                <label className='card__expiration-date'>Expiration Date</label>
                <div className='card__box'>
                    <label placeholder='MM/' className='card__date' value={cardValues.dateM}>{cardValues.dateM ? cardValues.dateM : 'MM'}</label>
                    /
                    <label placeholder='YYYY' className='card__date' value={cardValues.dateY}>{cardValues.dateY ? cardValues.dateY : 'YYYY'}</label>
                    <label placeholder='CVC' className='card__cvc' value={cardValues.CVV}>{cardValues.CVV ? cardValues.CVV : 'CVC'}</label>
                </div>
            </div>
        </section>
    );
}

export default Card;