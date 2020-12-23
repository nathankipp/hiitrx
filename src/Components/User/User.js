import React, { useState } from 'react';
import noop from 'lodash/noop';

function User({ user, setUser, updateHiitrx }) {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);

  const save = () => {
    setUser({ name, age });
    updateHiitrx().then(noop).catch(noop);
  };

  return (
    <>
      <div className="m-4">Update Your Profile</div>
      <div className="m-4">
        <label className="label">Name</label>
        <input
          className="input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="m-4">
        <label className="label">Age</label>
        <input
          className="input"
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="m-4 has-text-centered">
        <button className="button is-black" onClick={save}>
          Save
        </button>
      </div>
    </>
  );
}

export default User;
