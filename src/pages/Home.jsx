import React, { useState } from "react";
import {   
  Table,   
  TableHeader,   
  TableColumn,   
  TableBody,   
  TableRow,   
  TableCell,   
  Button, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Input
} from "@nextui-org/react";
import { Toaster, toast } from 'react-hot-toast';
const Home = () => {
  // State to manage users
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Tony Reichert",
      role: "CEO",
      email: "tony@example.com",
      password: "pass1234",
      status: "Active"
    },
    {
      id: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      email: "zoey@example.com",
      password: "securePass!1",
      status: "Paused"
    },
    {
      id: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      email: "jane@example.com",
      password: "dev123",
      status: "Active"
    },
    {
      id: "4",
      name: "William Howard",
      role: "Community Manager",
      email: "william@example.com",
      password: "vacay2023",
      status: "Vacation"
    }
  ]);

  // State for new/edit user form
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
    role: "",
    email: "",
    password: "",
    status: "Active"
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});

  // Modal hooks
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { 
    isOpen: isEditOpen, 
    onOpen: onEditOpen, 
    onOpenChange: onEditOpenChange, 
    onClose: onEditClose 
  } = useDisclosure();
  const { 
    isOpen: isDeleteOpen, 
    onOpen: onDeleteOpen, 
    onOpenChange: onDeleteOpenChange, 
    onClose: onDeleteClose 
  } = useDisclosure();

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!currentUser.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Role validation
    if (!currentUser.role.trim()) {
      newErrors.role = "Role is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!currentUser.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(currentUser.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!currentUser.password.trim()) {
      newErrors.password = "Password is required";
    } else if (currentUser.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleLogout = () => {
    // Display logout success toast
    toast.success('Logout Successful', {
      position: 'top-right',
      duration: 3000,
      style: {
        background: '#4CAF50',
        color: 'white',
      }
    });

    // Note: Intentionally NOT navigating to login 
    // This is for the software tester to identify as a potential bug
    console.log('Logout attempted but token not clear ');
  };

  // Add user handler
  const handleAddUser = () => {
    if (validateForm()) {
      const userToAdd = {
        ...currentUser,
        id: (users.length + 1).toString()
      };

      setUsers(prev => [...prev, userToAdd]);
      
      // Reset form and close modal
      setCurrentUser({
        id: "",
        name: "",
        role: "",
        email: "",
        password: "",
        status: "Active"
      });
      setErrors({});
      onClose();
    }
  };

  // Edit user handler
  const handleEditUser = () => {
    if (validateForm()) {
      // Update user
      // setUsers(prev => 
      //   prev.map(user => 
      //     user.id === currentUser.id ? currentUser : user
      //   )
      // );
      
      // Reset form and close modal
      setErrors({});
      onEditClose();
    }
  };

  // Delete user handler
  const handleDeleteUser = () => {
    // Remove user by ID
    setUsers(prev => 
      prev.filter(user => user.id !== currentUser.id)
    );
    
    // Close delete modal
    onDeleteClose();
  };

  // Prepare user for editing
  const prepareEditUser = (user) => {
    setCurrentUser({...user});
    setErrors({});
    onEditOpen();
  };

  // Prepare user for deletion
  const prepareDeleteUser = (user) => {
    setCurrentUser(user);
    onDeleteOpen();
  };

  return (
    <>
     <Toaster />
     <div className="absolute top-4 right-4">
            <Button 
              color="danger" 
              variant="ghost"
              onPress={handleLogout}
            >
              Logout
            </Button>
          </div>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-6">
          {/* Add User Button */}
          
          <div className="flex justify-between items-center mb-4 flex-wrap">
            <h1 className="text-xl font-semibold text-white mb-2 sm:mb-0">
              User Management
            </h1>
            <Button 
              onPress={onOpen} 
              className="px-4 py-2 sm:w-auto w-full" 
              color="secondary"
            >
              Add User
            </Button>
          </div>
          
          {/* User Table */}
          <Table aria-label="User management table" variant="bordered">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>PASSWORD</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        color="primary" 
                        variant="light"
                        onPress={() => prepareEditUser(user)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        color="danger" 
                        variant="light"
                        onPress={() => prepareDeleteUser(user)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add New User</ModalHeader>
              <ModalBody>
                <Input
                  name="name"
                  label="Name"
                  placeholder="Enter full name"
                  value={currentUser.name}
                  onChange={handleInputChange}
                  color={errors.name ? "danger" : "default"}
                  errorMessage={errors.name}
                  validationState={errors.name ? "invalid" : "valid"}
                  className="mb-4"
                />
                <Input
                  name="role"
                  label="Role"
                  placeholder="Enter user role"
                  value={currentUser.role}
                  onChange={handleInputChange}
                  color={errors.role ? "danger" : "default"}
                  errorMessage={errors.role}
                  validationState={errors.role ? "invalid" : "valid"}
                  className="mb-4"
                />
                <Input
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter email address"
                  value={currentUser.email}
                  onChange={handleInputChange}
                  color={errors.email ? "danger" : "default"}
                  errorMessage={errors.email}
                  validationState={errors.email ? "invalid" : "valid"}
                  className="mb-4"
                />
                <Input
                  name="password"
                  type="text"
                  label="Password"
                  placeholder="Enter password"
                  value={currentUser.password}
                  onChange={handleInputChange}
                  color={errors.password ? "danger" : "default"}
                  errorMessage={errors.password}
                  validationState={errors.password ? "invalid" : "valid"}
                  className="mb-4"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleAddUser}>
                  Add User
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Edit User Modal (similar structure as Add User Modal) */}
      <Modal 
        isOpen={isEditOpen} 
        onOpenChange={onEditOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onEditClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit User</ModalHeader>
              <ModalBody>
                <Input
                  name="name"
                  label="Name"
                  placeholder="Enter full name"
                  value={currentUser.name}
                  onChange={handleInputChange}
                  color={errors.name ? "danger" : "default"}
                  errorMessage={errors.name}
                  validationState={errors.name ? "invalid" : "valid"}
                  className="mb-4"
                />
                <Input
                  name="role"
                  label="Role"
                  placeholder="Enter user role"
                  value={currentUser.role}
                  onChange={handleInputChange}
                  color={errors.role ? "danger" : "default"}
                  errorMessage={errors.role}
                  validationState={errors.role ? "invalid" : "valid"}
                  className="mb-4"
                />
                <Input
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter email address"
                  value={currentUser.email}
                  onChange={handleInputChange}
                  color={errors.email ? "danger" : "default"}
                  errorMessage={errors.email}
                  validationState={errors.email ? "invalid" : "valid"}
                  className="mb-4"
                />
                <Input
                  name="password"
                  type="text"
                  label="Password"
                  placeholder="Enter new password"
                  value={currentUser.password}
                  onChange={handleInputChange}
                  color={errors.password ? "danger" : "default"}
                  errorMessage={errors.password}
                  validationState={errors.password ? "invalid" : "valid"}
                  className="mb-4"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onEditClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleEditUser}>
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Delete User Modal */}
      <Modal 
        isOpen={isDeleteOpen} 
        onOpenChange={onDeleteOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onDeleteClose) => (
            <>
              <ModalHeader>Confirm Delete</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete the user {currentUser.name}?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onDeleteClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={handleDeleteUser}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;