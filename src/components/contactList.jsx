import { Contact } from './contact';
import css from './contactList.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <div>
      <h2>Contact List</h2>
      <ul className={css.list}>
        {contacts.map(contact => (
          <Contact
            key={contact.id}
            contact={contact}
            onDeleteContact={onDeleteContact}
          />
        ))}
      </ul>
    </div>
  );
};