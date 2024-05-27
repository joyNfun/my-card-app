import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [person, setPerson] = useState({
    name: '',
    position: '',
    phone: '',
    image: 'https://i.pravatar.cc/100',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [buttonText, setButtonText] = useState('Submit');

  const formatPhoneNumber = (number) => {
    const match = number.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return number;
  };

  const handleContactClick = () => {
    if (isSubmitted) {
      window.location.reload();
    } else {
      const formattedNumber = formatPhoneNumber(person.phone);
      setPhoneNumber(formattedNumber);
      setIsSubmitted(true);
      setButtonText('Back');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone' && value.length > 10) {
      return;
    }
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
  };

  return (
    <div className="page">
      <div className="card">
        <img src={person.image} alt={person.name || 'Avatar'} />
        <div className="content">
          {isSubmitted ? (
            <>
              <h3>{person.name}</h3>
              <p>{person.position}</p>
              <p>{phoneNumber}</p>
            </>
          ) : (
            <>
              <input
                type="text"
                name="name"
                value={person.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                type="text"
                name="position"
                value={person.position}
                onChange={handleChange}
                placeholder="Position"
              />
              <input
                type="text"
                name="phone"
                value={person.phone}
                onChange={handleChange}
                placeholder="Phone"
                maxLength="10"
              />
            </>
          )}
        </div>
        <button onClick={handleContactClick}>{buttonText}</button>
      </div>
    </div>
  );
};

export default App;
