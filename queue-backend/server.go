package main

import (
	"encoding/json"
	"net/http"
	"fmt"
	"queue/backend/queue"
)

type Student struct {
  Name  string `json:"name"`
  ID    string    `json:"id"`
  Topic string `json:"topic"`
}


var q *queue.Queue

func main() {
  q = queue.NewQueue()
  http.HandleFunc("/api/enqueue", EnqueueHandler)
  http.HandleFunc("/api/dequeue", DequeueHandler)

  fmt.Println("Server listening - port 8080")
  http.ListenAndServe(":8080", nil)
}

func EnqueueHandler(w http.ResponseWriter, r *http.Request){
  enableCors(&w)
  if r.Method == "OPTIONS" {
    w.WriteHeader(http.StatusOK)
    return
  }
  var student Student
  err := json.NewDecoder(r.Body).Decode(&student)
  if err != nil {
    http.Error(w, err.Error(), http.StatusBadRequest)
    return
  }
  q.Enqueue(student)
  w.WriteHeader(http.StatusCreated)
  fmt.Fprintf(w, "Student enqueued successfully")
}

func DequeueHandler(w http.ResponseWriter, r *http.Request) {
  enableCors(&w)
  if r.Method == "OPTIONS" {
    w.WriteHeader(http.StatusOK)
    return
  }
  student, err := q.Dequeue()
  if err != nil {
    http.Error(w, err.Error(), http.StatusNotFound)
    return
  }

  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(student)
}

func enableCors(w *http.ResponseWriter) {
  (*w).Header().Set("Access-Control-Allow-Origin", "*")
  (*w).Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  (*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

