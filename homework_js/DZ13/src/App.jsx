import UserCard from "./UserCard";
import "./App.css";

function App() {
  const users = [
    {
      id: 1,
      name: "Анна",
      age: 25,
      email: "anna@example.com"
    },
    {
      id: 2,
      name: "Иван",
      age: 30,
      email: "ivan@example.com"
    },
    {
      id: 3,
      name: "Мария",
      age: 22,
      email: "maria@example.com"
    }
  ];

  return (
    <div className="app">
      <h1>Список пользователей</h1>

      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default App;