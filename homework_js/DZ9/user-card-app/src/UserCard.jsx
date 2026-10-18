function UserCard({ name, age, color }) {
  console.log("Ререндер UserCard");

  const cardStyle = {
    backgroundColor: color,
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    width: "400px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={cardStyle}>
      <h2>{name}</h2>
      <p>Возраст: {age}</p>
    </div>
  );
}

export default UserCard;
