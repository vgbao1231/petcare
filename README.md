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
id: 1,
type: 'foods',
name: 'Premium Dog Food',
desc: 'High-quality dog food with essential nutrients',
price: 25,
imgUrl: '/src/assets/gura.jpg',
},
{
id: 1,
type: 'accessories',
name: 'Cat Scratching Post',
desc: 'Durable scratching post to keep your cat entertained',
price: 35,
imgUrl: '/src/assets/gura.jpg',
},
{
id: 2,
type: 'medicines',
name: 'Pet Shampoo',
desc: 'Gentle and effective shampoo for a clean and healthy coat',
price: 15,
imgUrl: '/src/assets/gura.jpg',
},
{
id: 2,
type: 'accessories',
name: 'Chew Toy',
desc: 'Safe and fun chew toy for dogs of all sizes',
price: 10,
imgUrl: '/src/assets/gura.jpg',
},
{
id: 3,
type: 'accessories',
name: 'Automatic Water Dispenser',
desc: 'Ensures a fresh water supply for your pet at all times',
price: 45,
imgUrl: '/src/assets/gura.jpg',
},
];

const appointments = [
{
id: 'appt_001',
customer_address: 'Downtown Branch',
scheduled_time: '2023-07-20T10:00:00Z',
status: 'pending',
total: 114.95,
note: 'Includes pet products and a basic check-up',
branch_id: 'branch_001',
employeee_id: 'emp_001',
},
{
id: 'appt_002',
customer_address: 'Uptown Clinic',
scheduled_time: '2023-06-15T14:30:00Z',
status: 'completed',
total: 136.98,
note: 'Cat food and vaccination service',
branch_id: 'branch_002',
employeee_id: 'emp_002',
},
{
id: 'appt_003',
customer_address: 'Main Street Vet',
scheduled_time: '2023-08-05T09:00:00Z',
status: 'pending',
total: 61.98,
note: 'Cat food order only',
branch_id: 'branch_003',
employeee_id: 'emp_003',
},
{
id: 'appt_004',
customer_address: 'City Pet Spa',
scheduled_time: '2023-05-10T16:00:00Z',
status: 'cancelled',
total: 40.0,
note: 'Grooming appointment canceled',
branch_id: 'branch_004',
employeee_id: 'emp_004',
},
{
id: 'appt_005',
customer_address: 'Downtown Branch',
scheduled_time: '2023-09-12T11:15:00Z',
status: 'in_progress',
total: 89.97,
note: 'Dog treats and teeth cleaning',
branch_id: 'branch_001',
employeee_id: 'emp_005',
},
];
