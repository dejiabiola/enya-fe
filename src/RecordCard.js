import './card.css'

const RecordCard = ({ record }) => {
  return (
    <div className="card">
      <p>{record.FirstName} {record.LastName}</p>
      <p>User Name: <span>{record.UserName}</span></p>
      <p>Phone: <span>{record.PhoneNumber}</span></p>
      <p>Email: <span>{record.Email}</span></p>
      <p>Gender: <span>{record.Gender}</span></p>
      <p>Latitude: <span>{record.Latitude}</span></p>
      <p>Longitude: <span>{record.Logitude}</span></p>
      <p>Mac Address: <span>{record.MacAddress}</span></p>
      <p>Credit Card Number: <span>{record.CreditCardNumber}</span></p>
      <p>Credit Card Type: <span>{record.CreditCardType}</span></p>
      <p>Payment Method: <span>{record.paymentMethod}</span></p>
      <p>Domain Name: <span>{record.DomainName}</span></p>
      <p>URL: <span>{record.URL}</span></p>
      <p>Last Login: <span>{record.LastLogin}</span></p>
    </div>
  )
}


export default RecordCard