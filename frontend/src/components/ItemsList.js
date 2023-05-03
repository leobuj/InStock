import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

function ItemList({ items }) {
  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <Accordion>
      {items.map((item, index) => (
        <Card key={index}>
          <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>{item.name}</Accordion.Header>
            <Accordion.Body>
              <p>Quantity: {item.quantity}</p>
              <p>Description: {item.description}</p>
            </Accordion.Body>
          </Accordion.Item>
        </Card>
      ))}
    </Accordion>
  );
}

export default ItemList;
