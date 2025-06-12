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

const petsArray = [
{
pet_id: 'p001',
owner_id: '2',
name: 'Buddy',
species: 'Dog',
breed: 'Golden Retriever',
height: 60, // cm
weight: 30, // kg
identifier: 'BD123456',
color: 'Golden',
medical_history: [
{
id: 'mh001',
date: '2024-02-10',
diagnosis: 'Ear infection',
treatment: 'Antibiotics',
vet: 'Dr. Smith',
note: 'Clean every day',
},
{
id: 'mh002',
date: '2024-03-01',
diagnosis: 'Vaccination',
treatment: 'Rabies',
vet: 'Dr. Smith',
note: '3-year vaccine',
},
{
id: 'mh003',
date: '2023-06-01',
diagnosis: 'Vaccination',
treatment: 'Parvovirus',
vet: 'Dr. John',
note: '1-year vaccine',
},
],
vaccination_reminders: [
{
id: 'vr001',
date: '2025-06-01',
vaccine: 'Rabies',
status: 'Pending',
},
],
},
{
pet_id: 'p002',
owner_id: '3',
name: 'Mittens',
species: 'Cat',
breed: 'Persian',
height: 25,
weight: 4.5,
identifier: 'MT654321',
color: 'White',
medical_history: [
{
id: 'mh004',
date: '2023-11-12',
diagnosis: 'Check-up',
treatment: 'General examination',
vet: 'Dr. Jane',
},
{
id: 'mh005',
date: '2024-07-01',
diagnosis: 'Vaccination',
treatment: 'Feline Distemper',
vet: 'Dr. Jane',
note: '1-year vaccine',
},
],
vaccination_reminders: [
{
id: 'vr002',
date: '2025-07-01',
vaccine: 'Feline Distemper',
status: 'Scheduled',
},
],
},
{
pet_id: 'p003',
owner_id: '4',
name: 'Rocky',
species: 'Dog',
breed: 'Bulldog',
height: 40,
weight: 24,
identifier: 'RK789012',
color: 'Brindle',
medical_history: [
{
id: 'mh006',
date: '2023-09-05',
diagnosis: 'Skin allergy',
treatment: 'Ointment',
vet: 'Dr. Mike',
},
{
id: 'mh007',
date: '2024-08-01',
diagnosis: 'Vaccination',
treatment: 'Parvovirus',
vet: 'Dr. Mike',
note: '1-year vaccine',
},
],
vaccination_reminders: [
{
id: 'vr003',
date: '2025-08-20',
vaccine: 'Parvovirus',
status: 'Pending',
},
],
},
];

const orders = [
{
id: 'ORD-12345',
dateTime: '2023-07-15T10:23:00Z',
status: 'COMPLETED',
items: [
{
id: '1',
name: 'Premium Dog Food',
price: 29.99,
quantity: 2,
image: '/src/assets/gura.jpg',
},
{
id: '4',
name: 'Flea & Tick Medicine',
price: 19.99,
quantity: 1,
image: '/src/assets/gura.jpg',
},
],
note: 'Please leave at the front door if no one answers',
deliveredOn: '2023-07-17',
summary: {
subtotal: 79.97,
total: 79.97,
},
},
{
id: 'ORD-12346',
dateTime: '2023-07-10T15:45:00Z',
status: 'PAID',
items: [
{
id: '2',
name: 'Cat Scratching Post',
price: 49.99,
quantity: 1,
image: '/src/assets/gura.jpg',
},
{
id: '5',
name: 'Interactive Dog Toy',
price: 14.99,
quantity: 1,
image: '/src/assets/gura.jpg',
},
],
note: 'Call before delivery',
summary: {
subtotal: 64.98,
total: 64.98,
},
},
{
id: 'ORD-12347',
dateTime: '2023-06-28T09:15:00Z',
status: 'PENDING',
items: [
{
id: '6',
name: 'Cat Litter Box',
price: 34.99,
quantity: 1,
image: '/src/assets/gura.jpg',
},
],
summary: {
subtotal: 34.99,
total: 34.99,
},
},
];
