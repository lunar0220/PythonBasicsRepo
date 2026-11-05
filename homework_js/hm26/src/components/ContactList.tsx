import { memo } from "react";

export interface Contact {
    id: number;
    name: string;
    phone: string;
}

interface ContactListProps {
    contacts: Contact[];
    onDeleteContact: (id: number) => void;
}

function ContactList({
    contacts,
    onDeleteContact
}: ContactListProps) {
    return (
        <ul className="contact-list">
            {contacts.map((contact) => (
                <li key={contact.id}>
                    <span>
                        {contact.name} — {contact.phone}
                    </span>

                    <button
                        onClick={() => onDeleteContact(contact.id)}
                    >
                        Удалить
                    </button>
                </li>
            ))}

            {contacts.length === 0 && (
                <p>Контакты не найдены</p>
            )}
        </ul>
    );
}

export default memo(ContactList);
