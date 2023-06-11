import symbOk from '../images/symbOk.svg';
import symbFail from '../images/symbFail.svg';

function InfoTooltip({
  isOpen,
  isOk,
  onClose,
}) {

  return (
    <> {isOk &&
      <div className={`popup ${isOpen ? "popup_opened" : ""}`} >
        <div className="popup__container">
          <button
            onClick={onClose}
            className="popup__close-button link"
            type="button"
            aria-label="закрыть окно"
          />
          <form className="popup__form">
            <img className="popup__image-info" src={symbOk} alt='Успешно' />
            <h2 className="popup__text-info">Вы успешно зарегистрировались!</h2>
          </form>
        </div>
      </div>
    }
      {
        !isOk &&
        <div className={`popup ${isOpen ? "popup_opened" : ""}`} >
          <div className="popup__container">
            <button
              onClick={onClose}
              className="popup__close-button link"
              type="button"
              aria-label="закрыть окно"
            />
            <form className="popup__form">
              <img className="popup__image-info" src={symbFail} alt='Ошибка' />
              <h2 className="popup__text-info">Что-то пошло не так!
                Попробуйте ещё раз.</h2>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default InfoTooltip;