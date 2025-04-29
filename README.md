This one use MUI to create UI component
Temp Save:

const services = [
{
serviceId: 1,
name: 'Dog Grooming',
desc: 'Full-service grooming for your dog, including bath and haircut',
price: 50,
imgUrl: '/src/assets/gura.jpg',
},
{
serviceId: 2,
name: 'Cat Boarding',
desc: 'Safe and comfortable boarding for your cat while you are away',
price: 40,
imgUrl: '/src/assets/gura.jpg',
},
];

const products = [
{
productId: 1,
name: 'Premium Dog Food',
desc: 'High-quality dog food with essential nutrients',
price: 25,
imgUrl: '/src/assets/gura.jpg',
},
{
productId: 2,
name: 'Cat Scratching Post',
desc: 'Durable scratching post to keep your cat entertained',
price: 35,
imgUrl: '/src/assets/gura.jpg',
},
{
productId: 3,
name: 'Pet Shampoo',
desc: 'Gentle and effective shampoo for a clean and healthy coat',
price: 15,
imgUrl: '/src/assets/gura.jpg',
},
{
productId: 4,
name: 'Chew Toy',
desc: 'Safe and fun chew toy for dogs of all sizes',
price: 10,
imgUrl: '/src/assets/gura.jpg',
},
{
productId: 5,
name: 'Automatic Water Dispenser',
desc: 'Ensures a fresh water supply for your pet at all times',
price: 45,
imgUrl: '/src/assets/gura.jpg',
},
];

const appointments = [
{
id: '1',
type: 'In-Store Visit',
dateTime: '2023-07-20T10:00:00Z',
location: 'Downtown Branch',
status: 'Upcoming',
products: [
{ name: 'Dog Shampoo', price: 12.99, quantity: 1 },
{ name: 'Dog Toys', price: 12.99, quantity: 1 },
{ name: 'Cat Shampoo', price: 12.99, quantity: 2 },
{ name: 'Flea Collar', price: 24.99, quantity: 1 },
],
services: [{ name: 'Basic Check-up', price: 50.0, quantity: 1 }],
},
{
id: '2',
type: 'In-Store Visit',
dateTime: '2023-06-15T14:30:00Z',
location: 'Uptown Clinic',
status: 'Completed',
products: [{ name: 'Cat Food (5kg)', price: 30.99, quantity: 2 }],
services: [{ name: 'Vaccination', price: 75.0, quantity: 1 }],
},
{
id: '3',
type: 'At-Home Visit',
dateTime: '2023-08-05T09:00:00Z',
location: 'Main Street Vet',
status: 'Upcoming',
products: [{ name: 'Cat Food (5kg)', price: 30.99, quantity: 2 }],
},
{
id: '4',
type: 'At-Home Visit',
dateTime: '2023-05-10T16:00:00Z',
location: 'City Pet Spa',
status: 'Canceled',
services: [{ name: 'Grooming', price: 40.0, quantity: 1 }],
},
{
id: '5',
type: 'In-Store Visit',
dateTime: '2023-09-12T11:15:00Z',
location: 'Downtown Branch',
status: 'Upcoming',
products: [{ name: 'Dog Treats', price: 9.99, quantity: 3 }],
services: [{ name: 'Teeth Cleaning', price: 60.0, quantity: 1 }],
},
];
