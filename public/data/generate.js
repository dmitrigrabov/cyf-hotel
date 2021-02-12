const faker = require("faker/locale/en_GB");
const jsonfile = require("jsonfile");

const numRecords = 20;

const data = {
  customers: [],
  reservations: [],
  invoices: []
};

function writeData(dataType) {
  for (key in Object.keys(data)) {
    const dataType = Object.keys(data)[key];
    const filePath = `./assets/data/${dataType}.json`;
    jsonfile.writeFile(
      filePath,
      data[dataType],
      { spaces: 2, EOL: "\r\n" },
      err => {
        if (err) {
          console.error("Error", err);
        }
      }
    );
  }
}

for (let i = 0; i < numRecords; i += 1) {
  const customerRecord = {
    id: faker.random.number({ min: 0, max: 99 }),
    title: faker.name.prefix(),
    firstname: faker.name.firstName(),
    surname: faker.name.lastName(),
    postcode: faker.address.zipCode(),
    image: faker.image.people(),
    email: faker.internet.email(),
    notes: faker.lorem.sentence()
  };
  data.customers.push(customerRecord);
}

for (let i = 0; i < numRecords; i += 1) {
  const reservationRecord = {
    id: faker.random.number({ min: 0, max: 99 }),
    customerId: faker.random.number({ min: 0, max: 99 }),
    roomId: faker.random.number({ min: 0, max: 99 }),
    checkInDate: faker.date
      .future(0)
      .toISOString()
      .slice(0, 10),
    checkOutDate: faker.date
      .future(0)
      .toISOString()
      .slice(0, 10),
    roomPrice: faker.commerce.price(20, 200, 2),
    note: faker.lorem.sentence()
  };
  data.reservations.push(reservationRecord);
}

for (let i = 0; i < numRecords; i += 1) {
  const invoiceRecord = {
    id: faker.random.number({ min: 0, max: 99 }),
    reservationId: faker.random.number({ min: 0, max: 99 }),
    total: faker.commerce.price(20, 200, 2),
    surcharges: faker.commerce.price(5, 100, 2),
    invoiceDateTime: faker.date
      .past(0)
      .toISOString()
      .slice(0, 10),
    paid: faker.random.boolean()
  };
  data.invoices.push(invoiceRecord);
}

writeData();
