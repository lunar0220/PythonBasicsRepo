import React, { useReducer } from 'react';
import './index.css';


const initialState = {
  users: [
    { id: 1, name: 'Иван', active: true },
    { id: 2, name: 'Мария', active: false },
    { id: 3, name: 'Алексей', active: true },
  ],
  drafts: {}
};


function reducer(state, action) {
  switch (action.type) {

    // Изменение текста в input
    case 'CHANGE_DRAFT':
      return {
        ...state,
        drafts: {
          ...state.drafts,
          [action.id]: action.value
        }
      };


    case 'SAVE_NAME':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id
            ? {
                ...user,
                name: (state.drafts[user.id] || '').trim() || user.name
              }
            : user
        ),
        drafts: {
          ...state.drafts,
          [action.id]: ''
        }
      };


    case 'TOGGLE_ACTIVE':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id
            ? { ...user, active: !user.active }
            : user
        )
      };


    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(
          user => user.id !== action.id
        ),
        drafts: Object.fromEntries(
          Object.entries(state.drafts).filter(
            ([id]) => Number(id) !== action.id
          )
        )
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="container">
      <h1>Список пользователей</h1>
      <p className="subtitle">
        Управление пользователями с помощью useReducer
      </p>

      {state.users.length === 0 ? (
        <p className="empty">Пользователей пока нет</p>
      ) : (
        state.users.map(user => (
          <div
            className={`user-card ${user.active ? 'active' : 'inactive'}`}
            key={user.id}
          >
            <h3>
              Имя: {user.name}
            </h3>

            <div className="input-group">
              <input
                type="text"
                placeholder="Новое имя"
                value={state.drafts[user.id] ?? ''}
                onChange={(e) =>
                  dispatch({
                    type: 'CHANGE_DRAFT',
                    id: user.id,
                    value: e.target.value
                  })
                }
              />

              <button
                className="save-btn"
                onClick={() =>
                  dispatch({
                    type: 'SAVE_NAME',
                    id: user.id
                  })
                }
              >
                Сохранить
              </button>
            </div>

            <div className="buttons">
              <button
                className="status-btn"
                onClick={() =>
                  dispatch({
                    type: 'TOGGLE_ACTIVE',
                    id: user.id
                  })
                }
              >
                {user.active
                  ? 'Сделать неактивным'
                  : 'Сделать активным'}
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  dispatch({
                    type: 'DELETE_USER',
                    id: user.id
                  })
                }
              >
                Удалить
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
