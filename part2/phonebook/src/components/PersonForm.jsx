const PersonForm = ({
  newName,
  handleNameChange,
  newPhoneNumber,
  handlePhoneNumberChange,
  AddNewPerson,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={AddNewPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
