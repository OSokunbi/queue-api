import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import axios from 'axios';
import { useToast } from '../components/toast/ToastContext';


export const EnqueuePage = () => {
  const [isDisabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [person, setStudent] = useState({
    name: '',
    id: 0,
    topic: ''
  });
  
  const { toast } = useToast();

  const handleEnqueue = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/enqueue', person);
      setSuccess(true);
      setDisabled(true);
      toast({
        title: 'Success!',
        description: 'You have successfully joined the queue!'
      })
    } catch (error) {
      console.error(error);
    }
  }

  
  console.log(person)
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent({
      ...person,
      [name]: value
    });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card 
        title="Enqueue Person"
        className="p-10 w-96">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            disabled={isDisabled}
            id="name"
            name="name"
            value={person.name}
            onChange={handleChange}
            type="text" 
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID:</label>
          <input 
            disabled={isDisabled}
            id="id"
            name="id"
            value={person.id}
            onChange={handleChange}
            type="number" 
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic:</label>
          <textarea 
            disabled={isDisabled}
            id="topic"
            name="topic"
            value={person.topic}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <Button 
          disabled={isDisabled}
          onClick={handleEnqueue}
          className="disabled:bg-red-500 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isDisabled ? 'Currently in Queue' : 'Join Queue'}
        </Button>
        {success && <p className="text-green-500">You have successfully joined the queue!</p>}
      </Card>
    </div>
  );
}
