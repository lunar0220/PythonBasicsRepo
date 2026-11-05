import { useReducer, useState, useRef, useEffect, useCallback, useMemo } from "react";

import type { Contact } from "./components/ContactList";

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";

import "./App.css";

interface ContactsState {
    contacts: Contact[];
}

type ContactAction =
    | {
        type: "ADD_CONTACT";
        payload: Contact;
    }
    | {
        type: "DELETE_CONTACT";
        payload: number;
    };

const initialState: ContactsState = {
    contacts: [
        {
            id: 1,
            name: "John",
            phone: "Doe"
        }
    ]
};

function contactsReducer(
    state: ContactsState,
    action: ContactAction
): ContactsState {

    switch (action.type) {
        case "ADD_CONTACT":
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            };

        case "DELETE_CONTACT":
            return {
                ...state,
                contacts: state.contacts.filter(
                    (contact) => contact.id !== action.payload
                )
            };

        default:
            return state;
    }
}

function App() {

    const [state, dispatch] = useReducer(
        contactsReducer,
        initialState
    );

    const [search, setSearch] = useState("");

    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        searchInputRef.current?.focus();
    }, []);

    const handleAddContact = useCallback(
        (name: string, phone: string) => {
            const newContact: Contact = {
                id: Date.now(),
                name,
                phone
            };

            dispatch({
                type: "ADD_CONTACT",
                payload: newContact
            });
        },
        []
    );

    const handleDeleteContact = useCallback((id: number) => {
        dispatch({
            type: "DELETE_CONTACT",
            payload: id
        });
    }, []);

    const filteredContacts = useMemo(() => {
        return state.contacts.filter((contact) =>
            contact.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [state.contacts, search]);

    return (
        <div className="container">

            <h1>Контакты</h1>

            <ContactForm
                onAddContact={handleAddContact}
            />

            <SearchBar
                search={search}
                onSearchChange={setSearch}
                searchInputRef={searchInputRef} // Передаем ссылку на input в компонент поиска.
            />

            <ContactList
                contacts={filteredContacts}
                onDeleteContact={handleDeleteContact}
            />

        </div>
    );
}

export default App;
