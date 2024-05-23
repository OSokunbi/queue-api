import axios from 'axios';
import { useState } from 'react';
import Card from '../components/Card';

export const DequeuePage = () => {
  const [person, setStudent] = useState({
    name: '',
    id: 0,
    topic: '' 
  });
  const [error, setError] = useState(null);
  
  const handleDequeue = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/dequeue');
      console.log(response.data);
      setStudent(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setStudent({
        name: '',
        id: 0,
        topic: ''
      });
      setError("Queue is empty")
    }
  }
  
  return (
   <div className="flex h-screen mx-auto items-center justify-center">
      <Card 
        className="p-8 bg-gray-100 rounded-lg shadow-md w-96"
        title="Dequeue"
      >
        <button 
          onClick={handleDequeue}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Dequeue
        </button>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Information:</h2>
          <div className="mt-2">
            <p className="text-gray-700 whitespace-normal"><span className="font-semibold">Name:</span> {person.name}</p>
            <p className="text-gray-700"><span className="font-semibold">ID:</span> {person.id}</p>
            <p className="max-w-full text-gray-700 "><span className="font-semibold">Topic:</span> {person.topic}</p>
          </div>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </Card>
    </div> 
  );  
}
