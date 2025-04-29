"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Calendar,
  Clock,
  MapPin,
  Pencil,
  Plus,
  X,
  Eye,
  Check,
  Home,
  Store,
  Package,
  Scissors,
  Minus,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

// Mock appointment data with services and products
const appointments = [
  {
    id: "APT-12345",
    type: "in-store", // in-store or at-home
    date: "2023-07-20",
    time: "10:00 AM",
    status: "Upcoming",
    location: "Downtown Branch",
    address: "123 Main St, City Center",
    services: [
      { id: "s1", name: "Pet Grooming", price: 50.0 },
      { id: "s2", name: "Health Check-up", price: 75.0 },
    ],
    products: [{ id: "p1", name: "Premium Dog Food", price: 29.99, quantity: 1 }],
    staff: {
      name: "Dr. Michael Chen",
      position: "Veterinarian",
      image: "/placeholder.svg?height=50&width=50",
    },
    notes: "Please bring vaccination records",
    totalAmount: 154.99,
  },
  {
    id: "APT-12346",
    type: "at-home",
    date: "2023-07-25",
    time: "2:30 PM",
    status: "Upcoming",
    address: "456 Oak Ave, West District",
    services: [{ id: "s3", name: "Mobile Grooming", price: 80.0 }],
    products: [{ id: "p2", name: "Cat Litter", price: 19.99, quantity: 2 }],
    staff: {
      name: "Emily Johnson",
      position: "Mobile Groomer",
      image: "/placeholder.svg?height=50&width=50",
    },
    notes: "Please call 10 minutes before arrival",
    totalAmount: 119.98,
  },
  {
    id: "APT-12347",
    type: "in-store",
    date: "2023-06-15",
    time: "11:30 AM",
    status: "Completed",
    location: "Downtown Branch",
    address: "123 Main St, City Center",
    services: [{ id: "s4", name: "Dental Cleaning", price: 120.0 }],
    products: [],
    staff: {
      name: "Dr. Lisa Thompson",
      position: "Dental Specialist",
      image: "/placeholder.svg?height=50&width=50",
    },
    notes: "Dental cleaning completed successfully",
    totalAmount: 120.0,
    feedback: {
      rating: 5,
      comment: "Great service! Very thorough cleaning.",
    },
  },
  {
    id: "APT-12348",
    type: "at-home",
    date: "2023-06-10",
    time: "9:15 AM",
    status: "Completed",
    address: "789 Pine Rd, East District",
    services: [{ id: "s5", name: "Vaccination", price: 45.0 }],
    products: [{ id: "p3", name: "Pet Vitamins", price: 24.99, quantity: 1 }],
    staff: {
      name: "Dr. James Wilson",
      position: "Mobile Veterinarian",
      image: "/placeholder.svg?height=50&width=50",
    },
    notes: "Annual vaccination completed",
    totalAmount: 69.99,
    feedback: {
      rating: 4,
      comment: "Good service, but arrived a bit late.",
    },
  },
  {
    id: "APT-12349",
    type: "in-store",
    date: "2023-07-05",
    time: "3:00 PM",
    status: "Cancelled",
    location: "Eastside Branch",
    address: "789 Pine Rd, East District",
    services: [{ id: "s6", name: "Grooming", price: 55.0 }],
    products: [{ id: "p4", name: "Dog Shampoo", price: 14.99, quantity: 1 }],
    staff: {
      name: "Emily Johnson",
      position: "Groomer",
      image: "/placeholder.svg?height=50&width=50",
    },
    notes: "Cancelled due to personal emergency",
    totalAmount: 69.99,
  },
]

// Available services and products for editing
const availableServices = [
  { id: "s1", name: "Pet Grooming", price: 50.0 },
  { id: "s2", name: "Health Check-up", price: 75.0 },
  { id: "s3", name: "Mobile Grooming", price: 80.0 },
  { id: "s4", name: "Dental Cleaning", price: 120.0 },
  { id: "s5", name: "Vaccination", price: 45.0 },
  { id: "s6", name: "Nail Trimming", price: 20.0 },
  { id: "s7", name: "Flea Treatment", price: 35.0 },
]

