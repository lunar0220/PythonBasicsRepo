import { useState } from "react";


interface ContactFormProps {
    onAddContact: (name: string, phone: string) => void;
}

function ContactForm({ onAddContact }: ContactFormProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (!name.trim() || !phone.trim()) {
            setError("Заполните имя и телефон!");
            return;
        }

        onAddContact(name.trim(), phone.trim());

        setName("");
        setPhone("");
        setError("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="tel"
                    placeholder="Телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <button type="submit">
                    Добавить контакт
                </button>
            </form>

            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default ContactForm;