const availableProducts = [
  { id: "p1", name: "Premium Dog Food", price: 29.99 },
  { id: "p2", name: "Cat Litter", price: 19.99 },
  { id: "p3", name: "Pet Vitamins", price: 24.99 },
  { id: "p4", name: "Dog Shampoo", price: 14.99 },
  { id: "p5", name: "Cat Toy Set", price: 12.99 },
  { id: "p6", name: "Pet Carrier", price: 39.99 },
  { id: "p7", name: "Dog Leash", price: 9.99 },
]

export default function AppointmentsClient() {
  const [selectedAppointment, setSelectedAppointment] = useState<(typeof appointments)[0] | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const { toast } = useToast()

  // Add state for edit mode
  const [isEditing, setIsEditing] = useState(false)
  const [editedAppointment, setEditedAppointment] = useState<(typeof appointments)[0] | null>(null)
  
  // State for service and product selection during editing
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<{id: string, quantity: number}[]>([])

  const handleViewDetails = (appointment: (typeof appointments)[0]) => {
    setSelectedAppointment(appointment)
    setShowDetails(true)
  }

  const handleCancelAppointment = () => {
    // In a real app, you would call an API to cancel the appointment
    toast({
      title: "Appointment Cancelled",
      description: `Your appointment on ${selectedAppointment?.date} has been cancelled.`,
    })
    setShowCancelDialog(false)
    setShowDetails(false)
  }

  // Add a function to handle editing
  const handleStartEditing = () => {
    if (selectedAppointment) {
      setEditedAppointment(selectedAppointment)
      // Initialize selected services and products
      setSelectedServices(selectedAppointment.services.map(s => s.id))
      setSelectedProducts(selectedAppointment.products.map(p => ({ id: p.id, quantity: p.quantity })))
      setIsEditing(true)
    }
  }

  const handleSaveEdit = () => {
    if (!editedAppointment) return;
    
    // Calculate new total amount based on selected services and products
    let newTotal = 0;
    
    // Add service prices
    selectedServices.forEach(serviceId => {
      const service = availableServices.find(s => s.id === serviceId);
      if (service) newTotal += service.price;
    });
    
    // Add product prices
    selectedProducts.forEach(product => {
      const productInfo = availableProducts.find(p => p.id === product.id);
      if (productInfo) newTotal += productInfo.price * product.quantity;
    });
    
    // Update edited appointment with new services, products and total
    const updatedAppointment = {
      ...editedAppointment,
      services: selectedServices.map(id => {
        const service = availableServices.find(s => s.id === id);
        return service ? { id, name: service.name, price: service.price } : { id, name: "", price: 0 };
      }),
      products: selectedProducts.map(p => {
        const product = availableProducts.find(prod => prod.id === p.id);
        return product ? { id: p.id, name: product.name, price: product.price, quantity: p.quantity } : { id: p.id, name: "", price: 0, quantity: p.quantity };
      }),
      totalAmount: newTotal
    };
    
    // In a real app, you would call an API to update the appointment
    toast({
      title: "Appointment Updated",
      description: "Your appointment details have been updated successfully.",
    })
    
    setIsEditing(false)
    setSelectedAppointment(updatedAppointment)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedAppointment(null)
    setSelectedServices([])
    setSelectedProducts([])
  }

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    )
  }

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.id === productId);
      if (exists) {
        return prev.filter(p => p.id !== productId);
      } else {
        return [...prev, { id: productId, quantity: 1 }];
      }
    })
  }

  const updateProductQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setSelectedProducts(prev => 
      prev.map(p => p.id === productId ? { ...p, quantity } : p)
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Completed":
        return "bg-green-100 text-green-800 border-green-300"
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Appointments</h1>
        <Button asChild>
          <Link href="/services/book-appointment">
            <Plus className="h-4 w-4 mr-2" /> Book New Appointment
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-8">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="all">All Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="space-y-6">
            {appointments
              .filter((appointment) => appointment.status === "Upcoming")
              .map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Left section with colored accent */}
                      <div
                        className={`w-full md:w-2 ${appointment.status === "Upcoming" ? "bg-blue-500" : appointment.status === "Completed" ? "bg-green-500" : "bg-red-500"}`}
                      ></div>

                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          {/* Appointment info */}
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-3 rounded-full ${
                                appointment.status === "Upcoming"
                                  ? "bg-blue-100"
                                  : appointment.status === "Completed"
                                    ? "bg-green-100"
                                    : "bg-red-100"
                              }`}
                            >
                              {appointment.type === "in-store" ? (
                                <Store className={`h-6 w-6 ${
                                  appointment.status === "Upcoming"
                                    ? "text-blue-600"
                                    : appointment.status === "Completed"
                                      ? "text-green-600"
                                      : "text-red-600"
                                }`} />
                              ) : (
                                <Home className={`h-6 w-6 ${
                                  appointment.status === "Upcoming"
                                    ? "text-blue-600"
                                    : appointment.status === "Completed"
                                      ? "text-green-600"
                                      : "text-red-600"
                                }`} />
                              )}
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg">
                                  {appointment.type === "in-store" ? "In-Store Visit" : "At-Home Service"}
                                </h3>
                                <Badge className={`${getStatusColor(appointment.status)}`}>{appointment.status}</Badge>
                              </div>

                              <div className="mt-3 space-y-1">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <p className="text-sm">
                                    {appointment.date} at {appointment.time}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <p className="text-sm">
                                    {appointment.type === "in-store" ? appointment.location : "Your Address"}
                                  </p>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {appointment.services.slice(0, 2).map((service, index) => (
                                    <Badge key={service.id} variant="outline" className="bg-primary/5">
                                      <Scissors className="h-3 w-3 mr-1" />
                                      {service.name}
                                    </Badge>
                                  ))}
                                  {appointment.products.slice(0, 2).map((product, index) => (
                                    <Badge key={product.id} variant="outline" className="bg-secondary/10">
                                      <Package className="h-3 w-3 mr-1" />
                                      {product.name} {product.quantity > 1 && `(${product.quantity})`}
                                    </Badge>
                                  ))}
                                  {(appointment.services.length + appointment.products.length > 4) && (
                                    <Badge variant="outline" className="bg-gray-100">
                                      +{appointment.services.length + appointment.products.length - 4} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Staff info and actions */}
                          <div className="flex flex-col items-start md:items-end gap-3">
                            <div className="flex items-center gap-2">
                              <div className="flex flex-col items-end text-right">
                                <span className="text-sm font-medium">{appointment.staff.name}</span>
                              </div>
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={appointment.staff.image} alt={appointment.staff.name} />
                                <AvatarFallback>{appointment.staff.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </div>

                            <div className="flex gap-2 mt-2">
                              {appointment.status === "Upcoming" && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setSelectedAppointment(appointment)
                                    setShowCancelDialog(true)
                                  }}
                                  className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                                  title="Cancel Appointment"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewDetails(appointment)}
                                className="h-8 w-8 hover:bg-primary/10"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-6">
            {appointments
              .filter((appointment) => appointment.status === "Completed")
              .map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Left section with colored accent */}
                      <div
                        className={`w-full md:w-2 ${appointment.status === "Upcoming" ? "bg-blue-500" : appointment.status === "Completed" ? "bg-green-500" : "bg-red-500"}`}
                      ></div>

                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          {/* Appointment info */}
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-3 rounded-full ${
                                appointment.status === "Upcoming"
                                  ? "bg-blue-100"
                                  : appointment.status === "Completed"
                                    ? "bg-green-100"
                                    : "bg-red-100"
                              }`}
                            >
                              {appointment.type === "in-store" ? (
                                <Store className={`h-6 w-6 ${
                                  appointment.status === "Upcoming"
                                    ? "text-blue-600"
                                    : appointment.status === "Completed"
                                      ? "text-green-600"
                                      : "text-red-600"
                                }`} />
                              ) : (
                                <Home className={`h-6 w-6 ${
                                  appointment.status === "Upcoming"
                                    ? "text-blue-600"
                                    : appointment.status === "Completed"
                                      ? "text-green-600"
                                      : "text-red-600"
                                }`} />
                              )}
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg">
                                  {appointment.type === "in-store" ? "In-Store Visit" : "At-Home Service"}
                                </h3>
                                <Badge className={`${getStatusColor(appointment.status)}`}>{appointment.status}</Badge>
                              </div>

                              <div className="mt-3 space-y-1">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <p className="text-sm">
                                    {appointment.date} at {appointment.time}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <p className="text-sm">
                                    {appointment.type === "in-store" ? appointment.location : "Your Address"}
                                  </p>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {appointment.services.slice(0, 2).map((service, index) => (
                                    <Badge key={service.id} variant="outline" className="bg-primary/5">
                                      <Scissors className="h-3 w-3 mr-1" />
                                      {service.name}
                                    </Badge>
                                  ))}
                                  {appointment.products.slice(0, 2).map((product, index) => (
                                    <Badge key={product.id} variant="outline" className="bg-secondary/10">
                                      <Package className="h-3 w-3 mr-1" />
                                      {product.name} {product.quantity > 1 && `(${product.quantity})`}
                                    </Badge>
                                  ))}
                                  {(appointment.services.length + appointment.products.length > 4) && (
                                    <Badge variant="outline" className="bg-gray-100">
                                      +{appointment.services.length + appointment.products.length - 4} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Staff info and actions */}
                          <div className="flex flex-col items-start md:items-end gap-3">
                            <div className="flex items-center gap-2">
                              <div className="flex flex-col items-end text-right">
                                <span className="text-sm font-medium">{appointment.staff.name}</span>
                              </div>
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={appointment.staff.image} alt={appointment.staff.name} />
                                <AvatarFallback>{appointment.staff.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </div>

                            <div className="flex gap-2 mt-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewDetails(appointment)}
                                className="h-8 w-8 hover:bg-primary/10"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="cancelled">
          <div className="space-y-6">
            {appointments
              .filter((appointment) => appointment.status === "Cancelled")
              .map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Left section with colored accent */}
                      <div
                        className={`w-full md:w-2 ${appointment.status === "Upcoming" ? "bg-blue-500" : appointment.status === "Completed" ? "bg-green-500" : "bg-red-500"}`}
                      ></div>

                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          {/* Appointment info */}
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-3 rounded-full ${
                                appointment.status === "Upcoming"
                                  ? "bg-blue-100"
                                  : appointment.status === "Completed"
                                    ? "bg-green-100"
                                    : "bg-red-100"
                              }`}
                            >
                              {appointment.type === "in-store" ? (
                                <Store className={`h-6 w-6 ${
                                  appointment.status === "Upcoming"
                                    ? "text-blue-600"
                                    : appointment.status === "Completed"
                                      ? "text-green-600"
                                      : "text-red-600"
                                }`} />
                              ) : (
                                <Home className={`h-6 w-6 ${
                                  appointment.status === "Upcoming"
                                    ? "text-blue-600"
                                    : appointment.status === "Completed"
                                      ? "text-green-600"
                                      : "text-red-600"
                                }`} />
                              )}
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg">
                                  {appointment.type === "in-store" ? "In-Store Visit" : "At-Home Service"}
                                </h3>
                                <Badge className={`${getStatusColor(appointment.status)}`}>{appointment.status}</Badge>
                              </div>

                              <div className="mt-3 space-y-1">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <p className="text-sm">
                                    {appointment.date} at {appointment.time}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <p className="text-sm">
                                    {appointment.type === "in-store" ? appointment.location : "Your Address"}
                                  </p>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {appointment.services.slice(0, 2).map((service, index) => (
                                    <Badge key={service.id} variant="outline" className="bg-primary/5">
                                      <Scissors className="h-3 w-3 mr-1" />
                                      {service.name}
                                    </Badge>
                                  ))}
                                  {appointment.products.slice(0, 2).map((product, index) => (
                                    <Badge key={product.id} variant="outline" className="bg-secondary/10">
                                      <Package className="h-3 w-3 mr-1" />
                                      {product.name} {product.quantity > 1 && `(${product.quantity})`}
                                    </Badge>
                                  ))}
                                  {(appointment.services.length + appointment.products.length > 4) && (
                                    <Badge variant="outline" className="bg-gray-100">
                                      +{appointment.services.length + appointment.products.length - 4} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Staff info and actions */}
                          <div className="flex flex-col items-start md:items-end gap-3">
                            <div className="flex items-center gap-2">
                              <div className="flex flex-col items-end text-right">
                                <span className="text-sm font-medium">{appointment.staff.name}</span>
                              </div>
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={appointment.staff.image} alt={appointment.staff.name} />
                                <AvatarFallback>{appointment.staff.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </div>

                            <div className="flex gap-2 mt-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewDetails(appointment)}
                                className="h-8 w-8 hover:bg-primary/10"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="space-y-6">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Left section with colored accent */}
                    <div
                      className={`w-full md:w-2 ${appointment.status === "Upcoming" ? "bg-blue-500" : appointment.status === "Completed" ? "bg-green-500" : "bg-red-500"}`}
                    ></div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Appointment info */}
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-full ${
                              appointment.status === "Upcoming"
                                ? "bg-blue-100"
                                : appointment.status === "Completed"
                                  ? "bg-green-100"
                                  : "bg-red-100"
                            }`}
                          >
                            {appointment.type === "in-store" ? (
                              <Store className={`h-6 w-6 ${
                                appointment.status === "Upcoming"
                                  ? "text-blue-600"
                                  : appointment.status === "Completed"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`} />
                              ) : (
                                <Home className={`h-6 w-6 ${
                                  appointment.status === "Upcoming"
                                    ? "text-blue-600"
                                    : appointment.status === "Completed"
                                      ? "text-green-600"
                                      : "text-red-600"
                                }`} />
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">
                                {appointment.type === "in-store" ? "In-Store Visit" : "At-Home Service"}
                              </h3>
                              <Badge className={`${getStatusColor(appointment.status)}`}>{appointment.status}</Badge>
                            </div>

                            <div className="mt-3 space-y-1">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm">
                                  {appointment.date} at {appointment.time}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm">
                                  {appointment.type === "in-store" ? appointment.location : "Your Address"}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {appointment.services.slice(0, 2).map((service, index) => (
                                  <Badge key={service.id} variant="outline" className="bg-primary/5">
                                    <Scissors className="h-3 w-3 mr-1" />
                                    {service.name}
                                  </Badge>
                                ))}
                                {appointment.products.slice(0, 2).map((product, index) => (
                                  <Badge key={product.id} variant="outline" className="bg-secondary/10">
                                    <Package className="h-3 w-3 mr-1" />
                                    {product.name} {product.quantity > 1 && `(${product.quantity})`}
                                  </Badge>
                                ))}
                                {(appointment.services.length + appointment.products.length > 4) && (
                                  <Badge variant="outline" className="bg-gray-100">
                                    +{appointment.services.length + appointment.products.length - 4} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Staff info and actions */}
                          <div className="flex flex-col items-start md:items-end gap-3">
                            <div className="flex items-center gap-2">
                              <div className="flex flex-col items-end text-right">
                                <span className="text-sm font-medium">{appointment.staff.name}</span>
                              </div>
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={appointment.staff.image} alt={appointment.staff.name} />
                                <AvatarFallback>{appointment.staff.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </div>

                            <div className="flex gap-2 mt-2">
                              {appointment.status === "Upcoming" && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setSelectedAppointment(appointment)
                                    setShowCancelDialog(true)
                                  }}
                                  className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                                  title="Cancel Appointment"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewDetails(appointment)}
                                className="h-8 w-8 hover:bg-primary/10"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Appointment Details Dialog */}
      <Dialog open={showDetails} onOpenChange={(open) => {
        setShowDetails(open);
        if (!open) {
          setIsEditing(false)
          setEditedAppointment(null)
          setSelectedServices([])
          setSelectedProducts([])
        }
      }}pen) {
          setIsEditing(false)
          setEditedAppointment(null)
          setSelectedServices([])
          setSelectedProducts([])
        }
      }}>
        <DialogContent className="max-w-md max-h-[85vh]">
          {selectedAppointment && (
            <>
              <DialogHeader>
                <DialogTitle>Appointment Details</DialogTitle>
                <DialogDescription>
                  {selectedAppointment.id} - {selectedAppointment.status}
                </DialogDescription>
              </DialogHeader>
              
              {isEditing ? (
                // Edit mode
                <div className="space-y-4 py-2 overflow-y-auto pr-1 max-h-[60vh]">
                  <div>
                    <Label htmlFor="edit-type" className="text-sm font-medium">Appointment Type</Label>
                    <RadioGroup 
                      id="edit-type"
                      value={editedAppointment?.type || 'in-store'}
                      onValueChange={(value) => setEditedAppointment(prev => prev ? {...prev, type: value as 'in-store' | 'at-home'} : null)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-store" id="in-store" />
                        <Label htmlFor="in-store" className="cursor-pointer">In-Store Visit</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="at-home" id="at-home" />
                        <Label htmlFor="at-home" className="cursor-pointer">At-Home Service</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-date" className="text-sm font-medium">Date</Label>
                    <Input 
                      id="edit-date" 
                      type="date" 
                      value={editedAppointment?.date || ''} 
                      onChange={(e) => setEditedAppointment(prev => prev ? {...prev, date: e.target.value} : null)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-time" className="text-sm font-medium">Time</Label>
                    <Input 
                      id="edit-time" 
                      type="time" 
                      value={editedAppointment?.time?.replace(' AM', '').replace(' PM', '') || ''} 
                      onChange={(e) => {
                        const timeValue = e.target.value;
                        const hour = Number.parseInt(timeValue.split(':')[0]);
                        const ampm = hour >= 12 ? 'PM' : 'AM';
                        const formattedTime = `${timeValue} ${ampm}`;
                        setEditedAppointment(prev => prev ? {...prev, time: formattedTime} : null);
                      }}
                      className="mt-1"
                    />
                  </div>
                  
                  {editedAppointment?.type === 'in-store' && (
                    <div>
                      <Label htmlFor="edit-location" className="text-sm font-medium">Location</Label>
                      <Select 
                        value={editedAppointment?.location || ''}
                        onValueChange={(value) => setEditedAppointment(prev => prev ? {...prev, location: value} : null)}
                      >
                        <SelectTrigger id="edit-location" className="mt-1">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Downtown Branch">Downtown Branch</SelectItem>
                          <SelectItem value="Eastside Branch">Eastside Branch</SelectItem>
                          <SelectItem value="Westside Branch">Westside Branch</SelectItem>
                          <SelectItem value="Northside Branch">Northside Branch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {editedAppointment?.type === 'at-home' && (
                    <div>
                      <Label htmlFor="edit-address" className="text-sm font-medium">Address</Label>
                      <Input 
                        id="edit-address" 
                        value={editedAppointment?.address || ''} 
                        onChange={(e) => setEditedAppointment(prev => prev ? {...prev, address: e.target.value} : null)}
                        className="mt-1"
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label className="text-sm font-medium">Services</Label>
                    <div className="mt-2 space-y-2 border rounded-md p-3 max-h-32 overflow-y-auto">
                      {availableServices.map(service => (
                        <div key={service.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`service-${service.id}`} 
                            checked={selectedServices.includes(service.id)}
                            onCheckedChange={() => toggleServiceSelection(service.id)}
                          />
                          <Label htmlFor={`service-${service.id}`} className="flex justify-between w-full cursor-pointer text-sm">
                            <span>{service.name}</span>
                            <span>${service.price.toFixed(2)}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Products</Label>
                    <div className="mt-2 space-y-2 border rounded-md p-3 max-h-32 overflow-y-auto">
                      {availableProducts.map(product => (
                        <div key={product.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`product-${product.id}`} 
                            checked={selectedProducts.some(p => p.id === product.id)}
                            onCheckedChange={() => toggleProductSelection(product.id)}
                          />
                          <Label htmlFor={`product-${product.id}`} className="flex justify-between w-full cursor-pointer text-sm">
                            <span>{product.name}</span>
                            <span>${product.price.toFixed(2)}</span>
                          </Label>
                          {selectedProducts.some(p => p.id === product.id) && (
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-none"
                                onClick={() => {
                                  const current = selectedProducts.find(p => p.id === product.id);
                                  if (current) updateProductQuantity(product.id, current.quantity - 1);
                                }}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-5 text-center text-sm">
                                {selectedProducts.find(p => p.id === product.id)?.quantity || 1}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-none"
                                onClick={() => {
                                  const current = selectedProducts.find(p => p.id === product.id);
                                  if (current) updateProductQuantity(product.id, current.quantity + 1);
                                }}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-notes" className="text-sm font-medium">Notes</Label>
                    <Textarea 
                      id="edit-notes" 
                      value={editedAppointment?.notes || ''} 
                      onChange={(e) => setEditedAppointment(prev => prev ? {...prev, notes: e.target.value} : null)}
                      className="mt-1"
                    />
                  </div>
                </div>
              ) : (
                // View mode
                <div className="space-y-4 overflow-y-auto pr-1 max-h-[60vh]">
                  <div>
                    <h3 className="text-sm font-medium">Appointment Type</h3>
                    <p>{selectedAppointment.type === "in-store" ? "In-Store Visit" : "At-Home Service"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Date & Time</h3>
                    <p>
                      {selectedAppointment.date} at {selectedAppointment.time}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Location</h3>
                    {selectedAppointment.type === "in-store" ? (
                      <>
                        <p>{selectedAppointment.location}</p>
                        <p className="text-sm text-muted-foreground">{selectedAppointment.address}</p>
                      </>
                    ) : (
                      <p>{selectedAppointment.address}</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Services</h3>
                    {selectedAppointment.services.length > 0 ? (
                      <div className="mt-1 space-y-1 max-h-40 overflow-y-auto pr-1">
                        {selectedAppointment.services.map(service => (
                          <div key={service.id} className="flex justify-between">
                            <span className="text-sm">{service.name}</span>
                            <span className="text-sm">${service.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No services selected</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Products</h3>
                    {selectedAppointment.products.length > 0 ? (
                      <div className="mt-1 space-y-1 max-h-40 overflow-y-auto pr-1">
                        {selectedAppointment.products.map(product => (
                          <div key={product.id} className="flex justify-between">
                            <span className="text-sm">
                              {product.name} {product.quantity > 1 && `(${product.quantity})`}
                            </span>
                            <span className="text-sm">${(product.price * product.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No products selected</p>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex justify-between font-medium">
                      <span>Total Amount</span>
                      <span>${selectedAppointment.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Staff</h3>
                    <div className="flex items-center mt-1">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={selectedAppointment.staff.image} alt={selectedAppointment.staff.name} />
                        <AvatarFallback>{selectedAppointment.staff.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{selectedAppointment.staff.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedAppointment.staff.position}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Notes</h3>
                    <p className="text-sm">{selectedAppointment.notes}</p>
                  </div>
                  
                  {selectedAppointment.feedback && (
                    <div>
                      <h3 className="text-sm font-medium">Your Feedback</h3>
                      <div className="flex items-center mt-1">{renderStars(selectedAppointment.feedback.rating)}</div>
                      <p className="text-sm mt-1">{selectedAppointment.feedback.comment}</p>
                    </div>
                  )}
                </div>
              )}
              
              <DialogFooter>
                {isEditing ? (
                  <div className="flex space-x-2 w-full">
                    <Button variant="outline" onClick={handleCancelEdit} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} className="flex-1">
                      <Check className="h-4 w-4 mr-1" /> Save Changes
                    </Button>
                  </div>
                ) : (
                  selectedAppointment.status === "Upcoming" ? (
                    <div className="flex space-x-2 w-full">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowDetails(false)
                          setShowCancelDialog(true)
                        }}
                        className="flex-1"
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel Appointment
                      </Button>
                      <Button onClick={handleStartEditing} className="flex-1">
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    </div>
                  ) : (
                    <Button asChild className="w-full">
                      <Link href={`/services/book-appointment?rebook=${selectedAppointment.id}`}>
                        <Calendar className="h-4 w-4 mr-1" /> Rebook Similar Appointment
                      </Link>
                    </Button>
                  )
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="bg-muted/30 p-4 rounded-md">
              <p className="font-medium">
                {selectedAppointment.type === "in-store" ? "In-Store Visit" : "At-Home Service"}
              </p>
              <p className="text-sm">
                {selectedAppointment.date} at {selectedAppointment.time}
              </p>
              <p className="text-sm">
                {selectedAppointment.type === "in-store" 
                  ? selectedAppointment.location 
                  : selectedAppointment.address}
              </p>
              <div className="mt-2">
                <p className="text-sm font-medium">Services & Products:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedAppointment.services.map(service => (
                    <Badge key={service.id} variant="outline" className="bg-primary/5">
                      {service.name}
                    </Badge>
                  ))}
                  {selectedAppointment.products.map(product => (
                    <Badge key={product.id} variant="outline" className="bg-secondary/10">
                      {product.name} {product.quantity > 1 && `(${product.quantity})`}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Appointment
            </Button>
            <Button variant="destructive" onClick={handleCancelAppointment}>
              Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MyAppointmentPage